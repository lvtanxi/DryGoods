import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    TouchableNativeFeedback,
    Text,
    View
} from 'react-native';
import Utils from './Utils'
export default class WaitingView extends Component {

    static propTypes = {
        hitText: PropTypes.string,
        rippleColor: PropTypes.string,
        color: PropTypes.string,
        textStyle: Text.propTypes.style
    }

    static defaultProps = {
        rippleColor: "#E8E8E8",
        color: "#ffffff"
    }

    _onPress = () => {
        if (this.props.callback)
            this.props.callback.call(this)
    }


    render() {
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(this.props.rippleColor, false)}
                                     onPress={this._onPress}>
                <View style={[wStyels.container, {backgroundColor: this.props.color}]}>
                    <Text style={this.props.textStyle || wStyels.text}>{this.props.hitText}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const wStyels = StyleSheet.create({
    container: {
        width: Utils.size.width,
        height: 44,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 14,
        color: "blue"
    }
})