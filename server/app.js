// http stuff
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let jwt = require('jsonwebtoken');
let secret = require('./secret');
let cors = require('cors');
let path = require('path');

// socket stuff
let http = require('http');
let hostServer = http.createServer();
let guestServer = http.createServer();
let Server = require('socket.io');
let hosts = new Server(hostServer);
let guests = new Server(guestServer);

// params parse
app.use('/resources', express.static('resources'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ports
const HTTP_PORT = 4000;
const HOST_PORT = 4333;
const GUEST_PORT = 4334;

// client list
let hostlist = [];
let guestlist = [];
const findById = (array, id) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i].getID() === id) {
			return i;
		}
	}
	return -1;
}

// database connection
const { Client } = require('pg');
const client = new Client();

// requests
let requests = [];
let Request = require('./request');
let validateRequest = request => {
	return (findById(hostlist, request.hostId) > 0) && (findById(guestlist, request.guestId) > 0);
}

// handlers
let Host = require('./host');

// authenticate
let authenticate = (req, res, next) => {
	if (req.cookies.napprtoken) {
		let token = req.cookies.token;
		if (!token instanceof String) {
			res.sendStatus(401);
			res.send('Not authorized');
		}

		try {
			req.auth = jwt.decode(token, secret);
		} catch (e) {
			res.sendStatus(401);
			res.send('Not authorized');
		}
		next();
	}
	res.sendStatus(401);
	res.send('Not authorized');
}

// std err
let errorMessage = msg => ({
	error: msg
});

hosts.on('connection', host => {
	console.log('host connected');
	host.on('setID', token => {
		/*
		try {
			let data = jwt.decode(token);
			hostlist.push(new Host(host, data));
			console.log('host authenticated');
		} catch (e) {
			host.disconnect();
		}*/
		console.log(`Added host to list ${token}`);
		hostlist.push(new Host(host, { id: token }));
	});
});

guests.on('connection', guest => {
	console.log('guest connected');
	guest.on('setID', token => {
		/*
		try {
			let data = jwt.decode(token);
			guestlist.push(new Guest(guest, data));
			console.log('guest authenticated');
		} catch (e) {
			guest.disconnect();
		}
		*/
		guestlist.push(new Guest(guest, { id: token }));
	});
});

let tick = setInterval(() => {
	//console.log('=> Server tick <=');
	guestlist = guestlist.filter(guest => guest.socket.connected);
	hostlist = hostlist.filter(host => host.socket.connected);
	requests.forEach(request => validateRequest(request));
	requests.forEach(request => request.tickState());
	requests.forEach(request => {
		host = hostlist[findById(hostlist, request.hostId)];
		guest = guestlist[findById(guestlist, request.guestId)];
		request.publishStatus(host, guest);
	});
	requests = requests.filter(request => !request.isTerminal());
	hostlist.forEach(host => {
		let hostId = host.getID();
		let hostRequests = requests.filter(request => request.hostId === hostId);
		host.available = hostRequests.length === 0;
	})
	guestlist.forEach(guest => {
		let guestId = guest.getID();
		let guestRequests = requests.filter(request => request.guestId === guestId);
		guest.available = guestRequests.length === 0;
	})
}, 1000);

app.post('/authenticate', (req, res) => {
	// TODO: data model
});

app.get('/bedlist', (req, res) => {
	Promise.all(hostlist
		.filter(host => host.available)
		.map(host => host.id)
		.map(async hostId => {
			const res = await client.query(`SELECT username, name, lat, lon, bedtype FROM Hosts WHERE '${hostId}'= username;`);
			return res.rows[0];
		}))
		.then(results => res.send(results));
	//res.send(results);
});

app.post('/request', (req, res) => {
	let hostId = req.body.hostId;
	let guestId = req.body.guestId;
	if (requests.filter(request => request.hostId === hostId).length >= 1) {
		res.sendStatus(400);
	} else {
		let request = new Request(hostId, guestId);
		requests.push(request);
		res.send({ msg: 'success' });
	}
});

app.get('/bedprofile/:id', (req, res) => {
	let id = req.params.id;
	new Promise(async (resolve, reject) => {
			const res = await client.query(`SELECT username, name, lat, lon, bedtype, stars, votes, photo, phone FROM Hosts WHERE '${id}'=username;`);
			if (res.rows.length === 1)
				resolve(res.rows[0]);
			else 
				reject('not found');
		})
		.then(results => res.send(results))
		.catch(reason => res.sendStatus(404));
});

app.get('/userprofile/:id', (req, res) => {
	let id = req.params.id;
	new Promise(async (resolve, reject) => {
			const res = await client.query(`SELECT username, name, stars, votes, photo, phone FROM Guests WHERE '${id}'=username;`);
			if (res.rows.length === 1)
				resolve(res.rows[0]);
			else 
				reject('not found');
		})
		.then(results => res.send(results))
		.catch(reason => res.sendStatus(404));
});

// this should never be in productions :/ should have a better authed support monitor
app.get('/serverstatus', (req, res) => {
	let hostData = hostlist.map(host => ({
		id: host.id,
		available: host.available
	}));

	let guestData = guestlist.map(guest => ({
		id: guest.id
	}));

	let requestData = requests.map(request => ({
		guest: request.guestId,
		host: request.hostId,
		state: request.state,
		duration: request.duration,
		queue: request.queue
	}));

	res.send({ hosts: hostData, guests: guestData, requests: requestData });
});

app.post('/status', (req, res) => {
	let guestId = req.body.guestId;
	request = requests.filter(request => request.guestId === guestId);
	console.log(requests);
	if (request.length === 1) {
		request = request[0];
		res.send({
			status: request.state,
			hostId: request.hostId,
			duration: request.duration
		});
	} else {
		res.sendStatus(404);
		//res.send('Not found');
	}
});

app.post('/hostresponse', (req, res) => {
	let action = req.body.action;
	let hostId = req.body.hostId;
	console.log(req.body)
	if (action === 'accept') {
		let list = requests.filter(request => request.hostId === hostId);
		list.forEach(request => request.pushHostAccept());
	} else if (action === 'reject') {
		let list = requests.filter(request => request.hostId === hostId);
		list.forEach(request => request.pushHostReject());
		res.send({ msg: 'success' });
	} else {
		res.sendStatus(400);
		//res.send('unknown action');
	}
});

app.post('/guestresponse', (req, res) => {
	let action = req.body.action;
	let guestId = req.body.guestId;
	if (action === 'reject') {
		let list = requests.filter(request => request.guestId === guestId);
		list.forEach(request => request.pushGuestReject());
		res.send({ msg: 'success' });
	} else {
		res.sendStatus(400);
		//res.send('unknown action');
	}
});

(async () => {
	await client.connect()

	app.listen(HTTP_PORT, () => {
		console.log(`Listening on port ${HTTP_PORT}`);
	});

	hostServer.listen(HOST_PORT, () => {
		console.log(`Listening on port ${HOST_PORT}`);
	});

	guestServer.listen(GUEST_PORT, () => {
		console.log(`Listening on port ${GUEST_PORT}`);
	});
})();

