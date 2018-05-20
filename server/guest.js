module.exports = class Guest {
	constructor(socket, data) {
		this.id = data.id;
		this.socket = socket;
		this.available = true;
	}

	getID() {
		return this.id;
	}
}