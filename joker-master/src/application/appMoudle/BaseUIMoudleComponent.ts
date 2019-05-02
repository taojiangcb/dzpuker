module app.base {
	/**
	 * 全屏模块基础
	 * UIMoudleComponent 基类
	 * @author 
	 *
	 */
    export class BaseUIMoudleComponent extends gameabc.UIMoudleComponent{
        private mediatorCls: any;
		public constructor() {
            super();
		}
		
        protected sendNotification(name: string,body?: any,type?: string):void {
            __SEND_NOTIFICATION(name,body,type);
        }

        protected registerMediator(cls: any): void {
            this.mediatorCls = cls;
            __REGISTER_MEDIATOR(cls,this);
        }

        protected unregisterMediator(): void {
            if(this.mediatorCls) {
                __REMOVE_MEDIATOR(this.mediatorCls);
            }
        }

		/**关闭窗口*/
		public close(evt:any=null):void {
            __CLOSE_MOUDLE_UI(this);
		}

        public dispose(): void {
            this.unregisterMediator();
            super.dispose();
        }
	}
}
