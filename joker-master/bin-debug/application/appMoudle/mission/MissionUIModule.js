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
    // export enum OPEN_TYPE {
    //     room = 1,                   //主界面
    //     stable                      //游戏房间
    // };
    var TAB_TYPE;
    (function (TAB_TYPE) {
        TAB_TYPE[TAB_TYPE["MISSION"] = 1] = "MISSION";
        TAB_TYPE[TAB_TYPE["ACHIEVEMENT"] = 2] = "ACHIEVEMENT"; //成就
    })(TAB_TYPE = mission.TAB_TYPE || (mission.TAB_TYPE = {}));
    ;
    var MissionUIModule = (function (_super) {
        __extends(MissionUIModule, _super);
        function MissionUIModule() {
            var _this = _super.call(this) || this;
            _this.CD_TIME = 30;
            _this.prevOpenTime = 0; //上次刷新的时间（只在主界面开启下有效）
            // openType:number = OPEN_TYPE.room;            //从哪个地方打开的任务界面
            _this.tabType = TAB_TYPE.MISSION; //页卡选项
            _this.skinName = "resource/app_skin/mission/MissionUIModuleSkin.exml";
            return _this;
        }
        MissionUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.tabbar = new uicomps.ButtonGroup();
            this.tabbar.add(this.tabMission);
            this.tabbar.add(this.tabAchieve);
            this.tabbar.itemThisObj = this;
            this.tabbar.itemClick = this.touchHandler;
            this.tabbar.select(this.tabMission);
            this.bindButton(this.btnSign);
            this.bindButton(this.btnClose);
            this.missionList.itemRenderer = mission.MissionItemRenderer;
            this.itemDispatch = new egret.EventDispatcher();
            var missionTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.MISSION_TYPE);
            this.missionTipUI = new tip.CountTipUI(missionTipData);
            this.missionTipUI.x = 200;
            this.missionTipUI.y = 10;
            this.tabMission.addChild(this.missionTipUI);
            var achievementData = tip.getTipData(AppConst.COUNT_SUB_TAG.ACHIEVEMENT_TYPE);
            this.achievementTipUI = new tip.CountTipUI(achievementData);
            this.achievementTipUI.x = 200;
            this.achievementTipUI.y = 10;
            this.tabAchieve.addChild(this.achievementTipUI);
            var signTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.SIGN_TYPE);
            this.signTipUI = new tip.CountTipUI(signTipData);
            this.signTipUI.x = this.btnSign.x + 136;
            this.signTipUI.y = this.btnSign.y;
            this.addChild(this.signTipUI);
            this.initListComponent();
        };
        MissionUIModule.prototype.opening = function () {
            _super.prototype.opening.call(this);
            mission.getProxy().getServerList();
            //发送请求
            // this.openType = this.uiOpenData[0];
            // if(this.openType == OPEN_TYPE.room) {
            //     var nowTime:number = egret.getTimer() / 1000;
            //     if (this.prevOpenTime == 0 || nowTime - this.prevOpenTime >= this.CD_TIME) {
            //         this.prevOpenTime = nowTime;
            //发送请求
            // __SEND_NOTIFICATION(app.NetAction.REQ_DI_BAO,3000);
            //     }
            // }
        };
        MissionUIModule.prototype.touchBindButtonHandler = function (clickTarget) {
            var target = clickTarget;
            if (target == this.tabMission) {
                if (this.tabType == TAB_TYPE.MISSION)
                    return;
                this.tabType = TAB_TYPE.MISSION;
                this.changeTabHandler();
            }
            else if (target == this.tabAchieve) {
                tip.popSysCenterTip("FUNCTION_NO_TIPS");
                this.tabbar.select(this.tabMission);
                return;
            }
            else if (target == this.btnClose) {
                this.close();
            }
            else if (target == this.btnSign) {
                //打开签到界面
                __OPEN_PRE_MOUDLE(AppReg.APP_SIGN, null, null, null, this.parent);
                this.close();
            }
        };
        /**
         * 更新列表组件的数据源
         */
        MissionUIModule.prototype.changeTabHandler = function () {
            this.tabType = this.tabbar.getSelectIndex() + 1;
            var dataList = mission.getMissionsByType(this.tabType);
            this.itemDataProvider = new eui.ArrayCollection(dataList);
            this.missionList.dataProvider = this.itemDataProvider;
        };
        /**
         * 刷新列表组件
         */
        MissionUIModule.prototype.initListComponent = function () {
            this.changeTabHandler();
        };
        /**
         * 更新某条数据的显示
         * @param missionInfo
         */
        MissionUIModule.prototype.updateMission = function (missionInfo) {
            if (missionInfo.type == this.tabType) {
                this.itemDataProvider.itemUpdated(missionInfo);
            }
        };
        MissionUIModule.prototype.dispose = function () {
            if (this.listScroll) {
                this.listScroll.stopAnimation();
                this.listScroll.removeFromParent();
            }
            if (this.missionList) {
                this.missionList.removeFromParent();
            }
            if (this.missionTipUI) {
                this.missionTipUI.removeFromParent(true);
            }
            if (this.achievementTipUI) {
                this.achievementTipUI.removeFromParent(true);
            }
            if (this.signTipUI) {
                this.signTipUI.removeFromParent(true);
            }
            if (this.tabbar) {
                this.tabbar.dispose();
            }
            if (this.btnSign) {
                this.unbindButton(this.btnSign);
            }
            if (this.btnClose) {
                this.unbindButton(this.btnClose);
            }
            this.itemDispatch = null;
            _super.prototype.dispose.call(this);
        };
        return MissionUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    mission.MissionUIModule = MissionUIModule;
    __reflect(MissionUIModule.prototype, "mission.MissionUIModule");
})(mission || (mission = {}));
//# sourceMappingURL=MissionUIModule.js.map