/**
 * Created by JiangTao on 2016/6/29.
 */
module mission {
    export class SignUIModule extends app.base.BaseWndUIMoudleComponent {

        public btnMission:eui.Image;
        public btnClose:eui.Image;

        public day1:mission.SignItemRenderer
        public day2:mission.SignItemRenderer;
        public day5:mission.SignItemRenderer;
        public day6:mission.SignItemRenderer;
        public day7:mission.SignItemRenderer;
        public day3:mission.SignItemRenderer;
        public day4:mission.SignItemRenderer;

        public txtDay:eui.BitmapLabel;
        public imgReward:eui.Image;

        public btnAward:eui.Button;
        public btnAward2:eui.Button;

        public moneyBar:eui.Group;
        public txtReward1:eui.BitmapLabel;

        txtItemName:eui.Label;
        //当前可以签到第几天的任务
        canRewardDay:number = 0;

        signDayInfo:mission.MissionVO;
        signAccInfo:mission.MissionVO;

        signTemplate:localDB.MissionTemplateVO;
        signAccTemplate:localDB.MissionTemplateVO;

        /**任务红色标记**/
        missionTipUI:tip.CountTipUI;
        /**签到ItemRenderer列表**/
        dayUIS:SignItemRenderer[] = [];

        CD_TIME:number = 30;
        prevOpenTime:number = 0;                        //上次刷新的时间（只在主界面开启下有效）
        star_shine:egret.MovieClip;
        groupReward: eui.Group;

        constructor() {
            super();
            this.skinName = "resource/app_skin/mission/SignModuleSkin.exml";
        }

        createComplete(event:egret.Event):void {

            this.bindButton(this.btnAward);
            this.bindButton(this.btnAward2);
            this.bindButton(this.btnMission);
            this.bindButton(this.btnClose);

            //先不显示任务按钮
            this.btnMission.visible = true;

            this.dayUIS = [
                this.day1, this.day2, this.day3, this.day4, this.day5, this.day6, this.day7
            ]

            var len:number = this.dayUIS.length;
            while(--len > -1) {
                this.dayUIS[len].visible = false;
            }

            var missionTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.MISSION_ACHIEVE);
            this.missionTipUI = new tip.CountTipUI(missionTipData);
            this.missionTipUI.x = this.btnMission.x + 120;
            this.missionTipUI.y = this.btnMission.y;
            this.addChild(this.missionTipUI);

            var starData = RES.getRes("star_json");
			var textureData = RES.getRes("star_png");
			var startMC:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(starData,textureData);
			this.star_shine = new egret.MovieClip(startMC.generateMovieClipData("star"));
			this.star_shine.visible = false;

            this.star_shine.x = this.imgReward.x - 10;
            this.star_shine.y = this.imgReward.y + 10;
            this.groupReward.addChild(this.star_shine);

            super.createComplete(event);
        }

        opening():void {
            super.opening();
            this.fullData();
            mission.getProxy().getServerList();
        }

        private internalFullDataId:number = 0;

        /**
         *  当前失效机制刷新界面数据
         */
        invalidateFullData():void {

            if(!this.initialized) return;

            if(this.internalFullDataId > 0) {
                egret.clearTimeout(this.internalFullDataId);
                this.internalFullDataId = 0;
            }
            this.internalFullDataId = egret.setTimeout(()=>{
                this.fullData();
            },this,100);
        }

        private fullData():void {

            var signInfo:mission.MissionVO[] = mission.getProxy().getclvMissionInfos(mission.MissionType.day,mission.MissionSubType.day);
            if (signInfo.length > 0) {
                this.signDayInfo = signInfo[0];
                this.signTemplate = mission.getMissionTemplate(signInfo[0].type, signInfo[0].subtype, signInfo[0].level);
                if (this.signTemplate) {
                    this.canRewardDay = this.signTemplate.level;
                }

                else if(signInfo[0].level == 8) {
                    this.canRewardDay = 8;
                }

                var len = this.dayUIS.length;
                for (var i:number = 0; i != len; i++) {
                    var day:number = i + 1;
                    var data:any = {day: day, state: signInfo[0].status,type:signInfo[0].type, subType:signInfo[0].subtype};
                    if (day < this.canRewardDay) {
                        data.state = MissionState.obtaining;
                    }
                    else if(this.signDayInfo.level == day && this.signDayInfo.status == MissionState.done) {
                        data.state = MissionState.done;
                    }
                    else {
                        data.state = MissionState.progress
                    }
                    this.dayUIS[i].data = data;
                    this.dayUIS[i].visible = true;
                }

                if (signInfo[0].status == MissionState.done) {
                    this.btnAward.enabled = true;
                    this.btnAward.alpha = 1;
                }
                else {
                    this.btnAward.enabled = false;
                    this.btnAward.alpha = 0.3;
                }
            }

            var signaccInfo:mission.MissionVO[] = mission.getProxy().getclvMissionInfos(mission.MissionType.day,mission.MissionSubType.day_accumulate);
            if (signaccInfo.length > 0) {
                this.signAccInfo = signaccInfo[0];
                this.signAccTemplate = mission.getMissionTemplate(signaccInfo[0].type, signaccInfo[0].subtype, signaccInfo[0].level);
                if (this.signAccTemplate) {
                    if (this.signAccTemplate.descript.length > 0) {
                        this.moneyBar.visible = false;
                        this.txtItemName.visible = true;
                        this.txtItemName.text = this.signAccTemplate.descript;
                    }
                    else {
                        this.moneyBar.visible = true;
                        this.txtReward1.text = this.signAccTemplate.reward.toString();
                    }

                    this.imgReward.source = this.signAccTemplate.imgName + "_png";
                    this.txtDay.text = this.signAccTemplate.level.toString();
                }

                if (signaccInfo[0].status == mission.MissionState.done) {
                    this.btnAward2.enabled = true;
                    this.btnAward2.alpha = 1;
                    this.star_shine.play(-1);
                    this.star_shine.visible = true;
                }
                else {
                    this.btnAward2.enabled = false;
                    this.btnAward2.alpha = 0.3;
                    this.star_shine.stop();
                    this.star_shine.visible = false;
                }
            }
        }

        touchBindButtonHandler(tag:egret.DisplayObject):void {
            if (tag == this.btnClose) {
                this.close();
            }
            if (tag == this.btnAward) {
                if(this.signTemplate) {
                    if(this.signDayInfo && this.signDayInfo.status == mission.MissionState.done) {
                        mission.getProxy().getAward(this.signDayInfo);
                        mc2sdk.event(mc2sdk.EVENT_TYPE.SGIN_GET1)
                    }
                }
                LocalNotificationInterface.send("边锋德州", Math.floor((DateUtils.getNextDayTime(20)-(new Date()).getTime())/1000),
                                                "您今天还没有签到，快去签到吧", LocalNotificationInterface.LOCALNOTI_SIGN);
            }
            else if (tag == this.btnAward2) {
                if(this.signAccTemplate) {
                    if(this.signAccInfo && this.signAccInfo.status == mission.MissionState.done) {
                        mission.getProxy().getAward(this.signAccInfo);
                        mc2sdk.event(mc2sdk.EVENT_TYPE.SGIN_GET2)
                    }
                }
            }
            else if (tag == this.btnMission) {
                __OPEN_PRE_MOUDLE(AppReg.APP_MISSION);
                this.close();
            }
        }

        dispose() {
            
            if(this.internalFullDataId > 0) {
                egret.clearTimeout(this.internalFullDataId);
                this.internalFullDataId = 0;
            }

            if(this.star_shine) this.star_shine.removeFromParent();

            if(this.missionTipUI) {
                this.missionTipUI.removeFromParent(true)
            }

            if(this.btnAward) {
                this.unbindButton(this.btnAward);
            }

            if(this.btnAward2) {
                this.bindButton(this.btnAward2);
            }

            if(this.btnMission) {
                this.bindButton(this.btnMission);
            }

            if(this.btnClose){
                this.bindButton(this.btnClose);
            }

            var len = this.dayUIS.length;
            while(--len > -1) {
                this.dayUIS.pop().removeFromParent(true);
            }
        }
    }
}