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
        <Button
            onPress={this.onPress}
            title="Login"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />

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