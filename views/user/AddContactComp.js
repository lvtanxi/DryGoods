import React, {Component} from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import BaseComp from './../../compents/BaseComp'
import {
    StyleSheet,
    Picker,
    Text,
    View
} from 'react-native'
import Input from './../../compents/Input'
export default class AddContactComp extends BaseComp {
    mixins= [LinkedStateMixin]
    componentWillMount() {
        this.setState({
            title: "添加联系人",
            lables: ["姓名", "电话", "邮箱"],
            pickers:["董事长","总经理","主管","直接上级","同事"],
            language:"",
            message:""
        })
    }

    renderChildeView() {
        return (
            <View>
                {
                    this.state.lables.map((item, index) =>
                        <Input leftText={item} placeholder={`请输入${item}`} valueLink={this.linkState('message')}/>)
                }
                <View style={aStyles.login_label}>
                    <Text>职务</Text>
                    <Picker
                        style={aStyles.login_input}
                        selectedValue={this.state.language}
                        mode={"dropdown"}
                        prompt ={"dropdown"}
                        onValueChange={(lang) => this.setState({language: lang})}>
                        {
                            this.state.pickers.map(item=>
                                <Picker.Item label={item} value={item} />)
                        }
                    </Picker>
                </View>
            </View>
        )
    }
}
const aStyles = StyleSheet.create({
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
        height: 38,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius:10
    },
})