package com.modules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sdsmdg.tastytoast.TastyToast;


public class CustToast extends ReactContextBaseJavaModule {

    public CustToast(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "CustToast";
    }

    /**
     * 该方法用于给JavaScript进行调用
     * @param message
     */
    @ReactMethod
    public void error(String message) {
        show(message, TastyToast.ERROR);
    }
    /**
     * 该方法用于给JavaScript进行调用
     * @param message
     */
    @ReactMethod
    public void confusing(String message) {
        show(message, TastyToast.CONFUSING);
    }
    /**
     * 该方法用于给JavaScript进行调用
     * @param message
     */
    @ReactMethod
    public void success(String message) {
        show(message, TastyToast.SUCCESS);
    }

    /**
     * 该方法用于给JavaScript进行调用
     * @param message
     */
    @ReactMethod
    public void warning(String message) {
        show(message, TastyToast.WARNING);
    }
    /**
     * 该方法用于给JavaScript进行调用
     * @param message
     */
    @ReactMethod
    public void def(String message) {
        show(message, TastyToast.DEFAULT);
    }

    private void show(String message,int type){
        TastyToast.makeText(getReactApplicationContext(),message, TastyToast.LENGTH_SHORT, type);
    }
}
