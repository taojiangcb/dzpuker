/**
 * Created by taojiang on 16/4/25.
 */
module tip {

    export function popSysRollTopTip(val: string,type: string = TIPS_TYPE.TIPS_NOTHING): void {
        var str = gameabc.ResourceBundleUtil.getMessage(val);
        SystemRollTooltip.showTip(!str ? val : str,type);
    }

    export function clearSysRollTopTip():void {
        SystemRollTooltip.clearTips();
    }

    var GROUP_HEIGHT:number = 40;

    export class SystemRollTooltip {

        private static tips:any[] = [];
        private static uiView:SystemRollTooltipUIComp;

        private static tweens:egret.Tween;
        private static curtip:string = "";

        private static get uiComp():SystemRollTooltipUIComp {
            if (this.uiView == null) {
                this.uiView = new SystemRollTooltipUIComp();
            }
            return this.uiView;
        }

        static showTip(val: string, _type: string = TIPS_TYPE.TIPS_NOTHING): void {
            if (val == null || val.length == 0) return;
            if (this.curtip == "") {
                var obj = { tips: val,type: _type }
                this.tips.push(obj);
                this.pop();
            } else if (this.checktips(val)) {
                var obj = { tips: val,type: _type }
                this.tips.push(obj);
            }
        }

        static checktips(val: string) {
            var inTips: boolean = false;
            for (var i = 0; i < this.tips.length; i++) {
                if (this.tips[i].tips == val) {
                    inTips = true;
                    break;
                }
            }
            return (this.curtip != val && !inTips);
        }

        static clearTips():void {
            if(this.tweens != null) {
                egret.Tween.pauseTweens(this.uiComp.group);
                this.tweens = null;
            }

            if(this.tips.length > 0) {
                this.tips = [];
            }
        }

        private static pop():void {
            if (this.tips.length > 0) {
                var obj = this.tips.shift();
                this.curtip = obj.tips;
                this.uiComp.iconStr = obj.type;
                this.uiComp.text = this.curtip;

                AppRoot.gameLayer.addChild(this.uiComp);
                var ui:eui.Group = this.uiComp.group;

                var groupWidth:number = this.uiComp.getContentWidth();
                var groupHeight:number = 40;

                var startX:number = AppGlobal.stageFullWidth - Number(this.uiComp.left) - Number(this.uiComp.right);
                var toX:number = -groupWidth;
                var dir:number = (startX + groupWidth) * 500 / 40;
                ui.x = startX;

                this.tweens = egret.Tween.get(ui);
                this.tweens.to({x:toX},dir).call(()=>{
                    egret.Tween.removeTweens(ui);
                    this.pop();
                    // this.curtip = "";
                });
            } 
            else {
                this.curtip = "";
                this.uiComp.removeFromParent(true);
            }
        }
    }

    export class SystemRollTooltipUIComp extends gameabc.UICustomComponent {
        group:eui.Group;

        bg:eui.Rect;
        txtLabel:eui.Label;
        tipIcon:eui.Image;

        valStr:string = "";
        iconStr: string = "";
        changeFlag:boolean = false;

        constructor(){
            super();
            this.touchEnabled = false;
            this.touchChildren = false;

            this.left = this.right = 0;
            this.top = 0;
            this.height = GROUP_HEIGHT;
        }

        createChildren():void {
            super.createChildren();
            this.horizontalCenter = 0;

            this.bg = new eui.Rect();
            this.bg.fillColor = 0;
            this.bg.fillAlpha = 0.5;
            this.bg.percentWidth = 100;
            this.bg.percentHeight = 100;
            this.addChild(this.bg);

            this.tipIcon = new eui.Image();
            this.tipIcon.width = this.tipIcon.height = GROUP_HEIGHT;
            
            this.txtLabel = new eui.Label();

            // this.txtLabel.horizontalCenter = 0;
            // this.txtLabel.verticalCenter = 0;

            this.txtLabel.textColor = 0xFFFFFF;
            this.txtLabel.size = 24;
            this.txtLabel.minWidth = 150;
            this.txtLabel.wordWrap = false;
            this.txtLabel.multiline = false;
            this.txtLabel.textAlign = egret.HorizontalAlign.LEFT

            this.group = new eui.Group();
            this.group.addChild(this.tipIcon);
            this.group.addChild(this.txtLabel);
            var hlayout:eui.HorizontalLayout = new eui.HorizontalLayout();
            hlayout.gap = 10;
            hlayout.verticalAlign = "middle";
            this.group.layout = hlayout;
            this.group.addChild(this.tipIcon);
            this.group.addChild(this.txtLabel);
            this.addChild(this.group);
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            var rWidth:number = AppGlobal.stageFullWidth - Number(this.left) - Number(this.right);
            this.mask = new egret.Rectangle(0,0,rWidth,this.height);
        }

        commitProperties():void {
            super.commitProperties();
            if(this.changeFlag){
                this.changeFlag = false;
                this.txtLabel.text = this.valStr;
                
                if(this.iconStr) {
                    this.tipIcon.source = this.iconStr;  
                }
                else {
                    this.tipIcon.source =""
                }
                this.group.width = this.txtLabel.width + 50;
                this.tipIcon.y = (this.group.height - this.tipIcon.height) / 2;
            }
        }

        getContentWidth():number {
            var fontFamily:string =  egret.TextField.default_fontFamily;
            var strWidth:number = egret.sys.measureText(this.valStr,fontFamily,24,false,false);
            return strWidth + 50 + 10;
        }

        set text(val:string) {
            this.valStr = val;
            this.changeFlag = true;
            this.invalidateProperties();
        }

        get text():string {
            return this.valStr;
        }
    }
}