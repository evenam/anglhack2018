import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    onPress() {

    }
  render() {
      
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Test</Text>
        <Text>Hi Rachel</Text>
    </View>
    );
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