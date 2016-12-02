import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';


export default class DrawerLayoutComp extends Component {

    render() {
        return (
            <View style={dStyles.flex}>
                  <Image source={{uri:"http://qlogo3.store.qq.com/qzone/992507862/992507862/200?1389658929"}} style={dStyles.header}/>
            </View>
        )
    }
}

const dStyles = StyleSheet.create({
    flex: {
        flex: 1,
        alignItems:"center"
    },
    header:{
        width:200,
        height:200,
        marginTop:10,
        borderRadius:180,
        borderColor:"#EEE",
        borderWidth:3
    }
})