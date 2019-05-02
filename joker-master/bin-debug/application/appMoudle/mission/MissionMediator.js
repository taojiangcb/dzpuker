var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/6/23.
 */
var mission;
(function (mission) {
    var MissionMediator = (function (_super) {
        __extends(MissionMediator, _super);
        function MissionMediator(viewComponent) {
            var _this = _super.call(this, mission.MissionMediator.NAME, viewComponent) || this;
            /**
             * 当前失效刷新的id
             * @type {number}
             */
            _this.invalidate_init = 0;
            return _this;
        }
        MissionMediator.prototype.listNotificationInterests = function () {
            return [
                MissionMediator.UPDATE_MISSION,
                MissionMediator.ADD_MISSION,
                MissionMediator.MISSION_LEVEL_UP,
                MissionMediator.UPDATE_MISSION_DAY_UI,
                MissionMediator.UPDATE_GOLD_TREE
            ];
        };
        MissionMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case MissionMediator.ADD_MISSION:
                    this.invlaidateInitHandler();
                    var missionInfo = notification.getBody();
                    var count = mission.getProxy().getDoneCount(missionInfo.type);
                    tip.updateTip(AppConst.COUNT_SUB_TAG.SIGN_TYPE, count);
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.AWAKEN_MISSION_BOX);
                    break;
                case MissionMediator.UPDATE_MISSION:
                case MissionMediator.MISSION_LEVEL_UP:
                    var ui = this.getMissionUIModule();
                    var missionInfo = notification.getBody();
                    /**
                     * 更新任务和成就
                     */
                    if (missionInfo.type == mission.MissionType.mission || missionInfo.type == mission.MissionType.achievement) {
                        var count = mission.getProxy().getDoneCount(missionInfo.type);
                        if (missionInfo.type == mission.MissionType.mission)
                            tip.updateTip(AppConst.COUNT_SUB_TAG.MISSION_TYPE, count);
                        if (missionInfo.type == mission.MissionType.achievement)
                            tip.updateTip(AppConst.COUNT_SUB_TAG.ACHIEVEMENT_TYPE, count);
                        if (ui != null)
                            ui.updateMission(missionInfo);
                    }
                    else if (missionInfo.type == mission.MissionType.day) {
                        var count = mission.getProxy().getDoneCount(mission.MissionType.day);
                        tip.updateTip(AppConst.COUNT_SUB_TAG.SIGN_TYPE, count);
                        var signUI = this.getSignUIModule();
                        if (signUI != null)
                            signUI.invalidateFullData();
                    }
                    else if (missionInfo.type == mission.MissionType.godTree) {
                        //同步金币
                        this.sendNotification(app.NetAction.TOOL_RILVER, AppConst.GAME_ID_FREE);
                        if (__IS_MOUDLE_OPEN(AppReg.APP_GOLD_TREE)) {
                            var goldTreeUI = this.getGoldTreeUIModule();
                            if (goldTreeUI) {
                                goldTreeUI.updateMission(missionInfo);
                            }
                        }
                    }
                    if (missionInfo.itemId > 0) {
                        gameabc.LocalSO.setItem("PROP_ITEM_NUM", "1");
                        tip.updateTip(AppConst.COUNT_SUB_TAG.PROP_MOUDLE, 1);
                    }
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.AWAKEN_MISSION_BOX);
                    break;
                case MissionMediator.UPDATE_MISSION_DAY_UI:
                    var count = mission.getProxy().getDoneCount(mission.MissionType.day);
                    tip.updateTip(AppConst.COUNT_SUB_TAG.SIGN_TYPE, count);
                    var signUI = this.getSignUIModule();
                    if (signUI != null)
                        signUI.invalidateFullData();
                    break;
                case MissionMediator.UPDATE_GOLD_TREE:
                    var goldTreeUI = this.getGoldTreeUIModule();
                    if (goldTreeUI)
                        goldTreeUI.invalidateFullData();
                    break;
            }
        };
        /**
         * 当前失效刷新任务列表
         */
        MissionMediator.prototype.invlaidateInitHandler = function () {
            var _this = this;
            if (this.invalidate_init > 0) {
                egret.clearTimeout(this.invalidate_init);
            }
            this.invalidate_init = egret.setTimeout(function () {
                //任务界面
                var ui = _this.getMissionUIModule();
                if (ui != null)
                    ui.initListComponent();
                //签到界面
                var signUI = _this.getSignUIModule();
                if (signUI != null)
                    signUI.invalidateFullData();
                //要钱树界面
                var goldTreeUI = _this.getGoldTreeUIModule();
                if (goldTreeUI)
                    goldTreeUI.invalidateFullData();
            }, this, 100);
        };
        MissionMediator.prototype.getGoldTreeUIModule = function () {
            if (__IS_MOUDLE_OPEN(AppReg.APP_GOLD_TREE)) {
                var goldTreeUI = __GET_MOUDLE_COMP(AppReg.APP_GOLD_TREE);
                return goldTreeUI;
            }
            return null;
        };
        MissionMediator.prototype.getMissionUIModule = function () {
            if (__IS_MOUDLE_OPEN(AppReg.APP_MISSION)) {
                return (__GET_MOUDLE(AppReg.APP_MISSION)).gui;
            }
            return null;
        };
        MissionMediator.prototype.getSignUIModule = function () {
            if (__IS_MOUDLE_OPEN(AppReg.APP_SIGN)) {
                return (__GET_MOUDLE(AppReg.APP_SIGN)).gui;
            }
            return null;
        };
        return MissionMediator;
    }(app.mvc.AbstractMediator));
    MissionMediator.NAME = "__MISSION_MEDIATOR__";
    //更新一条任务信息
    MissionMediator.UPDATE_MISSION = "updateMission";
    //添加一条任务信息
    MissionMediator.ADD_MISSION = "addMission";
    //某条任务已进入下个阶段
    MissionMediator.MISSION_LEVEL_UP = "missionLevelUp";
    /**
     * 什么数据都没有发生变动，只是刷新界面
     * @type {string}
     */
    MissionMediator.UPDATE_MISSION_DAY_UI = "updateMissionUI";
    /**
     * 刷新总金币
     */
    MissionMediator.UPDATE_GOLD_TREE = "UPDATE_GOLD_TREE";
    mission.MissionMediator = MissionMediator;
    __reflect(MissionMediator.prototype, "mission.MissionMediator");
})(mission || (mission = {}));
//# sourceMappingURL=MissionMediator.js.map