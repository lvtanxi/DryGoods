import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableNativeFeedback,
    Text,
    View
} from 'react-native';
import Utils from './Utils'
export default class WaitingView extends Component {

    _onPress=()=>{
        if(this.props.callback)
            this.props.callback.call(this)
    }


    render() {
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this._onPress}>
                <View style={wStyels.container} >
                        <Text style={wStyels.text}>{this.props.hitText}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const wStyels=StyleSheet.create({
    container:{
        width:Utils.size.width,
        height:44,
        backgroundColor:"#ffffff",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:14,
        color:"blue"
    }
})