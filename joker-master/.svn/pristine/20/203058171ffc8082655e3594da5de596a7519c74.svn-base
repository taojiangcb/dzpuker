module playcards {
	/**
	 * 聊天泡泡
	 * @author 
	 *
	 */
	export class MessItem extends eui.Component{
        private send:any;
        private mess: string;
        private bgimg:eui.Image;
        public  messlab: eui.Label;
        private timeid: number;
        private px: number;
        private py: number;
        public constructor() {
            super();
            this.skinName = "MessItemSkin"; 
            // this.setSend(send);
            // this.mess = mess;
            // this.once(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this)
		}
        private setpos(): void{
            egret.clearTimeout(this.timeid);
            this.timeid = egret.setTimeout(this.close,this,3000);
            this.messlab.text = this.mess;
            if (this.px == null && this.px == null)
                return;  
            if (this.send instanceof PlayCardsItemComp) {
                 if (this.py < 100) {
                    //  this.bgimg.scaleY = -1;
                     this.currentState = "top"; 
                     this.y = this.py + 130;
                     this.x = this.px;
                }else if(this.py > 400) {
                    //  this.bgimg.scaleY = 1;
                     this.currentState = "bottom"; 
                    //  this.y = this.py - 95;
                     this.bottom = 768 - this.py;
                    this.x = this.px;
                }else if ( this.px < 400) {
                    //  this.bgimg.scaleX = -1;
                      this.currentState = "left"; 
                      this.x = this.px + 110;
                      this.y = this.py; 
                } else {
                    //  this.bgimg.scaleX = 1;
                    this.currentState = "right";  
                    // this.x = this.px - 70;
                    this.right =1126- this.px;
                    this.y = this.py; 
                }
            }
            //  else {

            //     this.messlab.left = this.messlab.right = 30;
            //     this.messlab.top = this.messlab.bottom = 20;
            //     this.x = this.px;
            //     this.y = this.py;
            // }
        }
        private setSend(send): void{
             if (send != null) {
                 this.send = send;
                 send.sendMess = this;
                 this.px = send.x; 
                 this.py = send.y;
            }          
          
        }
        public show(send,mess: string): void{
            this.setSend(send);
            this.showMess(mess);   
        }
        public showXY(px:number,py:number,mess: string,currentState:string): void{
            this.x = px;
            this.y = py;
            this.showMess(mess);
            this.currentState = currentState;
        }
        public showMess(mess: string): void{
            this.mess = mess;
            // if (this.messlab != null)
            this.setpos();  
        }
        public clearTimeout(): void{
            egret.clearTimeout(this.timeid);
        }
        public close(): void{
             if (this.send !=null){               
                 this.send.sendMess = null;
                 this.send = null; 
            } 
            this.removeFromParent(true);
        }
	}
}
