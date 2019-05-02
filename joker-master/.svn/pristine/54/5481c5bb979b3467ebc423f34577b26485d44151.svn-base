/**
 * Created by JiangTao on 2016/4/5.
 */
module shop {

    export class ShopItemItemRenderer extends uicomps.BaseItemCilckRenderer{

        txtAddMoney:eui.BitmapLabel;
        txtSilver:eui.BitmapLabel;
        img:eui.Image;
        addGroup:eui.Group;
        buyBtn:eui.Button;

        constructor(){
            super()
            this.skinName = "resource/app_skin/shop/ShopItemSkin.exml"
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);

            this.touchChildren = true;
            this.touchEnabled = false;
            this.addButton(this.buyBtn,true);

        }

        dataChanged():void {
            var shopItem = this.data;
            if(shopItem) {
                var addMoney = shopItem.amount - (shop.getProxy().PROPORTION * shopItem.price)
                if(addMoney> 0) {
                    this.txtAddMoney.text = gameabc.getMessage("BUY_SILVER_ADD",FormatUtils.wan(addMoney))
                    this.addGroup.visible = true;
                } else {
                    this.addGroup.visible = false;
                }

                this.img.source = gameabc.StringUtils.trim(shopItem.img_url);
                this.txtSilver.text = shopItem.name;
                this.buyBtn.label = "¥" + shopItem.price;

                // var template: shop.ItemTemplateVO = shop.getProxy().getTemplateById(shopItem.propid);
                // if(template) {
                // }
            }
        }

        click(tag:egret.DisplayObject):void {
            if(this.data) {
                console.log("click buy btn");
                platform.payment(this.data);
                //shop.getProxy().quickAccount.creatData = this.data;
                //shop.getProxy().quickAccount.createOrderList(this.data.propid,this.data.price)
            }

//            var template:shop.ItemTemplateVO = shop.getProxy().getTemplateById(this.data.templateId);
//            if(template) {
//                var silverCount:number = template.moneyNum + template.moneyAdd;
//                var rmb:number = template.price;
//                var str_contnt:string = gameabc.getMessage("BUY_SILVER_PROMPT",rmb,silverCount);
//                tip.Alert.show(str_contnt,gameabc.getMessage("BUY_TITLE"),tip.CONFIRM,(flag:number,data:any)=>{
//                    if(flag == tip.YES) {
//                        var param:appvos.ParamVO = new appvos.ParamVO();
//                        param.intValues = [template.templateId];
//                        __SEND_NOTIFICATION(app.NetAction.BUY_SILVER,param);
//                    }
//                },null,this)
//            }
        }
        get shopView(): shop.ShopWinModule {
            return <shop.ShopWinModule>__GET_MOUDLE_COMP(AppReg.SHOP_WIN);
        }
    }
}