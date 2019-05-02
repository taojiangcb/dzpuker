var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var myInfo;
(function (myInfo) {
    /**
     *我的信息面板
     * @author
     *
     */
    var MyInfoUIMoudleComp = (function (_super) {
        __extends(MyInfoUIMoudleComp, _super);
        function MyInfoUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "MyInfoUIMoudleSkin";
            return _this;
        }
        MyInfoUIMoudleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            app.mvc.AppFacade.getInstance().registerMediator(new myInfo.MyInfoUIMoudMediator(this));
            this.bindButton(this.avtar, false);
            this.infoType1.bottom = 85; //个人信息界面，下面有按钮，所以底框向上留出位置
            this.bindButton(this.recordButton);
            this.bindButton(this.dataButton);
            this.bindButton(this.backButton);
            // this.bindButton(this.bgimage, false);
            this.complaintButton.visible = false;
            this.buddyButton.visible = false;
            this.dataButton2.visible = false;
            this.fristList.visible = false;
            // this.infoType1.btnRecord.visible = true;
            // this.infoType2.btn1.visible = true;
            // this.infoType2.btn2.visible = true;
            this.btnDianjiyanzheng.visible = false;
            this.imgYiyanzheng.visible = false;
            this.bindButton(this.btnDianjiyanzheng);
            this.group_wrap.height = 390;
        };
        MyInfoUIMoudleComp.prototype.addedToStage = function (evt) {
            this.showEvent();
        };
        MyInfoUIMoudleComp.prototype.opening = function () {
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
            this.showEvent();
        };
        MyInfoUIMoudleComp.prototype.showEvent = function () {
            if (user.getProxy().svrGameData) {
                var vo = new cyvos.PlayerInfo();
                vo.numWins = user.getProxy().svrGameData.numWins;
                vo.numLosts = user.getProxy().svrGameData.numLosts;
                vo.numPeaces = user.getProxy().svrGameData.numPeaces;
                vo.numEscapes = user.getProxy().svrGameData.numEscapes;
                this.roleVO = vo;
            }
            this.playVO = user.getProxy().playInfoVO;
            this.avtar.source = user.getProxy().getHeadStr(user.getProxy().svrHeadId);
            this.currentCom = this.infoType1;
            this.currentCom.setData(this.roleVO, this.playVO);
            this.infoType2.setData(this.roleVO, this.playVO);
            this.usID.text = "ID: " + user.getProxy().svrRoleId;
            // 是自己的界面
            // 判断是否认证过，和是否需要认证
            if (!antiSystem.isRNV()) {
                this.btnDianjiyanzheng.visible = true;
                this.imgYiyanzheng.visible = false;
            }
            else {
                this.btnDianjiyanzheng.visible = false;
                this.imgYiyanzheng.visible = true;
            }
            if (0 /* FEMALE */ == user.getProxy().sex) {
                this.iconInfo1["icon"].source = "icon_info_sex0_png";
            }
            else {
                this.iconInfo1["icon"].source = "icon_info_sex1_png";
            }
            this.iconInfo1["label"].text = user.getProxy().svrName;
            this.iconInfo2["icon"].source = "icon_caoma_png";
            if (user.getProxy().svrGameData) {
                this.iconInfo2["label"].text = FormatUtils.spot(user.getProxy().svrGameData.silver);
            }
            this.iconInfo3["icon"].source = "icon_vip_png";
            var nextTime = 0; //this.roleVO.vipTime - app.SystemTimer.getServerTime();
            if (nextTime < 0) {
                nextTime = 0;
            }
            this.iconInfo3["label"].text = "未开放"; //gameabc.ResourceBundleUtil.getMessage("RESIDUAL_TIME") + DateUtils.formatTime5(nextTime, ['天', '时']);
        };
        MyInfoUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnDianjiyanzheng:
                    __OPEN_PRE_MOUDLE(AppReg.APP_RELAN_NAME);
                    this.close();
                    break;
                case this.avtar:
                    this.clickBackEvent();
                    __OPEN_PRE_MOUDLE(AppReg.APP_HEAD);
                    break;
                // case this.bgimage:
                //     this.clickBackEvent()
                //     break;
                case this.tabButton1:
                    this.currentCom.visible = false;
                    this.currentCom = this.infoType1;
                    this.currentCom.visible = true;
                    this.currentCom.setData(this.roleVO, this.playVO);
                    break;
                case this.tabButton2:
                    this.tabButton1.selected = true;
                    this.tabButton2.selected = false;
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                    //                    this.currentCom.visible = false;
                    //                    this.currentCom = this.infoType2;
                    //                    this.currentCom.visible = true;
                    //                    this.currentCom.setData(this.roleVO);
                    break;
                case this.backButton:
                    this.close();
                    break;
                case this.infoType1.btnRecord2:
                case this.recordButton:
                    // if(record.getProxy().isOpen)
                    // {
                    // this.clickBackEvent()
                    __OPEN_PRE_MOUDLE(AppReg.APP_PLAY_RECORD, null, [AppReg.APP_MY_INFO]);
                    // }else{
                    //     tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
                    // }
                    break;
                case this.infoType1.btnRecord:
                case this.dataButton2:
                case this.dataButton:
                    //  tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
                    // this.clickBackEvent()
                    __OPEN_PRE_MOUDLE(AppReg.APP_RECORD, null, [AppReg.APP_MY_INFO]);
                    break;
            }
        };
        MyInfoUIMoudleComp.prototype.agShowEvent = function () {
            this.currentCom.showEvent();
        };
        MyInfoUIMoudleComp.prototype.clickBackEvent = function () {
            this.close();
        };
        MyInfoUIMoudleComp.prototype.btnCancellHandler = function (event) {
        };
        MyInfoUIMoudleComp.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(myInfo.MyInfoUIMoudMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return MyInfoUIMoudleComp;
    }(app.base.BaseWndUIMoudleComponent));
    myInfo.MyInfoUIMoudleComp = MyInfoUIMoudleComp;
    __reflect(MyInfoUIMoudleComp.prototype, "myInfo.MyInfoUIMoudleComp");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=MyInfoUIMoudleComp.js.map