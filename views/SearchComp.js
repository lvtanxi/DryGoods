import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    ActivityIndicator,
    ListView,
    Text,
    View
} from 'react-native';
import BaseComp from './../compents/BaseComp'
import HttpUtils from './../compents/HttpUtils'

let sectionData = (dataBlob, sectionID) => dataBlob[sectionID]
let rowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID]

export default class SearchComp extends BaseComp {

    constructor(props) {
        super(props)
        this.setState({
            dataSource: new ListView.DataSource({
                getSectionData: sectionData, getRowData: rowData,
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            })
        })
    }

    renderChildeView() {
        return (
            <View style={sStyles.flex}>
             {/*   {   this.state.loaded ?
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderSectionHeader={this.renderSectionHeader.bind(this)}/>
                    : <ActivityIndicator size={"large"}/>
                }*/}
            </View>
        )
    }

    //每一行数据
    renderRow = (rowData) => {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View >
                    <Image source={{uri:rowData.icon}}/>
                    <Text style={{marginLeft: 5}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    //组数据
    renderSectionHeader = (sectionData) => {
        return (
            <View >
                <Text style={{color: 'red',marginLeft:5}}>{sectionData}</Text>
            </View>
        )
    }

    componentDidMount() {
        new HttpUtils()
            .bindUrl("http://gank.io/api/day/2015/08/07")
            .bindOnSuccess(datas =>console.log(datas))
            .bindOnFinish(() => this.setState({
                loaded: true
            }))
            .execute()
    }

    loadDataFormJson(jsonData){
        console.log(jsonData.length)
     /*   //定义一些变量数组用来存值
        let dataBlob = {}, sectionIDs = [], rowIDs = [], news = [], titles = ["Android", "iOS"];
        //遍历
        for (let i = 0; i < jsonData.length; i++) {
            //把组号放入sectionIDs数组中
            sectionIDs.push(i);
            //把组中内容放入dataBlob对象中
            dataBlob[i] =titles[i];
            //把组中的每行数据的数组放入news
            news = jsonData[i];
            //先确定rowIDs的第一维
            rowIDs[i] = [];
            //遍历news数组,确定rowIDs的第二维
            for (var j = 0; j < news.length; j++) {
                rowIDs[i].push(j);
                //把每一行中的内容放入dataBlob对象中
                dataBlob[i + ':' + j] = news[j];
            }
        }*/
     /*   this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });*/
    }
}
const sStyles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})