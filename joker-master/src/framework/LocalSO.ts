/**
 * Created by JiangTao on 2016/5/4.
 */
module gameabc {

    /**
     * 本地数据读写，这里加了一个前缀域来分区各个平台和账号的本地数据
     */
    export class LocalSO {

        //当前渠道号
        static PREFIX:string = "";
        static USERID:string = "";

        constructor(){
        }

        static setAllItem(key:string,value:any):boolean {
            return egret.localStorage.setItem(key,value);
        }

        static getAllItem(key:string):string {
            return egret.localStorage.getItem(key);
        }

        static setItem(key:string,value:any):boolean {
            return egret.localStorage.setItem(this.PREFIX + this.USERID + key,value);
        }

        static getItem(key:string):string {
            return egret.localStorage.getItem(this.PREFIX + this.USERID + key);
        }

        static removeItem(key:string):void {
            egret.localStorage.removeItem(this.PREFIX + this.USERID + key);
        }

        static clear():void {
            egret.localStorage.clear();
        }
    }
}