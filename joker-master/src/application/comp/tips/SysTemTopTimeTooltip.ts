module tip {

	/** 显示字符，并可以设置回调按钮的执行方法，
	 * 最后一个数字则表示了到计时次数，当有倒计时的时候，
	 * 函数将尝试替换val中的{sec} */
	export function popSysTopTimeTooltip(val:string,recall: Function, recallthis: any, recallParam:any=null):void {
        SysTemTopTimeTooltip.showTip(val,recall,recallthis,recallParam);
    }

	export function changeTopTimeTipStr(str:string):void {
		SysTemTopTimeTooltip.changeTip(str);
	}

    export function clearSysTopTimeTooltip():void {
        SysTemTopTimeTooltip.clearTips();
    }
	export class SysTemTopTimeTooltip extends gameabc.UICustomComponent {
		private static uiView: SysTemTopTimeTooltip;
		private static get uiComp():SysTemTopTimeTooltip {
            if (this.uiView == null) {
                this.uiView = new SysTemTopTimeTooltip();
            }
            return this.uiView;
        }
		static showTip(val: string,recall: Function, recallthis: any, recallParam:any=null):void {
            if (val == null || val.length == 0) return;
			this.uiComp.recall = recall;
			this.uiComp.recallthis = recallthis;
			this.uiComp.recallParam = recallParam;
			AppRoot.gameLayer.addChild(this.uiComp);
			this.uiComp.messlab.text = val;
        }
		static clearTips():void {
			this.uiComp.recall = null;
			this.uiComp.recallthis = null;
			this.uiComp.removeFromParent();
        }
		static changeTip(val:string):void {
			if (this.uiComp!=null && this.uiComp.messlab!=null) {
				this.uiComp.messlab.text = val;
			}
		}

		
		public btn:eui.Group;
		public btnImg: eui.Image;
		public btnclose: eui.Image;
		public messlab: eui.Label;
		public recall: Function;
		public recallthis: any;
		public recallParam: any;
		public constructor() {
			super();
			this.skinName = "SysTemTopTimeTooltipSkin";
			this.percentWidth = 100;
		}
		  /*该模块被创建完成后的回调函数*/
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
			this.bindButton(this.btn);
			this.bindButton(this.btnclose);
        }
		 /**
         * 子类如果有bindButton, click事件覆盖次方法实现
         */
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
			 if (clickTarget == this.btn) {
				if (this.recall) this.recall.call(this.recallthis,this.recallParam);
			}
			clearSysTopTimeTooltip();
        }

	}
}