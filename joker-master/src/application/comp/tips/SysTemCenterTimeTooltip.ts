module tip {
	 export function popSysCenterTimeTooltip(valSrc: string,mtime:string, stime: string):void {
     
        SysTemCenterTimeTooltip.showTip(valSrc,mtime,stime);
    }

    export function clearSysCenterTimeTooltip():void {
        SysTemCenterTimeTooltip.clearTips();
    }
	export class SysTemCenterTimeTooltip extends gameabc.UICustomComponent {
		private static uiView: SysTemCenterTimeTooltip;
		private static get uiComp():SysTemCenterTimeTooltip {
            if (this.uiView == null) {
                this.uiView = new SysTemCenterTimeTooltip();
            }
            return this.uiView;
        }
		
		static showTip(valSrc: string,mtime:string, stime: string):void {
          			
			AppRoot.gameLayer.addChild(this.uiComp);
			this.uiComp.messimg.source = valSrc;
			this.uiComp.mlab.text = mtime;
			this.uiComp.slab.text = stime;
        }
		static clearTips():void {
			this.uiComp.removeFromParent();
        }
		
		public messimg:eui.Image;
		public mlab:eui.BitmapLabel;
		public slab:eui.BitmapLabel;

		public constructor() {
			super();
			this.skinName = "SysTemCenterTimeTooltipSkin";
			this.horizontalCenter = 0;
			this.verticalCenter = -38;
		}
	
	}
}