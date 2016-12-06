import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    View
} from 'react-native';

import BaseComp from './../compents/BaseComp'
import TasksComp from './TasksComp'


export default class DrawerLayoutComp extends BaseComp {
    componentWillMount() {
        this.setState({
            showToolBar: false,
            messages: ["任务列表"]
        })
    }

    renderChildeView() {
        return (
            <View style={dStyles.flex}>
                <Text style={dStyles.header}>Node中间层的基本使用</Text>
                <ScrollView style={dStyles.scro}>
                    {this.state.messages.map(item => {
                        return (
                            <TouchableNativeFeedback onPress={this.itemPress.bind(this)} background={TouchableNativeFeedback.SelectableBackground()}>
                                <Text style={dStyles.scro_item}>{item}</Text>
                            </TouchableNativeFeedback>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
    itemPress(){
       super.pushNavigator({name:"TasksComp",component:TasksComp})
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
        fontWeight: "bold"
    },
    scro: {
        marginTop: 20
    },
    scro_item: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 25,
        paddingLeft: 25,
        borderColor: "#EEE",
        borderWidth: 0.5,
        borderRadius: 3
    }
})