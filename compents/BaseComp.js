import React, {Component} from 'react'
import LoadingDialog from './LoadingDialog'
import NavigationBar from './NavigationBar'
import {
    BackAndroid,
    ToolbarAndroid,
    StyleSheet,
    View
} from 'react-native';

export default class BaseComp extends Component {
    state = {
        title: this.props.title,
        showToolBar: true,
        rightBtn: {}
    }

    render() {

        return (
            <View style={bStyles.flex}>
                {this.renderNavigationBar()}
                {this.renderChildeView()}
                <LoadingDialog ref="LoadingDialog"/>
            </View>
        )
    }

    renderNavigationBar() {
        return (
            this.state.showToolBar ?
                <NavigationBar title={this.state.title}
                               leftBtnIcon={"md-arrow-back"}
                               leftBtnPress={this.handleBack.bind(this)}
                               rightBtnIcon={this.state.rightBtn.rightBtnIcon}
                               rightBtnText={this.state.rightBtn.rightBtnText}
                               rightBtnPress={this.navigationBarOnPress.bind(this)}/> : null
        )
    }

    renderChildeView() {
        return (
            <View></View>
        )
    }

    navigationBarOnPress() {

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
        this.pushNavigator({name: title, component: tagComponent, params: param})
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