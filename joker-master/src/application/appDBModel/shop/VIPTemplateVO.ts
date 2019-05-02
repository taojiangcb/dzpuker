/**
 * Created by JiangTao on 2016/4/7.
 */
module shop {
    export class VIPTemplateVO {
        templateId:number = 0;                      //模板id
        name:string = "";                           //模板名称
        presenter:number = 0;                       //赠送的银子
        everydaypull:number = 0;                    //每日领取
        expression:number = 0;                      //表情包 0不开启 1开启
        nobleExpression:number = 0;                 //贵族表情包 0不开启 1开启
        paiju:number = 0;                           //记录牌局
        openRoom:number = 0;                        //开房权限
        collect:number = 0;                         //收藏牌局数
        price:number = 0;                           //价格

        constructor(templateId?:number,
                    name?:string,
                    presenter?:number,
                    everydaypull?:number,
                    paiju?:number,
                    expression?:number,
                    nobleExpression?:number,
                    openRoom?:number,
                    collect?:number,
                    price?:number) {

            this.templateId = templateId;
            this.name = name,
            this.presenter = presenter;
            this.everydaypull = everydaypull;
            this.expression = expression;
            this.nobleExpression = nobleExpression;
            this.paiju = paiju;
            this.openRoom = openRoom;
            this.collect = collect;
            this.price = price;
        }
    }

    export class VIPRowData {
        title:string = "";
        values:number[] = [];
        isSwitch:boolean = false;
    }
}