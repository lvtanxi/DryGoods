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
import Icon from 'react-native-vector-icons/Ionicons';
 const [normal, selected] =["rgba(0, 0, 0, 0.2)","rgb(51,154,237)"];

export default class HomeComp extends BaseComp {
    componentWillMount() {
        this.state = {
            selectedTab: 'Android',
            showToolBar: false
        }
        Icon.getImageSource('logo-android', 50,normal).then((source) => this.setState({homeNormal: source}));
        Icon.getImageSource('logo-android', 50, selected).then((source) => this.setState({homeSelected: source}));
        Icon.getImageSource('logo-apple', 50,normal).then((source) => this.setState({compassNormal: source}));
        Icon.getImageSource('logo-apple', 50, selected).then((source) => this.setState({compassSelected: source}));
        Icon.getImageSource('md-list-box', 50,normal).then((source) => this.setState({moreNormal: source}));
        Icon.getImageSource('md-list-box', 50, selected).then((source) => this.setState({moreSelected: source}));
        Icon.getImageSource('md-calendar', 50,normal).then((source) => this.setState({collectionNormal: source}));
        Icon.getImageSource('md-calendar', 50, selected).then((source) => this.setState({collectionSelected: source}));
        Icon.getImageSource('md-search', 20, selected).then((source) => this.setState({search: source}));
    }

    renderChildeView() {
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <DrawerLayoutComp {...this.props}/>}>
                <View style={[styles.flex,styles.inputP]}>
                    <TouchableNativeFeedback onPress={this.toSearchComp.bind(this)}
                                             background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.inputView}>
                            <Image source={this.state.search} style={styles.tabBarItemIcon}/>
                            <Text style={styles.input}>搜索</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TabNavigator style={styles.bdTop}>
                        {this._renderItem(PageComp, 'Android', 'Android', this.state.homeNormal, this.state.homeSelected)}
                        {this._renderItem(PageComp, 'iOS', 'IOS', this.state.compassNormal, this.state.compassSelected)}
                        {this._renderItem(SearchComp, 'all', '今日', this.state.collectionNormal, this.state.collectionSelected)}
                        {this._renderItem(PageComp, 'xx', '更多', this.state.moreNormal, this.state.moreSelected)}
                    </TabNavigator>
                </View>
            </DrawerLayoutAndroid>
        )
    }

    toSearchComp() {
        super.pushNavigator({name: "SearchComp", component: SearchComp})
    }

    _renderItem(Component, tab, tabName, normalIcon, selectedIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tab}
                title={tabName}
                selectedTitleStyle={{color: selected}}
                renderIcon={() => <Image style={styles.tabBarItemIcon} source={normalIcon}/>}
                renderSelectedIcon={() => <Image style={[styles.tabBarItemIcon, {tintColor: selected}]}
                                                 source={selectedIcon}/>}
                onPress={() => this.setState({selectedTab: tab})}>
                {<Component navigator={this.props.navigator} url={`http://gank.io/api/data/${tab}/`} show={"hidder"}/>}
            </TabNavigator.Item>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bdTop: {
        borderTopWidth: 0.5,
        borderTopColor: "#EEE"
    },
    inputP:{
        backgroundColor: selected
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
        color: selected
    },
    tabBarItemIcon: {
        width: 20,
        height: 20
    },
    tabBarStyle: {
        height: 45,
        alignItems: 'center',
        paddingTop: 6
    }

});
