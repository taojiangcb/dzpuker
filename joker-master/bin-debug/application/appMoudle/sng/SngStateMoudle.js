var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sng;
(function (sng) {
    var SngStateMoudle = (function (_super) {
        __extends(SngStateMoudle, _super);
        function SngStateMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "SngMatchStateSkin";
            _this.bindTabButton(_this.tabButton1, _this.tabButton3);
            _this.selectTabButton(0);
            return _this;
        }
        SngStateMoudle.prototype.createComplete = function () {
            _super.prototype.createComplete.call(this, null);
            this.bindButton(this.closeButton);
        };
        SngStateMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    return;
                case this.tabButton1:
                    if (playcards.getTableVO() == null) {
                        this.infoList.visible = false;
                    }
                    else {
                        var players = playcards.getTableVO().seatPlayerVO.concat();
                        players.sort(this.playersSort);
                        this.infoList.dataProvider = new eui.ArrayCollection(players);
                        this.infoList.itemRenderer = sng.SngPlayerRenderer;
                    }
                    this.blindsGroup.visible = false;
                    this.rankGroup.visible = true;
                    this.rewardGroup.visible = false;
                    return;
                case this.tabButton2:
                    this.infoList.dataProvider = new eui.ArrayCollection(match.getProxy().sngList[0].rewards);
                    this.infoList.itemRenderer = sng.SngRankRenderer;
                    this.infoList.visible = true;
                    this.blindsGroup.visible = false;
                    this.rankGroup.visible = false;
                    this.rewardGroup.visible = true;
                    return;
                case this.tabButton3:
                    this.infoList.dataProvider = new eui.ArrayCollection(match.getProxy().sngList[0].blinds);
                    this.infoList.itemRenderer = sng.SngBlindsRenderer;
                    this.infoList.visible = true;
                    this.blindsGroup.visible = true;
                    this.rankGroup.visible = false;
                    this.rewardGroup.visible = false;
                    return;
            }
        };
        SngStateMoudle.prototype.playersSort = function (a, b) {
            return a.nowBet < b.nowBet ? 1 : -1;
        };
        return SngStateMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    sng.SngStateMoudle = SngStateMoudle;
    __reflect(SngStateMoudle.prototype, "sng.SngStateMoudle");
})(sng || (sng = {}));
//# sourceMappingURL=SngStateMoudle.js.map