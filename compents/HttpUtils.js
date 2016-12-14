import React from 'react';
import {CustToast} from './AndroidComp';

export default class HttpUtils {
    constructor() {
        this.method = "GET"
        this.headers = new Headers()
    }

    bindUrl(url) {
        this.url = url
        return this
    }


    bindHeaders(headers) {
        this.headers = headers;
        return this
    }

    psot() {
        this.method = "POST"
        return this;
    }


    bindParams(params) {
        this.params = params
        return this
    }

    bindOnSuccess(onSuccess) {
        this.onSuccess = onSuccess
        return this
    }

    bindOnError(onError) {
        this.onError = onError
        return this;
    }

    bindOnFinish(onFinish) {
        this.onFinish = onFinish
        return this;
    }

    dismissDialog(success) {
        if (this.dialog && this.dialog.isShow())
            this.dialog.dismiss()
        this.onFinish && this.onFinish(success)
    }

    showDialog(dialog) {
        this.dialog = dialog
        if (this.dialog && !this.dialog.isShow())
            this.dialog.show()
    }

    execute(dialog) {
        this.handlerParam(dialog)
        let that = this
        fetch(this.url, {
            method: that.method,
            headers: that.headers,
            body: that.bodyJson
        })
            .then((response) => {
                if (response.ok)
                    return response.json();
                throw new Error("服务器异常")
            })
            .then((responseJson) => {
                if (responseJson.code && responseJson.code !== 200)
                    throw new Error(responseJson.message)
                that.onSuccess && that.onSuccess(responseJson.results)
                that.dismissDialog(true)
            })
            .catch((error) => {
                console.log(error.toString())
                CustToast.error(error.message)
                that.onError && that.onError(error)
                that.dismissDialog(false)
            }).done()
    }

    handlerParam(dialog) {
        this.showDialog(dialog)
        if ("GET" === this.method && this.params) {
            let paramsArray = [];
            Object.keys(this.params).forEach(key => paramsArray.push(key + '=' + this.params[key]))
            if (this.url.search(/\?/) === -1) {
                this.url += '?' + paramsArray.join('&')
            } else {
                this.url += '&' + paramsArray.join('&')
            }
        } else if (this.params && "POST" === this.method) {
            this.headers.append('Accept', 'application/json')
            this.headers.append('Content-Type', 'application/json')
            this.bodyJson = JSON.stringify(this.params)
        }
    }
}