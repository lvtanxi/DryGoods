import React, {Component} from 'react'
import BaseComp from './../../compents/BaseComp'
import {CustToast} from './../../compents/AndroidComp'
import HttpUtils from './../../compents/HttpUtils'
import BasicStyles from './../../styles/BasicStyles'
import RegisterDialog from './RegisterDialog'
import ContactComp from './ContactComp'
import CheckBox from './../../compents/CheckBox'
import Input from './../../compents/Input'

import {
    StyleSheet,
    Image,
    Text,
    AsyncStorage,
    TouchableOpacity,
    Button,
    ART,
    View
} from 'react-native'
const AsyncStorageKey = "USER"
let user = {
    userName: "lvy",
    passWorld: "123456"
}
export default class LoginComp extends BaseComp {
    componentWillMount() {
        this.setState({
            title: "登录界面",
            userName: ""
        })
        /*    AsyncStorage.getItem(AsyncStorageKey)
         .then((value) =>this.setState({
         userName:value
         }))
         .done();*/
    }

    renderChildeView() {
        return (
            <View>
                <View style={BasicStyles.center_container}>
                    <Image source={require("./../../imgs/onepiece.jpg")} style={lStyles.img}/>
                </View>
                <View>
                    <Input leftText={"姓名"} placeholder={"请输入姓名"} defaultValue={this.state.userName}/>
                </View>
                <Input leftText={"密码"} placeholder={"请输入密码"} secureTextEntry={true}/>
                <View style={lStyles.login_btn}>
                    <Button
                        onPress={this.doLogin.bind(this)} title="登录"/>
                </View>
                <View>
                    <CheckBox
                        style={lStyles.box}
                        isChecked={true}
                        rightText={"记住姓名？"}
                        rightTextStyle={lStyles.bottm}
                        boxWidth={18}
                        onClick={this.onCheckChange.bind(this)}
                    />
                </View>
                <View style={lStyles.register}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.register.bind(this)}>
                        <Text style={lStyles.bottm}>还没有帐号？请点击注册吧！</Text>
                    </TouchableOpacity>
                </View>
                <RegisterDialog ref="dialog"/>
            </View>
        )

    }

    onCheckChange(isChecked) {
        this.setState({
            isChecked: isChecked
        })
    }

    register() {
        this.refs.dialog.show()
    }

    doLogin() {
        if (user.userName === "") {
            CustToast.warning("姓名不能为空喔！")
        } else if (user.passWorld === "") {
            CustToast.warning("密码不能为空喔！")
        } else {
            new HttpUtils()
                .psot()
                .bindUrl("http://10.13.0.48:3000/user/login")
                .bindParams(user)
                .bindOnSuccess(() => this.saveName())
                .execute(this.refs.LoadingDialog)
        }
    }

    saveName() {
        if (this.state.isChecked) {
            AsyncStorage.setItem(AsyncStorageKey, user.userName).done()
        } else {
            AsyncStorage.removeItem(AsyncStorageKey).done()
        }
        super.pushNavigatorBrief("ContactComp", ContactComp)
    }
}

const lStyles = StyleSheet.create({
    img: {
        width: 130,
        height: 130,
        marginTop: 10,
        borderRadius: 180
    },
    login_label: {
        flex: 1,
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20
    },
    login_input: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginLeft: 10,
    },
    login_btn: {
        marginLeft: 40,
        marginRight: 40,
        padding: 10,
    },
    register: {
        marginTop: 10,
        marginRight: 15,
        alignItems: "flex-end"
    },
    bottm: {
        fontSize: 12
    },
    box: {
        marginLeft: 20,
        marginTop: 5
    }
})