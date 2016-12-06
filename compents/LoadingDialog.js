import React, {Component} from 'react';
import {
    View,
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import BaseDialog from './../compents/BaseDialog'
let animationT = 0;//定义一个全局变量来标示动画时间
let animationN = 50,//余弦函数的极值倍数，即最大偏移值范围为正负50
    animationM = 150;//余弦函数偏移值，使得极值在100-200之间
export default class LoadingDialog extends BaseDialog {

    componentWillMount() {
        this.setState({
            bounceValue: new Animated.Value(0),//这里设定了动画的输入初始值，注意不是数字0
        })
    }

    renderChildView() {
        return (
            <View style={styles.loadding}>
                <Animated.View style={[styles.line, {height: this.state.fV}]}></Animated.View>
                <Animated.View style={[styles.line, {height: this.state.sV}]}></Animated.View>
                <Animated.View style={[styles.line, {height: this.state.tV}]}></Animated.View>
                <Animated.View style={[styles.line, {height: this.state.foV}]}></Animated.View>
            </View>
        )
    }

    startAnim() {
        animationT = 0;
        this.anmin = requestAnimationFrame(this.loopAnimation);//组件加载之后就执行loopAnimation动画
    }

    loopAnimation = () => {
        var t0 = animationT, t1 = t0 + 0.5, t2 = t1 + 0.5, t3 = t2 + 0.5;//这里分别是四个动画的当前时间，依次加上了0.5的延迟
        var v1 = Number(Math.cos(t0).toFixed(2)) * animationN + animationM;//将cos函数的小数值只精确到小数点2位，提高运算效率
        var v2 = Number(Math.cos(t1).toFixed(2)) * animationN + animationM;
        var v3 = Number(Math.cos(t2).toFixed(2)) * animationN + animationM;
        var v4 = Number(Math.cos(t3).toFixed(2)) * animationN + animationM;
        this.setState({
            fV: v1,
            sV: v2,
            tV: v3,
            foV: v4
        });
        animationT += 0.35;//增加时间值，每次增值越大动画越快
        cancelAnimationFrame(this.anmin)
        this.anmin = requestAnimationFrame(this.loopAnimation);
    }

    cancelAnim() {
        cancelAnimationFrame(this.anmin)
    }

}
const styles = StyleSheet.create({
    loadding: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    line: {
        width: 10,
        height: 10,
        margin: 3,
        backgroundColor: "#EEE",
        borderRadius: 10
    }
})

