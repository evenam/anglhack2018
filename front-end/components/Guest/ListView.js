import React from 'react';
import Listing from './Listing.js';
import ListCard from './ListCard.js';
import listings from '../../resources/listings.json';

import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Button} from 'react-native';
import { Input, Card, ListItem, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation';

export default class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.state = {text: 'Placeholder'};
        this.showListing = true;
        this.showMapView = true;
        this.showListView = false;
        
    }
    onPress() {

    }

    static navigationOptions = {
        header: null,
      };
  render() {

    
    const images = ['https://www.ikea.com/ms/media/cho_room/20171/seating/20171_cols03a/20171_cols03a_01_PH137139.jpg',
    'https://static1.squarespace.com/static/511526cde4b067782b69109c/51152a17e4b00dcd7b6f06f5/517a97dfe4b072eb97f5d246/1366990168209/16-corporate-location-portrait-photo-ac_120516_140626_0274_12x18.JPG?format=1000w',
    'https://www.thespruce.com/small-living-room-ideas-4129044'];
    const search = <View style={styles.searchParent}>
    <Input
        placeholder='Search for a Nappr'
        fontStyle='italic'
        shake={true}
        clearTextOnFocus={true}
        style={styles.search}
    />
    </View>
    return (
        <View>
            <View style={{paddingTop:20, paddingBottom: 10, backgroundColor:'#3D6DCC'}}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={<Button
                    onPress={this.onPress}
                    title="Map"
                    color="#fff"
                    />}
                    centerComponent={search}
                    rightComponent={<Button
                        onPress={this.onPress}
                        title="Filter"
                        color="#fff"
                        />}
                    outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                    innerContainerStyles={{ justifyContent: 'space-around' }}
                />
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {listings.map((images, i) => (
                    <ListCard images={images} key={i}></ListCard>
                ))}
                
                
            </ScrollView>
        </View>
        
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
    contentContainer: {
        // paddingTop:20,
        // marginTop:20,
        // paddingVertical:20,
        backgroundColor:'#fdfdfd'
        // justifyContent: 'center',
        // textAlignVertical: 'top'
        

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
        backgroundColor: '#fff',
        width: '50%',
        zIndex:1000
    },
    searchParent: {
        backgroundColor: '#ddd',
        width: 200,
        // marginLeft: 50,
        // marginRight: 40
    }
});
