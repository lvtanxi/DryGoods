import React, {Component} from 'react'
import BaseComp from './../compents/BaseComp'
import {
    StyleSheet,
    TextInput,
    Image,
    TouchableNativeFeedback,
    DatePickerAndroid,
    Text,
    View
} from 'react-native'

import {CustToast} from './../compents/AndroidComp'
import LoadingDialog from './../compents/LoadingDialog'

let Task={
    createAt:"",
    message:""
}

export default class TaskDetailComp extends BaseComp {
    componentWillMount() {
        this.setState({
            title: this.props.task ? "任务详情" : "新增",
            edit: false,
            showLoading: false,
            height: 40,
            actions: [{title: this.props.task ? "编辑" : '完成', show: 'always'}]
        })
    }

    actionSelected(position) {
        this.setState({
            edit: !this.state.edit,
            actions: [{title: this.state.edit ? "编辑" : '保存', show: 'always'}],
        })
        CustToast.success("成功了喔！")
    }

    renderChildeView() {
        return (
            <View style={eStyles.container}>
                <View style={eStyles.lable}>
                    <Text >创建时间:</Text>
                </View>
                <View style={eStyles.lable_date}>
                    <Text>{this.state.createAt || this.props.task.createAt}</Text>
                    {this.state.edit ?
                        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                                                 onPress={this.chooseDate.bind(this)}>
                            <Image source={require("./../imgs/update.png")} style={eStyles.date_image}/>
                        </TouchableNativeFeedback> : null
                    }
                </View>
                <View style={eStyles.lable}>
                    <Text>任务内容:</Text>
                </View>
                <View>
                    <TextInput
                        onChangeText={(text)=>Task.message=text}
                        style={[eStyles.input, {height: this.state.height}]}
                        multiline={true}
                        maxLength={100}
                        underlineColorAndroid={"transparent"}
                        editable={this.state.edit}
                        placeholder={"请输入任务内容......."}
                        onChange={this.onChange.bind(this)}>
                        {this.props.task.message}
                    </TextInput>
                </View>
                <LoadingDialog ref={(v) => this.dialog = v}/>
            </View>
        )
    }




    onChange(event) {
        var height = 0;
        if (event.nativeEvent.contentSize.height > 40) {//此处是判断 是否大于我设置的input默认高度，如果大于则使用input的内容高度
            height = event.nativeEvent.contentSize.height;//内容高度
        } else {
            height = this.state.height;
        }
        this.setState({
            commentVal: event.nativeEvent.text,
            height: height
        })
    }

    chooseDate() {
        this.showDatePicker()
    }

    async showDatePicker() {
        try {
            let date = this.state.year ? new Date(this.state.year, this.state.month, this.state.day) : new Date()
            const {action, year, month, day} = await DatePickerAndroid.open({date: date})
            if (action === DatePickerAndroid.dateSetAction) {
                this.setState({
                    year: year,
                    month: month,
                    day: day,
                    createAt: `${year}-${month + 1}-${day}`
                })
                Task.createAt=this.state.createAt
            }
        } catch ({code, message}) {
            CustToast.error(message)
        }
    }
}
const eStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    lable: {
        height: 40,
        paddingLeft: 15,
        backgroundColor: "#EEE",
        justifyContent: "center",
        borderColor: "#E8E8E8",
        borderWidth: 0.5
    },
    lable_date: {
        height: 40,
        paddingLeft: 30,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        marginLeft: 25,
        marginRight: 15,
        marginTop: 10,
        borderColor: "#EEE",
        borderWidth: 0.5,
        borderRadius: 5
    },
    date_image: {
        width: 20,
        height: 20,
        top: 10,
        position: "absolute",
        right: 40
    }
})