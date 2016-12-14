import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    TouchableNativeFeedback,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
export default class ImageText extends Component {
    static propTypes = {
        style: View.propTypes.style,
        textStyle: Text.propTypes.style,
        icon: PropTypes.string,
        iconSize: PropTypes.number,
        title: PropTypes.string,
        iconColor: PropTypes.string,
        rippleColor: PropTypes.string,
    }

    static defaultProps = {
        iconSize: 20,
        textFlex: 8,
        iconFlex: 2,
        rippleColor: "#E8E8E8"
    }

    render() {

        return (
            this.props.onPress ?
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(this.props.rippleColor, false)}
                    onPress={this.props.onPress}>
                    {this.creatView()}
                </TouchableNativeFeedback>
                : <View>
                    {this.creatView()}
                </View>
        )
    }

    creatView() {
        return (
            <View style={this.props.style || itStyles.modalItem}>
                <View style={{paddingRight: 10}}>
                    {this.props.icon ?
                        <Icon name={this.props.icon} size={this.props.iconSize} color={this.props.iconColor}/> : null}
                </View>
                <View>
                    <Text style={this.props.textStyle || itStyles.text}>{this.props.title}</Text>
                </View>
            </View>
        )
    }

}
const itStyles = StyleSheet.create({
    modalItem: {
        width: 150,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "#CCC",
        backgroundColor: "#FFF"
    },
    text: {
        color: "#222222"
    }
})