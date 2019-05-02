module myInfo {
	/**
	 *
	 * @author 
	 *
	 */
    export class ExpressionListItem extends uicomps.BaseItemCilckRenderer {
        private mc: gameabc.MovieClip;
        private mvgroup: eui.Group;
        private txtCharm:eui.Label;
        public constructor() {
            super();
            this.skinName = "ExpressionListSkin";
           
        }
        
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            // this.addButton(this,false);
            // this.touchChildren = false;
        }
        dataChanged(): void {
            if (this.data && this.data.label) {
                var skey = this.data.label.substr(0,this.data.label.length-1)+"fly";
                if (this.mc == null) {
                    // this.mc = new egret.MovieClip(playcards.getProxy().getFaceFactory().generateMovieClipData(this.data.label));
                    // this.mc.x = 35;//55;
                    // this.mc.y = 40;// 45;
                    this.mc = new gameabc.MovieClip(playcards.getProxy().getTextures(skey),12,false);
                    // this.mc.x = 35;//55;
                    // this.mc.y = 40;// 45;
                    this.mc.scaleX = this.mc.scaleY = 0.5;
                    this.addChild(this.mc);
                    
                    // this.mc.gotoAndStop("fly");
                } else this.mc.initTextures(playcards.getProxy().getTextures(skey));
                 var bb: number
                if(room.getProxy().current.type==room.TYPE.HAPPY)
                {
                   bb= this.uiModule.roleVO.facecost
                }else{
                    bb = this.data.charmList[0]*room.getProxy().current.charmList[0]
                }

                // this.txtCharm.text = FormatUtils.wan(bb);
                this.mc.x = 35 - this.mc.width*0.25;
                this.mc.y = 35 - this.mc.height*0.25;
               
            }     
        }

         get uiModule(): myInfo.PokerInfoUIMoudle {
            return <myInfo.PokerInfoUIMoudle>__GET_MOUDLE_COMP(AppReg.APP_POKER_INFO);
        }
	}
}
