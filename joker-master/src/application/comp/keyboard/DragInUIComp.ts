// TypeScript file
module uicomps {

    /**
     * 记录上一次组件的输入值,在退出房间的时候此值会被清空
     */
    export var DEFAULT_NEED_SILVER:number = 0;


    /**
     * 校验所需带入的银两数
     * @isFoce 是否强制打开带入界面 
     *      false 当前玩家携带的彩豆小于所需限额或者大于最大限额时才会弹出带入界面
     *      true  强制弹出带入界面
     * @needSilver 最小带入
     * @maxSilver  最大带入
     * @showClose  是否显示close按钮
     * @callBackFunc 带入条件达成时所执行回的回调函数 (val:number)=>void 
     * @callObj 执行回函数时的原型对象
     */
    export function confirmNeedSilver(isFoce:boolean=false,
                                      needSilver:number,
                                      maxSilver:number,
                                      defaultMin:boolean = true,
                                      showClose:boolean = false,
                                      showBank:boolean = false,
                                      callBackFunc:(val:number)=>void,
                                      callObj:any=null){
        DragInComp.getInstance().confirmNeedSilver(isFoce,needSilver,maxSilver,defaultMin,showClose,showBank,callBackFunc,callObj);
    }

    export class DragInComp {
        private static __instance:DragInComp;
        static getInstance():DragInComp {
            if(DragInComp.__instance == null) {
                DragInComp.__instance = new DragInComp();
            }
            return DragInComp.__instance;
        }
        
        constructor() {}

        /**
         * 验证进房间时的带入彩豆
         * @param isforce                强行弹出带入界面
         * @param needSilver             最在带入额度
         * @param maxSilver              最大带入额度
         * @param confirmCallBack        带入后执行的回调函数
         * @param thisObj                回调函数的原型链对象
         * @param showClose              显示close按钮
         */
        confirmNeedSilver(isforce:boolean = false,
                          needSilver:number,
                          maxSilver:number,
                          defaultMin:boolean = true,
                          showClose:boolean = false,
                          showBank:boolean = true,
                          confirmCallBack:(inputValue:number)=>void,
                          thisObj:any=null) {
            var self_silver:number = user.getProxy().svrGameData.silver;
            if(isforce || needSilver > self_silver || maxSilver > self_silver) {
                __OPEN_PRE_MOUDLE(AppReg.DRAG_IN,
                    {
                        minSilver:needSilver,
                        maxSilver:maxSilver,
                        defaultMin:defaultMin,
                        callBack:confirmCallBack,
                        callObj:thisObj,
                        showCloseBtn:showClose,
                        showBankBtn:showBank
                    });
            }
            else {
                confirmCallBack.call(thisObj,needSilver);
            }
        }
    }
}