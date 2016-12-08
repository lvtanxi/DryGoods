import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    StatusBar,
    View,
    Image
} from 'react-native';

import Util from './compents/Utils'
import HomeComp from './views/HomeComp'
import BasicStyles from './styles/BasicStyles'
import {SplashScreen} from './compents/AndroidComp';

class LaunchView extends Component {
    state = {
        showImage: true
    }

    render() {
        return (
            this.state.showImage ?
                null :
                <LaunchComp />
        )
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                showImage: false
            })
            SplashScreen.hide();
        }, 1000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}
class LaunchComp extends Component {
    render() {
        let defaultName = "HomeComp"
        let defaultComponent = HomeComp
        return (
            <View style={BasicStyles.flex}>
                <StatusBar
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    animated={true}
                    hidden={false}/>
                <Navigator
                    initialRoute={{ name: defaultName, component: defaultComponent }}
                    configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                    renderScene={(route, navigator) => {
                      let Component = route.component
                      return <Component {...route.params} navigator={navigator} />
                    } }
                />
            </View>
        )
    }
}

const launchCompSt = StyleSheet.create({
    lau: {
        width: Util.size.width,
        height: Util.size.height
    },
})


AppRegistry.registerComponent('DryGoods', () => LaunchView);
