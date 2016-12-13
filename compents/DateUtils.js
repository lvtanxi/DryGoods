const DateUtil = {
    currentDate(format){
        Date.prototype.Format = function (fmt) { //author: meizz 
            let o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        return new Date().Format(format ? format : "yyyy-MM-dd");
    },

    addDateStr(addDayCount) {
        let dd = new Date();
        dd.setDate(dd.getDate() + addDayCount);
        let m = dd.getMonth() + 1;
        let d = dd.getDate();
        return m + "/" + d;
    },

    dateStr(dateStr){
        if (!dateStr)
            return ""
        dateStr = dateStr.toString().replace("T", " ");
        return dateStr.substring(0, dateStr.lastIndexOf("."))
    },

    preWoekDay(){
        let data = new Date()
        let day = data.getDay()
        let yesterday_milliseconds = data.getTime()
        if (day === 0) {
            day = 3
        } else if (day === 6) {
            day = 1
        } else {
            day = data.getHours() < 12 ? 1 : 0
        }
        yesterday_milliseconds = yesterday_milliseconds - 1000 * 60 * 60 * 24 * day
        let yesterday = new Date()
        yesterday.setTime(yesterday_milliseconds)
        let strYear = yesterday.getFullYear()
        let strDay = yesterday.getDate()
        let strMonth = yesterday.getMonth() + 1
        if (strMonth < 10) {
            strMonth = "0" + strMonth
        }
        return strYear + "/" + strMonth + "/" + strDay
    }

}

export default DateUtil