var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var treasure;
(function (treasure) {
    var TreasureLabel = (function (_super) {
        __extends(TreasureLabel, _super);
        function TreasureLabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "TreasureLabelSkin";
            _this.once(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            return _this;
        }
        TreasureLabel.prototype.onComplete = function () {
            // gameabc.BindleButtonUtils.bindClickByTarget(this.btn);
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        TreasureLabel.prototype.dataChanged = function () {
            if (this.data.userId == user.getProxy().svrRoleId && this.data.state == 1) {
                this.gp.visible = true;
                this.btn.visible = true;
                this.img2.visible = false;
            }
            else if (this.data.userId == user.getProxy().svrRoleId && this.data.state == 2) {
                this.gp.visible = true;
                this.btn.visible = false;
                this.img2.visible = true;
            }
            else {
                this.gp.visible = false;
            }
            this.bl1.text = this.data.count.toString();
            this.bl2.text = FormatUtils.wan(this.data.totalNum);
            this.lb1.text = this.data.userName;
            this.lb2.text = Math.floor(this.data.buyNum / (this.data.totalNum * treasure.getProxy().rate) * 100) + "%";
            this.lb4.text = DateUtils.dateFormat(new Date(this.data.openTime * 1000), "yyyy-MM-dd");
            this.lb5.text = DateUtils.dateFormat(new Date(this.data.openTime * 1000), "hh:mm:ss");
        };
        TreasureLabel.prototype.onClick = function () {
            mc2sdk.event(50078 /* TREASURE_GET */);
            __SEND_NOTIFICATION(app.NetAction.REQ_MY_GET_REWARD, this.data.id);
        };
        return TreasureLabel;
    }(eui.ItemRenderer));
    treasure.TreasureLabel = TreasureLabel;
    __reflect(TreasureLabel.prototype, "treasure.TreasureLabel");
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureLabel.js.map