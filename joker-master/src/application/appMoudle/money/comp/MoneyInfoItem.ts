module money {
    /**
     *
     * @author
     *
     */
    export class MoneyInfoItem extends uicomps.BaseItemCilckRenderer {

        okBtn:eui.Group;
        bgImag:eui.Image;

        icon:eui.Image;
        tips:eui.Image;
        btnIcon:eui.Image;
        numTxt:eui.BitmapLabel;

        public constructor() {
            super();
            this.skinName = "MoneyInfoItemSkin";
            this.percentWidth = 100;
        }

        public createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.addButton(this.okBtn);
        }

        dataChanged():void {
            if (this.itemIndex % 2 == 0) {
                // this.bgImag.visible = true;
            } else {
                // this.bgImag.visible = false;
            }
            //{icon:"icon_money_type_1_png",tips:"img_word_money_type_1_png",btnIcon:"img_word_money_qwqz_png",numTxt:0,clikcDat:AppReg.APP_BANK}
            if (this.data) {
                var info = this.data;
                this.icon.source = info.icon;
                this.tips.source = info.tips;
                if (info.btnIcon) {
                    this.okBtn.visible = true;
                    this.btnIcon.source = info.btnIcon;
                }
                else {
                    this.okBtn.visible = false;
                }
                if (info.numTxt) {
                    this.numTxt.visible = true;
                    this.numTxt.text = info.numTxt.toString();
                }
                else {
                    this.numTxt.visible = false;
                }
            }
        }

        click(tag:egret.DisplayObject):void {
            if (tag == this.okBtn) {
                if (this.data && this.data.clickDat) {
                    if (this.data.clickDat == AppReg.SNG) {
                        user.getProxy().openSNG();
                    } else {
                        __OPEN_PRE_MOUDLE(this.data.clickDat);
                    }
                }
                else if(this.data.sort == 3) {
                    //进金币房
                    room.getProxy().goldRoom();
                }
                __CLOSE_MOUDLE(AppReg.APP_MONEY);
            }
        }
    }
}
