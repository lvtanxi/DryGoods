
import {Share} from 'react-native';
import {CustToast} from './AndroidComp';

export default class ShareUtil{

    share(content, url){
        Share.share({
            message: url,
            url: url,
            title: content
        }).then(this._showResult).catch((error)=>CustToast.error('分享失败'));
    }

    _showResult(result) {
    }
}