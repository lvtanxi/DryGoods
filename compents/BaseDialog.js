import React, {Component} from 'react'
import LoadingDialog from './LoadingDialog'
import {
    StyleSheet,
    Modal,
    View
} from 'react-native';

import Utils from './../compents/Utils'

export default class BaseDialog extends Component {

    state = {
        showLoading: false,
        animationType:"slide"
    }

    render() {
        const {opacity, backgroundColor} = this.props
        return (
            <Modal onRequestClose={() => this.dismiss()} visible={this.state.showLoading} transparent
                   animationType={this.state.animationType}>
                <View style={ [bStyles.confirmCont, {
                    opacity: opacity || 0.5,
                    backgroundColor: backgroundColor || 'gray'
                }]}></View>
                <View style={ bStyles.loadingImageView }>
                    {this.renderChildView()}
                    <LoadingDialog ref="LoadingDialog"/>
                </View>
            </Modal>
        )
    }

    renderChildView() {
        return (<View></View>)
    }

    show() {
        this.startAnim()
        this.setState({
            showLoading: true
        })
    }

    startAnim() {

    }

    cancelAnim() {

    }

    isShow() {
        return this.state.showLoading
    }

    dismiss() {
        this.cancelAnim()
        this.setState({
            showLoading: false
        })
    }
}

const bStyles = StyleSheet.create({
    confirmCont: {
        position: 'absolute',
        width: Utils.size.width,
        height: Utils.size.height,
        backgroundColor: 'rgba(52,52,52,0.5)'
    },
    loadingImageView: {
        position: 'absolute',
        height: Utils.size.height,
        width: Utils.size.width,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

BaseDialog.propTypes = {
    opacity: React.PropTypes.number,
    backgroundColor: React.PropTypes.string
}