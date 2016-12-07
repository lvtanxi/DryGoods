import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({
    flex: {
        flex: 1
    },
    bg:{
        height:55,
        backgroundColor:"#ffffff",
        borderBottomWidth:0.3,
        borderBottomColor:"#CCC"
    },
    // 水平容器
    row_container: {
        flex: 1,
        flexDirection: 'row',
    },
    // 垂直容器
    column_container: {
        flex: 1,
        flexDirection: 'column',
    },
    // 垂直居中容器
    column_center_container: {
        justifyContent: 'center',
    },
    // 居中容器
    center_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 水平居中容器
    row_center_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 分割线
    call_border: {
        backgroundColor: 'black',
        height: 1,
    },
    boder:{
        borderColor: "#EEE",
        borderWidth:0.5,
        borderRadius: 5
    }
})