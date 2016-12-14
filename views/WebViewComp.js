import React, {Component, PropTypes} from 'react'
import {
    AppRegistry,
    StyleSheet,
    WebView,
    PanResponder,
    Image,
    TouchableNativeFeedback,
    Alert,
    Linking,
    Animated,
    Text,
    Clipboard,
    View
} from 'react-native';
import BaseComp from './../compents/BaseComp'
import Utils from './../compents/Utils'
import ShareUtil from './../compents/ShareUtil'
import {CustToast} from './../compents/AndroidComp'
import LoadingView from './../compents/LoadingView'
import BottomSheetDialog from './../compents/BottomSheetDialog'
import Icon from 'react-native-vector-icons/Ionicons';
let bottomIconNames = ['md-arrow-back',
    'md-arrow-forward',
    'md-refresh'
]
let bottomActions = [
    {title: '查看完整标题', icon: "ios-paper-outline"},
    {title: '复制链接', icon: "ios-clipboard-outline"},
    {title: '在浏览器中打开', icon: "ios-open-outline"},
    {title: '分享此内容', icon: "ios-share-outline"}
]


let bottomIconSize = [30, 30, (35)];
export default class WebViewComp extends BaseComp {
    moveYThreshold = 5
    animationFlag = true


    componentWillMount() {
        this.setState({
            bottomInfoBarBottomValue: new Animated.Value(0),
            rightBtn: {rightBtnIcon: "md-more"},
            showMoreContent: false
        })
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let y = gestureState.dy;
                if (y > this.moveYThreshold && this.animationFlag) { //drag down
                    if (this.state.bottomInfoBarBottomValue === 0) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: -50,
                        duration: 300
                    }).start(() => this.animationFlag = true);
                }
                if (y < -this.moveYThreshold && this.animationFlag) {  //drag up
                    if (this.state.bottomInfoBarBottomValue ===-50) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: 0,
                        duration: 300
                    }).start(() => this.animationFlag = true);
                }
            }
        });
    }

    navigationBarOnPress() {
        this.refs.sheetDialog.show()
    }


    _renderError() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1}}>
                <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
            </View>
        )
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
                            <View key={i} style={{flex: 1, alignItems: 'center', height: 50, justifyContent: "center"}}>
                                <TouchableNativeFeedback
                                    onPress={this._btnOnPressCallback.bind(this, i + 4)}
                                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                                    <Icon name={item} color="#1e90ff" size={bottomIconSize[i]}/>
                                </TouchableNativeFeedback>
                            </View>
                        )
                    })}
                </Animated.View>
                <BottomSheetDialog ref="sheetDialog" actions={bottomActions}
                                   onPress={this._btnOnPressCallback.bind(this)}/>
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

    _btnOnPressCallback(position) {
        if (position === 0) {
            Alert.alert("完成的标题如下：", this.props.rowData.desc, [{
                text: '好的', onPress: () => {
                }
            }]);
        } else if (position === 1) {
            Clipboard.setString(this.props.rowData.url);
            CustToast.success("地址已经复制到剪贴板");
        } else if (position === 2) {
            Linking.canOpenURL(this.props.rowData.url).then(supported => {
                if (supported) {
                    Linking.openURL(this.props.rowData.url);
                } else {
                    CustToast.error("对不起,不能再浏览器中打开");
                }
            });
        } else if (position === 3) {
            let share = new ShareUtil();
            share.share(this.props.rowData.desc, this.props.rowData.url);
        } else if (position === 4) {
            this.webView.goBack();
        } else if (position === 5) {
            this.webView.goForward();
        } else if (position === 6) {
            this.webView.reload();
        } else {
            if (this.state.showMoreContent)
                this.navigationBarOnPress()
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
        height: 50,
        width: Utils.size.width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F8F8FF",
        borderTopWidth: 0.5,
        borderTopColor: "#EEE",
        zIndex: 1
    }
})