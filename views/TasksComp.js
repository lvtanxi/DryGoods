import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TouchableNativeFeedback,
    Alert,
    Text
} from 'react-native'

import BaseListComp from './../compents/BaseListComp'
import HttpUtils from './../compents/HttpUtils'
import {CustToast} from './../compents/AndroidComp'
import TaskDetailComp from './TaskDetailComp'
export default class TasksComp extends BaseListComp {
    componentWillMount() {
        this.setState({
            title: "任务列表",
            scrollEnable: true,
            hasIdOpen: false,
            actions: [{title: "新增", icon: require("./../imgs/new_add.png"), show: 'always'}]
        })
    }


    _onFetch(page = 1, callback, options) {
        new HttpUtils()
            .bindUrl("http://10.13.0.48:3000/task/list")
            .bindOnSuccess(datas => callback(datas, {
                allLoaded: datas.length != 10,
            }))
            .bindOnError(() => {
                callback()
            })
            .execute()
    }


    _renderRowView(rowData) {
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                     onPress={this.itemPress.bind(this, rowData)}
                                     onLongPress={this.itemLongPress.bind(this, rowData)}>
                <View style={tStyles.item}>
                    <Text>{rowData.message}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    actionSelected(position) {
        super.pushNavigatorBrief("TaskDetailComp", TaskDetailComp, {re: this.re})
    }

    itemLongPress(rowData) {
        Alert.alert(
            '温馨提示',
            "您确定要删除这条任务？",
            [
                {text: '取消'},
                {text: '确定', onPress: () => this.httpDelTask(rowData)},
            ]
        )
    }

    httpDelTask(task) {
        let that = this
        new HttpUtils()
            .psot()
            .bindUrl("http://10.13.0.48:3000/task/delete")
            .bindParams({"id": task._id})
            .bindOnSuccess(() => {
                CustToast.success("操作成功！")
                that.re()
            })
            .execute()
    }

    itemPress(rowData) {
        super.pushNavigatorBrief("TaskDetailComp", TaskDetailComp, {task: rowData, re: this.re})
    }

    re = () => {
        this._ListView._refresh()
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
