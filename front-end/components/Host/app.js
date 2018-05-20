import React from 'react';
import io from 'socket.io-client';
// import jwt from 'jsonwebtoken';
import { StyleSheet, Text, TextInput, View, Button, Image, ImageBackground } from 'react-native';


export default class App extends React.Component {
	constructor(props) {
		super(props);
		console.log('connecting');

		let socket = io('http://xstgx.com:3433');

		this.state = { hostId: 'charles22', tick: null };

		socket.on('connect', data => {
			console.log('Connected to Nappr host server');
			socket.emit('setID', this.state.hostId);
		});

		socket.on('disconnection', data => {
			console.log('Disconnected from Nappr host server');
		});

		socket.on('tick', data => {
			console.log(data);
			this.setState({
				hostId: this.state.hostId,
				tick: data
			});

			if (data && data.state === 'pending') {
				fetch(`http://xstgx.com:3400/userprofile/${data.guestId}`)
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
			return <Text>No requests found</Text>
		}

		let accept = () => this.acceptCurrent();
		let decline = () => this.declineCurrent();
		let profile = this.state.profile;

		if (this.state.tick.state === 'pending') {
			return (<Text>
					<Text>Request from {this.state.tick.guestId}</Text>
					{this.state.profile ? <Text>
						<Text>Name: {profile.name}</Text>
						<Text>Rating: {profile.stars / profile.votes}</Text>
						<Text>Phone Number: {profile.phone}</Text>
						<Image source={{uri: `http://xstgx.com:3400${profile.photo}`}} />
					</Text> : false }
					<Text>
						<Button onPress={accept} title="Accept" />
						<Button onPress={decline} title="Decline" />
					</Text>
				</Text>)
		}

		if (this.state.tick.state === 'fulfill') {
			let tickTime = this.getTickTime();
			return (<Text>
					<Text>Currently hosting {profile.name}.</Text>
					<Text>Time Left: {tickTime}</Text>
					<Text>Phone Number: {profile.phone}</Text>
				</Text>)
		}

		return <Text>Fetching...</Text>
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
			fetch('http://xstgx.com:3400/hostresponse', options);
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
			fetch('http://xstgx.com:3400/hostresponse', options);
		}
	}

	render() {
		if (this.state.hostId !== null) {
			return (
				<View style={styles.container}><Text>
				<Text>Guest Requests</Text>
				// { this.getRequest() }
			</Text></View>	);
				
		} else {
			return (<View style={styles.container}></View>);
		}
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
