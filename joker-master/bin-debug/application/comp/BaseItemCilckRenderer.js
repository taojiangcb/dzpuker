var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uicomps;
(function (uicomps) {
    /**
     * 内部有按钮的itemRenderer
     * @author
     *
     */
    var BaseItemCilckRenderer = (function (_super) {
        __extends(BaseItemCilckRenderer, _super);
        function BaseItemCilckRenderer() {
            var _this = _super.call(this) || this;
            _this.touchCache = {};
            _this.SCALE_ROAT = 1.1;
            _this.initialized = false;
            _this.once(eui.UIEvent.CREATION_COMPLETE, _this.createComplete, _this);
            return _this;
        }
        BaseItemCilckRenderer.prototype.createComplete = function (evt) {
            //            this.addBtn(this.btnfight);  sample
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.itemTouchBegin, this);
            this.initialized = true;
        };
        /**
         * 添加可点击的显示对象
         * @param tag 点击的显示对象
         * @param scaleEnable 点击时 是否缩放
         */
        BaseItemCilckRenderer.prototype.addButton = function (tag, scaleEnable) {
            if (scaleEnable === void 0) { scaleEnable = true; }
            if (!this.touchCache[tag.hashCode]) {
                this.touchCache[tag.hashCode] = [tag.x, tag.y, tag.scaleX, tag.scaleY, scaleEnable];
            }
        };
        BaseItemCilckRenderer.prototype.removeButton = function (tag) {
            if (this.touchCache[tag.hashCode]) {
                delete this.touchCache[tag.hashCode];
            }
        };
        /**点击开始*/
        BaseItemCilckRenderer.prototype.itemTouchBegin = function (event) {
            this.startx = event.stageX;
            this.starty = event.stageY;
            var tag = event.target;
            var touchdata = this.touchCache[tag.hashCode];
            if (touchdata) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.itemTouchEnd, this);
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.itemTouchCancel, this);
                if (touchdata[4]) {
                    tag.scaleX = touchdata[2] * this.SCALE_ROAT;
                    tag.scaleY = touchdata[3] * this.SCALE_ROAT;
                    tag.x = touchdata[0] - ((this.SCALE_ROAT - 1) * tag.width >> 1);
                    tag.y = touchdata[1] - ((this.SCALE_ROAT - 1) * tag.height >> 1);
                }
            }
        };
        /**点击结束*/
        BaseItemCilckRenderer.prototype.itemTouchEnd = function (event) {
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.itemTouchEnd, this);
            var px = this.startx - event.stageX;
            var py = this.starty - event.stageY;
            var tag = event.target;
            var touchdata = this.touchCache[tag.hashCode];
            if (touchdata) {
                if (touchdata[4]) {
                    tag.x = touchdata[0];
                    tag.y = touchdata[1];
                    tag.scaleX = touchdata[2];
                    tag.scaleY = touchdata[3];
                }
                if (px < 20 && px > -20 && py < 20 && py > -20) {
                    this.click(tag);
                }
            }
        };
        BaseItemCilckRenderer.prototype.itemTouchCancel = function (event) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.itemTouchCancel, this);
            var px = this.startx - event.stageX;
            var py = this.starty - event.stageY;
            var tag = event.target;
            var touchdata = this.touchCache[tag.hashCode];
            if (touchdata) {
                if (touchdata[4]) {
                    tag.x = touchdata[0];
                    tag.y = touchdata[1];
                    tag.scaleX = touchdata[2];
                    tag.scaleY = touchdata[3];
                }
            }
        };
        /**
         * 按钮点击  tag 点中的显示对象
         * */
        BaseItemCilckRenderer.prototype.click = function (tag) {
        };
        return BaseItemCilckRenderer;
    }(eui.ItemRenderer));
    uicomps.BaseItemCilckRenderer = BaseItemCilckRenderer;
    __reflect(BaseItemCilckRenderer.prototype, "uicomps.BaseItemCilckRenderer");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=BaseItemCilckRenderer.js.map