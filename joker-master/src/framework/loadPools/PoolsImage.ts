/**
 * Created by JT on 2015/12/26.
 */
module loadPools {
    export class PoolsImage extends eui.Image {
        
        /*
         * 对像池id
         */ 
        poolsId:number = 0;       
        
        constructor(poolsId:number = 0,source?:string|egret.Texture) {
            super(source);
            this.poolsId = poolsId;
            this.addEventListener(egret.Event.COMPLETE,this.loadComplete,this);
        }

        private loadComplete(event:egret.Event):void {
            if(this.poolsId > 0){
                if(typeof this.source == "string") {
                    if(!RES.hasRes(<string>this.source)) {
                        loadPools.addToPool(this.poolsId,<string>this.source);
                    }
                }
            }
        }
    }
}