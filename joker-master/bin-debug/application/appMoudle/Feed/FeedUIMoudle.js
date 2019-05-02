var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var feed;
(function (feed) {
    /**
  *
  * @author
  *
  */
    var FeedUIMoudle = (function (_super) {
        __extends(FeedUIMoudle, _super);
        function FeedUIMoudle() {
            var _this = _super.call(this) || this;
            _this.isRecordOpen = false;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "FeedUIMoudleSkin";
            return _this;
        }
        FeedUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            app.mvc.AppFacade.getInstance().registerMediator(new feed.FeedUIMoudleMediator(this));
            this.bindButton(this.btnColse);
            this.bindButton(this.btnCancel);
            this.bindButton(this.btnOk);
            this.bindButton(this.btnCancel1);
            this.bindButton(this.btnOk1);
            // this.bindButton(this.cardInfo["btnOk"])
            this.userInfo["fristList"].itemRenderer = feed.FeedInfoItem;
            // this.qqTextInput.addEventListener(egret.Event.FOCUS_IN,this.inputHandler,this)
            //this.qqTextInput.addEventListener(egret.Event.FOCUS_OUT,this.inputOutHandler,this)
            //this.phTextInput.addEventListener(egret.Event.FOCUS_IN,this.inputHandler,this)
            // this.phTextInput.addEventListener(egret.Event.FOCUS_OUT,this.inputOutHandler,this)
        };
        FeedUIMoudle.prototype.inputOutHandler = function (evt) {
            var tag = evt.currentTarget;
            if (tag == this.qqTextInput) {
                if (this.qqTextInput.text == "") {
                    this.qqTextInput.text = "0";
                }
            }
            if (tag == this.phTextInput) {
                if (this.phTextInput.text == "") {
                    this.phTextInput.text = "0";
                }
            }
        };
        FeedUIMoudle.prototype.inputHandler = function (evt) {
            var tag = evt.currentTarget;
            if (tag == this.qqTextInput) {
                if (this.qqTextInput.text == "0") {
                    this.qqTextInput.text = "";
                }
            }
            if (tag == this.phTextInput) {
                if (this.phTextInput.text == "0") {
                    this.phTextInput.text = "";
                }
            }
        };
        FeedUIMoudle.prototype.opening = function () {
            this.secondGroup.visible = false;
            this.firstGroup.visible = true;
            if (this.uiOpenData) {
                if (this.uiOpenData instanceof appvos.DZRecordVO) {
                    this.infoVO = this.uiOpenData;
                }
                else if (this.uiOpenData instanceof Array) {
                    this.infoVO = this.uiOpenData[0];
                    this.opInfo = this.uiOpenData[2];
                    if (this.uiOpenData[1] == 1) {
                        this.isRecordOpen = true;
                    }
                }
                record.getProxy().getLocalVideo(this.infoVO);
                this.video = this.infoVO.video;
            }
            // this.cardInfo["jbGroup"].visible = this.isRecordOpen;
            this.showEvent();
        };
        FeedUIMoudle.prototype.showEvent = function () {
            if (this.collection == null) {
                this.collection = new eui.ArrayCollection();
            }
            var listArr = [];
            if (this.video && this.video.tablevo) {
                var arr = this.video.tablevo.seatPlayerVO;
                if (arr) {
                    for (var i = 0; i < arr.length; i++) {
                        var info = arr[i];
                        if (info && info.roleId != user.getProxy().svrRoleId) {
                            var obj = {};
                            if (this.opInfo && info.roleId == this.opInfo.roleId) {
                                obj = { info: info, choice: 1 };
                            }
                            else {
                                obj = { info: info, choice: 0 };
                            }
                            listArr.push(obj);
                        }
                    }
                }
            }
            if (listArr) {
                this.collection.source = listArr;
                this.userInfo["fristList"].dataProvider = this.collection;
            }
            this.showCarInof();
        };
        FeedUIMoudle.prototype.showCarInof = function () {
            if (this.infoVO) {
                this.cardInfo["card1"].source = playcards.getProxy().getCardName(this.infoVO.myCard[0]);
                this.cardInfo["card2"].source = playcards.getProxy().getCardName(this.infoVO.myCard[1]);
                this.cardInfo["txt1"].text = gameabc.ResourceBundleUtil.getMessage("PLAY_ROOM_HEAD_CARD", this.infoVO.handNum);
                this.cardInfo["txt2"].text = gameabc.ResourceBundleUtil.getMessage("PLAY_ROOM_TIPS_TIPS" + this.infoVO.type) + ":" + FormatUtils.wan(this.infoVO.smallBlinds) + "/" + FormatUtils.wan(this.infoVO.bigBlinds);
            }
        };
        FeedUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnColse:
                case this.btnCancel:
                case this.btnCancel1:
                    this.close();
                    break;
                case this.btnOk:
                    var tabvo = playcards.getTableVO();
                    var id = user.getProxy().svrNumId;
                    if (tabvo && tabvo.whiteReporter && tabvo.whiteReporter.indexOf(id) != -1) {
                        __PVO().i(user.getProxy().getNumId(this.opInfo.roleId)).to(app.NetAction.REQ_REPORT_PLAYER);
                    }
                    this.showSecondGroup();
                    if (this.feedbackRoleIds == "") {
                        tip.popSysCenterTip("请选择要举报的人！", tip.TIPS_TYPE.TIPS_WARNING);
                    }
                    else {
                        this.firstGroup.visible = false;
                        this.secondGroup.visible = true;
                    }
                    break;
                case this.btnOk1:
                    // var param: appvos.ParamVO = new appvos.ParamVO();
                    // param.longValues = [__SET_INT64(user.getProxy().svrRoleId)]
                    //param.strValues = [app.NetAction.DZ_FEEDBACK_ADD];
                    var vos = new appvos.FeedbackVO();
                    vos.id = 0;
                    vos.roleId = user.getProxy().svrRoleId;
                    vos.roleName = user.getProxy().svrName;
                    vos.feedbackRoleIds = this.feedbackRoleIds;
                    vos.feedbackRoleNames = this.feedbackRoleNames;
                    vos.context = "双簧";
                    vos.qq = this.qqTextInput.text;
                    vos.phone = this.phTextInput.text;
                    vos.status = 0;
                    vos.video = this.video;
                    vos.createTime = 0;
                    //var a = vos.toArrayBuffer();
                    // param.data = [a];
                    __SEND_NOTIFICATION(app.NetAction.DZ_FEEDBACK_ADD, vos.toArrayBuffer());
                    this.close();
                    break;
            }
        };
        FeedUIMoudle.prototype.showSecondGroup = function () {
            this.feedbackRoleIds = "";
            this.feedbackRoleNames = "";
            for (var i = 0; i < this.userInfo["fristList"].dataProvider.length; i++) {
                var obj = this.userInfo["fristList"].dataProvider.getItemAt(i);
                if (obj && obj.choice == 1) {
                    if (this.feedbackRoleIds == "" || this.feedbackRoleNames == "") {
                        this.feedbackRoleIds += obj.info.roleId;
                        this.feedbackRoleNames += obj.info.name;
                    }
                    else {
                        this.feedbackRoleIds += "," + obj.info.roleId;
                        this.feedbackRoleNames += "," + obj.info.name;
                    }
                }
            }
            this.feedName.text = this.feedbackRoleNames;
        };
        FeedUIMoudle.prototype.dispose = function () {
            this.qqTextInput.removeEventListener(egret.Event.FOCUS_IN, this.inputHandler, this);
            this.qqTextInput.removeEventListener(egret.Event.FOCUS_OUT, this.inputOutHandler, this);
            this.phTextInput.removeEventListener(egret.Event.FOCUS_IN, this.inputHandler, this);
            this.phTextInput.removeEventListener(egret.Event.FOCUS_OUT, this.inputOutHandler, this);
            app.mvc.AppFacade.getInstance().removeMediator(feed.FeedUIMoudleMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return FeedUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    feed.FeedUIMoudle = FeedUIMoudle;
    __reflect(FeedUIMoudle.prototype, "feed.FeedUIMoudle");
})(feed || (feed = {}));
//# sourceMappingURL=FeedUIMoudle.js.map