/**
 * 
 */
module playcards{
    export class PlayStatisItemRenderer extends uicomps.BaseItemCilckRenderer{

        bgRect:eui.Rect;
        txt1:eui.Label;
        txt2: eui.Label;
        txt3: eui.Label;
        constructor(){
            super();
            this.skinName = "PlayStatisItemRendererSkin";
            this.touchChildren = false;

        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);

            this.addButton(this,false);
        }

        dataChanged():void {
            if (this.itemIndex % 2 == 0) {
               // this.bgRect.alpha = 1;
            } else {
               // this.bgRect.alpha = 0.5;
            }
            if(this.data)
            {
                var info = this.data as appvos.JoinPlayerVO;
                this.txt1.text = info.name;
                // this.txt2.text = info.totalBringBet+"";
                // this.txt3.text = (info.nowBet - info.totalBringBet) + ""; 
            }
        }

        click(tag:egret.DisplayObject):void {
            //__OPEN_PRE_MOUDLE(AppReg.APP_CHAT_PAGE)
        }
    }
}