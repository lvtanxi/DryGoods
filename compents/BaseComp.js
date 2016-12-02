import React, {Component} from 'react'
import {
    AppRegistry,
    BackAndroid,
    ToolbarAndroid,
    StyleSheet,
    View
} from 'react-native';

export default class BaseComp extends Component {
    state = {
        title: this.props.title,
        actions: [],
        showstatusBar: false,
        showToolBar: true,
        statusBarColor: "rgba(0, 0, 0, 0.2)",
        animated: true,
        hidden: false
    }

    render() {
        let statusBar = this.state.showstatusBar ? (
            <StatusBar
                ref="StatusBar"
                backgroundColor={this.state.statusBarColor}
                animated={this.state.animated}
                hidden={this.state.hidden}/>
        ) : null
        let toolbar = this.state.showToolBar ? (
            <ToolbarAndroid
                ref="ToolbarAndroid"
                navIcon={require('./../imgs/back.png')}
                title={this.state.title}
                actions={this.state.actions}
                style={bStyles.toobar}
                onActionSelected={this.actionSelected.bind(this)}
                onIconClicked={this.handleBack.bind(this)}/>
        ) : null

        return (
            <View style={bStyles.flex}>
                {statusBar}
                {toolbar}
                {this.renderChildeView()}
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
    flex:{
        flex:1
    },
    toobar:{
        height:50,
        backgroundColor:"#ffffff",
        borderBottomWidth: 0.5,
        marginBottom:0.5,
        borderBottomColor: "#CCC"
    }
  })