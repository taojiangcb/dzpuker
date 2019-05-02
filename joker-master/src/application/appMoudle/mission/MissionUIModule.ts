/**
 * Created by JiangTao on 2016/6/23.
 */
module mission {
    // export enum OPEN_TYPE {
    //     room = 1,                   //主界面
    //     stable                      //游戏房间
    // };

    export enum TAB_TYPE {
        MISSION = 1,                //任务
        ACHIEVEMENT                 //成就
    };

    export class MissionUIModule extends app.base.BaseWndUIMoudleComponent {

        backButton:eui.Image;
        btnClose:eui.Image;
        tabMission:eui.ToggleButton;
        tabAchieve:eui.ToggleButton;
        tabbar: uicomps.ButtonGroup;
        missionList:eui.List;
        listScroll:eui.Scroller;
        btnSign:eui.Image;                               //前往签到按钮

        CD_TIME:number = 30;                            
        prevOpenTime:number = 0;                        //上次刷新的时间（只在主界面开启下有效）
        // openType:number = OPEN_TYPE.room;            //从哪个地方打开的任务界面
        tabType:number = TAB_TYPE.MISSION;              //页卡选项
        
        /**
         * itemRenderer的事件派发器，为了避免list内存泄漏所以这里自定义一个
         */
        itemDispatch:egret.EventDispatcher;

        /**
         * 列表显示所需要的数据源
         */
        itemDataProvider:eui.ArrayCollection;

        /**
         * 任务counttip
         */
        missionTipUI:tip.CountTipUI;

        /**
         * 成就counttip
         */
        achievementTipUI:tip.CountTipUI;

        /**
         * 签到countTip
         */
        signTipUI:tip.CountTipUI;

        constructor() {
            super();
            this.skinName="resource/app_skin/mission/MissionUIModuleSkin.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.tabbar = new uicomps.ButtonGroup();
            this.tabbar.add(this.tabMission);
            this.tabbar.add(this.tabAchieve);
            this.tabbar.itemThisObj = this;
            this.tabbar.itemClick = this.touchHandler;
            this.tabbar.select(this.tabMission);

            this.bindButton(this.btnSign);
            this.bindButton(this.btnClose);

            this.missionList.itemRenderer = MissionItemRenderer;
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
        }

        opening():void {
            super.opening();
            getProxy().getServerList();
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
        }

        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            var target:egret.DisplayObject = clickTarget;
            if(target == this.tabMission) {
                if(this.tabType == TAB_TYPE.MISSION) return;
                this.tabType = TAB_TYPE.MISSION;
                this.changeTabHandler();
            }
            else if(target == this.tabAchieve) {
                tip.popSysCenterTip("FUNCTION_NO_TIPS");
                this.tabbar.select(this.tabMission);
                return;

                // if(this.tabType == TAB_TYPE.ACHIEVEMENT) return;
                // this.tabType = TAB_TYPE.ACHIEVEMENT;
                // this.changeTabHandler();
            }
            else if(target == this.btnClose) {
                this.close();
            }
            else if(target == this.btnSign) {
                //打开签到界面
                __OPEN_PRE_MOUDLE(AppReg.APP_SIGN,null,null,null,this.parent);
                this.close();
            }
        }

        /**
         * 更新列表组件的数据源
         */
        private changeTabHandler():void {
            this.tabType = this.tabbar.getSelectIndex() + 1;
            var dataList:mission.MissionVO[] = mission.getMissionsByType(this.tabType);
            this.itemDataProvider = new eui.ArrayCollection(dataList);
            this.missionList.dataProvider = this.itemDataProvider;
        }

        /**
         * 刷新列表组件
         */
        initListComponent():void {
            this.changeTabHandler();
        }

        /**
         * 更新某条数据的显示
         * @param missionInfo
         */
        updateMission(missionInfo:MissionVO):void {
            if(missionInfo.type == this.tabType) {
                this.itemDataProvider.itemUpdated(missionInfo);
            }
        }

        dispose():void {

            if(this.listScroll) {
                this.listScroll.stopAnimation();
                this.listScroll.removeFromParent();
            }

            if(this.missionList) {
                this.missionList.removeFromParent();
            }

            if(this.missionTipUI) {
                this.missionTipUI.removeFromParent(true);
            }

            if(this.achievementTipUI) {
                this.achievementTipUI.removeFromParent(true);
            }

            if(this.signTipUI) {
                this.signTipUI.removeFromParent(true);
            }

            if(this.tabbar) {
                this.tabbar.dispose();
            }

            if(this.btnSign){
                this.unbindButton(this.btnSign)
            }

            if(this.btnClose) {
                this.unbindButton(this.btnClose);
            }

            this.itemDispatch = null;
            super.dispose();
        }
    }
}