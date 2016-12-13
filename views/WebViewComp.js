import React, {Component, PropTypes} from 'react'
import {
    AppRegistry,
    StyleSheet,
    WebView,
    PanResponder,
    Image,
    Modal,
    TouchableOpacity,
    Linking,
    Animated,
    Text,
    Clipboard,
    View
} from 'react-native';
import BaseComp from './../compents/BaseComp'
import Utils from './../compents/Utils'
import px2dp from './../compents/px2dp'
import ShareUtil from './../compents/ShareUtil'
import {CustToast} from './../compents/AndroidComp'
import LoadingView from './../compents/LoadingView'
import Icon from 'react-native-vector-icons/Ionicons';
let bottomIconNames = ['md-arrow-round-back',
    'md-arrow-round-forward',
    'md-refresh'
]
let bottomIconSize = [px2dp(35), px2dp(35), px2dp(35)];
export default class WebViewComp extends BaseComp {
    moveYThreshold = 5
    animationFlag = true


    componentWillMount() {
        this.setState({
            bottomInfoBarBottomValue: new Animated.Value(0),
            actions: [{title: "复制链接"}, {title: "在浏览器中打开"}, {title: "分享此内容"}]
        })
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let y = gestureState.dy;
                if (y > this.moveYThreshold && this.animationFlag) { //drag down
                    if (this.state.bottomInfoBarBottomValue === 0) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: px2dp(-56),
                        duration: 300
                    }).start(() => this.animationFlag = true);
                }
                if (y < -this.moveYThreshold && this.animationFlag) {  //drag up
                    if (this.state.bottomInfoBarBottomValue === px2dp(-56)) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: 0,
                        duration: 300
                    }).start(() => this.animationFlag = true);
                    // Animated.timing(this.state.toolbarTopValue, {
                    //     toValue: -theme.toolbar.height,
                    //     duration: 300
                    // }).start();
                }
            }
        });
    }

    actionSelected(position) {
        this._btnOnPressCallback(position + 4)
    }

    _renderError() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
            </View>
        );
    }

    renderChildeView() {
        return (
            <View style={wStyles.web}>
                <View style={wStyles.web} {...this._panResponder.panHandlers}>
                    <WebView
                        ref={(ref) => {
                            this.webView = ref
                        }}
                        automaticallyAdjustContentInsets={true}
                        style={wStyles.web}
                        source={{uri: this.props.rowData.url}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        renderLoading={() => <LoadingView/>}
                        startInLoadingState={true}
                        renderError={this._renderError.bind(this)}
                        onNavigationStateChange={this._onNavigationStateChange}
                        onError={() => CustToast.error("网页加载失败！")}
                    />
                </View>
                <Animated.View style={[wStyles.bottomTab, {height: this.state.bottomInfoBarBottomValue}]}>
                    {bottomIconNames.map((item, i) => {
                        return (
                            <View key={i} style={{flex: 1, alignItems: 'center',height:56,justifyContent:"center"}}>
                                <TouchableOpacity
                                    onPress={this._btnOnPressCallback.bind(this, i + 1)}
                                    activeOpacity={0.5}>
                                    <Icon name={item} color="#1e90ff" size={bottomIconSize[i]}/>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </Animated.View>
            </View>
        )
    }

    _onNavigationStateChange = (param) => {
        this.setState(param)
    }

    handleBack() {
        if (this.state.canGoBack && this.webView) {
            this.webView.goBack()
            return true;
        }
        return super.handleBack()
    }

    _btnOnPressCallback(id) {
        if (id === 1) {
            this.webView.goBack();
        } else if (id === 2) {
            this.webView.goForward();
        } else if (id === 3) {
            this.webView.reload();
        } else if (id === 4) {
            Clipboard.setString(this.props.rowData.url);
            CustToast.success("地址已经复制到剪贴板");
        } else if (id === 5) {
            Linking.canOpenURL(this.props.rowData.url).then(supported => {
                if (supported) {
                    Linking.openURL(this.props.rowData.url);
                } else {
                    CustToast.error("对不起,不能再浏览器中打开");
                }
            });
        } else if (id === 6) {
            let share = new ShareUtil();
            share.share(this.props.rowData.desc, this.props.rowData.url);
        }
    }

}

const wStyles = StyleSheet.create({
    web: {
        flex: 1
    },
    bottomTab: {
        position: 'absolute',
        bottom: 0,
        height: px2dp(56),
        width: Utils.size.width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"#E8E8E8",
        zIndex: 1
    }
})