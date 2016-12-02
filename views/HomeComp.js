import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    DrawerLayoutAndroid,
    TouchableNativeFeedback,
    Image,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PageComp from './PageComp';
import DrawerLayoutComp from './DrawerLayoutComp';
import BaseComp from './../compents/BaseComp';
import SearchComp from './SearchComp';


export default class HomeComp extends BaseComp {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'android',
            showToolBar: false
        };
    }

    renderChildeView() {
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <DrawerLayoutComp/>}>
                <View style={styles.flex}>
                    <TouchableNativeFeedback onPress={this.toSearchComp.bind(this)} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.inputView} >
                            <Image source={require("./../imgs/search.png")}/>
                            <Text style={styles.input}>搜索</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TabNavigator style={styles.bdTop}>
                        <TabNavigator.Item
                            selected={this.state.selectedTab ==="android"}
                            title="Android"
                            renderIcon={() => <Image style={styles.img} source={require("./../imgs/android_n.png")} />}
                            renderSelectedIcon={() => <Image style={styles.img} source={require("./../imgs/android_p.png")} />}
                            onPress={() => this.setState({ selectedTab: "android" })}>
                            <PageComp url="http://gank.io/api/data/Android/" {...this.props}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'ios'}
                            renderIcon={() => <Image style={styles.img} source={require("./../imgs/ios_n.png")} />}
                            renderSelectedIcon={() => <Image style={styles.img} source={require("./../imgs/ios_p.png")} />}
                            title="IOS"
                            onPress={() => this.setState({ selectedTab: 'ios' })}>
                            <PageComp url="http://gank.io/api/data/iOS/" {...this.props}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            title="全部"
                            selected={this.state.selectedTab === 'all'}
                            renderIcon={() => <Image style={styles.img} source={require("./../imgs/all_n.png")} />}
                            renderSelectedIcon={() => <Image style={styles.img} source={require("./../imgs/all_p.png")} />}
                            onPress={() => this.setState({ selectedTab: 'all' })}>
                            <PageComp url="http://gank.io/api/data/all/" {...this.props}/>
                        </TabNavigator.Item>
                    </TabNavigator>
                </View>
            </DrawerLayoutAndroid>
        )
    }

    toSearchComp() {
        super.pushNavigator({name: "SearchComp", component: SearchComp})
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    img: {
        width: 30,
        height: 30,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bdTop: {
        borderTopWidth: 0.5,
        borderTopColor: "#EEE"
    },
    inputView: {
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#EEE",
        borderRadius: 10,
        borderWidth: 0.5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor:"#EEE"
    },
    input: {
        paddingLeft: 5,
        fontSize: 12,
        color: "#BBB"
    }

});
