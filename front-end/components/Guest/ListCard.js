import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Input, Card, ListItem, Header} from 'react-native-elements';

export default class Listing extends React.Component {
    constructor(props) {
        super(props);
        
    }
  render() {
      console.log(this.props.images);
    return (
        <Card containerStyle={styles.cardStyle}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                {this.props.images.map((image, i) => (
                <Image style={styles.image} source={{uri: image}} key={i}/>
                ))}
            </ScrollView>
        </Card>
    );
  }
}

const { width } = Dimensions.get('window');
const height = width * 0.8;
const styles = StyleSheet.create({
    header: {
        marginTop:100,
        paddingTop: 30
    },
    searchInput: {
        flex:  -.04,
        height:40, 
        width: '70%',
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 25,
        textAlign: 'center',
        // textAlignVertical: 'top'
    },
    cardStyle: {
        // padding: 10,
        paddingLeft: 0,
        paddingRight: -10,
        marginTop: 10,
        backgroundColor: '#fff',
        margin: 0
        // borderColor: '#A1D2CE',
    },
    scrollContainer: {
        height,
    },
    image: {
        width,
        height,
        marginTop: 10,
        marginBottom: 10,

    },
    textStyle:{
        fontSize:50,
        fontWeight: 'bold',
    },
    search: {
        backgroundColor: '#fff'
    },
    searchParent: {
        marginLeft: 50,
        marginRight: 40
    }
});
