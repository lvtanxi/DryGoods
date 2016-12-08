import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ART,
    TouchableOpacity
} from 'react-native'


export default class CheckBox extends Component {
    state = {
        isChecked: this.props.isChecked,
    }

    static propTypes = {
        ...View.propTypes,
        leftText: React.PropTypes.string,
        leftTextView: React.PropTypes.element,
        rightText: React.PropTypes.string,
        leftTextStyle: View.propTypes.style,
        boxWidth: React.PropTypes.number,
        boxStroke: React.ColorPropType,
        boxStrokeWidth: React.PropTypes.number,
        boxStyle: View.propTypes.style,
        boxCheckedStyle: View.propTypes.style,
        rightTextView: React.PropTypes.string,
        rightTextStyle: View.propTypes.style,
        checkedImage: React.PropTypes.element,
        unCheckedImage: React.PropTypes.element,
        onClick: React.PropTypes.func.isRequired,
        isChecked: React.PropTypes.bool

    }
    static defaultProps = {
        isChecked: false,
        leftTextStyle: {},
        boxWidth: 20,
        boxStrokeWidth: 2,
        boxStroke: "#ffffff",
        rightTextStyle: {}
    }


    onClick() {
        this.setState({
            isChecked: !this.state.isChecked
        })
        this.props.onClick(!this.state.isChecked);
    }

    render() {

        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={() => this.onClick()}
                activeOpacity={0.5}
            >
                <View style={styles.container}>
                    {this._renderLeft()}
                    {this._renderBox()}
                    {this._renderRight()}
                </View>
            </TouchableOpacity>
        )
    }

    _renderLeft() {
        if (this.props.leftTextView)return this.props.leftTextView;
        if (!this.props.leftText)return null;
        return (
            <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
        )
    }

    _renderBox() {
        let width = this.props.boxWidth
        let path = ART.Path();
        path.moveTo(width / 5, width / 2 - 3);
        path.lineTo(width / 2 - 3, width - 7);
        path.lineTo(width - 5, width / 5);
        return (
            <View
                style={[this.state.isChecked ? this.props.boxCheckedStyle || styles.checkedBoder : this.props.boxStyle || styles.checkBoder, {
                    width: this.props.boxWidth,
                    height: this.props.boxWidth
                }]}>
                {this.state.isChecked ? <ART.Surface width={this.props.boxWidth} height={this.props.boxWidth}>
                    <ART.Shape d={path} stroke={this.props.boxStroke} strokeWidth={this.props.boxStrokeWidth}/>
                </ART.Surface> : null}
            </View>
        )
    }

    _renderRight() {
        if (this.props.rightTextView)return this.props.rightTextView;
        if (!this.props.rightText)return null;
        return (
            <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        flex: 1,
    },
    rightText: {
        flex: 1,
        marginLeft: 10
    },
    checkBoder: {
        borderWidth: 1,
        borderColor: "#CCC",
        backgroundColor: "#FFFFFF"
    },
    checkedBoder: {
        borderWidth: 1,
        borderColor: "#27ae60",
        backgroundColor: "#27ae60"
    }
})
