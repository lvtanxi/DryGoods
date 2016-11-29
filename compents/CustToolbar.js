import React, {Component} from 'react'

import {
    View,
    BackAndroid,
    ToolbarAndroid
} from 'react-native';

 class CustToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            actions: [],
        }
    }

    actionSelected = (position) => {

    }
    handleBack = () => {
        let navigator = this.props.navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    }

    render() {

        return (
            <ToolbarAndroid
                navIcon={require('./../imags/ic_back.png')}
                title={this.props.title}
                actions={this.props.actions}
                style={{height: 56, backgroundColor: '#ffffff'}}
                onActionSelected={this.props.actionSelected}
                onIconClicked={this.handleBack}/>
        )
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }

}

