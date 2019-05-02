/**
 * Created by JiangTao on 2016/6/23.
 */
module mission {
    export class MissionItemRenderer extends uicomps.BaseItemCilckRenderer {

        public txtName: eui.Label;
        public btnAward: eui.Group;
        public txtMemo: eui.Label;
        public imgReward: eui.Image;
        public txtReward: eui.BitmapLabel;
        public progress: eui.ProgressBar;
        public imgOB:eui.Image;
        public imgBg:eui.Image;
        title:eui.Group;

        chipBar:eui.Group;

        constructor() {
            super();
            this.skinName = "resource/app_skin/mission/MissionItemRenderer.exml";
            this.touchChildren = true;
            this.touchEnabled = false;
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.btnAward.touchEnabled = true;
            this.btnAward.touchChildren = false;
            this.addButton(this.btnAward,true);
        }

        missionTemplate:localDB.MissionTemplateVO; 
        dataChanged() {
            var missionInfo:mission.MissionVO = this.data;
            this.missionTemplate = mission.getProxy().getMissionTemplate(missionInfo.type,missionInfo.subtype,missionInfo.level);
            if(this.missionTemplate) {
                if(this.missionTemplate.missionName.length > 0) {
                    this.title.visible = true;
                    this.txtName.text = this.missionTemplate.missionName;
                }
                else {
                    this.title.visible = false;
                }

                if(this.missionTemplate.itemId.length > 0) {
                    this.chipBar.visible = false;
                }
                else {
                    this.chipBar.visible = true;
                }
                
                this.txtMemo.text = this.missionTemplate.descript;
                this.txtReward.text = this.missionTemplate.reward;
                this.imgReward.source = this.missionTemplate.imgName + "_png";
                this.progress.maximum = this.missionTemplate.total;
                this.progress.minimum = 0;
            }

            if(missionInfo.status == mission.MissionState.progress) {
                this.progress.visible = true;
                this.btnAward.visible = false;
                this.imgOB.visible = false;
                this.progress.value = missionInfo.progress;
                this.imgBg.visible = false;
            }
            else if(missionInfo.status == mission.MissionState.done) {
                this.progress.visible = false;
                this.btnAward.visible = true;
                this.imgOB.visible = false;
                this.imgBg.visible = true;
            }
            else if(missionInfo.status == mission.MissionState.obtaining) {
                this.progress.visible = false;
                this.btnAward.visible = false;
                this.imgOB.visible = true;
                this.imgBg.visible = false;
            }
        }

        click(tag:egret.DisplayObject):void {
            if(tag == this.btnAward) {
                mission.getProxy().getAward(this.data);
                if(this.missionTemplate) {
                    mc2sdk.event(mc2sdk.EVENT_TYPE.MISSION_AWARD,{templateId:this.missionTemplate.id,name:this.missionTemplate.missionName});
                }
            }
        }
    }
}