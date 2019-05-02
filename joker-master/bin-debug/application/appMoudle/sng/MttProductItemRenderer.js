var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    var MttProductItemRenderer = (function (_super) {
        __extends(MttProductItemRenderer, _super);
        function MttProductItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/sng/product/MttProductItem.exml";
            _this.touchEnabled = false;
            _this.touchChildren = true;
            return _this;
        }
        MttProductItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.addButton(this.btnExchange, true);
        };
        Object.defineProperty(MttProductItemRenderer.prototype, "productVO", {
            get: function () {
                return this.data instanceof match.MTTProductVO ? this.data : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MttProductItemRenderer.prototype, "redpackVO", {
            get: function () {
                return this.data instanceof match.MTTRedpackVO ? this.data : null;
            },
            enumerable: true,
            configurable: true
        });
        MttProductItemRenderer.prototype.dataChanged = function () {
            if (this.productVO != null) {
                var memo_str = '<font color="#ffbd35">{0}</font><font color="#c4d3b8">{1}</font>';
                memo_str = gameabc.StringUtils.formatString(memo_str, this.productVO.title, this.productVO.desc);
                this.txtMemo.textFlow = utils.HtmlTextUtils.transferHtmlText(memo_str);
                var count_str = '您当前可以兑<font color="#ffbd35">{0}</font>次';
                count_str = gameabc.StringUtils.formatString(count_str, this.productVO.num);
                this.txtCount.textFlow = utils.HtmlTextUtils.transferHtmlText(count_str);
                this.imgCard.source = this.productVO.pic + "_png";
            }
            else if (this.redpackVO != null) {
                this.txtMemo.text = "兑换红包需关注游戏茶苑公众号（gameteacom）";
                var count_str = gameabc.StringUtils.formatString('您当前可以兑<font color="#ffbd35">{0}</font>次', this.redpackVO.num);
                this.txtCount.textFlow = utils.HtmlTextUtils.transferHtmlText(count_str);
                this.imgCard.source = "img_hongbao_bg_mtt_png";
            }
        };
        MttProductItemRenderer.prototype.click = function (tag) {
            if (tag == this.btnExchange) {
                if (this.productVO != null) {
                    __OPEN_PRE_MOUDLE(AppReg.MTT_EXCHANGE, { ptInfo: this.data });
                }
                else if (this.redpackVO != null) {
                    match.getProductProxy().exchangeRedpack(this.redpackVO);
                }
            }
        };
        return MttProductItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    match.MttProductItemRenderer = MttProductItemRenderer;
    __reflect(MttProductItemRenderer.prototype, "match.MttProductItemRenderer");
})(match || (match = {}));
//# sourceMappingURL=MttProductItemRenderer.js.map