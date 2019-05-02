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
     * UI模块的基础类
     * @author taojiang
     */
    var UIMoudleComponent = (function (_super) {
        __extends(UIMoudleComponent, _super);
        //当前模块内部加载的资源列表集合 类似于as3版的loadManager收集当前模块的零时资源加载
        //        public loadMgr: UILoadManager = new UILoadManager();
        function UIMoudleComponent() {
            var _this = _super.call(this) || this;
            /**开启该模块的时候传入的参数*/
            _this.uiOpenData = null;
            return _this;
        }
        /*
         * 该模块被开启来的时候会传入该模块处理逻辑时需要的相关参数
         * @val 该模块逻辑数据
         * @version 1.0
         */
        UIMoudleComponent.prototype.setData = function (val) {
            //            this.loadMgr.groupName = this.uiMoudle.uid + "__load__group";
            if (this.uiOpenData == val)
                return;
            this.uiOpenData = val;
            this.invalidateProperties();
        };
        /*该模块被创建完成后的回调函数*/
        UIMoudleComponent.prototype.createComplete = function (event) {
            this.initialized = true;
            this.uiMoudle.hideOtherMoudels();
            this.opening();
        };
        //析构回调
        UIMoudleComponent.prototype.dispose = function () {
            this.removeParent();
            //            if(this.loadMgr) this.loadMgr.dispose();
            _super.prototype.dispose.call(this);
        };
        //该ui添加到显示对象 子类覆盖次方法
        UIMoudleComponent.prototype.addParent = function () {
            if (this.initialized)
                this.opening();
            if (this.parent == null)
                this.featherSpace.addChild(this);
            if (this.initialized)
                this.uiMoudle.hideOtherMoudels();
            //            __SEND_NOTIFICATION(app.constant.AppMediatorConst.OPEN_MOUDLE,this.uiMoudle.uid);
        };
        //打开界面时处理
        UIMoudleComponent.prototype.opening = function () { };
        //从显示对象移除 子类覆盖次方法
        UIMoudleComponent.prototype.removeParent = function () {
            this.removeFromParent();
        };
        /*
         * @language cn
         * definePreload自由组织一些预置的加载数据添加到preloadData.preRes,加载完成之后回调intoloadCb传入preloadData会才开启preload加载。
         * 这里也许有一个网络请求之后才能确定preload的预置加载的内容，所以这里可以把回调放到其它地方进行处理(自由现实该过程)
         * @version 1.0
         * @platform web,native
         */
        UIMoudleComponent.prototype.definePreload = function (preloadData, intoLoadCb) {
            intoLoadCb(preloadData);
        };
        Object.defineProperty(UIMoudleComponent.prototype, "featherSpace", {
            //指定父级的容器
            get: function () {
                return AppRoot.gameLayer.panelLayer; //egret.MainContext.instance.stage;
            },
            enumerable: true,
            configurable: true
        });
        return UIMoudleComponent;
    }(gameabc.UICustomComponent));
    gameabc.UIMoudleComponent = UIMoudleComponent;
    __reflect(UIMoudleComponent.prototype, "gameabc.UIMoudleComponent", ["gameabc.IUIMoudleComponent", "eui.UIComponent", "egret.DisplayObject", "gameabc.IDisposer"]);
    /*
     * 模块内部资源加载组管理
     */
    var UILoadManager = (function () {
        function UILoadManager() {
            this.keys = [];
            this.groupName = "";
        }
        UILoadManager.prototype.onPush = function (key) {
            this.keys.push(key);
            RES.createGroup(this.groupName, this.keys);
        };
        UILoadManager.prototype.onLoad = function (compFunc, thisObj) {
        };
        /*
         * 清空资源
         */
        UILoadManager.prototype.dispose = function () {
            if (this.groupName && this.groupName.length > 0) {
                RES.destroyRes(this.groupName, false);
            }
        };
        return UILoadManager;
    }());
    gameabc.UILoadManager = UILoadManager;
    __reflect(UILoadManager.prototype, "gameabc.UILoadManager", ["gameabc.IDisposer"]);
})(gameabc || (gameabc = {}));
//# sourceMappingURL=UIMoudleComponent.js.map