module gameabc {
	/**
	 *
	 * @author 
	 *
	 */
	export class UICustomComponent extends eui.Component {
    	
    	/**
    	 * 生命周期结束
    	 */ 
        public initialized: boolean = false;
        /**
         * 记录全部绑定按钮 dispose 的时候移除
         * */
        public allbindButton: Object;
		public constructor() {
            super();
            this.once(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this);
            this.allbindButton = {};
		}
		
        /*该模块被创建完成后的回调函数*/
        public createComplete(event: egret.Event): void {
            this.initialized = true;
        }

        protected unbindButton(image: egret.DisplayObject,deleteKey: boolean = true): void {
            if(image) {
                image.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
                gameabc.BindleButtonUtils.unbindClick(image);
                if(deleteKey && this.allbindButton)
                    delete this.allbindButton[image.hashCode];
            }
        }
        
        /**
         * 绑定按钮点击  dispose 自动 unbindButton
         * @param image
         * @param isBtn 点击是是否缩放
         */
        protected bindButton(image: egret.DisplayObject, isBtn: boolean = true): void {
            image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            if(isBtn) gameabc.BindleButtonUtils.bindClickByTarget(image);
            this.allbindButton[image.hashCode] = image;
        }


        protected buttonGroup:uicomps.ButtonGroup;
        /**
         * 用ToggleButton组件快速创建一组TAB按钮 dispose 自动 unbindButton
         */        
        protected bindTabButton(...args):void {
            this.buttonGroup = new uicomps.ButtonGroup();
            for (var i=0; i<args.length; ++i) {
                this.buttonGroup.add(args[i]);
                this.bindButton(args[i],false);
            }
            this.buttonGroup.itemClick = this.touchHandler;
            this.buttonGroup.itemThisObj = this;
        }
        protected selectTabButton(index:number):void {
            var button = this.buttonGroup.list[index];
            this.buttonGroup.select(button);
            this.touchBindButtonHandler(button);
        }


        /**
         * 子类如果有bindButton, click事件覆盖次方法实现
         */
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {

        }

        protected touchHandler(event: egret.TouchEvent): void {
            var tag: egret.DisplayObject = event.currentTarget;
            this.touchBindButtonHandler(tag);
        }

       public removeFromParent(isDispose:boolean = false): void {
           if(this.parent) this.parent.removeChild(this);
           if(isDispose) this.dispose();
       }
		
		public dispose():void {
            for(var key in this.allbindButton){
                this.unbindButton(this.allbindButton[key],false);
            }
            this.allbindButton = null;
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this);
		}
	}
}
