import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';
export default class DrawerLayoutComp extends Component {
    render() {
        return (
            <View style={dStyles.flex}>
                <View>
                    <Image source={{uri:"http://img1.2345.com/duoteimg/qqTxImg/2013/12/ns/18-024824_754.jpg"}} style={dStyles.image}/>
                </View>
            </View>
        )
    }
}

const dStyles = StyleSheet.create({
    flex: {
        flex: 1,
    },

    image: {
        width: 150,
        width: 150,
        backgroundColor:"red"
    }
})