var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JT on 2015/12/26.
 * url资源加载对像池管理
 */
var loadPools;
(function (loadPools) {
    function addToPool(id, url) {
        PoolMgr.instance.appToPool(id, url);
    }
    loadPools.addToPool = addToPool;
    function getPoolById(id) {
        return PoolMgr.instance.getPoolById(id);
    }
    loadPools.getPoolById = getPoolById;
    function clearPool(id) {
        return PoolMgr.instance.clearPool(id);
    }
    loadPools.clearPool = clearPool;
    var LoadObj = (function () {
        function LoadObj(id, url) {
            this.poolsId = 0; //模块id
            this.url = ""; //url地址
            this.poolsId = id;
            this.url = url;
        }
        return LoadObj;
    }());
    loadPools.LoadObj = LoadObj;
    __reflect(LoadObj.prototype, "loadPools.LoadObj");
    var PoolMgr = (function () {
        function PoolMgr() {
        }
        Object.defineProperty(PoolMgr, "instance", {
            get: function () {
                if (this.__instance == null) {
                    this.__instance = new LoadPool();
                }
                return this.__instance;
            },
            enumerable: true,
            configurable: true
        });
        return PoolMgr;
    }());
    __reflect(PoolMgr.prototype, "PoolMgr");
    var LoadPool = (function () {
        function LoadPool() {
            this.pools = [];
        }
        //按对象池id获取加载的列表 -1 表示获取所有对象池的加载组
        LoadPool.prototype.getPoolById = function (id) {
            var selectd = [];
            var i = this.pools.length;
            while (--i > -1) {
                if (id == -1) {
                    selectd.push(this.pools[i]);
                }
                else if (this.pools[i].poolsId == id) {
                    selectd.push(this.pools[i]);
                }
            }
            return selectd;
        };
        //添加一个资源到对像池中
        LoadPool.prototype.appToPool = function (poolsId, url) {
            var load = new LoadObj(poolsId, url);
            this.pools.push(load);
        };
        //清理一个对像池
        LoadPool.prototype.clearPool = function (poolsId) {
            var loadObjs = this.getPoolById(poolsId);
            var i = loadObjs.length;
            while (--i > -1) {
                var index = this.pools.indexOf(loadObjs[i]);
                if (index > -1)
                    this.pools.splice(index, 1);
                //如果有其它对像池有在使用这个资源则不释放
                var exitsIds = this.getPools(loadObjs[i].url);
                if (exitsIds.length == 1) {
                    RES.destroyRes(loadObjs[i].url);
                }
            }
        };
        //根据url获取所有交集对像池的id
        LoadPool.prototype.getPools = function (url) {
            var ids = [];
            for (var i = 0; i != this.pools.length; i++) {
                if (this.pools[i].url != url) {
                    if (ids.indexOf(this.pools[i].poolsId) == -1)
                        ids.push(this.pools[i].poolsId);
                }
            }
            return ids;
        };
        return LoadPool;
    }());
    __reflect(LoadPool.prototype, "LoadPool");
})(loadPools || (loadPools = {}));
//# sourceMappingURL=LoadPool.js.map