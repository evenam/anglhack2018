const GUEST_INIT = 'init';
const HOST_PENDING = 'pending';
const HOST_REJECT = 'host_reject';
const GUEST_REJECT = 'guest_reject';
const HOST_ACCEPT = 'host_accept';
const REQUEST_FULFILL = 'fulfill';
const REQUEST_COMPLETE = 'complete';
const REQUEST_FAIL = 'failed';

module.exports = class Request {
	constructor(hostId, guestId) {
		this.state = GUEST_INIT;
		this.guestId = guestId;
		this.hostId = hostId;
		this.queue = [ { name: HOST_PENDING, duration: 0 } ];
		this.newState = GUEST_INIT;
		this.duration = 0;
	}

	publishStatus(host, guest) {
		if (this.newState !== '') {
			// publish
			console.log(`Request update... ${this.hostId} - ${this.guestId} : ${this.newState}[${this.duration}]`);
		}

		let data = {
			state: this.state,
			guestId: this.guestId,
			hostId: this.hostId,
			duration: this.duration
		};

		if (this.state === REQUEST_COMPLETE)
			data = null;

		if (this.state === REQUEST_FAIL)
			data = null;

		if (host && host.socket)
			host.socket.emit('tick', data);
		if (guest && guest.socket)
			guest.socket.emit('tick', data);
	}	

	tickState() {
		this.duration = Math.max(0, this.duration - 1);
		this.newState = '';
		if (this.queue.length > 0 && this.duration <= 0) {
			this.state = this.queue[0].name;
			this.duration = this.queue[0].duration;
			this.queue.shift(1);
			this.newState = this.state;
		}
	}

	pushPending() {
		if (this.state === GUEST_INIT)
			this.queue.push({
				name: HOST_PENDING,
				duration: 0
			});
	}

	pushHostReject() {
		if (this.state === HOST_PENDING) {
			this.queue.push({
				name: HOST_REJECT,
				duration: 0
			});
			this.pushFail();
		}
	}

	pushGuestReject() {
		if (this.state === HOST_PENDING) {
			this.queue.push({
				name: GUEST_REJECT,
				duration: 0
			});
			this.pushFail();
		}
	}

	pushHostAccept() {
		if (this.state === HOST_PENDING) {
			this.queue.push({
				name: HOST_ACCEPT,
				duration: 0
			});
			this.pushRequestFulfill();
		}
	}

	pushRequestFulfill() {
		this.queue.push({
			name: REQUEST_FULFILL,
			duration: 5 //60*60*2
		});
		this.pushComplete();
	}

	pushComplete() {
		this.queue.push({
			name: REQUEST_COMPLETE,
			duration: 0
		});
	}

	pushFail() {
		this.queue.push({
				name: REQUEST_FAIL,
				duration: 0
			});
	}

	isTerminal() {
		return this.state === REQUEST_FAIL || this.state === REQUEST_COMPLETE;
	}
}
