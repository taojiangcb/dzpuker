var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bank;
(function (bank) {
    /**
 *
 * @author
 *
 */
    var BankUIMoudle = (function (_super) {
        __extends(BankUIMoudle, _super);
        function BankUIMoudle() {
            var _this = _super.call(this) || this;
            _this.selected = 0;
            // 20分钟过期
            _this.sessionTiem = 15 * 60 * 1000;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "resource/app_skin/bank/BankUIMoudleSkin.exml";
            return _this;
        }
        BankUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            app.mvc.AppFacade.getInstance().registerMediator(new bank.BankUIMoudMediator(this));
            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            this.tarbar.select(this.tabButton1);
            this.viewStack.selectedIndex = 0;
            this.trankComp1.compType = 1;
            this.trankComp2.compType = 2;
            if (this.quickAccount == null) {
                this.quickAccount = new bank.BankHttpAccount();
            }
            if (user.getProxy().roomState == 2 /* IN */) {
                user.getProxy().leaveRoom();
            }
            this.getSessionEvent();
            this.showEvent();
            // user.gotoRoom(room.getProxy().room4[0]);
            //
        };
        BankUIMoudle.prototype.getSessionEvent = function () {
            var bool = true;
            if (user.getProxy().sessionTime) {
                var now = user.getProxy().sessionTime + this.sessionTiem;
                if (app.SystemTimer.sysTime < now) {
                    bool = false;
                }
            }
            if (user.getProxy().svrTmpSession == null || user.getProxy().svrTmpSession == "" || bool || user.getProxy().httpToKen == null) {
                this.sendNotification(app.NetAction.TOOL_TEMP_SESSION);
            }
            else {
                this.quickAccount.gameListEvent();
                this.quickAccount.gameMoneyEvent(28);
            }
        };
        BankUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.tabButton1:
                    this.viewStack.selectedIndex = 0;
                    this.selected = 0;
                    this.trankComp1.upEvent();
                    this.showEvent();
                    break;
                case this.tabButton2:
                    this.viewStack.selectedIndex = 1;
                    this.selected = 1;
                    this.trankComp2.upEvent();
                    this.showEvent();
                    break;
            }
        };
        BankUIMoudle.prototype.okSetEvent = function () {
            if (user.getProxy().svrTmpSession) {
                if (this.quickAccount == null) {
                    this.quickAccount = new bank.BankHttpAccount();
                }
                this.quickAccount.toKenEvent();
            }
            else {
            }
        };
        BankUIMoudle.prototype.close = function () {
            _super.prototype.close.call(this);
            //进入房间
            if (user.getProxy().currentRoom == null) {
                // console.log("gameId:" + $GAME_ID$);
                guichu.loginLogiC().autoJoinRoom();
            }
        };
        BankUIMoudle.prototype.showEvent = function () {
            this.trankComp1.upEvent();
            this.trankComp2.upEvent();
            //            this.current["text1"].text = user.getProxy().svrGameData.bankSilver;
            //            this.current["text2"].text = user.getProxy().svrGameData.silver;
        };
        BankUIMoudle.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(bank.BankUIMoudMediator.NAME);
            if (this.trankComp1) {
                this.trankComp1.dispose();
            }
            if (this.trankComp2) {
                this.trankComp2.dispose();
            }
            if (this.quickAccount) {
                this.quickAccount.dispose();
            }
            if (this.tarbar) {
                this.tarbar.dispose();
                this.tarbar = null;
            }
            _super.prototype.dispose.call(this);
        };
        return BankUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    bank.BankUIMoudle = BankUIMoudle;
    __reflect(BankUIMoudle.prototype, "bank.BankUIMoudle");
})(bank || (bank = {}));
//# sourceMappingURL=BankUIMoudle.js.map