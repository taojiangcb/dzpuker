module money {
    /**
     *财富引导面板
     * @author
     *
     */
    export class MoneyGuideUIMoudle extends app.base.BaseSceneUIMoudleComponent {

        public bgimage:eui.Rect;

        btnColse:eui.Image;
        fristList:eui.List;
        collection:eui.ArrayCollection;
        quickAccount:bank.BankHttpAccount;

        bankGroup:eui.Group;
        listGroup:eui.Group;

        okBtn:eui.Group;
        icon:eui.Image;
        tips:eui.Image;
        btnIcon:eui.Image;
        itemDatas:MoneyItemDataVO[];

        currentObj:MoneyItemDataVO;

        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "MoneyGuideUIMoudleSkin";


            this.itemDatas = [
                //钱压取款
                new MoneyItemDataVO("icon_money_type_1_png","img_word_money_type_1_png","img_word_money_qwqz_png",0,AppReg.APP_BANK,1),
                //快速充值
                new MoneyItemDataVO("icon_money_type_3_png","img_word_money_type_3_png","img_word_money_djcz_png",0,AppReg.SHOP_WIN,2),
                //领取门票--签到
                new MoneyItemDataVO("icon_money_type_4_png","img_word_money_type_4_png","img_word_money_qwlq_png",0,AppReg.APP_SIGN,4),
                //微信公众号
                new MoneyItemDataVO("icon_money_type_5_png","img_word_money_type_5_png","",0,AppReg.APP_BANK,2),
                //任务奖励待领取
                new MoneyItemDataVO("icon_money_type_2_png","img_word_money_type_2_png","img_word_money_djlq_png",5,0,6),
                //参与比赛赢取奖金
                new MoneyItemDataVO("icon_money_type_6_png","img_word_money_type_6_png","img_word_money_bmcs_png",0,AppReg.SNG,5),
                //进入金币场游戏
                new MoneyItemDataVO("icon_jinbichang_star_png","iw_jinbichangmianfeitiyanyouxi_png","img_word_dianjiqianwang_png",0,0,3)
            ];

        }

        public createComplete(event:egret.Event):void {
            super.createComplete(event);

            app.mvc.AppFacade.getInstance().registerMediator(new MoneyGuideUIMoudMediator(this));
            this.bindButton(this.bgimage, false);
            this.bindButton(this.btnColse);
            this.bindButton(this.okBtn);
            this.fristList.itemRenderer = MoneyInfoItem;

            if (this.quickAccount == null) {
                this.quickAccount = new bank.BankHttpAccount();
            }

            this.sendNotification(app.NetAction.TOOL_TEMP_SESSION);

        }

        okSetEvent():void {
            if (user.getProxy().svrTmpSession) {
                if (this.quickAccount == null) {
                    this.quickAccount = new bank.BankHttpAccount();
                }
                this.quickAccount.toKenEvent()
            } else {

            }
        }


        createItemDatas():MoneyItemDataVO[] {
            var dataList:MoneyItemDataVO[] = [];

            var signCount:number = mission.getProxy().getDoneCount(mission.MissionType.day);     //是否有签到 > 0 表示没有签过到
            var bankMoney:number = user.getProxy().bankSilver;                                   //银行有没有钱；
            var freeGold:number = user.getProxy().freeGold;

            var propShow: boolean = false;
            var propDatas: item.PropVO[] = item.getProxy().allPropDatas;
            for (var i = 0; i < propDatas.length; i++) {
                if (propDatas[i].template &&(propDatas[i].template.svrId.indexOf(2026) != -1 || propDatas[i].template.svrId.indexOf(2027) != -1)) {
                    propShow = true;
                    break;
                }
            }

            if (bankMoney && room.getProxy().current == null) {
                if (user.getProxy().isShowBank()) dataList.push(this.itemDatas[0]);
            }

            if(bankMoney <= 0) {
                if(platform.CHANNE_ID == String(platform.CHANNE_IDS.GAME_TEA_PC)) {
                    if (user.getProxy().isShowBank()) dataList.push(this.itemDatas[3]);
                }
                else {
                    dataList.push(this.itemDatas[1]);
                }
            }
            else {
                if(dataList.indexOf(this.itemDatas[0]) == -1) {
                    dataList.push(this.itemDatas[0]);
                }
            }

            if(signCount > 0) {
                dataList.push(this.itemDatas[2]);
            }
            if (propShow) {
                dataList.push(this.itemDatas[5]);
            }

            if(freeGold >= 1000 && user.getProxy().svrGameData && user.getProxy().svrGameData.silver < 1000) {
                dataList.push(this.itemDatas[6]);
            }

            dataList = dataList.sort((item1:MoneyItemDataVO,item2:MoneyItemDataVO)=> {
                if(item1.sort < item2.sort) return -1;
                else if(item1.sort > item2.sort) return 1;
                return  0;
            })
            return dataList;
        }


        public opening():void {
            this.showEvent();
        }

        showEvent():void {
            var dataList:MoneyItemDataVO[] = this.createItemDatas();
            if(dataList.length > 0) {
                this.currentObj = dataList.shift();
            }

            if (this.collection == null) {
                this.collection = new eui.ArrayCollection();
            }

            this.collection.source = dataList;
            this.fristList.dataProvider = this.collection;
            this.firstShow();
        }

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

        private firstShow():void {
            var info = this.currentObj;
            if (info) {
                this.icon.source = info.icon;
                this.tips.source = info.tips;
                if (info.btnIcon) {
                    this.okBtn.visible = true;
                    this.btnIcon.source = info.btnIcon;
                } else {
                    this.okBtn.visible = false;
                }
            }
        }

        protected touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.bgimage:
                case this.btnColse:
                    this.clickBackEvent();
                    break;

                case this.okBtn:
                    this.clickBackEvent();
                    if (this.currentObj.clickDat == AppReg.SNG) {
                        user.getProxy().openSNG();
                    } else {
                        if(this.currentObj.sort == 3) {
                            //进金币房
                            room.getProxy().goldRoom();
                        }
                        else {
                            __OPEN_PRE_MOUDLE(this.currentObj.clickDat);
                        }
                    }
                    break;
            }
        }

        private clickBackEvent():void {
            this.close();
        }

        public dispose():void {
            app.mvc.AppFacade.getInstance().removeMediator(MoneyGuideUIMoudMediator.NAME)
            super.dispose();
        }
    }

    export class MoneyItemDataVO {

        icon:string = "";
        tips:string = "";
        btnIcon:string = "";
        numTxt:number = 0;
        clickDat:number = 0;
        sort:number = 0;

        constructor(icon:string,tips:string,btnIcon:string,numTxt:number,clickDat:number,sort:number) {
            this.icon = icon;
            this.tips = tips;
            this.btnIcon = btnIcon;
            this.numTxt = numTxt;
            this.clickDat = clickDat;
            this.sort = sort;
        }
    }
}
