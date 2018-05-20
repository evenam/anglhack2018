import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import App from './app';

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
        <Text>Text</Text>
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
