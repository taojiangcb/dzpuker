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
     *
     * @author
     *
     */
    var ExpressionListItem = (function (_super) {
        __extends(ExpressionListItem, _super);
        function ExpressionListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ExpressionListSkin";
            return _this;
        }
        ExpressionListItem.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            // this.addButton(this,false);
            // this.touchChildren = false;
        };
        ExpressionListItem.prototype.dataChanged = function () {
            if (this.data && this.data.label) {
                var skey = this.data.label.substr(0, this.data.label.length - 1) + "fly";
                if (this.mc == null) {
                    // this.mc = new egret.MovieClip(playcards.getProxy().getFaceFactory().generateMovieClipData(this.data.label));
                    // this.mc.x = 35;//55;
                    // this.mc.y = 40;// 45;
                    this.mc = new gameabc.MovieClip(playcards.getProxy().getTextures(skey), 12, false);
                    // this.mc.x = 35;//55;
                    // this.mc.y = 40;// 45;
                    this.mc.scaleX = this.mc.scaleY = 0.5;
                    this.addChild(this.mc);
                }
                else
                    this.mc.initTextures(playcards.getProxy().getTextures(skey));
                var bb;
                if (room.getProxy().current.type == 6 /* HAPPY */) {
                    bb = this.uiModule.roleVO.facecost;
                }
                else {
                    bb = this.data.charmList[0] * room.getProxy().current.charmList[0];
                }
                // this.txtCharm.text = FormatUtils.wan(bb);
                this.mc.x = 35 - this.mc.width * 0.25;
                this.mc.y = 35 - this.mc.height * 0.25;
            }
        };
        Object.defineProperty(ExpressionListItem.prototype, "uiModule", {
            get: function () {
                return __GET_MOUDLE_COMP(AppReg.APP_POKER_INFO);
            },
            enumerable: true,
            configurable: true
        });
        return ExpressionListItem;
    }(uicomps.BaseItemCilckRenderer));
    myInfo.ExpressionListItem = ExpressionListItem;
    __reflect(ExpressionListItem.prototype, "myInfo.ExpressionListItem");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=ExpressionListItem.js.map