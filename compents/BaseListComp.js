import React, {Component} from 'react'
import BaseComp from './BaseComp'
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native'

import GiftedListView from 'react-native-gifted-listview'
import WaitingView from './WaitingView'

export default class BaseListComp extends BaseComp {

    renderChildeView() {
        return (
            <GiftedListView
                ref={(c) => this._ListView = c}
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch.bind(this)}
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

    _onError(page,callback){
        callback()
        if (this.state._ListView)
            this.state._ListView._setPage(page - 1)
    }

    _renderRowView(rowData) {

    }

    _onFetch(page = 1, callback, options) {

    }

    _paginationAllLoadedView = () => {
        return (
            <WaitingView hitText="没有更多数据了..."/>
        )
    }
    _paginationWaitingView = (paginateCallback) => {
        return (
            <WaitingView hitText="加载更多" callback={paginateCallback}/>
        )
    }

}