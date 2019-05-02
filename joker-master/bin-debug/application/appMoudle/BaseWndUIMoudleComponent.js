var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var base;
    (function (base) {
        /**
         * 窗口模块基础，自动剧中场景显示会有缓动画效果
         * @author
         */
        var BaseWndUIMoudleComponent = (function (_super) {
            __extends(BaseWndUIMoudleComponent, _super);
            function BaseWndUIMoudleComponent() {
                var _this = _super.call(this) || this;
                //剧中
                _this.horizontalCenter = 0;
                _this.verticalCenter = 0;
                return _this;
            }
            Object.defineProperty(BaseWndUIMoudleComponent.prototype, "featherSpace", {
                // public addParent():void {
                //    super.addParent();
                // this.alpha = 0;
                // if(this.tmTween) egret.Tween.removeTweens(this);// this.tmTween.paused(true);
                // this.tmTween = egret.Tween.get(this).to({ alpha: 1 },200).call(this.openTweenComple,this)
                // }
                // protected openTweenComple():void {
                //     this.tmTween = null;
                //            console.log(that);
                // }
                // public close(evt: any = null): void {
                //     if(this.tmTween) egret.Tween.removeTweens(this);
                //     this.tmTween = egret.Tween.get(this).to({ alpha: 0 },200).call(this.closeTweenComp,this)
                // }
                // private closeTweenComp():void {
                //     this.tmTween = null;
                //     __CLOSE_MOUDLE_UI(this);
                // }
                // public dispose(): void {
                //     if (this.tmTween) {
                //         egret.Tween.removeTweens(this);// this.tmTween.paused(true);
                //         this.tmTween = null;
                //     }
                //     super.dispose();
                // }
                get: function () {
                    return AppRoot.gameLayer.panelLayer;
                },
                enumerable: true,
                configurable: true
            });
            return BaseWndUIMoudleComponent;
        }(base.BaseUIMoudleComponent));
        base.BaseWndUIMoudleComponent = BaseWndUIMoudleComponent;
        __reflect(BaseWndUIMoudleComponent.prototype, "app.base.BaseWndUIMoudleComponent");
    })(base = app.base || (app.base = {}));
})(app || (app = {}));
//# sourceMappingURL=BaseWndUIMoudleComponent.js.map