import React from 'react';
import {CustToast} from './AndroidComp';

export default class HttpUtils {
    constructor() {
        this.method = "GET"
    }

    bindUrl(url) {
        this.url = url
        return this
    }

    bindHeaders(headers) {
        this.headers = headers;
        return this
    }

    bindMethod(method) {
        this.method = method
        return this
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

    execute() {
        let bodyJson =null
        if ("GET"===this.method && this.params) {
            var names = "";
            for (let name in this.params) {
                names += name + "=" + this.params[name] + "&";
            }
            this.url += "?" + names.substring(0, names.length - 1)
        }else if(this.params && "POST"=== this.method){
            bodyJson=JSON.stringify(this.params)
        }
        let that = this
        fetch(this.url,
            {
                method: that.method,
                headers: that.headers,
                body: bodyJson
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (that.onSuccess)
                    that.onSuccess(responseJson.results)
                if (that.onFinish)
                    that.onFinish(true)
            })
            .catch((error) => {
                console.log(error.toString())
                CustToast.error(error.toString())
                if (that.onError)
                    that.onError(error)
                if (that.onFinish)
                    that.onFinish(false)
            })
    }
}