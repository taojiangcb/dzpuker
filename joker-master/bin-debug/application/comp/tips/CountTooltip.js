var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by taojiang on 16/3/22.
 * 数字标签显示组件模块
 */
var tip;
(function (tip) {
    /**
     * 创建或者获取数字标签数据,数字标签类型有两个.
     *  1.子级标签 传的参数: key 和 subKeys
     *      subKeys 是当前子级的主级标签 [key1,key2,key3] 可以有多个主级
     *  2.主级标签 masterKey 为 true
     * 子级标签是单项数据更新,复合签标是子级标签的任一项数据发生改变的时候都会更新主级标签数据
     * 如果传入的 key已经存在则不会创建新的数据实列,直接返回之前创建的实例
     *
     * @param key
     * @param subKeys
     * @param masterKey               是否是主级
     * @param eventDispatch
     * @returns {CountTipStruct}
     */
    function createOrGetTipData(key, subKeys, masterKey, eventDispatch) {
        return CountTooltip.instance.createTipData(key, subKeys, masterKey, eventDispatch);
    }
    tip.createOrGetTipData = createOrGetTipData;
    function getTipData(key) {
        return CountTooltip.instance.getTipData(key);
    }
    tip.getTipData = getTipData;
    function getSubTipDatas(subKey) {
        return CountTooltip.instance.getSubTipDatas(subKey);
    }
    tip.getSubTipDatas = getSubTipDatas;
    function updateTip(key, value) {
        CountTooltip.instance.updateCount(key, value);
    }
    tip.updateTip = updateTip;
    var CountTooltip = (function () {
        function CountTooltip() {
            //tip数据缓存
            this.tables = [];
            //默认派发器
            this.dispatchEvent = new egret.EventDispatcher();
        }
        Object.defineProperty(CountTooltip, "instance", {
            get: function () {
                if (this.__instance == null)
                    this.__instance = new CountTooltip();
                return this.__instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 创建一个countTip数据,如果该实数据已经存在则不会创建新的覆盖.
         * @param key                   标签key
         * @param subKey                复合标签key
         * @param eventDispatch         标签消息更新触发器
         * @returns {CountTipStruct}
         */
        CountTooltip.prototype.createTipData = function (key, subKeys, masterKey, eventDispatch) {
            var exist = this.getTipData(key);
            if (exist == null) {
                var data = new CountTipStruct();
                data.key = key;
                data.isMasterKey = masterKey;
                if (subKeys)
                    data.subKeys = subKeys;
                data.eventDelegate = eventDispatch ? eventDispatch : this.dispatchEvent;
                this.tables.push(data);
                return data;
            }
            if (subKeys && subKeys.length > 0) {
                var len = subKeys.length;
                while (--len > -1) {
                    var key = subKeys[len];
                    if (exist.subKeys.indexOf(key) == -1) {
                        exist.subKeys.push(subKeys[len]);
                    }
                }
            }
            if (eventDispatch != null) {
                exist.eventDelegate = eventDispatch;
            }
            return exist;
        };
        /**
         * 获取一个标签数据信息
         * @param key
         * @returns {any}
         */
        CountTooltip.prototype.getTipData = function (key) {
            var len = this.tables.length;
            while (--len > -1) {
                if (this.tables[len].key == key)
                    return this.tables[len];
            }
            return null;
        };
        /**
         * 获取一个复合标签数据列表
         * @param subKey
         * @returns {CountTipStruct[]}
         */
        CountTooltip.prototype.getSubTipDatas = function (subKey) {
            var len = this.tables.length;
            var res = [];
            while (--len > -1) {
                if (this.tables[len].subKeys.indexOf(subKey) > -1) {
                    res.push(this.tables[len]);
                }
            }
            return res;
        };
        /**
         * 获取一个标签的数量
         * @param key
         * @returns {number}
         */
        CountTooltip.prototype.getCount = function (key) {
            var cache = this.getTipData(key);
            return cache ? cache.value : 0;
        };
        /**
         * 获取复合标签的总数量
         * @param subKey
         * @returns {number}
         */
        CountTooltip.prototype.getSubCount = function (subKey) {
            var res = this.getSubTipDatas(subKey);
            var len = res.length;
            var count = 0;
            while (--len > -1) {
                count += res[len].value;
            }
            return count;
        };
        /**
         * 更新一个标签的数量
         * @param key
         * @param value
         */
        CountTooltip.prototype.updateCount = function (key, value) {
            var data = this.getTipData(key);
            if (data) {
                data.value = value;
                var dispatch = data.eventDelegate;
                if (dispatch.hasEventListener(key)) {
                    dispatch.dispatchEventWith(key, false, data.value);
                }
                var len = data.subKeys.length;
                while (--len > -1) {
                    var count = this.getSubCount(data.subKeys[len]);
                    dispatch.dispatchEventWith(data.subKeys[len], false, count);
                }
            }
        };
        return CountTooltip;
    }());
    tip.CountTooltip = CountTooltip;
    __reflect(CountTooltip.prototype, "tip.CountTooltip");
    var CountTipStruct = (function () {
        function CountTipStruct() {
            this.key = ""; //当前key
            this.isMasterKey = false; //是不是主级
            this.value = 0; //当前值
            this.subKeys = []; //复合消息key
        }
        return CountTipStruct;
    }());
    tip.CountTipStruct = CountTipStruct;
    __reflect(CountTipStruct.prototype, "tip.CountTipStruct");
    //tip数字组件
    var CountTipUI = (function (_super) {
        __extends(CountTipUI, _super);
        /**
         * key      消息标签
         * subKey   复合消息标签         默认为""
         * dispatch 消息派发器委托       默认为null
         * **/
        function CountTipUI(tipData) {
            var _this = _super.call(this) || this;
            _this.key = "";
            _this.subKeys = [];
            _this.masterKey = false;
            _this.setTipData(tipData);
            _this.touchEnabled = false;
            _this.touchChildren = false;
            return _this;
        }
        CountTipUI.prototype.setTipData = function (val) {
            if (val == null)
                return;
            if (val == this.tipData)
                return;
            if (this.tipData) {
                this.removeListeners();
            }
            this.key = val.key;
            this.subKeys = val.subKeys;
            this.masterKey = val.isMasterKey;
            this.tipData = val;
            this.listeners();
        };
        CountTipUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var texture = RES.getRes("icon_mail_tshd_png");
            this.bgCir = new eui.Image(texture);
            this.bgCir.scale9Grid = new egret.Rectangle(8, 8, 1, 1);
            this.addChild(this.bgCir);
            this.txtLabel = new eui.Label();
            this.txtLabel.width = texture.textureWidth;
            this.txtLabel.height = texture.textureHeight;
            this.txtLabel.size = 24;
            this.txtLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.txtLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.txtLabel.textColor = AppConst.TextColors.white;
            //this.addChild(this.txtLabel);
        };
        CountTipUI.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
        };
        /****是否是复合类型tip标签*****/
        CountTipUI.prototype.isSubCount = function () {
            return this.masterKey;
        };
        /***当有一个tip消息更新时触发***/
        CountTipUI.prototype.onUpdate = function (event) {
            if (this.initialized) {
                this.fullValues();
            }
            else {
                this.invalidateProperties();
            }
        };
        /***刷新显示****/
        CountTipUI.prototype.fullValues = function () {
            var actualValue = this.isSubCount()
                ? CountTooltip.instance.getSubCount(this.key)
                : (this.tipData ? this.tipData.value : 0);
            actualValue = Math.min(actualValue, 99);
            if (actualValue <= 0) {
                this.visible = false;
            }
            else {
                this.visible = true;
                this.txtLabel.text = actualValue.toString();
            }
        };
        CountTipUI.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            this.fullValues();
        };
        CountTipUI.prototype.listeners = function () {
            if (this.tipData) {
                var eventDispatch = this.tipData.eventDelegate;
                if (this.key.length > 0) {
                    eventDispatch.addEventListener(this.key, this.onUpdate, this);
                }
                else if (this.subKeys.length > 0) {
                    var len = this.subKeys.length;
                    while (--len > -1) {
                        eventDispatch.addEventListener(this.subKeys[len], this.onUpdate, this);
                    }
                }
            }
        };
        CountTipUI.prototype.removeListeners = function () {
            if (this.tipData) {
                var eventDispatch = this.tipData.eventDelegate;
                if (this.key.length > 0) {
                    eventDispatch.removeEventListener(this.key, this.onUpdate, this);
                }
                else if (this.subKeys.length > 0) {
                    var len = this.subKeys.length;
                    while (--len > -1) {
                        eventDispatch.removeEventListener(this.subKeys[len], this.onUpdate, this);
                    }
                }
            }
        };
        CountTipUI.prototype.dispose = function () {
            this.removeListeners();
            _super.prototype.dispose.call(this);
        };
        return CountTipUI;
    }(gameabc.UICustomComponent));
    tip.CountTipUI = CountTipUI;
    __reflect(CountTipUI.prototype, "tip.CountTipUI");
})(tip || (tip = {}));
//# sourceMappingURL=CountTooltip.js.map