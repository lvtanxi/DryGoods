import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    WebView,
    View
} from 'react-native';
import BaseComp from './../compents/BaseComp'
import {CustToast} from './../compents/AndroidComp'
import LoadingView from './../compents/LoadingView'
export default class WebViewComp extends BaseComp {
    renderChildeView(){
        return (
            <WebView
                ref="WebView"
                automaticallyAdjustContentInsets={true}
                style={wStyles.web}
                source={{uri:this.props.url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                renderLoading={()=><LoadingView/>}
                startInLoadingState={true}
                onNavigationStateChange={this._onNavigationStateChange}
                onError={()=>CustToast.error("网页加载失败！")}
            />
        )
    }


    _onNavigationStateChange = (param) => {
        this.setState(param)
    }

    handleBack(){
        if (this.state.canGoBack && this.refs.WebView) {
            this.refs.WebView.goBack()
            return true;
        }
        return super.handleBack()
    }

}

const wStyles = StyleSheet.create({
    web: {
        flex: 1
    }
})