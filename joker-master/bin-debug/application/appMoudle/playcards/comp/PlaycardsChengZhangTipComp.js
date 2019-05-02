var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    var PlaycardsChengZhangTipComp = (function (_super) {
        __extends(PlaycardsChengZhangTipComp, _super);
        function PlaycardsChengZhangTipComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlaycardsChengZhangTipSkin";
            return _this;
        }
        PlaycardsChengZhangTipComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            var index = Math.min(2, this.uiOpenData);
            this.view.selectedIndex = index;
            this.bindButton(this.btnClose);
            if (index == 0) {
                var total = playcards.getProxy().POWER_S; //同花
                var strs = playcards.getProxy().POWER_STR;
                var item;
                var str = "";
                var max = 18;
                for (var i = 2, len = total.length; i < len; i++) {
                    item = total[i];
                    for (var j = 2, jlen = item.length; j < jlen; j++) {
                        if (item[j] >= max) {
                            if (str != "")
                                str += "、";
                            str += strs[i] + "和" + strs[j];
                        }
                    }
                }
                this.v0_type6_txt.text = str;
                str = "";
                var str2 = "";
                total = playcards.getProxy().POWER_O; //非同花
                for (var i = 2, len = total.length; i < len; i++) {
                    item = total[i];
                    for (var j = 2, jlen = item.length; j < jlen; j++) {
                        if (item[j] >= max) {
                            if (i != j) {
                                if (str != "")
                                    str += "、";
                                str += strs[i] + "和" + strs[j];
                            }
                            else {
                                if (str2 != "")
                                    str2 += "、";
                                str2 += strs[i] + "和" + strs[j];
                            }
                        }
                    }
                }
                this.v0_type2_txt.text = str2;
                this.v0_type0_txt.text = str;
            }
            else if (index == 1) {
                var total = playcards.getProxy().POWER_S; //同花
                var strs = playcards.getProxy().POWER_STR;
                var item;
                var str = "";
                var min = 10;
                for (var i = 5, len = total.length; i < len; i++) {
                    item = total[i];
                    for (var j = 5, jlen = item.length; j < jlen; j++) {
                        if (item[j] <= min) {
                            if (str != "")
                                str += "、";
                            str += strs[i] + "和" + strs[j];
                        }
                    }
                }
                this.v1_type6_txt.text = str;
                str = "";
                total = playcards.getProxy().POWER_O; //非同花
                for (var i = 5, len = total.length; i < len; i++) {
                    item = total[i];
                    for (var j = 5, jlen = item.length; j < jlen; j++) {
                        if (item[j] <= min) {
                            if (str != "")
                                str += "、";
                            str += strs[i] + "和" + strs[j];
                        }
                    }
                }
                this.v1_type0_txt.text = str;
            }
        };
        PlaycardsChengZhangTipComp.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this.btnClose:
                    this.close();
                    break;
            }
        };
        return PlaycardsChengZhangTipComp;
    }(app.base.BaseWndUIMoudleComponent));
    playcards.PlaycardsChengZhangTipComp = PlaycardsChengZhangTipComp;
    __reflect(PlaycardsChengZhangTipComp.prototype, "playcards.PlaycardsChengZhangTipComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardsChengZhangTipComp.js.map