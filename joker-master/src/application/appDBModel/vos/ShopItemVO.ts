/**
 * Created by JiangTao on 2016/4/4.
 */
module appvos {
    export class ShopItemVO {

        id:number = 0;                  //ÉÌƷid
        templateId:number = 0;          //ÉÌƷģ°åid

        constructor(id?:number,templateId?:number){
            this.id = id;
            this.templateId = templateId;
        }
    }
}