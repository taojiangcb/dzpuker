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
     *打牌中的玩家信息
     * @author
     *
     */
    var PokerGPSUIMoudle = (function (_super) {
        __extends(PokerGPSUIMoudle, _super);
        function PokerGPSUIMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/pokerInfo/PokerGPSUIMoudleSkin.exml";
            return _this;
        }
        PokerGPSUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.bgimage);
        };
        PokerGPSUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.bgimage:
                    this.clickBackEvent();
                    break;
            }
        };
        PokerGPSUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        PokerGPSUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PokerGPSUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    myInfo.PokerGPSUIMoudle = PokerGPSUIMoudle;
    __reflect(PokerGPSUIMoudle.prototype, "myInfo.PokerGPSUIMoudle");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=PokerGPSUIMoudle.js.map