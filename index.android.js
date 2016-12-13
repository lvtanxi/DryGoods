import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    StatusBar,
    View,
    Image
} from 'react-native';

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
        }, 800)
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
                    backgroundColor="rgb(51,154,237)"
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



AppRegistry.registerComponent('DryGoods', () => LaunchView);
