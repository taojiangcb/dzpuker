/**
 * Created by JiangTao on 2016/5/4.
 */
module gameabc {
    export class UUID {

        constructor(){}
        
        //web端建立的uuid
        private static h5uuid:string = "";
        
        /**
         * 生成一个唯一标识id,重装游戏或者清除数据后此标识会重新生成。
         * @returns {string}
         */
        static generateH5UUID():string {
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                return platform.DEVICE_ID;
            }

            var sName:string = "bfdz_uuid";
            if(this.h5uuid == "") {
                this.h5uuid = gameabc.LocalSO.getItem(sName);
                if(typeof this.h5uuid == "undefine" || this.h5uuid == "" || this.h5uuid == null) {
                    this.h5uuid = String(new Date().getTime());
                    gameabc.LocalSO.setItem(sName,this.h5uuid);
                }
            }
            return this.h5uuid;
        }
        
        /**
         * 由原生的native传入设备的uuid
         */
        static setMobileUUID(uuid:string):void {
            platform.DEVICE_ID = uuid;
        }
    }
}