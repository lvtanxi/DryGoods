import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import px2dp from './px2dp';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBar extends Component {

    static propTypes = {
        title: PropTypes.string,
        leftBtnIcon: PropTypes.string,
        leftBtnText: PropTypes.string,
        leftBtnPress: PropTypes.func,
        rightBtnIcon: PropTypes.string,
        rightBtnText: PropTypes.string,
        rightBtnPress: PropTypes.func,
        rightBtnStyle: Text.propTypes.style,
    }



    render() {
        const {title, leftBtnIcon, leftBtnText, leftBtnPress, rightBtnIcon, rightBtnText, rightBtnPress} = this.props;
        return (
            <View style={styles.toolbar}>
                <View style={styles.fixedCell}>
                    {(leftBtnIcon || leftBtnText) ?
                        <ImageButton icon={leftBtnIcon} text={leftBtnText} onPress={leftBtnPress}/>
                        :
                        null
                    }
                </View>
                <View style={styles.centerCell}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                </View>
                <View style={styles.fixedCell}>
                    {(rightBtnIcon || rightBtnText) ?
                        <ImageButton icon={rightBtnIcon} text={rightBtnText} onPress={rightBtnPress}/>
                        :
                        null
                    }
                </View>
            </View>
        )
    }
}

class ImageButton extends Component {

    static propTypes = {
        icon: PropTypes.string,
        text: PropTypes.string,
        onPress: PropTypes.func,
        rightBtnStyle: Text.propTypes.style
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                <View style={styles.btn}>
                    {this.props.icon ?
                        <Icon name={this.props.icon} color="#fff" size={px2dp(23)}/>
                        :
                        <Text style={this.props.rightBtnStyle || styles.btnText}>{this.props.text}</Text>
                    }
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 50,
        flexDirection: 'row',
        elevation: 3,
        backgroundColor:"rgb(51,154,237)",
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {height: 2, width: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    fixedCell: {
        width: 50,
        height: 50,
        flexDirection: 'row',
    },
    centerCell: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: "#ffffff"
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 50,
        height: 50
    },
    btnText: {
        fontSize: 16,
        color: "#ffffff"
    }
})
