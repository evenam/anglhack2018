import React from 'react';
import { Modal, StyleSheet, TouchableHighlight, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    onPress() {

    }
    state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    const name = "dyadra";
    return (
      <View style={styles.container}>
        <Text>Guest Home hello {name}</Text>
        <Text>Hello</Text>
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
