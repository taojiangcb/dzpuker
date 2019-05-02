var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var HappyRoomUIMoudle = (function (_super) {
        __extends(HappyRoomUIMoudle, _super);
        function HappyRoomUIMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyRoomUIMoudleSkin";
            return _this;
            //__OPEN_PRE_MOUDLE
        }
        HappyRoomUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            app.mvc.AppFacade.getInstance().registerMediator(new happy.HappyRoomMediator(this));
            this.bindButton(this.btnGame1);
            this.bindButton(this.btnGame2);
            this.bindButton(this.btnGame3);
            this.bindButton(this.btnBanck);
        };
        HappyRoomUIMoudle.prototype.showRoomEvent = function () {
            if (room.getProxy().room5 && room.getProxy().room5.length >= 3) {
                this.txtDl1.text = "" + room.getProxy().room5[0].minBank;
                this.txtDl2.text = "" + room.getProxy().room5[1].minBank;
                this.txtDl3.text = "" + room.getProxy().room5[2].minBank;
                this.txtNum1.text = room.getProxy().room5[0].online + "/99";
                this.txtNum2.text = room.getProxy().room5[1].online + "/99";
                this.txtNum3.text = room.getProxy().room5[2].online + "/99";
                this.txtNum11.text = FormatUtils.wan4(room.getProxy().room5[0].smallBlinds) + "~" + FormatUtils.wan4(room.getProxy().room5[0].bigBlinds);
                this.txtNum21.text = FormatUtils.wan4(room.getProxy().room5[1].smallBlinds) + "~" + FormatUtils.wan4(room.getProxy().room5[1].bigBlinds);
                this.txtNum31.text = FormatUtils.wan4(room.getProxy().room5[2].smallBlinds) + "~" + FormatUtils.wan4(room.getProxy().room5[2].bigBlinds);
            }
        };
        HappyRoomUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnBanck:
                    this.close();
                    __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
                    break;
                case this.btnGame1:
                    this.jionRoomEvent(0);
                    break;
                case this.btnGame2:
                    this.jionRoomEvent(1);
                    break;
                case this.btnGame3:
                    this.jionRoomEvent(2);
                    break;
            }
        };
        HappyRoomUIMoudle.prototype.jionRoomEvent = function (roomid) {
            if (roomid === void 0) { roomid = 0; }
            // //给淼鑫测试，暂时注释
            // if (roomid == 2 && setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType5, egret.RuntimeType.WEB) == 0) {
            // 	tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
            // 	return;
            // }
            if (user.getProxy().svrGameData.silver >= room.getProxy().room5[roomid].minBank) {
                user.getProxy().exitToMoudle = AppReg.APP_HAPPY_MAIN;
                user.getProxy().joinRoom(room.getProxy().room5[roomid]);
            }
            else {
                user.getProxy().openMoney();
            }
        };
        HappyRoomUIMoudle.prototype.addParent = function () {
            _super.prototype.addParent.call(this);
            var roomIdArr = [];
            for (var i = 0; i < 3; ++i) {
                if (room.getProxy().room5[i]) {
                    roomIdArr.push(room.getProxy().room5[i].svrRoomId);
                }
            }
            this.sendNotification(app.NetAction.TOOL_NUMPLAYERS, roomIdArr);
            this.showRoomEvent();
        };
        HappyRoomUIMoudle.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(happy.HappyRoomMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return HappyRoomUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    happy.HappyRoomUIMoudle = HappyRoomUIMoudle;
    __reflect(HappyRoomUIMoudle.prototype, "happy.HappyRoomUIMoudle");
})(happy || (happy = {}));
//# sourceMappingURL=HappyRoomUIMoudle.js.map