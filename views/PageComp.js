import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback,
    TouchableHighlight,
} from 'react-native';

import {ImageView} from './../compents/AndroidComp'
import HttpUtils from './../compents/HttpUtils'
import ImageText from './../compents/ImageText'
import BaseListComp from './../compents/BaseListComp'
import DateUtils from './../compents/DateUtils'
import WebViewComp from './WebViewComp'



export default class PageComp extends BaseListComp {
    componentWillMount() {
        this.state = {
            selectedTab: 'android',
            showToolBar: false
        }
    }

    _onFetch(page = 1, endRefresh, options) {
        new HttpUtils()
            .bindUrl(this.props.url + DateUtils.addDateStr(-(page - 1)))
            .bindOnSuccess(datas => endRefresh(datas))
            .bindOnError(() => {
                endRefresh()
            })
            .execute()
    }

    _onPress = (rowData) => {
        let navigator = this.props.navigator
        if (navigator) {
            navigator.push({
                name: 'WebViewComp',
                component: WebViewComp,
                params: {
                    rowData: rowData
                }
            })
        }
    }

    _renderRowView(rowData) {
        let that = this;
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                     onPress={() => that._onPress(rowData)}>
                <View style={styles.row}>
                    <View>
                        <ImageView style={[styles.imageStyle, {resizeMode: 'cover'}]}
                                   url={rowData.images ? rowData.images[0] : "bookmark"}/>
                    </View>
                    <View style={styles.right}>
                        <View style={styles.flex}>
                            <Text style={styles.desc} numberOfLines={2}>{rowData.desc}</Text>
                        </View>
                        <View>
                            <ImageText title={rowData.who}
                                       icon={"ios-create-outline"}
                                       textStyle={styles.author}
                                       iconSize={15}
                                       rippleColor={"#ffffff"}
                                       style={styles.dateView}/>
                            <ImageText title={DateUtils.dateStr(rowData.createdAt)}
                                       icon={"ios-ice-cream-outline"}
                                       iconSize={15}
                                       rippleColor={"#ffffff"}
                                       textStyle={styles.info}
                                       style={styles.dateView}/>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    row: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#CCC",
        backgroundColor: "#FFF"
    },
    right: {
        flex: 1,
        marginLeft: 10,
        flexDirection: "column",
        height: 80,
    },
    desc: {
        fontSize: 14,
        color: "black"
    },
    info: {
        fontSize: 12,
        color: "#999999"
    },
    flex: {
        flex: 1
    },
    author: {
        fontSize: 12,
        color: "black"
    },
    dateView:{
        height:20,
        flexDirection: 'row',
        alignItems:"center"
    }
})
