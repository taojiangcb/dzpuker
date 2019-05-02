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
    var MammonRecInfoComp = (function (_super) {
        __extends(MammonRecInfoComp, _super);
        function MammonRecInfoComp(time, userName, num) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/mammon/comp/MammonRecInfoComp.exml";
            _this._time = time;
            _this._userName = userName;
            _this._num = num;
            return _this;
        }
        MammonRecInfoComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            // 更新ui数据
            this.setUIData(mammon.getProxy().getRecordTime(this._time), this._userName, this._num + '');
        };
        /**
         * 设置uidata
         * @param _time 中奖时间字符串
         * @param _userName 中奖玩家name
         * @param _num 中奖金额数目
         */
        MammonRecInfoComp.prototype.setUIData = function (_time, _userName, _num) {
            if (_time === void 0) { _time = null; }
            if (_userName === void 0) { _userName = null; }
            if (_num === void 0) { _num = null; }
            var textFlow;
            this._txt_recordTime.text = _time ? _time : "01-01 01:00";
            if (_num.length > 0 && _userName.length > 0) {
                textFlow = utils.HtmlTextUtils.appendHtmlText(null, "恭喜玩家", AppConst.TextColors.white);
                textFlow = utils.HtmlTextUtils.appendHtmlText(textFlow, _userName, AppConst.TextColors.darkYellow);
                textFlow = utils.HtmlTextUtils.appendHtmlText(textFlow, "获得奖池", AppConst.TextColors.white);
                textFlow = utils.HtmlTextUtils.appendHtmlText(textFlow, _num + "彩豆", AppConst.TextColors.darkYellow);
                this._txt_record.textFlow = textFlow;
            }
        };
        return MammonRecInfoComp;
    }(gameabc.UICustomComponent));
    mammon.MammonRecInfoComp = MammonRecInfoComp;
    __reflect(MammonRecInfoComp.prototype, "mammon.MammonRecInfoComp");
})(mammon || (mammon = {}));
//# sourceMappingURL=MammonRecInfoComp.js.map