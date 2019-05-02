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
    var InfoTipEditUIMoudleComp = (function (_super) {
        __extends(InfoTipEditUIMoudleComp, _super);
        function InfoTipEditUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.oldType = 0;
            _this.oldDesc = "";
            _this.toBeTipUid = 0;
            _this.modifyTime = 0;
            _this.nowType = 0;
            _this.nowDesc = "";
            _this.skinName = "InfoTipEditUISkin";
            return _this;
        }
        InfoTipEditUIMoudleComp.prototype.opening = function () {
            _super.prototype.opening.call(this);
            // user.getProxy().getMyCustomTips()
        };
        InfoTipEditUIMoudleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            app.mvc.AppFacade.getInstance().registerMediator(new myInfo.InfoTipEditMediator(this));
            this.btnTipJinshen.setData(myInfo.TipBgColor.Blue, "手紧型", false);
            this.btnTipLaojianjuhua.setData(myInfo.TipBgColor.Red, "手松型", false);
            this.btnTipDajiangyou.setData(myInfo.TipBgColor.Gray, "跟注站", false);
            this.btnTipJingyanfengfu.setData(myInfo.TipBgColor.Yellow, "鱼", false);
            this.bindButton(this.btnTipJinshen);
            this.bindButton(this.btnTipLaojianjuhua);
            this.bindButton(this.btnTipDajiangyou);
            this.bindButton(this.btnTipJingyanfengfu);
            this.bindButton(this.btnClose);
            this.bindButton(this.btnSaveAndClose);
            this.tipList = [this.btnTipJinshen, this.btnTipLaojianjuhua, this.btnTipDajiangyou, this.btnTipJingyanfengfu];
            var infovo = this.uiOpenData[0];
            if (infovo) {
                this.userLabelVO = infovo.label;
            }
            if (this.userLabelVO) {
                this.oldType = this.userLabelVO.labelType == undefined ? 0 : this.userLabelVO.labelType;
                this.oldDesc = this.userLabelVO.labelName;
                this.modifyTime = this.userLabelVO.modifyTime == undefined ? 0 : this.userLabelVO.modifyTime;
            }
            this.roleVO = this.uiOpenData[1];
            if (this.roleVO) {
                this.toBeTipUid = this.roleVO.roleId == undefined ? 0 : this.roleVO.roleId;
            }
            // console.log(this.userLabelVO, infovo,this.roleVO);
            this.inputCustomTip.text = this.oldDesc;
            if (this.modifyTime > 0) {
                // this.txtLastDate.text = "上次标记：" + DateUtils.getLastDate(this.modifyTime);
                this.txtLastDate.text = "上次标记：" + DateUtils.dateFormat(this.modifyTime * 1000, "yyyy年MM月dd日");
            }
            else {
                this.txtLastDate.text = "";
            }
            this.chkLight(this.oldType);
            this.nowType = this.oldType;
        };
        InfoTipEditUIMoudleComp.prototype.chkLight = function (type) {
            if (type > 0 && type < 5) {
                if (type == 1) {
                    this.lightOff();
                    this.btnTipJinshen.setLight(true);
                }
                else if (type == 2) {
                    this.lightOff();
                    this.btnTipLaojianjuhua.setLight(true);
                }
                else if (type == 3) {
                    this.lightOff();
                    this.btnTipDajiangyou.setLight(true);
                }
                else if (type == 4) {
                    this.lightOff();
                    this.btnTipJingyanfengfu.setLight(true);
                }
            }
            else {
                this.lightOff();
            }
        };
        InfoTipEditUIMoudleComp.prototype.lightOff = function () {
            for (var i = 0; i < this.tipList.length; i++) {
                var tip = this.tipList[i];
                tip.setLight(false);
            }
        };
        InfoTipEditUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            console.log(this.oldType, this.nowType);
            var tempType = 0;
            switch (clickTarget) {
                case this.btnTipJinshen:
                    tempType = 1;
                    if (this.nowType == tempType) {
                        this.nowType = 0;
                    }
                    else {
                        this.nowType = 1;
                    }
                    this.chkLight(this.nowType);
                    break;
                case this.btnTipLaojianjuhua:
                    tempType = 2;
                    if (this.nowType == tempType) {
                        this.nowType = 0;
                    }
                    else {
                        this.nowType = 2;
                    }
                    this.chkLight(this.nowType);
                    break;
                case this.btnTipDajiangyou:
                    tempType = 3;
                    if (this.nowType == tempType) {
                        this.nowType = 0;
                    }
                    else {
                        this.nowType = 3;
                    }
                    this.chkLight(this.nowType);
                    break;
                case this.btnTipJingyanfengfu:
                    tempType = 4;
                    if (this.nowType == tempType) {
                        this.nowType = 0;
                    }
                    else {
                        this.nowType = 4;
                    }
                    this.chkLight(this.nowType);
                    break;
                case this.btnClose:
                    this.close();
                    break;
                case this.btnSaveAndClose:
                    mc2sdk.event(50087 /* EDIT_TIP_SAVE_AND_CLOSE */); // 埋点
                    this.chkSendCmd();
                    this.close();
                    break;
            }
        };
        InfoTipEditUIMoudleComp.prototype.showEvent = function () {
            // this.inputCustomTip.text = "";
        };
        InfoTipEditUIMoudleComp.prototype.chkSendCmd = function () {
            var hasTypeChange = false;
            var hasDescChange = false;
            console.log(this.nowType, this.oldType, this.oldDesc, this.inputCustomTip.text);
            if (this.nowType >= 0 && this.nowType != this.oldType) {
                // 类型修改了
                hasTypeChange = true;
            }
            if (this.inputCustomTip.text != this.oldDesc) {
                // 类型修改了
                hasDescChange = true;
            }
            console.log(hasTypeChange, hasDescChange);
            if (hasTypeChange || hasDescChange) {
                __SEND_NOTIFICATION(app.NetAction.REQ_ADD_LABEL, [this.nowType, this.inputCustomTip.text, this.toBeTipUid]);
            }
        };
        InfoTipEditUIMoudleComp.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(myInfo.InfoTipEditMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return InfoTipEditUIMoudleComp;
    }(app.base.BaseWndUIMoudleComponent));
    myInfo.InfoTipEditUIMoudleComp = InfoTipEditUIMoudleComp;
    __reflect(InfoTipEditUIMoudleComp.prototype, "myInfo.InfoTipEditUIMoudleComp");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=InfoTipEditUIMoudleComp.js.map