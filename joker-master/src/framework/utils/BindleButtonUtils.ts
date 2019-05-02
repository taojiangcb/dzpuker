module gameabc {
	/**
	 *
	 * @author 
	 *
	 */
	export class BindleButtonUtils {
        private static touchCache: Object = {};
        private static SCALE_ROAT: number = 1.1;
		public constructor() {
		}
		
		/*
		 * 绑定一个显示对像使出发点击效果å
		 */ 
        public static bindClickByTarget(tag: egret.DisplayObject): void {
            if(!tag) return;
            tag.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
            tag.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchHandler,this);
            tag.addEventListener(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
        }
        
        private static touchHandler(event: egret.TouchEvent): void {
            var tag: egret.DisplayObject = event.currentTarget as egret.DisplayObject;
            var touch: egret.TouchEvent = event;
            if (tag.touchEnabled) {
                if (touch.type == egret.TouchEvent.TOUCH_BEGIN) {
                    this.onClick(tag);
                } else if (touch.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE && this.touchCache[tag.hashCode]) {
                    this.onResterClick(tag);
                } else if (touch.type == egret.TouchEvent.TOUCH_END) {
                    this.onResterClick(tag);
                }
            }
        }
        private static onClick(tag: egret.DisplayObject):void{
            if(!this.touchCache[tag.hashCode]) {
                this.touchCache[tag.hashCode] = [tag.x,tag.y,tag.scaleX,tag.scaleY,tag['right'],tag['bottom']]//,tag.width,tag.height,tag.anchorOffsetX,tag.anchorOffsetY;      
            }
//              if(tag&&this.touchCache[tag.hashCode]) {


                  tag.scaleX = this.touchCache[tag.hashCode][2] * this.SCALE_ROAT;
                  tag.scaleY = this.touchCache[tag.hashCode][3] * this.SCALE_ROAT;
//                  if(tag.anchorOffsetX == 0) {
                      //                    tag.anchorOffsetX = tag.width >> 1;
                      //                    tag.anchorOffsetY = tag.height >> 1;
                      //                    tag.x += tag.anchorOffsetX;
                      //                    tag.y += tag.anchorOffsetY;
                  var vx: number = (this.SCALE_ROAT - 1) * tag.width >> 1;
                  var vy: number = (this.SCALE_ROAT - 1) * tag.height >> 1;
                      tag.x = this.touchCache[tag.hashCode][0] - vx;
                      tag.y = this.touchCache[tag.hashCode][1] - vy;
                      if (!isNaN(tag['right'])) 
                          tag['right'] = this.touchCache[tag.hashCode][4] - vx;
                      if (!isNaN(tag['bottom'])) 
                          tag['bottom'] = this.touchCache[tag.hashCode][5] - vy;   
                      utils.SoundUtils.playEffectSound(utils.SoundUtils.button); 
//                  }
//                }Bind
        }
        private static onResterClick(tag:egret.DisplayObject):void {
//            if(tag) {
                if(tag&&this.touchCache[tag.hashCode]) {
                    tag.x = this.touchCache[tag.hashCode][0];
                    tag.y = this.touchCache[tag.hashCode][1];
                    tag.scaleX = this.touchCache[tag.hashCode][2];
                    tag.scaleY = this.touchCache[tag.hashCode][3];
                     if (!isNaN(tag['right'])) 
                          tag['right'] = this.touchCache[tag.hashCode][4];
                      if (!isNaN(tag['bottom'])) 
                          tag['bottom'] = this.touchCache[tag.hashCode][5];  
//                    tag.anchorOffsetX = this.touchCache[tag.hashCode][6];
//                    tag.anchorOffsetY = this.touchCache[tag.hashCode][7];
                    delete this.touchCache[tag.hashCode];
                }
//            }
        }
        
        public static unbindClick(tag:egret.DisplayObject):void {
            if(tag) {
                this.onResterClick(tag);
//                delete this.touchCache[tag.hashCode];
                tag.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
                tag.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchHandler,this);
                tag.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
            }
        }
	}
}

var __BIND_CLICK = function(tag:egret.DisplayObject):void {
    gameabc.BindleButtonUtils.bindClickByTarget(tag);
}

var __UNBIND_CLICK = function(tag:egret.DisplayObject):void {
    gameabc.BindleButtonUtils.unbindClick(tag);
}
