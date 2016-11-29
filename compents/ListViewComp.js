import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';
import WaitingView from './WaitingView'


export default class ListViewComp extends Component {
    _onFetch(page = 1, callback, options) {
        setTimeout(() => {
            var rows = ['row ' + ((page - 1) * 3 + 1), 'row ' + ((page - 1) * 3 + 2), 'row ' + ((page - 1) * 3 + 3)];
            if (page === 3) {
                callback(rows, {
                    allLoaded: true, // the end of the list is reached
                });
            } else {
                callback(rows);
            }
        }, 1000); // simulating network fetching
    }


    /**
     * When a row is touched
     * @param {object} rowData Row data
     */
    _onItemPress = (rowData) => {
        console.log(rowData + ' pressed');
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {
        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.row} onPress={this._onItemPress(rowData)}>
                    <Text>{rowData}</Text>
                </View>
            </TouchableNativeFeedback>
        );
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
                rowView={this._renderRowView}
                onFetch={this._onFetch}
                firstLoader={true} // display a loader for the first fetching
                pagination={true} // enable infinite scrolling using touch to load more
                refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                withSections={false} // enable sections
                paginationWaitingView={this._paginationWaitingView}
                paginationAllLoadedView={this._paginationAllLoadedView}
                refreshableColors={['#ff0000', '#00ff00', '#0000ff']}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    navBar: {
        height: 64,
        backgroundColor: '#CCC'
    },
    row: {
        padding: 10,
        height: 44,
    },
})
