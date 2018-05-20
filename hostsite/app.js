import React from 'react';
import { PageHeader, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		console.log('connecting');
		let socket = io('http://localhost:3333');

		this.state = { hostId: 'charles22', tick: null };

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

			if (data && data.state === 'pending') {
				fetch(`http://localhost:3000/userprofile/${data.guestId}`)
					.then(res => res.json())
					.then(this.populateProfile.bind(this));
			}
		})
	}

	isLoggedIn() {
		return this.state.hostId !== null;
	}

	getRequest() {
		if (!this.state.tick) {
			return <h2>No requests found</h2>
		}

		let accept = () => this.acceptCurrent();
		let decline = () => this.declineCurrent();
		let profile = this.state.profile;

		if (this.state.tick.state === 'pending') {
			return (<div>
					<h2>Request from {this.state.tick.guestId}</h2>
					{this.state.profile ? <div>
						<div>Name: {profile.name}</div>
						<div>Rating: {profile.stars / profile.votes}</div>
						<div>Phone Number: {profile.phone}</div>
						<img src={`http://localhost:3000${profile.photo}`} />
					</div> : false }
					<div>
						<Button onClick={accept}>Accept</Button>
						<Button onClick={decline}>Decline</Button>
					</div>
				</div>)
		}

		if (this.state.tick.state === 'fulfill') {
			let tickTime = this.getTickTime();
			return (<div>
					<h2>Currently hosting {profile.name}.</h2>
					<div>Time Left: {tickTime}</div>
					<div>Phone Number: {profile.phone}</div>
				</div>)
		}

		return <h2>Fetching...</h2>
	}

	populateProfile(data) {
		console.log(data);
		this.setState({
			profile: data
		});
	}

	getTickTime() {
		if (this.state.tick && this.state.tick.state === 'fulfill') {
			let duration = this.state.tick.duration;
			let hours = String(Math.floor(duration / 3600));
			let minutes = String(Math.floor((duration % 3600) / 60));
			let seconds = String(duration % 60);
			if (minutes.length < 2) minutes = '0' + minutes;
			if (seconds.length < 2) seconds = '0' + seconds;
			return `${hours}:${minutes}:${seconds}`;
		}
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
