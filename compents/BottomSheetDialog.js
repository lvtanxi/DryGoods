import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import BaseDialog from './BaseDialog'
import ImageText from './ImageText'
import Utils from './Utils'
export default class BottomSheetDialog extends BaseDialog {

    static propTypes = {
        ...View.propTypes,
        actions: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            icon: PropTypes.string
        }))
    }


    renderChildView() {
        if (this.props.actions) {
            return (
                <View style={bStyles.container}>
                    {
                        this.props.actions.map((item, position) =>
                            <ImageText icon={item.icon} title={item.title} key={position}
                                       style={[bStyles.width, this.getItemStyle(position)]}
                                       onPress={this._onPress.bind(this, position)}/>)
                    }
                    <ImageText title={"取消"} style={[bStyles.width, bStyles.close, {marginTop: 10}]}
                               onPress={this.dismiss.bind(this)}/>
                </View>
            )
        } else if (this.props.children) {
            return (
                <View style={[bStyles.container, {marginLeft: this.state.margin}]} onLayout={this._onLayout.bind(this)}>
                    {
                        React.Children.map(this.props.children, (child, position) => child)
                    }
                </View>
            )
        } else {
            return null
        }
    }

    _onPress(position) {
        this.props.onPress && this.props.onPress(position)
    }

    _onLayout(event) {
        this.setState({
            margin: (Utils.size.width - event.nativeEvent.layout.width) / 2
        })
    }

    getItemStyle = (position) => {
        let length = this.props.actions.length
        if (length === 1) {
            return bStyles.close
        } else if (length === 2 && position === 0) {
            return bStyles.top
        } else if ((length === 2 && position === 1) || position === length - 1) {
            return bStyles.bottom
        } else if (position === 0) {
            return bStyles.top
        } else {
            return bStyles.center
        }
    }

}

const bStyles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 40,
        marginLeft: 20,
        marginRight: 20
    },
    width: {
        width: Utils.size.width - 40,
        height: 44,
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: "center"
    },
    close: {
        borderRadius: 5
    },
    bottom: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    top: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom:0.5
    },
    center: {
        borderBottomWidth:0.5,
        borderBottomColor:"#CCC"
    }
})