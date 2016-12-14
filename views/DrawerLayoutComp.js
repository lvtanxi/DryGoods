import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';

import BaseComp from './../compents/BaseComp'
import ImageText from './../compents/ImageText'
import NavigationBar from './../compents/NavigationBar'
import TasksComp from './TasksComp'
import LoginComp from './user/LoginComp'


export default class DrawerLayoutComp extends BaseComp {
    componentWillMount() {
        this.setState({
            showToolBar: false,
            messages: [{
                title: "任务列表",
                name: "TasksComp",
                cont: TasksComp
            }, {
                title: "通讯录",
                name: "LoginComp",
                cont: LoginComp
            }]
        })
    }

    renderChildeView() {
        return (
            <View style={dStyles.flex}>
                <NavigationBar title={"Node的基本使用"}/>
                <ScrollView style={dStyles.scro}>
                    {this.state.messages.map((item, index) => {
                        return (
                            <ImageText icon={"ios-pricetags-outline"} title={item.title}
                                       onPress={this.itemPress.bind(this, item)} key={index} style={dStyles.scro_item}/>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    itemPress(item) {
        super.pushNavigatorBrief(item.title, item.cont)
    }
}

const dStyles = StyleSheet.create({
    flex: {
        flex: 1,
        alignItems: "center"
    },
    header: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff"
    },
    scro: {
        marginTop: 20
    },
    scro_item: {
        marginTop: 10,
        flexDirection:"row",
        paddingLeft:50,
        paddingRight:50,
        paddingBottom:10,
        paddingTop:10,
        borderColor: "#CCC",
        borderWidth: 0.5,
        borderRadius: 3
    }
})