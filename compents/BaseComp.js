import React, {Component} from 'react'
import LoadingDialog from './LoadingDialog'
import {
    BackAndroid,
    ToolbarAndroid,
    StyleSheet,
    View
} from 'react-native';

export default class BaseComp extends Component {
    state = {
        title: this.props.title,
        actions: [],
        showToolBar: true,
    }

    render() {
        let toolbar = this.state.showToolBar ? (
            <ToolbarAndroid
                ref={(c) => this._Toolbar = c}
                navIcon={require('./../imgs/back_new.png')}
                title={this.state.title}
                actions={this.state.actions}
                style={bStyles.toobar}
                titleColor={"#ffffff"}
                onActionSelected={this.actionSelected.bind(this)}
                onIconClicked={this.handleBack.bind(this)}/>
        ) : null

        return (
            <View style={bStyles.flex}>
                {toolbar}
                {this.renderChildeView()}
                <LoadingDialog ref="LoadingDialog"/>
            </View>
        )
    }

    renderChildeView() {
        return (
            <View></View>
        )
    }


    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack.bind(this))
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }

    /**
     *
     * @param params {name: title,component: tagComponent,params: {} }
     */
    pushNavigator(params) {
        let navigator = this.props.navigator
        if (navigator)
            navigator.push(params)
    }

    pushNavigatorBrief(title, tagComponent, param) {
        let navigator = this.props.navigator
        if (navigator)
            navigator.push({
                name:title,
                component: tagComponent,
                params: param
            })
    }


    actionSelected(position) {

    }

    handleBack() {
        let navigator = this.props.navigator
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop()
            return true
        }
        return false
    }
}
const bStyles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    toobar: {
        height: 50,
        backgroundColor: "rgb(51,154,237)",
        borderBottomWidth: 0.5,
        marginBottom: 0.5,
        borderBottomColor: "#CCC"
    }
})