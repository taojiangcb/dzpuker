var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by taojiang on 16/9/24.
 */
var playcards;
(function (playcards) {
    //import HtmlTextUtils = utils.HtmlTextUtils;
    //import MissionVO = mission.MissionVO;
    /**
     * 摇钱树
     */
    var PlayCardsGodTreeUIModuleComp = (function (_super) {
        __extends(PlayCardsGodTreeUIModuleComp, _super);
        function PlayCardsGodTreeUIModuleComp() {
            var _this = _super.call(this) || this;
            /**
             * 当前任务量
             * @type {number}
             */
            _this.dayCount = 0;
            /**
             * 倒计时
             * @type {number}
             */
            _this.timeDownID = 0;
            _this.intervalId = 0;
            _this.skinName = "resource/app_skin/playcards/PlayGodTree.exml";
            return _this;
        }
        PlayCardsGodTreeUIModuleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnClose);
            this.bindButton(this.btnAward);
            // this.bindButton(this.itemimage);         
            this.invalidateFullData();
            mission.getProxy().getServerList();
            // if (this.uiOpenData == 1) {
            //     this.viewStack.selectedIndex = 1;
            //     this.tab1.selected = false;
            //     this.tab2.selected = true;
            // } else {
            //     this.viewStack.selectedIndex = 0;
            //     this.tab1.selected = true;
            //     this.tab2.selected = false;
            // }
            //  this.tab1.addEventListener(egret.Event.CHANGE, this.tabclick, this);
            // this.tab2.addEventListener(egret.Event.CHANGE,this.tabclick,this);   
            // this.chengzhanglist.itemRenderer = ChengzhangListItem;
            this.allAward.visible = false;
        };
        // private tabclick(evt: egret.Event): void{
        //     if(evt.target.selected) 
        //          this.viewStack.selectedIndex = evt.target.value;
        // }
        // opening():void {
        //     super.opening();
        //     mission.getProxy().getServerList(AppConst.GAME_ID_FREE);
        //     this.sendNotification(app.NetAction.TOOL_RILVER, AppConst.GAME_ID_FREE);
        //     var json = RES.getRes("chengzhang_json");
        //     // var e = EXML.parse(RES.getRes("chengzhang_xml"));
        //     // var xml = egret.XML.parse(RES.getRes("chengzhang_xml"));   
        //     this.chengzhanglist.dataProvider = new eui.ArrayCollection(json.data);
        //     this.refGift();
        // }
        // //刷新奖励显示
        // public refGift(): void{
        //     var json = RES.getRes("chengzhang_json");
        //     var myuser = user.getProxy().playInfoVO;
        //     var totalget: number = 0;//已经获得积分
        //       var max: number = 0;//积分上限
        //       if (myuser && json) {
        //           var data = json.data;
        //           for (var i: number = 0, len: number = data.length; i < len; i++) {
        //               totalget += Math.min(Number(myuser[data[i].num]), Number(data[i].maxnum)) * Number(data[i].mark);
        //           }
        //           var gift = json.gift;//可领奖积分列表 可能不是顺序
        //           var giftItem = json.giftItem;//可领奖物品列表
        //           var getgift: string[] = myuser.rewardrecord;
        //           var giftindex: number = gift.length - 1;//当前显示
        //           var canget: boolean = false;//当前是否可领取
        //           for (var i: number = 0, len: number = gift.length; i < len; i++) {
        //               var g: number = Number(gift[i]);
        //               max = Math.max(g, max);
        //               if (totalget >= g) {
        //                   var nohas: boolean = getgift.indexOf(i + "") == -1;
        //                   if (nohas) {//满足 没领过
        //                       giftindex = i;
        //                       canget = true;
        //                   }
        //               } else if (!canget && i < giftindex) {
        //                   giftindex = i;
        //               }
        //           }
        //           if (totalget >= max && !canget) { // 如果已经没东西领取且成长积分已到最大
        //               this.giftView.selectedIndex = 1;
        //           } else {
        //               this.itemsgroup.removeChildren();
        //               for (var i: number = 0, len: number = gift.length; i < len; i++) {
        //                   var g: number = Number(gift[i]);
        //                   var px = (g / max) * 300;
        //                   var img: eui.Image = new eui.Image(RES.getRes("img_cut_line_jbc_png"));
        //                   this.itemsgroup.addChild(img);
        //                   img.x = px - 6;
        //                   img.y = 4;
        //                   var lab: eui.Label = new eui.Label();
        //                   lab.size = 20;
        //                   lab.width = 80;
        //                   lab.textAlign = "center";
        //                   lab.textColor = 0xcab1d7;
        //                   lab.x = px - 40;
        //                   lab.y = 20;
        //                   lab.text = g + "";
        //                   this.itemsgroup.addChild(lab);
        //               }
        //               this.giftView.selectedIndex = 0;
        //               this.bar.maximum = max;
        //               this.bar.value = totalget;
        //               this.barlab.text = totalget + "/" + max;
        //               var item = giftItem[giftindex];
        //               this.itemimage.source = item[1];
        //               this.bartiplab.text = item[0];
        //               this.itemimage.touchEnabled = canget;
        //               this.itemimage.alpha = canget ? 1 : 0.5;
        //               this.itemimage.name = giftindex + "";
        //               this.itemname.text = canget ? "点击领取" : item[2];
        //           }
        //           this.giftView.visible = true;
        //       } else this.giftView.visible = false;
        // }
        /**领取奖励返回 */
        // public getItem(index): void{
        //     var json = RES.getRes("chengzhang_json");
        //        var gift = json.gift;//可领奖积分列表 可能不是顺序
        //        var giftItem = json.giftItem;//可领奖物品列表
        //        if (index != -1) {
        //            var item = giftItem[index];
        //          var param:any = {icon: item[1], memo: item[2]};
        //          __OPEN_PRE_MOUDLE(AppReg.AWARD_MC_WIN, param);   
        //        }
        //        this.refGift();
        // }
        /**获取配置的成长奖励数目 */
        // _getTotalGiftNum():number{
        //     var json = RES.getRes("chengzhang_json");
        //     var giftItem = json.giftItem;
        //     return giftItem.length;
        // }
        PlayCardsGodTreeUIModuleComp.prototype.invalidateFullData = function () {
            var _this = this;
            this.dayLabelGroup.visible = this.dayLabelGroup.visible = false;
            if (this.intervalId > 0) {
                egret.clearTimeout(this.intervalId);
                this.intervalId = 0;
            }
            this.intervalId = egret.setTimeout(function () {
                _this.fullData();
            }, this, 50);
        };
        PlayCardsGodTreeUIModuleComp.prototype.fullData = function () {
            var templs = mission.getProxy().getMissionTemplates(mission.MissionType.godTree, mission.MissionSubType.god_tree);
            this.dayCount = templs.length;
            var missions = mission.getProxy().getclvMissionInfos(mission.MissionType.godTree, mission.MissionSubType.god_tree);
            if (missions && missions.length > 0) {
                this.missionInfo = missions[0];
            }
            if (this.missionInfo != null) {
                this.updateMission(this.missionInfo);
            }
            this.totalGold.text = user.getProxy().freeGold.toString();
        };
        PlayCardsGodTreeUIModuleComp.prototype.updateMission = function (missionData) {
            this.missionInfo = missionData;
            this.missionTemplate = mission.getProxy().getMissionTemplateByInfo(this.missionInfo);
            this.allAward.visible = false;
            if (missionData.subtype == mission.MissionSubType.god_tree && missionData.level == 1) {
                this.txtCount.text = "4";
                this.greenLabeGroup.visible = true;
                this.greenAward.text = this.missionTemplate.reward.toString();
                this.dayLabelGroup.visible = false;
                if (missionData.status == mission.MissionState.done) {
                    this.setAwardBtnEnabled(true);
                }
                else {
                    this.setAwardBtnEnabled(false);
                }
            }
            else if (missionData.subtype == mission.MissionSubType.god_tree
                && missionData.level > 1
                && missionData.status == mission.MissionState.done) {
                if (this.timeDownID > 0) {
                    egret.clearInterval(this.timeDownID);
                    this.timeDownID = 0;
                }
                this.dayLabelGroup.visible = true;
                this.greenLabeGroup.visible = false;
                this.txtCount.text = String(this.dayCount - (this.missionTemplate.level - 1));
                this.txtChouma.text = this.missionTemplate.reward.toString();
                this.totalGold.text = user.getProxy().freeGold.toString();
                var t = app.SystemTimer.getServerTime() / 1000;
                var t1 = missionData.time;
                var td = Math.max(t1 - t, 0);
                if (td > 0) {
                    this.timeDownID = egret.setInterval(this.timeDonwHandler, this, 1000);
                    this.setAwardBtnEnabled(false);
                    LocalNotificationInterface.send("边锋德州", Math.ceil(td + 5), "您的摇钱树可以摇奖了", LocalNotificationInterface.LOCALNOTI_GOLDTREE);
                }
                else {
                    egret.clearInterval(this.timeDownID);
                    if (missionData.status == mission.MissionState.done) {
                        this.setAwardBtnEnabled(true);
                    }
                    else {
                        this.setAwardBtnEnabled(false);
                    }
                }
                this.updateData(td);
            }
            else {
                this.allAward.visible = true;
                LocalNotificationInterface.send("边锋德州", Math.floor((DateUtils.getNearTime(24) - (new Date()).getTime()) / 1000), "您的摇钱树可以摇奖了", LocalNotificationInterface.LOCALNOTI_GOLDTREE);
                this.dayLabelGroup.visible = false;
                this.greenLabeGroup.visible = false;
                this.txtCount.text = "0";
                this.greenAward.text = "0";
                this.setAwardBtnEnabled(false);
                egret.clearInterval(this.timeDownID);
            }
        };
        PlayCardsGodTreeUIModuleComp.prototype.timeDonwHandler = function () {
            var t = app.SystemTimer.getServerTime() / 1000;
            var t1 = this.missionInfo.time;
            var td = Math.max(t1 - t, 0);
            if (td <= 0) {
                egret.clearInterval(this.timeDownID);
                if (this.missionInfo.status == mission.MissionState.done) {
                    this.setAwardBtnEnabled(true);
                }
                else {
                    this.setAwardBtnEnabled(false);
                }
            }
            this.updateData(td);
        };
        PlayCardsGodTreeUIModuleComp.prototype.setAwardBtnEnabled = function (val) {
            if (val) {
                this.btnAward.touchEnabled = true;
                this.btnAward.touchChildren = true;
                this.btnAward.alpha = 1;
            }
            else {
                this.btnAward.touchEnabled = false;
                this.btnAward.touchChildren = false;
                this.btnAward.alpha = 0.3;
            }
        };
        PlayCardsGodTreeUIModuleComp.prototype.updateData = function (dt) {
            // var str_time:string = DateUtils.formatTime7(dt * 1000,[":",""],true);
            var str_time = DateUtils.dateFormat(dt * 1000, "mm:ss");
            this.txtTime.text = str_time + "可收获";
            if (parseInt(this.missionTemplate.reward) > 0) {
                this.chouMa.visible = true;
                this.chouMa.includeInLayout = true;
            }
            else {
                this.chouMa.visible = false;
                this.chouMa.includeInLayout = false;
            }
            if (this.missionTemplate.itemId.length > 0) {
                var itemName = "," + this.missionTemplate.descript + "*1";
                this.txtItemname.text = itemName;
                this.txtItemname.visible = true;
                this.txtItemname.includeInLayout = true;
            }
            else {
                this.txtItemname.visible = false;
                this.txtItemname.includeInLayout = false;
            }
        };
        PlayCardsGodTreeUIModuleComp.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this.btnClose:
                    this.close();
                    break;
                case this.btnAward:
                    mission.getProxy().getAward(this.missionInfo, AppConst.GAME_ID_FREE);
                    //如果是新手则直接进入金币房
                    if (this.missionInfo.subtype == mission.MissionSubType.god_tree && this.missionInfo.level == 1) {
                        user.gotoRoom(room.getProxy().room2[0]);
                    }
                    /**摇钱树埋点*/
                    mc2sdk.event(50088 /* MISSION_GOLD_TREE */);
                    break;
            }
        };
        PlayCardsGodTreeUIModuleComp.prototype.dispose = function () {
            egret.clearInterval(this.timeDownID);
            if (this.intervalId > 0) {
                egret.clearTimeout(this.intervalId);
                this.intervalId = 0;
            }
            _super.prototype.dispose.call(this);
        };
        return PlayCardsGodTreeUIModuleComp;
    }(app.base.BaseWndUIMoudleComponent));
    playcards.PlayCardsGodTreeUIModuleComp = PlayCardsGodTreeUIModuleComp;
    __reflect(PlayCardsGodTreeUIModuleComp.prototype, "playcards.PlayCardsGodTreeUIModuleComp");
})(playcards || (playcards = {}));
// //显示条定义
// class ChengzhangListItem extends uicomps.BaseItemCilckRenderer {
//     //定义变量
//     public btn: eui.Group;
//     //text="{data.num+'/'+data.maxnum}"
//     public num: eui.Label;
//     public createComplete(evt: egret.Event): void {     
//         super.createComplete(evt);
//         this.addButton(this.btn);
//     } 
//     dataChanged(): void {
//         super.dataChanged();
//         if(user.getProxy().playInfoVO)
//             this.num.text =Math.min(Number(user.getProxy().playInfoVO[this.data.num]),Number(this.data.maxnum)) +'/'+this.data.maxnum;
//     }
//     protected click(tag: egret.DisplayObject): void {
//         if (__IS_MOUDLE_OPEN(AppReg.APP_PLAYCARDS)) {
//             var parent = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS)["mainview"];
//         }
//         __OPEN_PRE_MOUDLE(AppReg.APP_GOLD_TREE_TIP, this.itemIndex, null, null, parent);
//         //  __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWTIP);  
//      }
// } 
//# sourceMappingURL=PlayCardsGodTreeUIModuleComp.js.map