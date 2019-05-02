module item {
      export function getProxy():ItemProxy {
        return __GET_PROXY(ItemProxy);
    }
    
    export class ItemProxy extends app.mvc.AbsractProxy {
        static NAME:string = "__ITEM_PROXY__"

        //道具本地模板数据信息
        templates:localDB.PropTemplateVO[] = [];


        private propDatas:item.PropVO[] = [];

        //过滤的道具
        ignorIds:number[] = [
            2038 //边锋茶苑的一种代币，现在用不上要过滤掉
        ]

        constructor(name?:string,data?:any) {
            super(ItemProxy.NAME,data);
            localDB.InitPropTemps(this.templates);
        }

        /***获取自己的道具 */
        getItemDate():void {
            __SEND_NOTIFICATION(app.NetAction.GET_PROP_ATTRS);
        }


        /**
         * 根据道具ID获取道具模板相关的数据
         */
        getPropTemplBySvrId(svrId:number):localDB.PropTemplateVO {
            var len:number = this.templates.length;
            while(--len > -1) {
                var tempData = this.templates[len];
                if(tempData.svrId.indexOf(svrId)!=-1) {
                    return tempData;
                }
            }
            return null;
        }

        getPropTemplById(id:number):localDB.PropTemplateVO {
            var len:number = this.templates.length;
            while(--len > -1) {
                var tempData = this.templates[len];
                if(tempData.id == id) {
                    return tempData;
                }
            }
            return null;
        }


        /** 修改一个道具的数量，如果没有道具对象，则创建一个，如果为0，则删除 */
        updatePropData(svrId:number, num:number):item.PropVO {

            //过滤无用道具
            if(this.ignorIds.indexOf(svrId) > -1) return null;

            var propData = this.getPropDataBySvrId(svrId);
            if (num == 0) {
                if (propData!=null) {
                    var index = this.propDatas.indexOf(propData);
                    this.propDatas.splice(index,1);
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
        }


        getPropDataBySvrId(svrId:number):item.PropVO {
            var len:number = this.propDatas.length;
            while(--len > -1) {
                var propData = this.propDatas[len];
                if(propData.template != null && propData.template.svrId.indexOf(svrId)!=-1) {
                    return propData;
                }
            }
            return null;
        }

        /**
         *
         * @param id
         * @returns {any}
         */
        getPropDataById(id:number):item.PropVO {
            var len:number = this.propDatas.length;
            while(--len > -1) {
                var propData = this.propDatas[len];
                if(propData && propData.template && propData.template.id == id) {
                    return propData;
                }
            }
            return null;
        }

        /**
         * 按道具类型筛选道具
         */
        getPropDataByType(type:number):item.PropVO[] {
            var len:number = this.propDatas.length;
            var datas:item.PropVO[] = [];
            while(--len > -1) {
                var propData = this.propDatas[len];
                if(propData && propData.template && propData.template.type == type) {
                    datas.push(propData);
                }
            }
            return datas;
        }
        
        getSNGTicketCount():number {
            return 0;
        }

        get allPropDatas():PropVO[] {
            return this.propDatas;
        }


        /** 
         *  注销清空数据
         */
        clearAllData(): void {
            this.propDatas =[];
        }
    }
}

