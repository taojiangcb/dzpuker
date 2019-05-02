module happy {
	export class HappyItemComp extends gameabc.UICustomComponent{
        // public sitlab: eui.Label;
        public sitimg: eui.Image;
		public headimg:eui.Image;
		public namelab:eui.Label;
		public moneylab:eui.Label;
        public playvo: appvos.HLCPlayerVO;
		private isBank: boolean;
		public constructor() {
			super();
			this.skinName = "HappyItemSkin";
		}
		public setVO(vo:appvos.HLCPlayerVO): void{
			this.playvo = vo;
			if (vo == null) {
				this.headimg.visible = this.namelab.visible = this.moneylab.visible = false;
				this.sitimg.visible = true;
			} else {
				this.headimg.visible = this.namelab.visible = this.moneylab.visible = true;
				this.sitimg.visible = false;
				this.updateUserName(vo.name);
                this.moneylab.text = FormatUtils.wan(vo.totalBet);
                this.refAvatar();
			}
        }
        public sitlabvisable(value:boolean): void{         
            this.sitimg.visible = value && this.playvo == null;    
        }
		public setBet(): void{
			if(this.playvo!=null)
				this.moneylab.text = FormatUtils.wan(this.playvo.totalBet);
        }
        public refAvatar(): void{
            if(this.playvo!=null)
             this.headimg.source = user.getProxy().getHeadStr(Number(this.playvo.avatarID));
        }
		public setisBank(): void{
            // this.sitlab.text = "";
            this.sitimg.removeFromParent();
			this.isBank = true;
		}
		  /**
         * TODO
         * 汉字最多5个字,超过5个则显示4个汉字+..
         * 英文最多8个字，超过显示6个字母+..
         */ 
        private updateUserName(newName:string):void {
            var textSize:number = 19;
            var textLen:number = 0;
            var textBold:boolean = true;
            var isSelf: boolean = this.isBank;
            if (newName) {
                var nameLen: number = newName.length;
                for(var i: number = 0;i < nameLen; i++) {
                    var charASC: number = newName.charCodeAt(i);
                    if (charASC < 128) {
                        textLen++;
                    } else {
                        textLen += 2;
                    }
                }
            }
            if (textLen > 11) {
                textSize = 13;
                textBold = false;
            } else if(textLen > 9) {
                textSize = 13;
                textBold = false;
            } else if(textLen > 8) {
                textSize = 16;
            } else if(textLen > 7) {
                textSize = 17;
            } else if(textLen > 5) {
                textSize = 18;
            }
            
            if(!isSelf) {
                textSize--;
            }
            
            this.namelab.size = textSize;
            this.namelab.text = newName;
        }
	}
}