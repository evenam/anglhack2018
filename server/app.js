let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

const PORT = 3000;

let clientList = [];

let errorMessage = msg => ({
	error: msg
});

let getMockClient = client => ({
	id: 'Not-Rachel',
	client: client,
	state: {
		available: true,
		timeout: null
	},
	profile: {
		name: 'The Rachel Place',
		pos: {
			lat: 100,
			long: 100,
		},
		stars: 5,
		votes: 10
	}
});

let getMockUser = username => ({
	
})

let addClient = (client, id, data) => {
	clientList.push({ client, id, state: { available: true, timeout: null } });
}

let removeClient = id => {
	clientList = clientList.filter(e => e.id !== id);
}

io.on('connection', client => {
	console.log('Client connected');

	client.on('register', data => {
		// ADD USER
	});

	client.on('accept', data => {
		// ACCEPT
	});

	client.on('decline', data => {
		// REJECT
	});

	client.on('disconnect', data => {
		// REMOVE CLIENT
	})
});

app.get('/bedlist', (req,res) => {
	res.send(clientList.filter(host => host.state.available)
		.map(host => ({
			id: host.id, 
			pos: host.profile.pos
		}))
	);
});

app.get('/profile/{id}', (req,res) => {
	let id = ;
	let plausable = clientList.filter(host => host.id == id);
	if (plausable.length !== 1) {
		res.send(errorMessage(`Host not found: ${id}`));
		return;
	}

	res.send(plausable.map(host => ({
			id: host.id,
			name: host.profile.name,
			stars: host.profile.stars,
			votes: host.profile.votes
		}))[0]
	);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
