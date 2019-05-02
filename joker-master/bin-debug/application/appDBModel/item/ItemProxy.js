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
    function getProxy() {
        return __GET_PROXY(ItemProxy);
    }
    item.getProxy = getProxy;
    var ItemProxy = (function (_super) {
        __extends(ItemProxy, _super);
        function ItemProxy(name, data) {
            var _this = _super.call(this, ItemProxy.NAME, data) || this;
            //道具本地模板数据信息
            _this.templates = [];
            _this.propDatas = [];
            //过滤的道具
            _this.ignorIds = [
                2038 //边锋茶苑的一种代币，现在用不上要过滤掉
            ];
            localDB.InitPropTemps(_this.templates);
            return _this;
        }
        /***获取自己的道具 */
        ItemProxy.prototype.getItemDate = function () {
            __SEND_NOTIFICATION(app.NetAction.GET_PROP_ATTRS);
        };
        /**
         * 根据道具ID获取道具模板相关的数据
         */
        ItemProxy.prototype.getPropTemplBySvrId = function (svrId) {
            var len = this.templates.length;
            while (--len > -1) {
                var tempData = this.templates[len];
                if (tempData.svrId.indexOf(svrId) != -1) {
                    return tempData;
                }
            }
            return null;
        };
        ItemProxy.prototype.getPropTemplById = function (id) {
            var len = this.templates.length;
            while (--len > -1) {
                var tempData = this.templates[len];
                if (tempData.id == id) {
                    return tempData;
                }
            }
            return null;
        };
        /** 修改一个道具的数量，如果没有道具对象，则创建一个，如果为0，则删除 */
        ItemProxy.prototype.updatePropData = function (svrId, num) {
            //过滤无用道具
            if (this.ignorIds.indexOf(svrId) > -1)
                return null;
            var propData = this.getPropDataBySvrId(svrId);
            if (num == 0) {
                if (propData != null) {
                    var index = this.propDatas.indexOf(propData);
                    this.propDatas.splice(index, 1);
                }
                return null;
            }
            if (propData == null) {
                propData = new item.PropVO();
                propData.template = this.getPropTemplBySvrId(svrId);
                propData.svrId = svrId;
                this.propDatas.push(propData);
            }
            propData.num = num;
            return propData;
        };
        ItemProxy.prototype.getPropDataBySvrId = function (svrId) {
            var len = this.propDatas.length;
            while (--len > -1) {
                var propData = this.propDatas[len];
                if (propData.template != null && propData.template.svrId.indexOf(svrId) != -1) {
                    return propData;
                }
            }
            return null;
        };
        /**
         *
         * @param id
         * @returns {any}
         */
        ItemProxy.prototype.getPropDataById = function (id) {
            var len = this.propDatas.length;
            while (--len > -1) {
                var propData = this.propDatas[len];
                if (propData && propData.template && propData.template.id == id) {
                    return propData;
                }
            }
            return null;
        };
        /**
         * 按道具类型筛选道具
         */
        ItemProxy.prototype.getPropDataByType = function (type) {
            var len = this.propDatas.length;
            var datas = [];
            while (--len > -1) {
                var propData = this.propDatas[len];
                if (propData && propData.template && propData.template.type == type) {
                    datas.push(propData);
                }
            }
            return datas;
        };
        ItemProxy.prototype.getSNGTicketCount = function () {
            return 0;
        };
        Object.defineProperty(ItemProxy.prototype, "allPropDatas", {
            get: function () {
                return this.propDatas;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *  注销清空数据
         */
        ItemProxy.prototype.clearAllData = function () {
            this.propDatas = [];
        };
        return ItemProxy;
    }(app.mvc.AbsractProxy));
    ItemProxy.NAME = "__ITEM_PROXY__";
    item.ItemProxy = ItemProxy;
    __reflect(ItemProxy.prototype, "item.ItemProxy");
})(item || (item = {}));
//# sourceMappingURL=ItemProxy.js.map