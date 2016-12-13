import React, {Component} from 'react'

import {
    StyleSheet,
    ListView,
    TouchableOpacity,
    Platform,
    View,
    ActivityIndicatorIOS,
    ActivityIndicator,
    Text,
    RefreshControl,
} from 'react-native'
import WaitingView from './WaitingView'
import Utils from './Utils'

function MergeRecursive(obj1, obj2) {
    for (var p in obj2) {
        try {
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p])
            } else {
                obj1[p] = obj2[p]
            }
        } catch (e) {
            obj1[p] = obj2[p]
        }
    }
    return obj1
}

export default class RefreshListView extends Component {
    static defaultProps = {
        customStyles: {},
        initialListSize: 10,
        firstLoader: true,
        pagination: true,
        isRefreshing: true,
        refreshable: true,
        refreshableColors: undefined,
        refreshableProgressBackgroundColor: undefined,
        refreshableSize: undefined,
        refreshableTitle: undefined,
        refreshableTintColor: undefined,
        renderRefreshControl: null,
        headerView: null,
        sectionHeaderView: null,
        scrollEnabled: true,
        withSections: false,
        onFetch(page, callback, options) {
            callback([])
        },

        paginationFetchingView: null,
        paginationAllLoadedView: null,
        paginationWaitingView: null,
        emptyView: null,
        renderSeparator: null,
    }
    static propTypes = {
        customStyles: React.PropTypes.object,
        initialListSize: React.PropTypes.number,
        firstLoader: React.PropTypes.bool,
        pagination: React.PropTypes.bool,
        refreshable: React.PropTypes.bool,
        refreshableColors: React.PropTypes.array,
        refreshableProgressBackgroundColor: React.PropTypes.string,
        refreshableSize: React.PropTypes.string,
        refreshableTitle: React.PropTypes.string,
        refreshableTintColor: React.PropTypes.string,
        renderRefreshControl: React.PropTypes.func,
        headerView: React.PropTypes.func,
        sectionHeaderView: React.PropTypes.func,
        scrollEnabled: React.PropTypes.bool,
        withSections: React.PropTypes.bool,
        onFetch: React.PropTypes.func,

        paginationFetchingView: React.PropTypes.func,
        paginationAllLoadedView: React.PropTypes.func,
        paginationWaitingView: React.PropTypes.func,
        emptyView: React.PropTypes.func,
        renderSeparator: React.PropTypes.func,
    }

    state = {
        paginationStatus: 'firstLoad',
        isRefreshing: this.props.isRefreshing
    }

    _setPage = (page) => {
        this._page = page;
    }

    _getPage = () => {
        return this._page;
    }

    _setRows = (rows) => {
        this._rows = rows;
    }

    _getRows = () => {
        return this._rows;
    }


    paginationFetchingView = () => {
        if (this.props.paginationFetchingView) {
            return this.props.paginationFetchingView();
        }

        return (
            <View style={[rStyles.paginationView, this.props.customStyles.paginationView]}>
                {this._getSpinner()}
            </View>
        )
    }

    paginationAllLoadedView = () => {
        return (
            <WaitingView hitText="没有更多数据了..."/>
        )
    }

    paginationWaitingView = (paginateCallback) => {
        return (
            <WaitingView hitText="加载更多" callback={paginateCallback}/>
        )
    }


    headerView = () => {
        if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView) {
            return null;
        }
        return this.props.headerView();
    }

    emptyView = (refreshCallback) => {
        if (this.props.emptyView) {
            return this.props.emptyView(refreshCallback);
        }

        return (
            <View style={rStyles.defaultView}>
                <View style={[rStyles.defaultView, this.props.customStyles.defaultView]}>
                    <Text style={[rStyles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
                        亲，暂时没有数据喔！
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={refreshCallback}
                    >
                        <Text>
                            ↻
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderSeparator = () => {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator();
        }

        return (
            <View style={[rStyles.separator, this.props.customStyles.separator]}/>
        );
    }

    componentWillMount() {
        this._setPage(1);
        this._setRows([]);
        let ds = null;
        if (this.props.withSections === true) {
            ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
                this.setState({
                    dataSource: ds.cloneWithRowsAndSections(this._getRows()),
                })
        } else {
            ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
            this.setState({
                dataSource: ds.cloneWithRows(this._getRows()),
            })
        }
    }

    componentDidMount() {
        this.props.onFetch(this._getPage(), this._postRefresh, {firstLoad: true});
    }

    setNativeProps(props) {
        this.refs.listview.setNativeProps(props);
    }

    _refresh() {
        this._onRefresh({external: true});
    }

    _onRefresh = (options = {}) => {
        if (true) {
            this.setState({
                isRefreshing: true,
            });
            this._setPage(1);
            this.props.onFetch(this._getPage(), this._postRefresh, options);
        }
    }

    _postRefresh = (rows = [], options = {}) => {
        if (true) {
            this._updateRows(rows, options);
        }
    }

    _onPaginate = () => {
        if (this.state.paginationStatus === 'allLoaded') {
            return null
        } else if (!this.state.isRefreshing) {
            this.setState({
                paginationStatus: 'fetching',
            });
            this.props.onFetch(this._getPage() + 1, this._postPaginate, {});
        }
    }

    _postPaginate = (rows = [], options = {}) => {
        if (rows && rows.length > 0) {
            this._setPage(this._getPage() + 1);
            this.setState({
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
            });
        }
        var mergedRows = null;
        if (this.props.withSections === true) {
            mergedRows = MergeRecursive(this._getRows(), rows);
        } else {
            mergedRows = this._getRows().concat(rows);
        }
        this._updateRows(mergedRows, options);
    }

    _updateRows = (rows = [], options = {}) => {
        if (rows !== null) {
            this._setRows(rows);
            this.setState({
                dataSource: this.props.withSections === true ? this.state.dataSource.cloneWithRowsAndSections(rows) : this.state.dataSource.cloneWithRows(rows),
            })
        }
        this.setState({
            isRefreshing: false,
            paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
        });
    }

    _renderPaginationView = () => {
        if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true)) {
            return this.paginationFetchingView()
        } else if (this._getRows().length === 0 && this.state.paginationStatus !== 'firstLoad') {
            return this.emptyView(this._onRefresh)
        } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && (this.props.withSections === true || this._getRows().length > 0)) {
            return this.paginationWaitingView(this._onPaginate)
        } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
            return this.paginationAllLoadedView()
        } else {
            return null
        }
    }

    renderRefreshControl = () => {
        if (this.props.renderRefreshControl) {
            return this.props.renderRefreshControl({onRefresh: this._onRefresh})
        }
        return (
            <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefreshing}
                colors={this.props.refreshableColors}
                progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
                size={this.props.refreshableSize}
                tintColor={this.props.refreshableTintColor}
                title={this.props.refreshableTitle}
            />
        )
    }

    render() {
        return (
            <ListView
                ref="listview"
                dataSource={this.state.dataSource}
                renderRow={this.props.rowView}
                renderSectionHeader={this.props.sectionHeaderView}
                renderHeader={this.headerView}
                enableEmptySections={true}
                renderFooter={this._renderPaginationView}
                renderSeparator={this.renderSeparator}
                automaticallyAdjustContentInsets={false}
                scrollEnabled={this.props.scrollEnabled}
                canCancelContentTouches={true}
                refreshControl={this.props.refreshable === true ? this.renderRefreshControl() : null}

                {...this.props}

                style={this.props.style}
            />
        )
    }

    _getSpinner = () => {
        if (Platform.OS === 'android') {
            return (
                <ActivityIndicator
                    size="large"
                    {...this.props}
                />
            )
        } else {
            return (
                <ActivityIndicatorIOS
                    animating={true}
                    size="large"
                    {...this.props}
                />
            )
        }
    }
}
const rStyles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
    actionsLabel: {
        fontSize: 20,
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    defaultView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    }
})


