/**
 * 
 */
module playcards{
    export class PlayStatisInfoItemRenderer extends uicomps.BaseItemCilckRenderer{

        bgRect:eui.Rect;
        txt1:eui.Label;
        iconTop:eui.Image;
        iconBg:eui.Image;
        iconType:eui.Image;
        avatar:uicomps.AvatarImage;
        constructor(){
            super();
            this.skinName = "PlayStatisInfoItemRendererSkin";
            this.touchChildren = false;

        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);

            this.addButton(this,false);
        }

        dataChanged():void {
            if (this.itemIndex==0) {
                this.iconTop.visible =true;
                this.iconBg.source ="s9_bg_meihua_png";
                this.iconType.source ="icon_mvp_png";
            } else if(this.itemIndex==1) {
                this.iconTop.visible = false;
                this.iconBg.source = "s9_bg_heitao_png";
                this.iconType.source = "icon_tuhao_png";
            }else{
                this.iconTop.visible = false;
                this.iconBg.source = "s9_bg_hongtao_png";
                this.iconType.source = "icon_dayu_png";
            }
            if(this.data)
            {
                var info = this.data as appvos.JoinPlayerVO;
                // this.avatar.source = info.avatarID;
                this.txt1.text = info.name;
//                this.txt1.text = info.name;
//                this.txt2.text = info.totalBringBet+"";
//                this.txt3.text = (info.totalBringBet-info.nowBet)+"";
            }
        }

        click(tag:egret.DisplayObject):void {
            //__OPEN_PRE_MOUDLE(AppReg.APP_CHAT_PAGE)
        }
    }
}