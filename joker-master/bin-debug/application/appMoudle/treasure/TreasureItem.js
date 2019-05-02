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
    var TreasureItem = (function (_super) {
        __extends(TreasureItem, _super);
        function TreasureItem() {
            var _this = _super.call(this) || this;
            _this.inTime = false;
            _this.skinName = "TreasureItemSkin";
            _this.once(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            return _this;
        }
        TreasureItem.prototype.onComplete = function () {
            this.initButton();
        };
        TreasureItem.prototype.initButton = function () {
            // gameabc.BindleButtonUtils.bindClickByTarget(this.button);
            this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        };
        TreasureItem.prototype.onClickButton = function () {
            mc2sdk.event(treasure.getProxy().progressiveData[this.data.treasrueId - 1][2]);
            __OPEN_MOUDLE(AppReg.APP_TREASURE_SUB, this.data);
        };
        TreasureItem.prototype.dataChanged = function () {
            if (this.data.invisible) {
                this.visible = false;
                return;
            }
            this.vs.selectedIndex = this.data.type;
            if (this.data.type == 0) {
                var totalNum = this.data.totalNum;
                var needNum = Math.floor(this.data.totalNum * 1.1);
                var curNum = this.data.curNum;
                var buyNum = this.data.buyNum ? this.data.buyNum : 0;
                this.bl1.text = FormatUtils.wan(totalNum);
                this.bl2.text = needNum.toString();
                this.bl3.text = (needNum - curNum).toString();
                this.bl4.text = (buyNum / needNum * 100).toFixed(0) + "%";
                this.img.source = treasure.getProxy().progressiveData[this.data.treasrueId - 1][1];
                this.pbv.percentWidth = curNum / needNum * 100;
            }
            else {
                var totalNum = this.data.totalNum;
                var needNum = this.data.totalNum * 1.1;
                var buyNum = this.data.buyNum;
                this.bl1.text = FormatUtils.wan(totalNum);
                this.leftTime = (this.data.openTime - Math.floor((new Date().getTime()) / 1000)) * 1000;
                this.leftTime = this.leftTime < 0 ? 0 : this.leftTime;
                this.bl5.text = DateUtils.dateFormat(new Date(this.leftTime), "mm:ss");
                this.bl6.text = (buyNum / needNum * 100).toFixed(0) + "%";
                this.button.visible = false;
                this.pbv.percentWidth = 100;
                this.img.source = treasure.getProxy().progressiveData[this.data.treasrueId - 1][1];
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
                if (!this.intervalValue)
                    this.intervalValue = egret.setInterval(this.updateTime, this, 1000);
            }
        };
        TreasureItem.prototype.updateTime = function () {
            this.leftTime -= 1000;
            if (!this.inTime && this.leftTime <= 0) {
                this.inTime = true;
                egret.clearInterval(this.intervalValue);
                // this.removeFromParent(true);
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.TREASURE_REFRESH_LIST);
            }
            if (this.leftTime < 0)
                this.leftTime = 0;
            this.bl5.text = DateUtils.dateFormat(new Date(this.leftTime), "mm:ss");
        };
        return TreasureItem;
    }(eui.ItemRenderer));
    treasure.TreasureItem = TreasureItem;
    __reflect(TreasureItem.prototype, "treasure.TreasureItem");
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureItem.js.map