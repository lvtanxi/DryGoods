import React, {Component} from 'react'
import px2dp from './px2dp'
import {
    StyleSheet,
    TouchableNativeFeedback,
    Text,
    View
} from 'react-native';
export default class WaitingView extends Component {

    tex=()=>{
        if(this.props.callback)
            this.props.callback.call(this)
    }

    render() {
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.tex}>
                <View style={wStyels.container}>
                        <Text style={wStyels.text}>{this.props.hitText}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const wStyels=StyleSheet.create({
    container:{
        flex:1,
        height:px2dp(44),
        backgroundColor:"#ffffff",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:14,
        color:"blue"
    }
})