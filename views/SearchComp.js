import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    ActivityIndicator,
    ListView,
    TouchableNativeFeedback,
    TouchableOpacity,
    DatePickerAndroid,
    Text,
    View
} from 'react-native';
import BaseListComp from './../compents/BaseListComp'
import HttpUtils from './../compents/HttpUtils'
import {ImageView, CustToast} from './../compents/AndroidComp'
import DateUtils from './../compents/DateUtils'
import utils from '../compents/Utils'
import ImageDialog from '../compents/ImageDialog'
import WebViewComp from './WebViewComp'


export default class SearchComp extends BaseListComp {

    componentWillMount() {
        this.setState({
            showImageDialog: false,
            showToolBar: this.props.show ? false : true,
            title: "按日期搜索",
            rightBtn: {rightBtnIcon: "md-calendar"},
            withSections: true,
            contentContainerStyle: sStyles.listStyle
        })
        this.date = DateUtils.preWoekDay()
    }

    renderOtherChildeView() {
        return (
            <ImageDialog url={this.state.imageUrl} ref="dialog"/>
        )
    }


    _renderRowView(rowData, sectionId) {
        if (sectionId === "福利") {
            return (
               <View style={[sStyles.itemViewStyle,{justifyContent:"center", alignItems:"center"}]}>
                   <TouchableOpacity activeOpacity={0.5} onPress={this.onItemPress.bind(this, rowData, true)}>
                       <ImageView url={rowData.url} style={[sStyles.imageView, {resizeMode: 'cover'}]}/>
                   </TouchableOpacity>
               </View>
            )
        } else {
            return (
                <View style={sStyles.itemViewStyle}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                             onPress={this.onItemPress.bind(this, rowData, false)}>
                        <View style={sStyles.itemView}>
                            <View style={sStyles.flex}>
                                <Text style={sStyles.desc} numberOfLines={2}>{rowData.desc}</Text>
                            </View>
                            <View>
                                <Text style={sStyles.author}>{rowData.who}</Text>
                                <Text style={sStyles.info}>{DateUtils.dateStr(rowData.createdAt)}</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            )
        }
    }


    _renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={sStyles.section} key={sectionID}>
                <Text style={sStyles.sectionData}>{sectionID}</Text>
            </View>
        )
    }

    onItemPress(rowData, isImage) {
        if (isImage) {
            this.setState({
                imageUrl: rowData.url
            })
            if (this.refs.dialog)
                this.refs.dialog.show()
        } else {
            super.pushNavigator({
                name: 'WebViewComp',
                component: WebViewComp,
                params: {
                    rowData: rowData
                }
            })
        }
    }


    _onFetch(page = 1, endRefresh, options) {
        if (this.date === null)
            this.date = DateUtils.preWoekDay()
        new HttpUtils()
            .bindUrl(`http://gank.io/api/day/${ this.date}`)
            .bindOnSuccess(datas => this.loadDataFormJson(datas, endRefresh))
            .bindOnError(error => endRefresh())
            .execute()
        this.date = null
    }

    loadDataFormJson(datas, endRefresh) {

        let rows = {}, titles = ["Android", "iOS", "福利"]
        titles.forEach(item => {
            rows[item] = datas[item]
        })
        endRefresh(rows, {allLoaded: true});
    }

    navigationBarOnPress() {
        this.showDatePicker()
    }

    async showDatePicker() {
        try {
            let date = this.state.year ? new Date(this.state.year, this.state.month, this.state.day) : new Date()
            const {action, year, month, day} = await DatePickerAndroid.open({date: date, maxDate: new Date()});
            if (action === DatePickerAndroid.dateSetAction) {
                this.setState({
                    year: year,
                    month: month,
                    day: day
                });
                this.date = `${year}/${month + 1}/${day}`
                this._ListView._refresh()
            }
        } catch ({code, message}) {
            CustToast.error(message);
        }
    }
}
const sStyles = StyleSheet.create({
    flex: {
        flex: 1
    },
    bg: {
        backgroundColor: "#fff"
    },
    listStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemViewStyle: {
        width: utils.size.width / 2,
        height: 100,
    },
    itemView: {
        flex: 1,
        margin: 5,
        padding: 5,
        borderColor: "#CCC",
        borderWidth: 0.5,
        borderRadius: 3,
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {height: 2, width: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    imageView: {
        width: utils.size.width / 2 - 20,
        height: 80
    },
    section: {
        width: utils.size.width,
        backgroundColor: "#EEE",
        justifyContent: "center",
        height: 40,
    },
    desc: {
        fontSize: 12,
        color: "black"
    },
    info: {
        fontSize: 12,
        color: "#999999"
    },
    sectionData: {
        marginLeft: 15,
        fontWeight: "bold",
        fontSize: 14
    },
    author: {
        fontSize: 10,
        color: "black"
    }
})