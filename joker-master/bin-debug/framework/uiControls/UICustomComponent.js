var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameabc;
(function (gameabc) {
    /**
     *
     * @author
     *
     */
    var UICustomComponent = (function (_super) {
        __extends(UICustomComponent, _super);
        function UICustomComponent() {
            var _this = _super.call(this) || this;
            /**
             * 生命周期结束
             */
            _this.initialized = false;
            _this.once(eui.UIEvent.CREATION_COMPLETE, _this.createComplete, _this);
            _this.allbindButton = {};
            return _this;
        }
        /*该模块被创建完成后的回调函数*/
        UICustomComponent.prototype.createComplete = function (event) {
            this.initialized = true;
        };
        UICustomComponent.prototype.unbindButton = function (image, deleteKey) {
            if (deleteKey === void 0) { deleteKey = true; }
            if (image) {
                image.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                gameabc.BindleButtonUtils.unbindClick(image);
                if (deleteKey && this.allbindButton)
                    delete this.allbindButton[image.hashCode];
            }
        };
        /**
         * 绑定按钮点击  dispose 自动 unbindButton
         * @param image
         * @param isBtn 点击是是否缩放
         */
        UICustomComponent.prototype.bindButton = function (image, isBtn) {
            if (isBtn === void 0) { isBtn = true; }
            image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            if (isBtn)
                gameabc.BindleButtonUtils.bindClickByTarget(image);
            this.allbindButton[image.hashCode] = image;
        };
        /**
         * 用ToggleButton组件快速创建一组TAB按钮 dispose 自动 unbindButton
         */
        UICustomComponent.prototype.bindTabButton = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.buttonGroup = new uicomps.ButtonGroup();
            for (var i = 0; i < args.length; ++i) {
                this.buttonGroup.add(args[i]);
                this.bindButton(args[i], false);
            }
            this.buttonGroup.itemClick = this.touchHandler;
            this.buttonGroup.itemThisObj = this;
        };
        UICustomComponent.prototype.selectTabButton = function (index) {
            var button = this.buttonGroup.list[index];
            this.buttonGroup.select(button);
            this.touchBindButtonHandler(button);
        };
        /**
         * 子类如果有bindButton, click事件覆盖次方法实现
         */
        UICustomComponent.prototype.touchBindButtonHandler = function (clickTarget) {
        };
        UICustomComponent.prototype.touchHandler = function (event) {
            var tag = event.currentTarget;
            this.touchBindButtonHandler(tag);
        };
        UICustomComponent.prototype.removeFromParent = function (isDispose) {
            if (isDispose === void 0) { isDispose = false; }
            if (this.parent)
                this.parent.removeChild(this);
            if (isDispose)
                this.dispose();
        };
        UICustomComponent.prototype.dispose = function () {
            for (var key in this.allbindButton) {
                this.unbindButton(this.allbindButton[key], false);
            }
            this.allbindButton = null;
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.createComplete, this);
        };
        return UICustomComponent;
    }(eui.Component));
    gameabc.UICustomComponent = UICustomComponent;
    __reflect(UICustomComponent.prototype, "gameabc.UICustomComponent");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=UICustomComponent.js.map