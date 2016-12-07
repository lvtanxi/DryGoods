import React, {Component} from 'react'
import BaseComp from './../../compents/BaseComp'
import {CustToast} from './../../compents/AndroidComp'
import HttpUtils from './../../compents/HttpUtils'
import BasicStyles from './../../styles/BasicStyles'
import Button from 'apsl-react-native-button'
import RegisterDialog from './RegisterDialog'

import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

let user = {
    userName: "",
    passWorld: ""
}
export default class LoginComp extends BaseComp {
    componentWillMount() {
        this.setState({
            title: "登录界面"
        })
    }

    renderChildeView() {
        return (
            <View>
                <View style={BasicStyles.center_container}>
                    <Image source={require("./../../imgs/onepiece.jpg")} style={lStyles.img}/>
                </View>
                <View style={lStyles.login_label}>
                    <Text>姓名:</Text>
                    <TextInput style={[lStyles.login_input, BasicStyles.boder]} underlineColorAndroid={"transparent"}
                               placeholderTextColor={"#CCC"} placeholder={"请输入姓名"} selectionColor={"#73D1FF"}
                               onChangeText={(text) => user.userName = text}/>
                </View>
                <View style={lStyles.login_label}>
                    <Text>密码:</Text>
                    <TextInput style={[lStyles.login_input, BasicStyles.boder]} underlineColorAndroid={"transparent"}
                               placeholderTextColor={"#CCC"} placeholder={"请输入密码"} selectionColor={"#73D1FF"}
                               secureTextEntry={true} onChangeText={(text) => user.passWorld = text}/>
                </View>
                <Button style={lStyles.login_btn} textStyle={lStyles.textStyle}
                        onPress={this.doLogin.bind(this)}>登录</Button>
                <View style={lStyles.register}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.register.bind(this)}>
                    <Text style={lStyles.bottm}>还没有帐号？请点击注册吧！</Text>
                    </TouchableOpacity>
                </View>
                <RegisterDialog ref="dialog"/>
            </View>
        )
    }

    register(){
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
                .bindOnSuccess(() => CustToast.success("成功了"))
                .execute(this.refs.LoadingDialog)
        }
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
        marginTop: 10,
        marginLeft: 50,
        marginRight: 50,
        borderColor: '#27ae60',
        backgroundColor: '#2ecc71'
    },
    textStyle: {
        color: 'white'
    },
    register:{
        marginTop:10,
        marginRight:15,
        alignItems:"flex-end"
    },
    bottm: {
        fontSize:12
    }
})