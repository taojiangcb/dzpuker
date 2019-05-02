var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    /**
     * @language zh_cn
     * UIManager是功能模块管理类
     * @author taojiang
     * @version 1.0
     * @platform web,native
     */
    var UIManager = (function () {
        function UIManager() {
            throw new Error("此类不能够被实例化");
        }
        Object.defineProperty(UIManager, "instance", {
            get: function () {
                if (!UIManager.impl) {
                    UIManager.internalCall = true;
                    UIManager.impl = new UIManagerImpl();
                    UIManager.internalCall = false;
                }
                return UIManager.impl;
            },
            enumerable: true,
            configurable: true
        });
        /*
         * @language zh_cn
         * 注册一个模块到管理中来
         * @UIID 模块的唯一ID
         * @uicls UI的功能现实主类 class
         * @uiMoudle ui功能的管理操作类
         * @uiMoudleData ui管理操作类需要的参数
         * @version 1.0
         * @platfrom web,native
         */
        UIManager.registerUI = function (UIID, uicls, uiMoudle, moudleData) {
            if (moudleData === void 0) { moudleData = null; }
            UIManager.instance.registerUI(UIID, uicls, uiMoudle, moudleData);
        };
        /*
        * @language cn
        * 预置加载静态资源之后再开启该模块,该资源是在Resdeop工具中生成的
        *  *注意这里并不是加载group而是把多少group合并成一个新的group进行装载会生成一个新的groupanme
        * @UIID 该模块ID
        * @openingData 开启时需要传给open函数的相关参数
        * @version 1.2
        * @platform web,native
        * */
        UIManager.preloadOpen = function (uiid, openingData) {
            if (openingData === void 0) { openingData = null; }
            UIManager.instance.preloadOpen(uiid, openingData);
        };
        /*
        * @language zn_cn
        * 开启该模块功能
        * @uid      该模块id
        * @pt       显示的坐标
        * @Object   开启时传入的参数
        * @hideMoudles 该模块被开启时隐藏该列表中的模块显示,为了优化draw
        * @version 1.0
        * @platform web,native
        */
        UIManager.openUI = function (uid, data, hideMoudes, pt, continer) {
            if (data === void 0) { data = null; }
            if (hideMoudes === void 0) { hideMoudes = null; }
            if (pt === void 0) { pt = null; }
            if (continer === void 0) { continer = null; }
            UIManager.instance.openUI(uid, data, hideMoudes, pt, continer);
        };
        /*
         * @language zh_cn
         * 开启一个被注册过的模块
         * @uiID 模块ID
         * @version 1.0
         * @platform web,native
         */
        UIManager.getCacheUImoudel = function (uiId) {
            return UIManager.instance.getCacheUIMoudle(uiId);
        };
        UIManager.closeUI = function (uid) {
            UIManager.instance.closeUI(uid);
        };
        /**
         * 全部关闭 只开id
         * @param openuid  打开的id null =全部关闭
         * @param except 关闭全部时，此数组内的界面不关。
         */
        UIManager.closeALLOpenUI = function (openuid, data, except) {
            if (openuid === void 0) { openuid = null; }
            if (data === void 0) { data = null; }
            if (except === void 0) { except = null; }
            var allui = UIManager.instance.openList.concat();
            var uid;
            for (var i = allui.length - 1; i > -1; i--) {
                uid = allui[i];
                if (uid == openuid || (except != null && except.indexOf(uid) != -1)) {
                    //                    openuid = null;
                    continue;
                }
                else {
                    if (uid == __PRELOAD__) {
                        __CLOSE_PRELOAD(true);
                    }
                    else {
                        UIManager.instance.closeUI(uid, true);
                    }
                }
            }
            if (openuid != null) {
                __OPEN_PRE_MOUDLE(openuid, data);
            }
        };
        UIManager.close = function (ui) {
            UIManager.instance.close(ui);
        };
        /**
         * 判断模块是否被开启
         */
        UIManager.isOpened = function (uiid) {
            var i = UIManager.instance.openList.length;
            while (--i > -1) {
                if (UIManager.instance.openList[i] == uiid) {
                    var uiModule = this.getCacheUImoudel(uiid);
                    return uiModule.uiState == gameabc.UIConstants.UI_STATE_OPEN;
                }
            }
            return false;
        };
        return UIManager;
    }());
    UIManager.internalCall = false;
    gameabc.UIManager = UIManager;
    __reflect(UIManager.prototype, "gameabc.UIManager");
    var UIManagerImpl = (function () {
        function UIManagerImpl() {
            if (!UIManager.internalCall)
                throw new Error("此类不能被直接使用,请使用UIManager");
            this.regMap = new Object();
            this.uiMap = new Object();
            this.openList = [];
        }
        /*
         * @language zh_cn
         * 注册一个ui模块
         * @UIID 该模块的id
         * @uicls 该模块的ui组件&组件逻辑
         * @uiMoudel 该模块的控制逻辑
         * @version 1.0
         * @platform web,native
         */
        UIManagerImpl.prototype.registerUI = function (UIID, uicls, uiMoudle, moudleData) {
            if (moudleData === void 0) { moudleData = null; }
            this.regMap[UIID] = new UICache(UIID, uicls, uiMoudle, moudleData);
        };
        /*
         * @language cn
         * 预置加载该模块之后再开启该模块
         * @UIID 模块id
         * @staticRes 静态的预置资源
         * @openingData 开启时要传给open函数的相关参数
         * @version  1.0
         * @platform web,native
         */
        UIManagerImpl.prototype.preloadOpen__ = function (UIID, staticRes, openingData) {
            if (staticRes === void 0) { staticRes = null; }
            if (openingData === void 0) { openingData = null; }
            var uiModel = this.createUI(UIID);
            if (uiModel) {
                if (uiModel.uiState != gameabc.UIConstants.UI_STATE_OPEN) {
                    uiModel.uiState = gameabc.UIConstants.UI_STATE_PRELOAD;
                    uiModel.preload(staticRes, openingData);
                }
                else {
                    if (uiModel.gui.parent)
                        uiModel.gui.parent.setChildIndex(uiModel.gui, uiModel.gui.parent.numChildren - 1);
                }
            }
        };
        /*
        * @language cn
        * 预置加载静态的资源之后再开启该模块,该资源是在Resdeop工具中生成的
        *     *注意这里并不是加载group而是把多少group合并成一个新的group进行装载会生成一个新的groupanme
        * @UIID 该模块ID
        * @openingData 开启时需要传给open函数的相关参数
        * @version 1.2
        * @platform web,native
        * */
        UIManagerImpl.prototype.preloadOpen = function (UIID, openingData) {
            if (openingData === void 0) { openingData = null; }
            var resKey = [];
            var groupNames = gameabc.UIConstants.PRE_MOUDLE_RES_GROUP[UIID];
            var otherRes = gameabc.UIConstants.PRE_MOUDLE_RES[UIID];
            var it = groupNames ? groupNames.length : -1;
            while (--it > -1) {
                var groupItems = RES.getGroupByName(groupNames[it]);
                var len = groupItems ? groupItems.length : 0;
                for (var i = 0; i != len; i++) {
                    resKey.push(groupItems[i].name);
                }
            }
            it = otherRes ? otherRes.length : -1;
            while (--it > -1)
                resKey.push(otherRes[it]);
            this.preloadOpen__(UIID, resKey, openingData);
        };
        /*
         * @language zn_cn
         * 开启该模块功能
         * @uid      该模块id
         * @pt       显示的坐标
         * @Object   开启时传入的参数
         * @hideMoudles 该模块被开启时隐藏该列表中的模块显示,为了优化draw
         * @version 1.0
         * @platform web,native
         */
        UIManagerImpl.prototype.openUI = function (uid, data, hideMoudles, pt, continer) {
            if (data === void 0) { data = null; }
            if (hideMoudles === void 0) { hideMoudles = null; }
            if (pt === void 0) { pt = null; }
            if (continer === void 0) { continer = null; }
            var uiModel = this.createUI(uid);
            if (uiModel) {
                uiModel.open(data, hideMoudles, pt, continer);
                uiModel.uiState = gameabc.UIConstants.UI_STATE_OPEN;
            }
        };
        /*
         * 关闭一个ui模块 通过id
         * @version 1.0
         * @platform web,native
         *
         * destory: 是否清空关联模块关系
         */
        UIManagerImpl.prototype.closeUI = function (uid, destory) {
            if (destory === void 0) { destory = false; }
            var uiModel = this.uiMap[uid];
            if (uiModel) {
                if (destory) {
                    uiModel.clearCacheMoudles();
                }
                uiModel.close();
                uiModel.uiState = gameabc.UIConstants.UI_STATE_CLOSE;
                if (uiModel.moduleData.uiDestory == 0) {
                    this.destoryUI(uid);
                }
                for (var i = 0, len = this.openList.length; i < len; i++) {
                    if (this.openList[i] == uid) {
                        this.openList.splice(i, 1);
                        break;
                    }
                }
            }
        };
        /*
         * 关闭一个ui模块
         * @version 1.0
         * @platform web,native
         */
        UIManagerImpl.prototype.close = function (ui) {
            for (var uid in this.uiMap) {
                if (this.uiMap[uid].gui == ui) {
                    var id = Number(uid);
                    this.closeUI(id);
                    return;
                }
            }
        };
        UIManagerImpl.prototype.destoryUI = function (uid) {
            var uiModel = this.uiMap[uid];
            if (uiModel) {
                if (uiModel.uiState == gameabc.UIConstants.UI_STATE_OPEN) {
                    uiModel.close();
                    uiModel.uiState = gameabc.UIConstants.UI_STATE_CLOSE;
                }
                uiModel.dispose();
                delete this.uiMap[uid];
            }
        };
        /*
         * 获取缓存中的一个模块
         * @version 1.0
         * @platform web,native
         */
        UIManagerImpl.prototype.getCacheUIMoudle = function (uid) {
            return this.uiMap[uid];
        };
        /*
         * 创建一个功能模块
         * @version 1.0
         * @platform web,native
         */
        UIManagerImpl.prototype.createUI = function (uid) {
            var uiModel = this.uiMap[uid];
            if (uiModel == null) {
                var uiCache = this.regMap[uid];
                if (uiCache != null) {
                    var uiComponent = new uiCache.UIClass();
                    var uiMoudel = new uiCache.ControlCls();
                    uiMoudel.uiState = gameabc.UIConstants.UI_STATE_CREATE;
                    uiMoudel.uid = uid;
                    uiMoudel.setUI(uiComponent, uiCache.moudleData);
                    uiComponent.uiMoudle = uiMoudel;
                    this.uiMap[uid] = uiMoudel;
                }
            }
            for (var i = 0, len = this.openList.length; i < len; i++) {
                if (this.openList[i] == uid) {
                    break;
                }
            }
            if (i == len) {
                this.openList.push(uid);
            }
            return this.uiMap[uid];
        };
        /**获取打开的窗口列表 */
        UIManagerImpl.prototype.getOpenList = function (except) {
            var arr = this.openList;
            var out = [];
            var aid;
            for (var i = 0, len = arr.length; i < len; i++) {
                aid = arr[i];
                if (except == null || except.indexOf(aid) == -1) {
                    out.push(aid);
                }
            }
            return out;
        };
        return UIManagerImpl;
    }());
    gameabc.UIManagerImpl = UIManagerImpl;
    __reflect(UIManagerImpl.prototype, "gameabc.UIManagerImpl");
    var UICache = (function () {
        function UICache(id, ui, controls, moudleData) {
            if (moudleData === void 0) { moudleData = null; }
            this.uid = 0;
            this.UIClass = null;
            this.ControlCls = null;
            this.moudleData = null;
            this.uid = id;
            this.UIClass = ui;
            this.ControlCls = controls;
            this.moudleData = moudleData;
        }
        return UICache;
    }());
    gameabc.UICache = UICache;
    __reflect(UICache.prototype, "gameabc.UICache");
})(gameabc || (gameabc = {}));
var __PRELOAD__ = 10000;
var preload_count = 0;
var __OPEN_PRELOAD = function () {
    preload_count++;
    if (preload_count > 0) {
        __OPEN_MOUDLE(__PRELOAD__);
    }
};
var __CLOSE_PRELOAD = function (force) {
    if (force === void 0) { force = false; }
    // if(force) {
    preload_count = 0;
    __CLOSE_MOUDLE(__PRELOAD__);
    // }
    // else {
    //       preload_count--;
    //         if(preload_count <= 0) {
    //             preload_count = 0;
    //             __CLOSE_MOUDLE(__PRELOAD__);
    //         }
    // }
};
var __REGISTER_MOUDLE = function (UIID, uicls, uiMoudle, moudleData) {
    if (moudleData === void 0) { moudleData = null; }
    gameabc.UIManager.registerUI(UIID, uicls, uiMoudle, moudleData);
};
var __OPEN_MOUDLE = function (uid, data, hideMoudles, pt, continer) {
    if (data === void 0) { data = null; }
    if (hideMoudles === void 0) { hideMoudles = null; }
    if (pt === void 0) { pt = null; }
    if (continer === void 0) { continer = null; }
    gameabc.UIManager.openUI(uid, data, hideMoudles, pt, continer);
};
var __OPEN_PRE_MOUDLE = function (uid, data, hideMoudles, pt, continer) {
    if (data === void 0) { data = null; }
    if (hideMoudles === void 0) { hideMoudles = null; }
    if (pt === void 0) { pt = null; }
    if (continer === void 0) { continer = null; }
    gameabc.UIManager.preloadOpen(uid, [uid, data, hideMoudles, pt, continer]);
};
var __CLOSE_MOUDLE = function (uid) {
    gameabc.UIManager.closeUI(uid);
};
var __CLOSE_ALLMOUDLE_OPEN = function (uid, data, except) {
    if (uid === void 0) { uid = null; }
    if (data === void 0) { data = null; }
    if (except === void 0) { except = null; }
    gameabc.UIManager.closeALLOpenUI(uid, data, except);
};
var __CLOSE_MOUDLE_UI = function (ui) {
    gameabc.UIManager.close(ui);
};
var __GET_MOUDLE = function (uiid) {
    return gameabc.UIManager.getCacheUImoudel(uiid);
};
var __GET_MOUDLE_COMP = function (uiid) {
    var moudle = __GET_MOUDLE(uiid);
    return moudle ? moudle.gui : null;
};
var __IS_MOUDLE_OPEN = function (UIID) {
    return gameabc.UIManager.isOpened(UIID);
};
//# sourceMappingURL=UIManager.js.map