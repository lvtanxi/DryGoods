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
import Icon from 'react-native-vector-icons/Ionicons';
export default class ImageDialog extends BaseDialog {
    static propTypes = {
        url: React.PropTypes.string
    }

    componentWillMount() {
        this.setState({
            fadeAnim: new Animated.Value(0)
        })
        Icon.getImageSource('md-close-circle', 25, "rgb(51,154,237)").then((source) => this.setState({circleClose: source}));
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
                <TouchableOpacity style={iStyles.close} onPress={this.dismiss.bind(this)}>
                    <Image source={this.state.circleClose} style={iStyles.closeImage}/>
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
        left: (Utils.size.width - 40) / 2,
        width: 40,
        height: 40
    },

    closeImage: {
        width: 25,
        height: 25
    }
})