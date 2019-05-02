/**
 * Created by JT on 2015/12/26.
 * url资源加载对像池管理
 */
module loadPools {
    
    export function addToPool(id:number,url:string):void {
        PoolMgr.instance.appToPool(id,url);
    }
    export function getPoolById(id:number):LoadObj[] {
        return PoolMgr.instance.getPoolById(id);
    }
    export function clearPool(id:number):void {
        return PoolMgr.instance.clearPool(id);
    }

    export class LoadObj {
        poolsId:number = 0;                //模块id
        url:string = "";                    //url地址
        constructor(id:number,url:string) {
            this.poolsId = id;
            this.url = url;
        }
    }
    
    class PoolMgr {
        private static __instance:LoadPool;
        public static get instance():LoadPool {
            if(this.__instance == null) {
                this.__instance = new LoadPool();
            }
            return this.__instance;
        }
    }

    class LoadPool {
        pools:LoadObj[] = [];
        constructor() {}
        //按对象池id获取加载的列表 -1 表示获取所有对象池的加载组
        getPoolById(id:number):LoadObj[] {
            var selectd:LoadObj[] = [];
            var i:number = this.pools.length;
            while (--i > -1) {
                if (id == -1) {
                    selectd.push(this.pools[i]);
                } else if (this.pools[i].poolsId == id) {
                    selectd.push(this.pools[i]);
                }
            }
            return selectd;
        }

        //添加一个资源到对像池中
        appToPool(poolsId:number,url:string):void {
            var load:LoadObj = new LoadObj(poolsId,url);
            this.pools.push(load);
        }
        
        //清理一个对像池
        clearPool(poolsId:number):void {
            var loadObjs:LoadObj[] = this.getPoolById(poolsId);
            var i:number = loadObjs.length;
            while(--i > -1) {
                var index:number = this.pools.indexOf(loadObjs[i]);
                if(index > -1) this.pools.splice(index,1);
                
                //如果有其它对像池有在使用这个资源则不释放
                var exitsIds:number[] = this.getPools(loadObjs[i].url);
                if(exitsIds.length == 1) {
                    RES.destroyRes(loadObjs[i].url);                    
                }
            }
        }
        
        //根据url获取所有交集对像池的id
        getPools(url:string):number[] {
            var ids:number[] = []
            for(var i:number = 0; i != this.pools.length; i++) {
                if(this.pools[i].url != url) {
                    if(ids.indexOf(this.pools[i].poolsId) == -1)
                        ids.push(this.pools[i].poolsId);
                }
            }
            return ids;
        }
    }
}