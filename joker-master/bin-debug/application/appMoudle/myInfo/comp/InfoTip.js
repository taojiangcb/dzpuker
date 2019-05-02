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
    var TipBgColor = (function () {
        function TipBgColor() {
        }
        return TipBgColor;
    }());
    // Blue, Gray, Red, Yellow
    TipBgColor.Blue = 1;
    TipBgColor.Red = 2;
    TipBgColor.Gray = 3;
    TipBgColor.Yellow = 4;
    TipBgColor.Green = 5;
    myInfo.TipBgColor = TipBgColor;
    __reflect(TipBgColor.prototype, "myInfo.TipBgColor");
    ;
    var InfoTip = (function (_super) {
        __extends(InfoTip, _super);
        function InfoTip() {
            var _this = _super.call(this) || this;
            _this.skinName = "InfoTipSkin";
            _this.touchChildren = false;
            return _this;
        }
        InfoTip.prototype.createComplete = function (event) {
        };
        InfoTip.prototype.touchBindButtonHandler = function (clickTarget) {
        };
        Object.defineProperty(InfoTip.prototype, "tipStr", {
            get: function () {
                return '';
            },
            enumerable: true,
            configurable: true
        });
        InfoTip.prototype.setLight = function (islight) {
            if (islight === void 0) { islight = false; }
            this.imgBgLight.visible = islight;
        };
        /**
         * 设置数据
         * @param vo
         */
        InfoTip.prototype.setData = function (color, tipstr, islight) {
            if (color === void 0) { color = 0; }
            if (tipstr === void 0) { tipstr = ''; }
            if (islight === void 0) { islight = false; }
            var w = 110;
            var tip = "";
            if (color == 1) {
                this.imgBg.source = "img_tip_blue_png"; //
                tip = "手紧型";
            }
            else if (color == 2) {
                this.imgBg.source = "img_tip_red_png"; //
                tip = "手松型";
            }
            else if (color == 3) {
                this.imgBg.source = "img_tip_gray_png"; //
                tip = "跟注站";
            }
            else if (color == 4) {
                this.imgBg.source = "img_tip_yellow_png"; //
                tip = "鱼";
            }
            else if (color == 5) {
                this.imgBg.source = "btn_custom_tip_bg_png"; //
                w = 136;
                if (tipstr.length > 4) {
                    tip = tipstr.slice(0, 4) + "...";
                }
                else {
                    tip = tipstr;
                }
            }
            this.imgBgLight.visible = islight;
            this.txtTip.width = w;
            this.txtTip.text = tip;
            this.tipBgType = color;
        };
        return InfoTip;
    }(gameabc.UICustomComponent));
    myInfo.InfoTip = InfoTip;
    __reflect(InfoTip.prototype, "myInfo.InfoTip");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=InfoTip.js.map