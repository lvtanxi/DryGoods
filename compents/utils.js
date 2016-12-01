import React from 'react';
import {PixelRatio, ToastAndroid} from 'react-native';
import Dimensions from 'Dimensions';

const Util = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    fetch(param) {
        fetch(param.url)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                if (param.onSucces)
                    param.onSucces(responseData.results)
            })
            .catch((error) => {
                if (param.onError)
                    param.onError(responseData.results)
                ToastAndroid.show("网络请求发生错误", ToastAndroid.SHORT)
            })
            .done();
    },
    key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
};


export default Util;