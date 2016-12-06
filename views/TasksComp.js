import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TouchableNativeFeedback,
    Text
} from 'react-native'

import BaseListComp from './../compents/BaseListComp'
import HttpUtils from './../compents/HttpUtils'
import TaskDetailComp from './TaskDetailComp'
export default class TasksComp extends BaseListComp {
    componentWillMount() {
        this.setState({
            title: "任务列表",
            scrollEnable: true,
            hasIdOpen: false
        })
    }

    _onFetch(page = 1, callback, options) {
        new HttpUtils()
            .bindUrl("http://10.13.0.48:3000/tasks")
            .bindOnSuccess(datas => callback(datas, {
                allLoaded: page == 2,
            }))
            .bindOnError(() => {
                super._onError(page, callback)
            })
            .execute()
    }


    _renderRowView(rowData) {
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                     onPress={this.itemPress.bind(this, rowData)}>
                <View style={tStyles.item}>
                    <Text>{rowData.message}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    itemPress(rowData) {
        super.pushNavigatorBrief("TaskDetailComp", TaskDetailComp, {task: rowData})
    }
}

const tStyles = StyleSheet.create({
    item: {
        height: 54,
        backgroundColor: "#ffffff",
        borderBottomWidth: 0.5,
        borderBottomColor: "#EEE",
        justifyContent: "center",
        alignItems: "center"
    }
})
