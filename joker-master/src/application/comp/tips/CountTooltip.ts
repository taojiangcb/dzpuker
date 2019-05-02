/**
 * Created by taojiang on 16/3/22.
 * 数字标签显示组件模块
 */
module tip {
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
    export function createOrGetTipData(key:string,subKeys?:string[],masterKey?:boolean,eventDispatch?:egret.EventDispatcher):CountTipStruct {
        return CountTooltip.instance.createTipData(key,subKeys,masterKey,eventDispatch);
    }

    export function getTipData(key:string):CountTipStruct {
        return CountTooltip.instance.getTipData(key);
    }

    export function getSubTipDatas(subKey:string):CountTipStruct[] {
        return CountTooltip.instance.getSubTipDatas(subKey);
    }

    export function updateTip(key:string,value:number):void {
        CountTooltip.instance.updateCount(key,value);
    }

    export class CountTooltip {
        private static __instance:CountTooltip;
        static get instance():CountTooltip {
            if(this.__instance == null) this.__instance = new CountTooltip();
            return this.__instance;
        }

        //tip数据缓存
        tables:CountTipStruct[] = [];

        //更新消息的派发器委托
        dispatchEvent:egret.EventDispatcher;

        constructor() {
            //默认派发器
            this.dispatchEvent = new egret.EventDispatcher();
        }

        /**
         * 创建一个countTip数据,如果该实数据已经存在则不会创建新的覆盖.
         * @param key                   标签key
         * @param subKey                复合标签key
         * @param eventDispatch         标签消息更新触发器
         * @returns {CountTipStruct}
         */
        createTipData(key:string,subKeys?:string[],masterKey?:boolean,eventDispatch?:egret.EventDispatcher):CountTipStruct {
            var exist:CountTipStruct = this.getTipData(key);
            if(exist == null) {
                var data:CountTipStruct = new CountTipStruct();
                data.key = key;
                data.isMasterKey = masterKey;
                if(subKeys) data.subKeys = subKeys;
                data.eventDelegate = eventDispatch ? eventDispatch : this.dispatchEvent;
                this.tables.push(data);
                return data;
            }

            if(subKeys && subKeys.length > 0) {
                var len:number = subKeys.length;
                while(--len > -1) {
                    var key:string = subKeys[len];
                    if(exist.subKeys.indexOf(key) == -1) {
                        exist.subKeys.push(subKeys[len]);
                    }
                }
            }

            if(eventDispatch != null) {
                exist.eventDelegate = eventDispatch;
            }
            return exist;
        }

        /**
         * 获取一个标签数据信息
         * @param key
         * @returns {any}
         */
        getTipData(key:string):CountTipStruct {
            var len:number = this.tables.length;
            while(--len  > -1) {
                if(this.tables[len].key == key) return this.tables[len];
            }
            return null;
        }

        /**
         * 获取一个复合标签数据列表
         * @param subKey
         * @returns {CountTipStruct[]}
         */
        getSubTipDatas(subKey:string):CountTipStruct[] {
            var len:number = this.tables.length;
            var res:CountTipStruct[] = []
            while(--len  > -1) {
                if (this.tables[len].subKeys.indexOf(subKey) > -1){
                    res.push(this.tables[len]);
                }
            }
            return res;
        }

        /**
         * 获取一个标签的数量
         * @param key
         * @returns {number}
         */
        getCount(key:string):number {
            var cache:CountTipStruct = this.getTipData(key);
            return cache ? cache.value : 0;
        }

        /**
         * 获取复合标签的总数量
         * @param subKey
         * @returns {number}
         */
        getSubCount(subKey:string):number {
            var res:CountTipStruct[] = this.getSubTipDatas(subKey);
            var len:number = res.length;
            var count:number = 0;
            while(--len > -1) {
                count += res[len].value;
            }
            return count;
        }

        /**
         * 更新一个标签的数量
         * @param key
         * @param value
         */
        updateCount(key:string,value:number):void {
            var data:CountTipStruct = this.getTipData(key);
            if(data) {
                data.value = value;
                var dispatch:egret.EventDispatcher = data.eventDelegate;

                if(dispatch.hasEventListener(key)){
                    dispatch.dispatchEventWith(key,false,data.value);
                }

                var len:number = data.subKeys.length;
                while(--len > -1) {
                    var count:number = this.getSubCount(data.subKeys[len]);
                    dispatch.dispatchEventWith(data.subKeys[len],false,count);
                }
            }
        }
    }

    export class CountTipStruct {
        key:string = "";                            //当前key
        isMasterKey:boolean = false;                //是不是主级
        value:number = 0;                           //当前值
        subKeys:string[] = [];                      //复合消息key
        eventDelegate:egret.EventDispatcher;        //当前消息派发委托

    }

    //tip数字组件
    export class CountTipUI extends gameabc.UICustomComponent {

        //tip数字对像
        private tipData:CountTipStruct;
        //圆形背景
        private bgCir:eui.Image;
        //数字文本
        private txtLabel:eui.Label;

        key:string = "";
        subKeys:string[] = [];
        masterKey:boolean = false;

        /**
         * key      消息标签
         * subKey   复合消息标签         默认为""
         * dispatch 消息派发器委托       默认为null
         * **/
        constructor(tipData?:CountTipStruct){
            super();
            this.setTipData(tipData);
            this.touchEnabled = false;
            this.touchChildren = false;
        }

        setTipData(val:CountTipStruct):void {
            if(val == null) return;
            if(val == this.tipData) return;

            if(this.tipData) {
                this.removeListeners();
            }

            this.key = val.key;
            this.subKeys = val.subKeys;
            this.masterKey = val.isMasterKey;
            this.tipData = val;
            this.listeners();
        }

        createChildren():void {
            super.createChildren();

            var texture:egret.Texture = RES.getRes("icon_mail_tshd_png");
            this.bgCir = new eui.Image(texture);
            this.bgCir.scale9Grid = new egret.Rectangle(8,8,1,1);
            this.addChild(this.bgCir);

            this.txtLabel = new eui.Label();
            this.txtLabel.width = texture.textureWidth;
            this.txtLabel.height = texture.textureHeight;

            this.txtLabel.size = 24;
            this.txtLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.txtLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.txtLabel.textColor = AppConst.TextColors.white;
            //this.addChild(this.txtLabel);
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
        }

        /****是否是复合类型tip标签*****/
        isSubCount():boolean {
            return this.masterKey;
        }

        /***当有一个tip消息更新时触发***/
        private onUpdate(event:egret.Event):void {
            if(this.initialized) {
                this.fullValues();
            } else {
                this.invalidateProperties();
            }
        }

        /***刷新显示****/
        private fullValues():void {
            var actualValue:number = this.isSubCount()
                ? CountTooltip.instance.getSubCount(this.key)
                : (this.tipData ? this.tipData.value : 0);

            actualValue = Math.min(actualValue,99);
            if(actualValue <= 0) {
                this.visible = false;
            } else {
                this.visible = true;
                this.txtLabel.text = actualValue.toString();
            }
        }

        commitProperties():void {
            super.commitProperties();
            this.fullValues();
        }

        listeners():void {
            if(this.tipData) {
                var eventDispatch:egret.EventDispatcher = this.tipData.eventDelegate;
                if(this.key.length > 0) {
                    eventDispatch.addEventListener(this.key,this.onUpdate,this);
                }

                else if(this.subKeys.length > 0) {
                    var len:number = this.subKeys.length;
                    while(--len > -1) {
                        eventDispatch.addEventListener(this.subKeys[len],this.onUpdate,this);
                    }
                }
            }
        }

        removeListeners():void {
            if(this.tipData) {
                var eventDispatch:egret.EventDispatcher = this.tipData.eventDelegate;

                if(this.key.length > 0) {
                    eventDispatch.removeEventListener(this.key,this.onUpdate,this);
                }

                else if(this.subKeys.length > 0) {
                    var len:number = this.subKeys.length;
                    while(--len > -1) {
                        eventDispatch.removeEventListener(this.subKeys[len],this.onUpdate,this);
                    }
                }
            }
        }

        dispose():void {
            this.removeListeners();
            super.dispose();
        }
    }
}