import React, {Component} from 'react'
import {
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native'

export default class LoadingView extends Component {
    render() {
        return (
            <View style={lStyles.loading}>
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }
}

const lStyles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }
})