var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var localDB;
(function (localDB) {
    function InitPropTemps(argList) {
        argList.push(new PropTemplateVO(1, [3003, 2026, 2026], 1, "1千场门票", "可用于参加SNG1千场比赛，1次消耗一张", "icon_prop_type_2", 0, 0, 0, 0, true, true, 0x49c9ff));
        argList.push(new PropTemplateVO(2, [3004, 2027, 2027], 1, "5千场门票", "可用于参加SNG5千场比赛，1次消耗一张", "icon_prop_type_1", 0, 0, 0, 0, true, true, 0x49c9ff)); //0x96ff00
        argList.push(new PropTemplateVO(3, [3006, 2030, 2030], 1, "6千奖金门票", "用来作为参与6千奖金MTT赛事的资格凭证", "icon_prop_type_5", 0, 0, 0, 0, true, false, 0x49c9ff));
        argList.push(new PropTemplateVO(4, [3007, 2031, 2031], 1, "兑换点券", "可前往赛事兑换中心兑换话费等物品奖励", "icon_prop_type_7", 0, 0, 0, 0, true, false, 0x49c9ff));
        argList.push(new PropTemplateVO(5, [3008, 2032, 2032], 1, "BPT决赛门票", "用来作为参与浙牌汇线下决赛专场的资格凭证", "icon_prop_type_6", 0, 0, 0, 0, false, false, 0x49c9ff));
        argList.push(new PropTemplateVO(6, [2033, 2033, 2033], 1, "浙牌汇门票", "用来作为参与浙牌汇线上专场的资格凭证", "icon_prop_type_4", 0, 0, 0, 0, true, false, 0x49c9ff));
    }
    localDB.InitPropTemps = InitPropTemps;
    ;
    var PropTemplateVO = (function () {
        function PropTemplateVO(id, svrId, type, name, desc, icon, year, month, day, timeEnd, btnShow, btnEnable, color) {
            if (btnShow === void 0) { btnShow = false; }
            if (btnEnable === void 0) { btnEnable = false; }
            if (color === void 0) { color = 0x49c9ff; }
            this.id = 1; //本地序列
            this.svrId = []; //服务器道具id [90,71,外网]
            this.type = 0; //道具的类型   1:门票类型
            // idN:number = 1;
            this.num = 0; //拥有的数量
            this.name = ""; //道具名称
            this.descript = ""; //描述
            this.icon = ""; //图标
            this.year = 1; //过期年
            this.month = 1; //过期月
            this.day = 1; //过期日;
            this.timeEnd = 0; //过期时间（秒）
            this.nameColor = 0;
            this.id = id;
            this.svrId = svrId;
            this.type = type;
            this.name = name;
            this.descript = desc;
            this.icon = icon;
            this.year = year;
            this.month = month;
            this.day = day;
            this.timeEnd = timeEnd;
            this.nameColor = color;
            this.btnShow = btnShow;
            this.btnEnable = btnEnable;
        }
        return PropTemplateVO;
    }());
    localDB.PropTemplateVO = PropTemplateVO;
    __reflect(PropTemplateVO.prototype, "localDB.PropTemplateVO");
})(localDB || (localDB = {}));
//# sourceMappingURL=InitPropLDB.js.map