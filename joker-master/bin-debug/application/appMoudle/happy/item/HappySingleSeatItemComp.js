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
    /**
     *
     * @author
     *
     */
    var HappySingleSeatItemComp = (function (_super) {
        __extends(HappySingleSeatItemComp, _super);
        function HappySingleSeatItemComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyNotSeatItemSkin";
            return _this;
        }
        HappySingleSeatItemComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
        };
        HappySingleSeatItemComp.prototype.dataChanged = function () {
            if (this.data) {
                this.info = this.data;
                this.namelab.text = this.info.name;
                this.numlab.text = FormatUtils.wan4(this.info.totalBet) + "";
                this.avatar.source = user.getProxy().getHeadStr(Number(this.info.avatarID));
            }
        };
        return HappySingleSeatItemComp;
    }(uicomps.BaseItemCilckRenderer));
    happy.HappySingleSeatItemComp = HappySingleSeatItemComp;
    __reflect(HappySingleSeatItemComp.prototype, "happy.HappySingleSeatItemComp");
})(happy || (happy = {}));
//# sourceMappingURL=HappySingleSeatItemComp.js.map