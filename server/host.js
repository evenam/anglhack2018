module.exports = class Host {
	constructor(socket, data) {
		this.socket = socket;
		this.id = data.id;
		this.available = true;
	}

	getID() {
		return this.id;
	}
}