var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var item;
(function (item) {
    /**
     *
     * @author
     *
     */
    var PropInfoItem = (function (_super) {
        __extends(PropInfoItem, _super);
        function PropInfoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "PropInfoItemSkin";
            _this.percentWidth = 100;
            return _this;
        }
        PropInfoItem.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.okBtn.touchChildren = false;
            this.addButton(this.okBtn);
        };
        PropInfoItem.prototype.dataChanged = function () {
            if (this.itemIndex % 2 == 0) {
                this.bgImag.visible = true;
            }
            else {
                this.bgImag.visible = false;
            }
            if (this.data) {
                this.info = this.data;
                this.timeTxt.text = "";
                if (this.info) {
                    this.templa = this.info.template;
                    if (this.templa) {
                        this.iconImag.source = this.templa.icon + "_png";
                        this.numTxt.text = this.info.num.toString();
                        this.nameTxt.text = this.templa.name;
                        this.nameTxt.textColor = this.templa.nameColor;
                        this.descTxt.text = this.templa.descript;
                        var timeStr = "";
                        var tiemBool = false;
                        if (this.info.timeEnd) {
                            var now = app.SystemTimer.systemTime / 1000;
                            if (this.info.timeEnd < now) {
                                tiemBool = false;
                                timeStr = "过期";
                            }
                            else {
                                tiemBool = true;
                                timeStr = DateUtils.dateFormat(new Date(this.info.timeEnd * 1000), "yyyy-MM-dd");
                            }
                        }
                        else if (this.templa.day) {
                            timeStr = this.templa.year + "-" + this.templa.month + "-" + this.templa.day;
                        }
                        if (timeStr) {
                            this.timeTxt.text = "有效期：" + timeStr;
                        }
                        else {
                            this.timeTxt.text = "";
                        }
                        this.okBtn.visible = this.templa.btnShow;
                        if (this.templa.id == 4)
                            this.btnLabel.source = "iw_duihuan_mtt_2_png";
                    }
                    else {
                        console.log("没有 emplate srvId:" + this.info.svrId);
                    }
                }
            }
        };
        PropInfoItem.prototype.click = function (tag) {
            if (tag == this.okBtn) {
                if (this.templa.btnEnable) {
                    __CLOSE_MOUDLE(AppReg.APP_PROP);
                    user.getProxy().openSNG();
                }
                else {
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                }
            }
            // __PVO().to(app.NetAction.);
        };
        return PropInfoItem;
    }(uicomps.BaseItemCilckRenderer));
    item.PropInfoItem = PropInfoItem;
    __reflect(PropInfoItem.prototype, "item.PropInfoItem");
})(item || (item = {}));
//# sourceMappingURL=PropInfoItem.js.map