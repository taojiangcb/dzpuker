var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mammon;
(function (mammon) {
    var MammonUIMoudle = (function (_super) {
        __extends(MammonUIMoudle, _super);
        function MammonUIMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/mammon/MammonUIModule.exml";
            return _this;
        }
        MammonUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.okBtn);
            this.bindButton(this.btnClose);
            this.fullDataUI();
        };
        MammonUIMoudle.prototype.fullDataUI = function () {
            if (!this.initialized)
                return;
            if (playcards.getTableVO()) {
                var totalRound = playcards.getTableVO().caishentime;
                var nowRound = playcards.getTableVO().caishenround;
                var tagRound = Math.max(totalRound - nowRound, 0);
                var messStr = gameabc.getMessage("MAMMON_MSG", tagRound);
                this.txtMessage.text = messStr;
                this.silverText.text = playcards.getTableVO().caishenmoney.toString();
                this.progress.maximum = totalRound;
                this.progress.minimum = 0;
                this.progress.value = nowRound;
                this.progressLabel.text = gameabc.StringUtils.formatString("{0}/{1}局", nowRound, totalRound);
            }
        };
        MammonUIMoudle.prototype.touchBindButtonHandler = function (tag) {
            var btn = tag;
            if (btn == this.btnClose) {
                this.close();
            }
            else if (btn == this.okBtn) {
                this.close();
            }
        };
        return MammonUIMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    mammon.MammonUIMoudle = MammonUIMoudle;
    __reflect(MammonUIMoudle.prototype, "mammon.MammonUIMoudle");
})(mammon || (mammon = {}));
//# sourceMappingURL=MammonUIMoudle.js.map