import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, View, Button, Image, ImageBackground } from 'react-native';

import picSourceBG from '../components/BlankBlueBG.jpeg';
import picSource2 from '../components/nycblur1.jpg';

export default class SignInAsHost extends React.Component {
    constructor(props) {
        super(props);
    }

    onPress() {
      this.props.onLogin(this.state.username);
    }
  render() {

    return (
      <ImageBackground style={styles.picture} source={picSource2}>
        {this.props.source}
        //<View style={styles.overlay}></View>

        <Image source= {picSourceBG} style={styles.picture2}/>
        <View style={styles.bottomView}>
          <Text style={styles.textStyle3}> SIGN IN </Text>
          <View style={styles.hairline} />
          <Text style={styles.textStyle2}> USERNAME </Text>
          <TextInput style={styles.textStyle}
            name='email'
            placeholder='Username'
            onChangeText={(text) => this.setState({username: text})}
          />
          <Text style={styles.textStyle2}> PASSWORD </Text>
          <TextInput secureTextEntry={true} style={styles.textStyle}
            name='password'
            placeholder='Password'
            type='password'
            onChangeText={(text) => this.setState({password: text})}
          />
          <Button onClick={this.onPress} title="Login" color="#fff" />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
      fontSize: 18,
      color: "#000",
      //fontWeight: 'bold',
      alignSelf: 'center',
      //backgroundColor: "#FFF",
      padding: 10,
      justifyContent: 'space-around',
  },

  textStyle2: {
      marginLeft: 100,
      fontSize: 12,
      color: "#FFFFFF",
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      padding: 10,
      //alignSelf: 'center',
  },

  textStyle3: {
      fontSize: 22,
      color: "#FFFFFF",
      alignSelf: 'center',
      bottom: 43,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  picture: {
    flex: 1,
    height: null,
    width: null,
  },
  picture2: {
    flex: 1,
    height: null,
    width: null,
    opacity: 0.8,
  },

  hairline: {
    backgroundColor: '#FFFFFF',
    height: 1,
    width: 165,
    flexDirection: 'column',
    bottom: 20,
  },

  bottomView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: 400,
  },
});
