import React, {Component} from 'react'
import BasicStyles from './../styles/BasicStyles'
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

export default class Input extends Component {

    static propTypes = {
        ...View.propTypes,
        ...Input.propTypes,
        leftText: React.PropTypes.string,
        textStyle: View.propTypes.style,
        inputStyle: View.propTypes.style,
    }

    render() {
        return (
            <View style={this.props.style || iStyles.login_label}>
                <Text style={this.props.textStyle}>{this.props.leftText}</Text>
                <TextInput style={[iStyles.login_input, BasicStyles.boder]}
                           {...this.props}
                           underlineColorAndroid={"transparent"}
                           placeholderTextColor={this.props.placeholderTextColor || "#CCC"}
                           selectionColor={"#73D1FF"}/>
            </View>
        )
    }
}

const iStyles = StyleSheet.create({
    login_label: {
        flex: 1,
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20
    },
    login_input: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginLeft: 10,
    },
})