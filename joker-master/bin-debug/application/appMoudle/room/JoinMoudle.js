var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    /**
     *
     * @author
     *
     */
    var JoinMoudle = (function (_super) {
        __extends(JoinMoudle, _super);
        function JoinMoudle() {
            var _this = _super.call(this) || this;
            // this.top = 0;
            // this.bottom = 0;
            // this.left = 0;
            // this.right = 0;
            _this.skinName = "JoinSkin";
            return _this;
        }
        JoinMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.registerMediator(room.JoinUIMediator);
            this.tabBar = new uicomps.ButtonGroup();
            this.tabBar.add(this.createButton);
            this.tabBar.add(this.joinButton);
            this.tabBar.itemClick = this.touchHandler;
            this.tabBar.itemThisObj = this;
            this.bindButton(this.toCreateButton);
            this.bindButton(this.toVsButton, false);
            this.keyboardComp.buttonListener = this.touchBindButtonHandler;
            this.keyboardComp.buttonListenerObj = this;
            this.tabBar.select(this.createButton);
            this.showCreateGroup();
            this.verticalCenter = 30;
        };
        JoinMoudle.prototype.showCreateGroup = function () {
            this.createGroup.visible = true;
            this.keyboardComp.visible = false;
        };
        JoinMoudle.prototype.showJoinGroup = function () {
            this.createGroup.visible = false;
            this.keyboardComp.visible = true;
        };
        JoinMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.toCreateButton:
                    // tip.popSysCenterTip("FUNCTION_NO_TIPS");
                    __OPEN_MOUDLE(AppReg.CREATE_ROOM);
                    mc2sdk.event(50009 /* VIP_CREATE */);
                    return;
                case this.createButton:
                    this.showCreateGroup();
                    return;
                case this.joinButton:
                    mc2sdk.event(50010 /* VIP_JOIN */);
                    this.showJoinGroup();
                    return;
                // case this.closeBtn:
                //     this.close();
                //     return;
                case this.keyboardComp.enterButton:
                case this.keyboardComp.gotoImage:
                    var roomVO = this.parseRoomVoFromInput();
                    if (roomVO == null) {
                        tip.popSysCenterTip("输入房间ID错误，请重新输入！", tip.TIPS_TYPE.TIPS_WARNING);
                        return;
                    }
                    // if(this.checkJoinNumber()){
                    playcards.getProxy().joinNumber = this.keyboardComp.numberInput.text;
                    playcards.getProxy().openMoudle(4 /* NONE */);
                    // }
                    return;
                case this.toVsButton:
                    if (setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType7, egret.RuntimeType.WEB) == 0) {
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                    }
                    else {
                        __OPEN_MOUDLE(AppReg.CREATE_PK_ROOM);
                    }
                    mc2sdk.event(50079 /* CREATE_PK */);
                    break;
            }
        };
        JoinMoudle.prototype.parseRoomVoFromInput = function () {
            return room.getProxy().getRoomVOByJoinNumber(this.keyboardComp.numberInput.text);
        };
        JoinMoudle.prototype.gotoVipRoom = function (p) {
            user.gotoRoom(this.parseRoomVoFromInput());
        };
        JoinMoudle.prototype.close = function () {
            this.keyboardComp.numberInput.text = "";
            _super.prototype.close.call(this);
        };
        JoinMoudle.prototype.checkJoinNumber = function () {
            var joinNumber = this.keyboardComp.numberInput.text;
            if (joinNumber == "")
                return false;
            var tableId = room.getProxy().parseTableId(joinNumber);
            var tablePsd = room.getProxy().parseTablePsd(joinNumber);
            if (room.getProxy().isEmptyTable(tableId)) {
                tip.Alert.show("对不起，您来晚了，人走茶凉~");
                return false;
            }
            var sitId = room.getProxy().searchEmptySit(tableId);
            if (sitId == -1) {
                tip.Alert.show("对不起，您来晚了，已经满员~");
                return false;
            }
            return true;
            // this.sendNotification(app.NetAction.ROOM_ACTION,[1,tableId,sitId,tablePsd]);//坐下
        };
        return JoinMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    room.JoinMoudle = JoinMoudle;
    __reflect(JoinMoudle.prototype, "room.JoinMoudle");
})(room || (room = {}));
//# sourceMappingURL=JoinMoudle.js.map