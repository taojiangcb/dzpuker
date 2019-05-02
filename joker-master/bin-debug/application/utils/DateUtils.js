var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var DateUtils = (function () {
    function DateUtils() {
    }
    Object.defineProperty(DateUtils, "HMS", {
        //hh时mm分ss秒
        get: function () {
            var tth = gameabc.ResourceBundleUtil.getMessage("TIME_TYPE_HOUR");
            var ttm = gameabc.ResourceBundleUtil.getMessage("TIME_TYPE_MINUTES");
            var tts = gameabc.ResourceBundleUtil.getMessage("TIME_TYPE_SECOND");
            return "hh" + tth + "mm" + ttm + "ss" + tts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateUtils, "nowTime", {
        /** 返回现在的时间 时:分:秒 */
        get: function () {
            return DateUtils.dateFormat(new Date(), "hh:mm:ss");
        },
        enumerable: true,
        configurable: true
    });
    //统一使用dateFormat函数,先注释,有问题再追BUG   
    /** 根据毫秒值转换为[x分x秒]，间隔文字可通过参数自定义 */
    // public static formatTime7(ms: number,rulers: string[] = null,showAll: boolean = false): string {
    //     if(ms < 0) ms = 0;
    //     var timeMs: number = Math.ceil(ms / 1000);
    //     var seconds: number = timeMs % 60;
    //     var minutes: number = parseInt(((timeMs / 60) % 60).toString());
    //     var result: string = "";
    //     if(rulers == null) rulers = [gameabc.ResourceBundleUtil.getMessage("TIME_TYPE_MINUTES"),gameabc.ResourceBundleUtil.getMessage("TIME_TYPE_SECOND")];
    //     if(minutes > 9) {
    //         result += minutes + rulers[0];
    //     } else {
    //         if(minutes > 0) result += "0" + minutes + rulers[0];
    //         else if(showAll) result += "00" + rulers[0];
    //         else result += "";
    //     }
    //     if(seconds > 9) {
    //         result += seconds + rulers[1];
    //     } else {
    //         result += "0" + seconds + rulers[1];
    //     }
    //     return result;
    // }
    //统一使用dateFormat函数,先注释,有问题再追BUG
    /** 获取最后一次的时间 */
    // static getLastDate(s:number):string{
    //     var str:string = "";
    //     var d:Date = new Date(s*1000);
    //     str += (d.getFullYear()+"年");
    //     str += ((d.getMonth()+1)+"月");
    //     str += (d.getDate()+"日");
    //     return str;
    // }
    // public static mday(m: number,y: number): number {
    //     if(m == 2) {
    //         return ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) ? 29 : 28;
    //     } else if(m == 4 || m == 6 || m == 9 || m == 11) {
    //         return 30;
    //     }
    //     return 31;
    // }
    /** 自定义任何格式用字符串显示时间
     *  MM月dd日 = 10月10日
     *  hh:mm = 10:10      */
    DateUtils.dateFormat = function (dateTime, fmt) {
        var date;
        if (dateTime instanceof Date)
            date = dateTime;
        if (!isNaN(dateTime))
            date = new Date(dateTime);
        if (date == null)
            return "";
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    // 对以秒为单位的时间戳进行格式化 00:00:00全格式
    DateUtils.DayTimeStampFormat = function (timeStamp) {
        if (timeStamp < 0)
            timeStamp = 0;
        var day = Math.floor(timeStamp / 3600 / 24);
        var hour = Math.floor((timeStamp % (3600 * 24)) / 3600);
        var minute = Math.floor(timeStamp % 3600 / 60);
        var second = Math.floor(timeStamp % 60);
        var str = gameabc.StringUtils.formatString("{0}{1}:{2}:{3}", day > 0 ? gameabc.StringUtils.formatString(gameabc.ResourceBundleUtil.getMessage("TIME_TYPE1_DAY"), day) : "", gameabc.StringUtils.padLeft(hour.toString(), "0", 2), gameabc.StringUtils.padLeft(minute.toString(), "0", 2), gameabc.StringUtils.padLeft(second.toString(), "0", 2));
        return str;
    };
    // 对以秒为单位的时间戳进行格式化 00:00全格式
    DateUtils.DayTimeStampFormat2 = function (timeStamp) {
        if (timeStamp < 0)
            timeStamp = 0;
        var minute = Math.floor(timeStamp % 3600 / 60);
        var second = Math.floor(timeStamp % 60);
        var str = gameabc.StringUtils.formatString("{0}:{1}", gameabc.StringUtils.padLeft(minute.toString(), "0", 2), gameabc.StringUtils.padLeft(second.toString(), "0", 2));
        return str;
    };
    DateUtils.isToday = function (num, isYYYYMMDD, isLocalDate) {
        if (isYYYYMMDD === void 0) { isYYYYMMDD = false; }
        if (isLocalDate === void 0) { isLocalDate = false; }
        if (!isYYYYMMDD)
            num = parseFloat(this.formatTimeFromMs2(num));
        return num == parseFloat(this.formatTimeFromMs2(isLocalDate ? new Date().getTime() : cy.getServerTime().getTime()));
    };
    DateUtils.formatTimeFromMs2 = function (ms) {
        var dateString = "";
        var date1 = new Date();
        date1.setTime(ms);
        dateString += (date1.getFullYear());
        dateString += date1.getMonth() < 9 ? ("0" + (date1.getMonth() + 1)) : (date1.getMonth() + 1);
        dateString += date1.getDate() < 10 ? ("0" + date1.getDate()) : date1.getDate();
        return dateString;
    };
    DateUtils.theDayAfterTomorrow = function (num) {
        var curr = new Date().getTime();
        //当天零点
        var curr0 = curr - (curr % DateUtils.DAY_TIME);
        //超过48小时为超过明天
        return num - curr0 > DateUtils.DAY_TIME * 2;
    };
    /** 根据时、分、秒，获取距离当前最近的未来时间
     * offset1设置当前时间误差范围(如服务器时间和本地时间的误差值)
     * offset2设置超时范围，超过多少毫秒起，才返回未来时间 */
    DateUtils.getNearTime = function (hour, min, sec, offset1, offset2) {
        if (min === void 0) { min = 0; }
        if (sec === void 0) { sec = 0; }
        if (offset1 === void 0) { offset1 = 0; }
        if (offset2 === void 0) { offset2 = 0; }
        var date = new Date();
        var now = date.getTime() + offset1;
        date.setHours(hour);
        date.setMinutes(min);
        date.setSeconds(sec);
        var dateTime = date.getTime();
        if (now > dateTime + offset2)
            dateTime += (DateUtils.DAY_TIME);
        return dateTime;
    };
    /** 根据周、时、分、秒，获取距离当前最近的未来时间
     * offset1设置当前时间误差范围(如服务器时间和本地时间的误差值)
     * offset2设置超时范围，超过多少毫秒起，才返回未来时间 */
    DateUtils.getNearWeekTime = function (week, hour, min, sec, offset1, offset2) {
        if (min === void 0) { min = 0; }
        if (sec === void 0) { sec = 0; }
        if (offset1 === void 0) { offset1 = 0; }
        if (offset2 === void 0) { offset2 = 0; }
        var date = new Date();
        var now = date.getTime() + offset1;
        date.setHours(hour);
        date.setMinutes(min);
        date.setSeconds(sec);
        var localWeek = date.getDay();
        var weekDes = ((localWeek + 7) - week) % 7; //距离该天还有多少天
        var sec = DateUtils.DAY_TIME * weekDes; //距离该天还有多少秒
        var dateTime = date.getTime();
        dateTime += sec; //先把星期设置准确
        if (now > dateTime + offset2)
            dateTime += (DateUtils.DAY_TIME * 7);
        return dateTime;
    };
    DateUtils.getNearDayTime = function (day, hour, min, sec, offset1, offset2) {
        if (min === void 0) { min = 0; }
        if (sec === void 0) { sec = 0; }
        if (offset1 === void 0) { offset1 = 0; }
        if (offset2 === void 0) { offset2 = 0; }
        var date = new Date();
        var now = date.getTime() + offset1;
        date.setHours(hour);
        date.setMinutes(min);
        date.setSeconds(sec);
        var dateTime = date.getTime();
        if (now > dateTime + offset2)
            dateTime += (DateUtils.DAY_TIME);
        dateTime += day * DateUtils.DAY_TIME;
        return dateTime;
    };
    DateUtils.getNextDayTime = function (hour, min, sec, offset1, offset2) {
        if (min === void 0) { min = 0; }
        if (sec === void 0) { sec = 0; }
        if (offset1 === void 0) { offset1 = 0; }
        if (offset2 === void 0) { offset2 = 0; }
        var date = new Date();
        var now = date.getTime() + offset1;
        var dateTime = DateUtils.getNearTime(hour);
        var nextDate = new Date(dateTime);
        if (nextDate.getDate() == date.getDate())
            dateTime += DateUtils.DAY_TIME;
        return dateTime;
    };
    return DateUtils;
}());
/**1天的毫秒数 3600 * 1000 * 24 */
DateUtils.DAY_TIME = 86400000;
/**1年(非闰年)的毫秒数 DAY_TIME * 365 */
DateUtils.YEAR_TIME = 31536000000;
__reflect(DateUtils.prototype, "DateUtils");
//# sourceMappingURL=DateUtils.js.map