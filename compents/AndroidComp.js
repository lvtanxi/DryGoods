import React, {Component, PropTypes} from 'react'
import {requireNativeComponent, Image, NativeModules} from 'react-native';


export const CustToast = NativeModules.CustToast

export const SplashScreen = NativeModules.SplashScreen;

let iface = {
    name: 'ImageView',
    propTypes: {
        ...Image.propTypes,
        url: PropTypes.string,
    },
}
export const ImageView = requireNativeComponent('CustImage', iface)