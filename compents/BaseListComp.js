import React, {Component} from 'react'
import BaseComp from './BaseComp'
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native'

import RefreshListView from './RefreshListView'
import BasicStyles from './../styles/BasicStyles'

export default class BaseListComp extends BaseComp {

    componentWillMount() {
        this.setState({
            withSections:false,
            contentContainerStyle:null
        })
    }

    renderChildeView() {
        return (
            <View style={BasicStyles.flex}>
                <RefreshListView
                    ref={(c) => this._ListView = c}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    firstLoader={true}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    pagination={true}
                    refreshable={true}
                    contentContainerStyle={this.state.contentContainerStyle}
                    withSections={this.state.withSections}
                    refreshableColors={['#ff0000', '#00ff00', '#0000ff']}/>
                {this.renderOtherChildeView()}
            </View>
        )
    }


    renderOtherChildeView(){

    }


    _renderRowView(rowData) {

    }
 /*   _onEndReached(){
        this._ListView._onPaginate()
    }*/

    _onFetch(page = 1, endRefresh, options) {

    }

    _renderSectionHeader() {
        return null
    }

}