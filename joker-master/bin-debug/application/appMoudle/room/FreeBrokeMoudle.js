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
    var FreeBrokeMoudle = (function (_super) {
        __extends(FreeBrokeMoudle, _super);
        function FreeBrokeMoudle() {
            var _this = _super.call(this) || this;
            _this.left = _this.top = _this.right = _this.bottom = 0;
            _this.skinName = "FreeBrokeSkin";
            return _this;
        }
        FreeBrokeMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnClose);
            this.bindButton(this.btnGetAward);
        };
        FreeBrokeMoudle.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this.btnClose:
                    user.getProxy().freeFlagCancel = true;
                    this.close();
                    break;
                case this.btnGetAward:
                    user.getProxy().freeFlagCancel = false;
                    mission.getProxy().getAward(this.uiOpenData, AppConst.GAME_ID_FREE);
                    this.btnGetAward.touchEnabled = false;
                    this.btnGetAward.alpha = 0.6;
                    this.close();
                    break;
            }
        };
        FreeBrokeMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.sendNotification(app.NetAction.TOOL_RILVER, AppConst.GAME_ID_FREE);
        };
        return FreeBrokeMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    room.FreeBrokeMoudle = FreeBrokeMoudle;
    __reflect(FreeBrokeMoudle.prototype, "room.FreeBrokeMoudle");
})(room || (room = {}));
//# sourceMappingURL=FreeBrokeMoudle.js.map