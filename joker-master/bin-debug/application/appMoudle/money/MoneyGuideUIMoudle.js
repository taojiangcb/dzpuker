var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var money;
(function (money) {
    /**
     *财富引导面板
     * @author
     *
     */
    var MoneyGuideUIMoudle = (function (_super) {
        __extends(MoneyGuideUIMoudle, _super);
        function MoneyGuideUIMoudle() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "MoneyGuideUIMoudleSkin";
            _this.itemDatas = [
                //钱压取款
                new MoneyItemDataVO("icon_money_type_1_png", "img_word_money_type_1_png", "img_word_money_qwqz_png", 0, AppReg.APP_BANK, 1),
                //快速充值
                new MoneyItemDataVO("icon_money_type_3_png", "img_word_money_type_3_png", "img_word_money_djcz_png", 0, AppReg.SHOP_WIN, 2),
                //领取门票--签到
                new MoneyItemDataVO("icon_money_type_4_png", "img_word_money_type_4_png", "img_word_money_qwlq_png", 0, AppReg.APP_SIGN, 4),
                //微信公众号
                new MoneyItemDataVO("icon_money_type_5_png", "img_word_money_type_5_png", "", 0, AppReg.APP_BANK, 2),
                //任务奖励待领取
                new MoneyItemDataVO("icon_money_type_2_png", "img_word_money_type_2_png", "img_word_money_djlq_png", 5, 0, 6),
                //参与比赛赢取奖金
                new MoneyItemDataVO("icon_money_type_6_png", "img_word_money_type_6_png", "img_word_money_bmcs_png", 0, AppReg.SNG, 5),
                //进入金币场游戏
                new MoneyItemDataVO("icon_jinbichang_star_png", "iw_jinbichangmianfeitiyanyouxi_png", "img_word_dianjiqianwang_png", 0, 0, 3)
            ];
            return _this;
        }
        MoneyGuideUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            app.mvc.AppFacade.getInstance().registerMediator(new money.MoneyGuideUIMoudMediator(this));
            this.bindButton(this.bgimage, false);
            this.bindButton(this.btnColse);
            this.bindButton(this.okBtn);
            this.fristList.itemRenderer = money.MoneyInfoItem;
            if (this.quickAccount == null) {
                this.quickAccount = new bank.BankHttpAccount();
            }
            this.sendNotification(app.NetAction.TOOL_TEMP_SESSION);
        };
        MoneyGuideUIMoudle.prototype.okSetEvent = function () {
            if (user.getProxy().svrTmpSession) {
                if (this.quickAccount == null) {
                    this.quickAccount = new bank.BankHttpAccount();
                }
                this.quickAccount.toKenEvent();
            }
            else {
            }
        };
        MoneyGuideUIMoudle.prototype.createItemDatas = function () {
            var dataList = [];
            var signCount = mission.getProxy().getDoneCount(mission.MissionType.day); //是否有签到 > 0 表示没有签过到
            var bankMoney = user.getProxy().bankSilver; //银行有没有钱；
            var freeGold = user.getProxy().freeGold;
            var propShow = false;
            var propDatas = item.getProxy().allPropDatas;
            for (var i = 0; i < propDatas.length; i++) {
                if (propDatas[i].template && (propDatas[i].template.svrId.indexOf(2026) != -1 || propDatas[i].template.svrId.indexOf(2027) != -1)) {
                    propShow = true;
                    break;
                }
            }
            if (bankMoney && room.getProxy().current == null) {
                if (user.getProxy().isShowBank())
                    dataList.push(this.itemDatas[0]);
            }
            if (bankMoney <= 0) {
                if (platform.CHANNE_ID == String(platform.CHANNE_IDS.GAME_TEA_PC)) {
                    if (user.getProxy().isShowBank())
                        dataList.push(this.itemDatas[3]);
                }
                else {
                    dataList.push(this.itemDatas[1]);
                }
            }
            else {
                if (dataList.indexOf(this.itemDatas[0]) == -1) {
                    dataList.push(this.itemDatas[0]);
                }
            }
            if (signCount > 0) {
                dataList.push(this.itemDatas[2]);
            }
            if (propShow) {
                dataList.push(this.itemDatas[5]);
            }
            if (freeGold >= 1000 && user.getProxy().svrGameData && user.getProxy().svrGameData.silver < 1000) {
                dataList.push(this.itemDatas[6]);
            }
            dataList = dataList.sort(function (item1, item2) {
                if (item1.sort < item2.sort)
                    return -1;
                else if (item1.sort > item2.sort)
                    return 1;
                return 0;
            });
            return dataList;
        };
        MoneyGuideUIMoudle.prototype.opening = function () {
            this.showEvent();
        };
        MoneyGuideUIMoudle.prototype.showEvent = function () {
            var dataList = this.createItemDatas();
            if (dataList.length > 0) {
                this.currentObj = dataList.shift();
            }
            if (this.collection == null) {
                this.collection = new eui.ArrayCollection();
            }
            this.collection.source = dataList;
            this.fristList.dataProvider = this.collection;
            this.firstShow();
        };
        //public showEvent():void {
        //    var arr:any[] = [];
        //    this.currentObj = null;
        //    if (this.collection == null) {
        //        this.collection = new eui.ArrayCollection();
        //    }
        //    var obj1 = {
        //        icon: "icon_money_type_1_png",
        //        tips: "img_word_money_type_1_png",
        //        btnIcon: "img_word_money_qwqz_png",
        //        numTxt: 0,
        //        clikcDat: AppReg.APP_BANK
        //    }
        //    var obj2 = {
        //        icon: "icon_money_type_3_png",
        //        tips: "img_word_money_type_3_png",
        //        btnIcon: "img_word_money_djcz_png",
        //        numTxt: 0,
        //        clikcDat: AppReg.SHOP_WIN
        //    }
        //    var obj3 = {
        //        icon: "icon_money_type_4_png",
        //        tips: "img_word_money_type_4_png",
        //        btnIcon: "img_word_money_qwlq_png",
        //        numTxt: 0,
        //        clikcDat: AppReg.APP_SIGN
        //    }
        //    var obj4 = {
        //        icon: "icon_money_type_5_png",
        //        tips: "img_word_money_type_5_png",
        //        btnIcon: "",
        //        numTxt: 0,
        //        clikcDat: AppReg.APP_BANK
        //    }
        //    var obj5 = {
        //        icon: "icon_money_type_2_png",
        //        tips: "img_word_money_type_2_png",
        //        btnIcon: "img_word_money_djlq_png",
        //        numTxt: 5,
        //        clikcDat: "",
        //        task: "11"
        //    }
        //
        //    var obj6 = {
        //        icon: "icon_money_type_6_png",
        //        tips: "img_word_money_type_6_png",
        //        btnIcon: "img_word_money_bmcs_png",
        //        numTxt: 0,
        //        clikcDat: AppReg.SNG
        //    }
        //
        //    var count:number = mission.getProxy().getDoneCount(mission.MissionType.day);//有没有签到
        //    var bankMoney:number = user.getProxy().bankSilver       //银行有没有钱；
        //    var itemNum = item.getProxy().getPropDataById(1);       //有没有道具
        //    if (itemNum == null) {
        //        itemNum = item.getProxy().getPropDataById(2);
        //    }
        //
        //    if (bankMoney && room.getProxy().current == null) {
        //        this.currentObj = obj1;
        //    }
        //
        //    if (itemNum && setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType3,egret.RuntimeType.WEB)) {
        //        if (this.currentObj) {
        //            arr.push(obj6);
        //        }
        //        else {
        //            this.currentObj = obj6;
        //        }
        //    }
        //
        //    if (egret.Capabilities.os == "Android") {
        //        if (this.currentObj) {
        //            arr.push(obj2);
        //        } else {
        //            this.currentObj = obj2;
        //        }
        //    }
        //
        //    if (count) {
        //        if (this.currentObj) {
        //            arr.push(obj3);
        //        } else {
        //            this.currentObj = obj3;
        //        }
        //    }
        //
        //    if (this.currentObj) {
        //        arr.push(obj4);
        //    } else {
        //        this.currentObj = obj4;
        //    }
        //
        //
        //    this.collection.source = arr;
        //    this.fristList.dataProvider = this.collection;
        //    this.firstShow();
        //}
        MoneyGuideUIMoudle.prototype.firstShow = function () {
            var info = this.currentObj;
            if (info) {
                this.icon.source = info.icon;
                this.tips.source = info.tips;
                if (info.btnIcon) {
                    this.okBtn.visible = true;
                    this.btnIcon.source = info.btnIcon;
                }
                else {
                    this.okBtn.visible = false;
                }
            }
        };
        MoneyGuideUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.bgimage:
                case this.btnColse:
                    this.clickBackEvent();
                    break;
                case this.okBtn:
                    this.clickBackEvent();
                    if (this.currentObj.clickDat == AppReg.SNG) {
                        user.getProxy().openSNG();
                    }
                    else {
                        if (this.currentObj.sort == 3) {
                            //进金币房
                            room.getProxy().goldRoom();
                        }
                        else {
                            __OPEN_PRE_MOUDLE(this.currentObj.clickDat);
                        }
                    }
                    break;
            }
        };
        MoneyGuideUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        MoneyGuideUIMoudle.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(money.MoneyGuideUIMoudMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return MoneyGuideUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    money.MoneyGuideUIMoudle = MoneyGuideUIMoudle;
    __reflect(MoneyGuideUIMoudle.prototype, "money.MoneyGuideUIMoudle");
    var MoneyItemDataVO = (function () {
        function MoneyItemDataVO(icon, tips, btnIcon, numTxt, clickDat, sort) {
            this.icon = "";
            this.tips = "";
            this.btnIcon = "";
            this.numTxt = 0;
            this.clickDat = 0;
            this.sort = 0;
            this.icon = icon;
            this.tips = tips;
            this.btnIcon = btnIcon;
            this.numTxt = numTxt;
            this.clickDat = clickDat;
            this.sort = sort;
        }
        return MoneyItemDataVO;
    }());
    money.MoneyItemDataVO = MoneyItemDataVO;
    __reflect(MoneyItemDataVO.prototype, "money.MoneyItemDataVO");
})(money || (money = {}));
//# sourceMappingURL=MoneyGuideUIMoudle.js.map