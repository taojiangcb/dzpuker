/**
 * Created by JiangTao on 2016/4/4.
 */
module shop {
    export class ItemTemplateVO {
        templateId:number = 0;                  //id
        itemName:string = "";                   //名称
        imgUrl:string = "";                     //图片地址url
        moneyNum:number = 0;                    //银两数
        moneyAdd:number = 0;                    //额外增加的银两
        addCount:number = 0;                    //额外增加的次数
        price:number = 0;                       //单价


        constructor(templateId?:number,
                    itemName?:string,
                    imgUrl?:string,
                    moneyNum?:number,
                    moneyAdd?:number,
                    addCount?:number,
                    price?:number) {

            this.templateId = templateId;
            this.itemName = itemName;
            this.imgUrl = imgUrl;
            this.moneyNum = moneyNum;
            this.moneyAdd = moneyAdd;
            this.addCount = addCount;
            this.price = price;
        }
    }
}