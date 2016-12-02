import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Animated,
    Easing,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';
import {ImageView} from './../compents/AndroidComp'
import Utils from './../compents/Utils'
import ImageZoom from 'react-native-image-pan-zoom';
export default class ImageDialog extends Component {

    static propTypes = {
        closeDialog: React.PropTypes.func.isRequired,
        url: React.PropTypes.string
    }

    state = {
        fadeAnim: new Animated.Value(0)
    }

    render() {
        return (
            <View style={iStyles.confirmCont}>
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
                               cropHeight={Utils.size.height - 70}
                               imageWidth={300}
                               imageHeight={300}>
                        <ImageView url={this.props.url}
                                   style={[iStyles.image, {resizeMode: 'cover'}]}/>
                    </ImageZoom>
                </Animated.View>
                <TouchableOpacity style={iStyles.close} onPress={this.dismissDialog}>
                    <Image source={require("./../imgs/close.png")} style={iStyles.closeImage}/>
                </TouchableOpacity>
            </View>
        )
    }

    dismissDialog = () => {
        if (this.props.closeDialog)
            this.props.closeDialog()
    }

    componentDidMount() {
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
    confirmCont: {
        position: 'absolute',
        top: 0,
        width: Utils.size.width,
        height: Utils.size.height,
        alignItems: "center",
        backgroundColor: 'rgba(52,52,52,0.5)'
    },
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