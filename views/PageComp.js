import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback,
    TouchableHighlight,
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview'
import {ImageView} from './../compents/AndroidComp'
import WaitingView from './../compents/WaitingView'
import HttpUtils from './../compents/HttpUtils'
import DateUtils from './../compents/DateUtils'
import WebViewComp from './WebViewComp'


export default class PageComp extends Component {
    _onFetch = (page = 1, callback, options) => {
        let that = this
        new HttpUtils()
            .bindUrl(this.props.url+ DateUtils.addDateStr(-(page - 1)))
            .bindOnSuccess(datas => callback(datas))
            .bindOnError(() => {
                callback()
                if (that.refs.myInput)
                    that.refs.myInput._setPage(page - 1)
            })
            .execute()
    }

    _onPress=(tagUrl)=> {
        let navigator = this.props.navigator
        if (navigator) {
            navigator.push({
                name: 'WebViewComp',
                component: WebViewComp,
                params:{
                    url:tagUrl
                }
            })
        }
    }

    _renderRowView = (rowData) => {
        let that = this;
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                                     onPress={()=>that._onPress(rowData.url)}>
                <View style={styles.row}>
                    <View>
                        <ImageView style={[styles.imageStyle,{resizeMode:'cover'}]}
                                   url={rowData.images ? rowData.images[0] : "bookmark"}/>
                    </View>
                    <View style={styles.right}>
                        <View style={styles.flex}>
                            <Text style={styles.desc} numberOfLines={2}>{rowData.desc}</Text>
                        </View>
                        <View>
                            <Text style={styles.author}>{rowData.who}</Text>
                            <Text style={styles.info}>{DateUtils.dateStr(rowData.createdAt)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    _paginationAllLoadedView = () => {
        return (
            <WaitingView hitText="加载完成了"/>
        )
    }
    _paginationWaitingView = (paginateCallback) => {
        return (
            <WaitingView hitText="加载更多" callback={paginateCallback}/>
        )
    }


    render() {
        return (
            <GiftedListView
                ref="myInput"
                rowView={this._renderRowView}
                onFetch={this._onFetch}
                firstLoader={true} // display a loader for the first fetching
                pagination={true} // enable infinite scrolling using touch to load more
                refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                withSections={false} // enable sections
                enabledEmptySections={false}
                paginationWaitingView={this._paginationWaitingView}
                paginationAllLoadedView={this._paginationAllLoadedView}
                refreshableColors={['#ff0000', '#00ff00', '#0000ff']}/>
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
        borderBottomColor: "#EEE",
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
    }
})
