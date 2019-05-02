var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/20.
 */
var uicomps;
(function (uicomps) {
    /**
     * 派发到选中的事件
     * @type {string}
     */
    uicomps.EVENT_TYPE_FOCUS_ITEM = "focusItem";
    uicomps.EVENT_TYPE_CHROOSE_ITEM = "chrooseItem";
    /**
     * 数据选择栏中的呈现项组件
     */
    var ChrooseMenuItemRenderer = (function (_super) {
        __extends(ChrooseMenuItemRenderer, _super);
        function ChrooseMenuItemRenderer() {
            var _this = _super.call(this) || this;
            /**
             * 没有选中时的颜色
             * @type {number}
             */
            _this.NORMAL_COLOR = 0x7D6386;
            /**
             * 选中时的颜色
             * @type {number}
             */
            _this.CHROOSE_COLOR = 0xFFFFFF;
            _this.skinName = "resource/app_skin/comp/ChrooseMenuItemSkin.exml";
            return _this;
        }
        ChrooseMenuItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.touchChildren = false;
            this.addButton(this, false);
        };
        ChrooseMenuItemRenderer.prototype.click = function (tag) {
            if (this.dataPropert) {
                this.dataPropert.dispatch.dispatchEventWith(uicomps.EVENT_TYPE_FOCUS_ITEM, false, this);
            }
        };
        ChrooseMenuItemRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.dataPropert = this.data;
                this.dataPropert.dispatch.addEventListener(uicomps.EVENT_TYPE_CHROOSE_ITEM, this.chrooseItemHandler, this);
                this.txtLabel.text = this.labelFunc();
            }
            else {
                this.dataPropert = null;
                this.txtLabel.text = "";
            }
        };
        /**
         * 由ChrooseMenu组件派发当前强制选中的消息处理
         * @param event
         */
        ChrooseMenuItemRenderer.prototype.chrooseItemHandler = function (event) {
            if (this.dataPropert) {
                if (this.dataPropert.value == event.data) {
                    this.dataPropert.dispatch.dispatchEventWith(uicomps.EVENT_TYPE_FOCUS_ITEM, false, this);
                }
            }
        };
        /**
         * 当前选中状态变动时处理
         */
        ChrooseMenuItemRenderer.prototype.focusChange = function () {
            if (this.dataPropert) {
                if (!this.txtLabel)
                    return;
                this.txtLabel.textColor = this.dataPropert.selected ? this.CHROOSE_COLOR : this.NORMAL_COLOR;
                this.txtLabel.verticalCenter = this.dataPropert.selected ? 0 : 0;
            }
        };
        ChrooseMenuItemRenderer.prototype.setFocus = function (val) {
            if (this.dataPropert) {
                this.dataPropert.selected = val;
                this.focusChange();
            }
        };
        /**
         * 由子级覆盖椒现该ItemRenderer的Label字段处理的方法
         * @returns {string}
         */
        ChrooseMenuItemRenderer.prototype.labelFunc = function () {
            if (this.dataPropert) {
                if (this.dataPropert.value.hasOwnProperty("label")) {
                    return this.dataPropert.value["label"];
                }
            }
            return "";
        };
        return ChrooseMenuItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    uicomps.ChrooseMenuItemRenderer = ChrooseMenuItemRenderer;
    __reflect(ChrooseMenuItemRenderer.prototype, "uicomps.ChrooseMenuItemRenderer");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=ChrooseMenuItemRenderer.js.map