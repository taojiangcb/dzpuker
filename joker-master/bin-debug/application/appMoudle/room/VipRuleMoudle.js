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
    var VipRuleMoudle = (function (_super) {
        __extends(VipRuleMoudle, _super);
        function VipRuleMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "VipRuleSkin";
            return _this;
        }
        VipRuleMoudle.prototype.createComplete = function () {
            this.bindButton(this.closeButton);
            var str = "";
            str += gameabc.getMessage("VIP_RULE1") + "\r";
            str += gameabc.getMessage("VIP_RULE2") + "\r";
            str += gameabc.getMessage("VIP_RULE3") + "\r";
            str += gameabc.getMessage("VIP_RULE4") + "\r";
            str += gameabc.getMessage("VIP_RULE5");
            this.textLabel.text = str;
        };
        VipRuleMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    return;
            }
        };
        return VipRuleMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    room.VipRuleMoudle = VipRuleMoudle;
    __reflect(VipRuleMoudle.prototype, "room.VipRuleMoudle");
})(room || (room = {}));
//# sourceMappingURL=VipRuleMoudle.js.map