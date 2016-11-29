import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ListViewComp from './../compents/ListViewComp';


export default class HomeComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'android',
        };
    }

    render() {

        var settingView = (

            <View style={[styles.flex, styles.center,{backgroundColor:'#ff000044'}]}>
                <Text style={{ fontSize: 22 }}>我是设置页面</Text>
            </View>
        )
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab ==="android"}
                    renderIcon={() => <Image style={styles.img} source={require("./../imgs/android_n.png")} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require("./../imgs/android_p.png")} />}
                    onPress={() => this.setState({ selectedTab: "android" })}>
                    <ListViewComp/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'ios'}
                    renderIcon={() => <Image style={styles.img} source={require("./../imgs/ios_n.png")} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require("./../imgs/ios_p.png")} />}
                    onPress={() => this.setState({ selectedTab: 'ios' })}>
                    {settingView}
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}

const styles = StyleSheet.create({

    flex: {
        flex: 1,
    },

    img: {
        width: 30,
        height: 30,
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',


    },



});
