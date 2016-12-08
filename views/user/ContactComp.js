import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import BaseListComp from './../../compents/BaseListComp'
import HttpUtils from './../../compents/HttpUtils'
import AddContactComp from './AddContactComp'

export default class ContactComp extends BaseListComp {
    componentWillMount() {
        this.setState({
            title: "联系人",
            actions: [{title: "新增", icon: require("./../../imgs/new_add.png"), show: 'always'}]
        })
    }

    _onFetch(page = 1, callback, options) {
        new HttpUtils()
            .bindUrl("http://10.13.0.48:3000/contact/contacts")
            .bindOnSuccess(datas => callback(datas))
            .bindOnError(() => {
                super._onError(page, callback)
            })
            .execute()
    }


    _renderRowView(rowData) {
        return (
            <View>
                <Text>测试</Text>
            </View>
        )
    }

    actionSelected(){
        super.pushNavigatorBrief("AddContactComp",AddContactComp)
    }

}

const cStyles = StyleSheet.create({

})
