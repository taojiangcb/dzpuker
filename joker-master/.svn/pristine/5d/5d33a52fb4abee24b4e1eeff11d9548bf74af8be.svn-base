/**
 * Created by JiangTao on 2016/6/28.
 */
module mission {
    export class SignItemRenderer extends uicomps.BaseItemCilckRenderer {

        imgReward: eui.Image;
        txtReward: eui.BitmapLabel;
        txtDay: eui.BitmapLabel;
        imgOb: eui.Image;
        moneyBar:eui.Group;

        txtItemName:eui.Label;
        day:number = 0;
        missionState:number = mission.MissionState.progress;
        star_shine:egret.MovieClip;

        constructor(){
            super();
            this.skinName = "resource/app_skin/mission/SignItemRendererSkin.exml";
            this.touchChildren = false;
            this.touchEnabled = false;
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);

            var starData = RES.getRes("star_json");
			var textureData = RES.getRes("star_png");
			var startMC:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(starData,textureData);
			this.star_shine = new egret.MovieClip(startMC.generateMovieClipData("star"));
			this.star_shine.visible = false;
            this.star_shine.x = this.width - 162 >> 1;
            this.star_shine.y = 10//this.height -102 >> 1;
            this.addChild(this.star_shine);
        }

        dataChanged():void {
            if(this.data) {
                this.day = this.data.day;
                this.missionState = this.data.state;

                var missionTemplate = mission.getProxy().getMissionTemplate(this.data.type,this.data.subType,this.data.day)
                if(missionTemplate) {
                    if(missionTemplate.descript.length > 0) {
                        this.moneyBar.visible = false;
                        this.txtItemName.visible = true;
                        this.txtItemName.text = missionTemplate.descript;
                    }

                    else {
                        this.moneyBar.visible = true;
                        this.txtItemName.visible = false;
                        this.txtReward.text = missionTemplate.reward;
                    }

                    this.imgReward.source = missionTemplate.imgName + "_png";
                    this.txtDay.text = missionTemplate.level.toString();
                }

                if(this.missionState == mission.MissionState.done) {
                    this.star_shine.visible = true;
                    this.star_shine.play(-1);
                }
                else {
                    this.star_shine.visible = false;
                    this.star_shine.stop();
                }

                if(this.missionState == mission.MissionState.obtaining) {
                    this.imgOb.visible = true;
                }
                else {
                    this.imgOb.visible = false;
                }
            }
        }
    }
}