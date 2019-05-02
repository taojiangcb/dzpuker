
/**
 * Created by JiangTao on 2016/6/23.
 */
module mission {
    export class MissionMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__MISSION_MEDIATOR__";
        constructor(viewComponent:any) {
            super(mission.MissionMediator.NAME,viewComponent);
        }

        //更新一条任务信息
        static UPDATE_MISSION:string = "updateMission";
        //添加一条任务信息
        static ADD_MISSION:string = "addMission";
        //某条任务已进入下个阶段
        static MISSION_LEVEL_UP:string = "missionLevelUp";
        /**
         * 什么数据都没有发生变动，只是刷新界面
         * @type {string}
         */
        static UPDATE_MISSION_DAY_UI:string = "updateMissionUI";

        /**
         * 刷新总金币
         */
        static UPDATE_GOLD_TREE:string = "UPDATE_GOLD_TREE";

        /**
         * 当前失效刷新的id
         * @type {number}
         */
        private invalidate_init:number = 0;

        listNotificationInterests():string[] {
            return [
                MissionMediator.UPDATE_MISSION,
                MissionMediator.ADD_MISSION,
                MissionMediator.MISSION_LEVEL_UP,
                MissionMediator.UPDATE_MISSION_DAY_UI,
                MissionMediator.UPDATE_GOLD_TREE
            ];
        }

        handleNotification(notification:puremvc.INotification):void {
            switch (notification.getName()) {
                case MissionMediator.ADD_MISSION:
                    this.invlaidateInitHandler();
                    var missionInfo:MissionVO = notification.getBody();
                    var count:number = mission.getProxy().getDoneCount(missionInfo.type);
                    tip.updateTip(AppConst.COUNT_SUB_TAG.SIGN_TYPE,count);
                    __SEND_NOTIFICATION( app.constant.AppMediatorConst.AWAKEN_MISSION_BOX);
                    break;
                case MissionMediator.UPDATE_MISSION:
                case MissionMediator.MISSION_LEVEL_UP:
                    var ui:mission.MissionUIModule = this.getMissionUIModule();
                    var missionInfo:MissionVO = notification.getBody();

                    /**
                     * 更新任务和成就
                     */
                    if(missionInfo.type == mission.MissionType.mission || missionInfo.type == mission.MissionType.achievement) {
                        var count:number = mission.getProxy().getDoneCount(missionInfo.type);
                        if(missionInfo.type == mission.MissionType.mission) tip.updateTip(AppConst.COUNT_SUB_TAG.MISSION_TYPE,count);
                        if(missionInfo.type == mission.MissionType.achievement) tip.updateTip(AppConst.COUNT_SUB_TAG.ACHIEVEMENT_TYPE,count);
                        if(ui != null) ui.updateMission(missionInfo);
                    }

                    /**
                     * 更新每日签到和累计奖励
                     */
                    else if(missionInfo.type == mission.MissionType.day) {
                        var count:number = mission.getProxy().getDoneCount(mission.MissionType.day);
                        tip.updateTip(AppConst.COUNT_SUB_TAG.SIGN_TYPE,count);
                        var signUI:mission.SignUIModule = this.getSignUIModule();
                        if(signUI != null) signUI.invalidateFullData();
                    }

                    /**
                     * 摇钱树任务
                     */
                    else if(missionInfo.type == mission.MissionType.godTree) {
                        //同步金币
                        this.sendNotification(app.NetAction.TOOL_RILVER, AppConst.GAME_ID_FREE);
                        if(__IS_MOUDLE_OPEN(AppReg.APP_GOLD_TREE)) {
                            var goldTreeUI:playcards.PlayCardsGodTreeUIModuleComp = this.getGoldTreeUIModule();
                            if(goldTreeUI) {
                                goldTreeUI.updateMission(missionInfo);
                            }
                        }
                    }

                    if(missionInfo.itemId > 0) {
                        gameabc.LocalSO.setItem("PROP_ITEM_NUM","1");
                        tip.updateTip(AppConst.COUNT_SUB_TAG.PROP_MOUDLE,1);
                    }
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.AWAKEN_MISSION_BOX);
                    break;
                    
                case MissionMediator.UPDATE_MISSION_DAY_UI:
                    var count:number = mission.getProxy().getDoneCount(mission.MissionType.day);
                    tip.updateTip(AppConst.COUNT_SUB_TAG.SIGN_TYPE,count);

                    var signUI:mission.SignUIModule = this.getSignUIModule();
                    if(signUI != null) signUI.invalidateFullData();
                    break;

                case MissionMediator.UPDATE_GOLD_TREE:
                    var goldTreeUI:playcards.PlayCardsGodTreeUIModuleComp = this.getGoldTreeUIModule();
                    if(goldTreeUI) goldTreeUI.invalidateFullData();
                    break;

            }
        }

        /**
         * 当前失效刷新任务列表
         */
        invlaidateInitHandler():void {
            if(this.invalidate_init > 0) {
                egret.clearTimeout(this.invalidate_init);
            }

            this.invalidate_init = egret.setTimeout(()=>{
                //任务界面
                var ui:mission.MissionUIModule = this.getMissionUIModule();
                if(ui != null) ui.initListComponent();

                //签到界面
                var signUI:mission.SignUIModule = this.getSignUIModule();
                if(signUI != null) signUI.invalidateFullData();

                //要钱树界面
                var goldTreeUI:playcards.PlayCardsGodTreeUIModuleComp = this.getGoldTreeUIModule();
                if(goldTreeUI) goldTreeUI.invalidateFullData();

            },this,100);
        }


        getGoldTreeUIModule():playcards.PlayCardsGodTreeUIModuleComp {
            if(__IS_MOUDLE_OPEN(AppReg.APP_GOLD_TREE)) {
                var goldTreeUI:playcards.PlayCardsGodTreeUIModuleComp = <playcards.PlayCardsGodTreeUIModuleComp>__GET_MOUDLE_COMP(AppReg.APP_GOLD_TREE);
                return goldTreeUI;
            }
            return null;
        }

        getMissionUIModule():mission.MissionUIModule {
            if(__IS_MOUDLE_OPEN(AppReg.APP_MISSION)) {
                return <mission.MissionUIModule>(__GET_MOUDLE(AppReg.APP_MISSION)).gui;
            }
            return null;
        }

        getSignUIModule():mission.SignUIModule {
            if(__IS_MOUDLE_OPEN(AppReg.APP_SIGN)) {
                return <mission.SignUIModule>(__GET_MOUDLE(AppReg.APP_SIGN)).gui;
            }
            return null;
        }
    }
}