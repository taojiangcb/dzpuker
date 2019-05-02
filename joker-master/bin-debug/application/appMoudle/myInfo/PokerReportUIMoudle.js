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
    var PokerReportUIMoudle = (function (_super) {
        __extends(PokerReportUIMoudle, _super);
        function PokerReportUIMoudle() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "resource/app_skin/pokerInfo/PokerReportUIMoudleSkin.exml";
            return _this;
        }
        PokerReportUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.bgimage, false);
            this.bindButton(this.btn2);
        };
        PokerReportUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.bgimage:
                case this.btn2:
                    this.clickBackEvent();
                    break;
            }
        };
        PokerReportUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        PokerReportUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PokerReportUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    myInfo.PokerReportUIMoudle = PokerReportUIMoudle;
    __reflect(PokerReportUIMoudle.prototype, "myInfo.PokerReportUIMoudle");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=PokerReportUIMoudle.js.map