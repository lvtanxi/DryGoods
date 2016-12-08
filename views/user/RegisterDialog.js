import React, {Component} from 'react'
import BaseDialog from './../../compents/BaseDialog'
import {CustToast} from './../../compents/AndroidComp'
import HttpUtils from './../../compents/HttpUtils'
import {
    StyleSheet,
    TextInput,
    Button,
    Text,
    View
} from 'react-native';
let user = {
    userName: "",
    passWorld: ""
}
export default class RegisterDialog extends BaseDialog {
    renderChildView() {
        return (
            <View style={rStyles.container}>
                <View style={rStyles.lable}>
                    <Text >姓名:</Text>
                </View>
                <View style={rStyles.lable_date}>
                    <TextInput
                        onChangeText={(text) => user.userName = text}
                        style={rStyles.input}
                        underlineColorAndroid={"transparent"}
                        placeholderTextColor={"#CCC"}
                        placeholder={"请输入姓名"}
                        selectionColor={"#73D1FF"}
                        defaultValue={user.userName}></TextInput>
                </View>
                <View style={rStyles.lable}>
                    <Text>密码:</Text>
                </View>
                <View style={rStyles.lable_date}>
                    <TextInput
                        onChangeText={(text) => user.passWorld = text}
                        style={rStyles.input}
                        secureTextEntry={true}
                        underlineColorAndroid={"transparent"}
                        placeholderTextColor={"#CCC"}
                        placeholder={"请输入密码"}
                        selectionColor={"#73D1FF"}
                        defaultValue={user.passWorld}>
                    </TextInput>
                </View>
                <View style={rStyles.btn_view}>
                    <Button style={rStyles.login_btn} textStyle={rStyles.textStyle}
                            onPress={this.doRegister.bind(this)} title="注册"/>
                </View>
            </View>
        )
    }

    doRegister() {
        if (user.userName === "") {
            CustToast.warning("姓名不能为空喔！")
        } else if (user.passWorld === "") {
            CustToast.warning("密码不能为空喔！")
        } else {
            new HttpUtils()
                .psot()
                .bindUrl("http://10.13.0.48:3000/user/register")
                .bindParams(user)
                .bindOnSuccess(() => {
                    CustToast.success("注册成功了，赶快去登录吧！")
                    super.dismiss()
                })
                .execute(this.refs.LoadingDialog)
        }
    }
}
const rStyles = StyleSheet.create({
    container: {
        width: 310,
        height: 300,
        borderRadius:5
    },
    lable: {
        height: 40,
        paddingLeft: 5,
        backgroundColor: "#e8e8e8",
        justifyContent: "center"
    },
    lable_date: {
        height: 40,
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    input: {
        height: 40,
        flex: 1,
        backgroundColor: "#ffffff"
    },
    btn_view:{
        borderTopWidth: 0.5,
        borderTopColor: "#EEE",
        backgroundColor: "#ffffff",
        paddingTop:10,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom:10
    },
    textStyle: {
        color: 'white'
    },
})