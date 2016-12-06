import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Animated,
    TouchableOpacity,
    Easing,
    Modal,
    View
} from 'react-native';
import {ImageView} from './../compents/AndroidComp'
import BaseDialog from './../compents/BaseDialog'
import Utils from './../compents/Utils'
import ImageZoom from 'react-native-image-pan-zoom';

export default class ImageDialog extends BaseDialog {
    static propTypes = {
        url: React.PropTypes.string
    }

    componentWillMount() {
        this.setState({
            fadeAnim: new Animated.Value(0)
        })
    }

    renderChildView() {
        return (
            <Animated.View
                style={{
                    opacity: this.state.fadeAnim,
                    transform: [{
                        translateY: this.state.fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                        }),
                    }],
                }}>
                <ImageZoom cropWidth={Utils.size.width}
                           cropHeight={Utils.size.height}
                           imageWidth={300}
                           imageHeight={300}>
                    <ImageView url={this.props.url}
                               style={[iStyles.image, {resizeMode: 'cover'}]}/>
                </ImageZoom>
                <TouchableOpacity style={iStyles.close} onPress={this.dimss.bind(this)}>
                    <Image source={require("./../imgs/close.png")} style={iStyles.closeImage}/>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    startAnim() {
        if (this.state.fadeAnim._value == 1) {
            this.state.fadeAnim._value = 0;
        }
        Animated.timing(
            this.state.fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.bounce
            }
        ).start();
    }
}

const iStyles = StyleSheet.create({
    image: {
        width: 300,
        height: 300
    },
    close: {
        position: 'absolute',
        bottom: 100,
        left: (Utils.size.width - 20) / 2,
        width: 20,
        height: 20
    },

    closeImage: {
        width: 15,
        height: 15
    }
})