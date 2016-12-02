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
import BaseComp from './../compents/BaseComp'
import HttpUtils from './../compents/HttpUtils'
import LoadingView from './../compents/LoadingView'
import {ImageView, CustToast} from './../compents/AndroidComp'
import DateUtils from './../compents/DateUtils'
import utils from '../compents/Utils'
import ImageDialog from '../compents/ImageDialog'
import WebViewComp from './WebViewComp'


export default class SearchComp extends BaseComp {
    componentWillMount() {
        let sectionData = (dataBlob, sectionID) => dataBlob[sectionID]
        let rowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID]
        this.setState({
            dataSource: new ListView.DataSource({
                getSectionData: sectionData, getRowData: rowData,
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            showImageDialog: false,
            title: "按日期搜索",
            actions: [{title: '日期选择', icon: require("./../imgs/calendar.png"), show: 'always'}]
        })
    }

    renderChildeView() {
        return (
            this.state.loaded ?
                <View style={[sStyles.flex, sStyles.bg]}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        contentContainerStyle={sStyles.listStyle}
                        renderSectionHeader={this.renderSectionHeader}/>
                    {this.state.showImageDialog ?
                        <ImageDialog closeDialog={this.closeDialog} url={this.state.imageUrl}/> : null}
                </View>
                : <LoadingView />
        )
    }


    renderRow = (rowData, sectionId) => {
        if (sectionId == 2) {
            return (
                <TouchableOpacity activeOpacity={0.5} onPress={this.onItemPress.bind(this, rowData.url, true)}>
                    <ImageView url={rowData.url} style={[sStyles.imageView, {resizeMode: 'cover'}]}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={sStyles.itemViewStyle}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                             onPress={this.onItemPress.bind(this, rowData.url, false)}>
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

    closeDialog = () => {
        this.setState({
            showImageDialog: false
        })
    }

    renderSectionHeader = (sectionData) => {
        return (
            <View style={sStyles.section}>
                <Text style={sStyles.sectionData}>{sectionData}</Text>
            </View>
        )
    }

    onItemPress(tagUrl, isImage) {
        if (isImage) {
            this.setState({
                showImageDialog: true,
                imageUrl: tagUrl
            })
        } else {
            super.pushNavigator({
                name: 'WebViewComp',
                component: WebViewComp,
                params: {
                    url: tagUrl
                }
            })
        }
    }

    componentDidMount() {
        this.httpData(DateUtils.currentDate("yyyy/MM/dd"))
    }

    httpData(date){
        new HttpUtils()
            .bindUrl(`http://gank.io/api/day/${date}`)
            .bindOnSuccess(datas => this.loadDataFormJson(datas))
            .bindOnFinish(() => this.setState({
                loaded: true
            }))
            .execute()
    }

    loadDataFormJson(datas) {
        let dataBlob = {}, sectionIDs = [], rowIDs = [], titles = ["Android", "iOS", "福利"]

        titles.forEach((item, index) => {
            sectionIDs.push(index);
            //把组中内容放入dataBlob对象中
            dataBlob[index] = item;
            let news = datas[item]
            rowIDs[index] = []
            for (var j = 0; j < news.length; j++) {
                rowIDs[index].push(j);
                //把每一行中的内容放入dataBlob对象中
                dataBlob[index + ':' + j] = news[j];
            }
        })
        let that = this
        this.setState({
            dataSource: that.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        })
    }

    actionSelected() {
        this.showDatePicker()
    }

    async showDatePicker() {
        try {
            let date = this.state.year ? new Date(this.state.year, this.state.month, this.state.day) : new Date()
            const {action, year, month, day} = await DatePickerAndroid.open({date:date,maxDate: new Date()});
            if (action === DatePickerAndroid.dateSetAction) {
                this.setState({
                    year: year,
                    month: month,
                    day: day
                });
                this.httpData(`${year}/${month}/${day}`)
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
        borderColor: "#EEE",
        borderWidth: 0.5,
        borderRadius: 3
    },
    imageView: {
        width: utils.size.width / 2 - 20,
        height: 80,
        margin: 10
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