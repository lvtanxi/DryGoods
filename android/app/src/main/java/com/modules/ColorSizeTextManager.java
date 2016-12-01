package com.modules;

import android.view.View;
import android.widget.TextView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.sdsmdg.tastytoast.TastyToast;


public class ColorSizeTextManager extends SimpleViewManager {
    final String TESTName="TestText";
    @Override
    public String getName() {
        return TESTName;
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
        return new TextView(reactContext);
    }

    @ReactProp(name="FontColor")
    public void setFontColor(TextView v,int color){
        TastyToast.makeText(v.getContext(),"FontColor", TastyToast.LENGTH_SHORT, TastyToast.INFO);
    }

    @ReactProp(name="FontSize")
    public void setFontSize(TextView v,float size){
        v.setTextScaleX(size);
    }
}