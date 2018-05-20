import React from 'react';
import { PageHeader, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		console.log('connecting');
		let socket = io('http://localhost:3333');

		this.state = { hostId: '123', tick: null };

		socket.on('connect', data => {
			console.log('Connected to Nappr host server');
			socket.emit('setID', this.state.hostId);
		});

		socket.on('disconnection', data => {
			console.log('Disconnected from Nappr host server');
		});

		socket.on('tick', data => {
			console.log(data)
			this.setState({
				hostId: this.state.hostId,
				tick: data
			});
		})
	}

	isLoggedIn() {
		return this.state.hostId !== null;
	}

	getRequest() {
		if (!this.state.tick) {
			return <p>No requests found</p>
		}

		let accept = () => this.acceptCurrent();
		let decline = () => this.declineCurrent();

		if (this.state.tick.state === 'pending') {
			return (<div>
					<h2>Request from {this.state.tick.guestId}</h2>
					<div>
						<Button onClick={accept}>Accept</Button>
						<Button onClick={decline}>Decline</Button>
					</div>
				</div>)
		}

		if (this.state.tick.state === 'fulfill') {
			return <p>Currently fulfilling a request</p>
		}

		return <p>Fetching...</p>
	}

	acceptCurrent() {
		if (this.state.tick) {
			let options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					hostId: this.state.hostId,
					action: 'accept'
				})
			};
			fetch('http://localhost:3000/hostresponse', options);
		}
	}

	declineCurrent() {
		if (this.state.tick) {
			let options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					hostId: this.state.hostId,
					action: 'reject'
				})
			};
			fetch('http://localhost:3000/hostresponse', options);
		}
	}

	render() {
		if (this.state.hostId !== null) {
			return (<div>
				<PageHeader>Guest Requests</PageHeader>
				{ this.getRequest() }
			</div>);
		} else {
			return (<div>

			</div>);
		}
	}
}
