import React, {Component} from 'react'
import BaseComp from './../../compents/BaseComp'
import {
    StyleSheet,
    View
} from 'react-native'
import Input from './../../compents/Input'
export default class AddContactComp extends BaseComp {
    componentWillMount() {
        this.setState({
            title: "添加联系人",
            lables: ["姓名", "电话", "邮箱", "类型"]
        })
    }

    renderChildeView() {
        return (
            <View>
                {
                    this.state.lables.map((item, index) =>
                        <Input leftText={item} placeholder={`${index==3?"请选择":"请输入"}${item}`} editable={index != 3}/>)
                }
            </View>
        )
    }
}