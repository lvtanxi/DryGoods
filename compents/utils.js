
import React from 'react';
import { PixelRatio, ToastAndroid } from 'react-native';
import Dimensions from 'Dimensions';

const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  fetch(url,callback) {
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        callback(responseData.results)
      })
      .catch(()=> {
        ToastAndroid.show("网络请求发生错误", ToastAndroid.SHORT)
      });
  },
  key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
};


export default Util;