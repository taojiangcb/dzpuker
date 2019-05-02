/**
 * HtmlText工具类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var HtmlTextUtils = (function () {
        function HtmlTextUtils() {
        }
        /**
         * 将Html文字,转成Label可识别的TextElement
         */
        HtmlTextUtils.transferHtmlText = function (htmlText) {
            if (htmlText == null)
                return null;
            return (new egret.HtmlTextParser).parser(htmlText.toLowerCase());
        };
        /**
         * 组建普通 text
         * 参数：
         *  - textFlows: 文字串。
         *  - textContent: 文字内容
         *  - color：颜色
         *
         * 返回：
         *  - textFlows, 用来付值给label.textFlows
         */
        HtmlTextUtils.appendText = function (textFlows, textContent) {
            if (textFlows == null) {
                textFlows = [];
            }
            textFlows.push({ text: textContent });
            return textFlows;
        };
        /**
         * 组建html text
         * 参数：
         *  - textFlows: 文字串。
         *  - textContent: 文字内容
         *  - color：颜色
         *
         * 返回：
         *  - textFlows, 用来付值给label.textFlows
         *
         * for example:
         * var txtFlow:any = utils.HtmlTextUtils.appendHtmlText(null, "第一行红色", 0xFF0000);
         * txtFlow = utils.HtmlTextUtils.appendHtmlText(txtFlow, "第二行白色", 0x000000);
         * amLabel.textFlow = txtFlow;
         */
        HtmlTextUtils.appendHtmlText = function (textFlows, textContent, color) {
            if (textFlows == null) {
                textFlows = [];
            }
            textFlows.push({ text: textContent, style: { "textColor": color } });
            return textFlows;
        };
        /**
         *
         * @param _molecule
         * @param fenm
         */
        HtmlTextUtils.numberToPercentage = function (_molecule, fenm) {
            var retrunA = 0;
            var s = "";
            retrunA = _molecule / fenm * 100;
            s = retrunA.toFixed(1);
            if (s == "NaN" || s == "") {
                s = "0";
            }
            return s + "%";
        };
        /**
       *
       * @param _molecule
       * @param fenm
       */
        HtmlTextUtils.numToPercentage = function (_molecule) {
            var retrunA = 0;
            var s = "";
            retrunA = _molecule * 100;
            s = retrunA.toFixed(1);
            if (s == "NaN" || s == "") {
                s = "0";
            }
            return s + "%";
        };
        return HtmlTextUtils;
    }());
    utils.HtmlTextUtils = HtmlTextUtils;
    __reflect(HtmlTextUtils.prototype, "utils.HtmlTextUtils");
})(utils || (utils = {}));
//# sourceMappingURL=HtmlTextUtils.js.map