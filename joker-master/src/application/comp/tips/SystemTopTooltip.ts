/**
 * Created by taojiang on 16/4/25.
 */
module tip {

    export function popSysTopTip(val: string,type: string = TIPS_TYPE.TIPS_NOTHING): void {
        var str = gameabc.ResourceBundleUtil.getMessage(val);
        SystemTopTooltip.showTip(!str ? val : str,type);
    }

    export function clearSysTopTip():void {
        SystemTopTooltip.clearTips();
    }

    export class SystemTopTooltip {

        private static tips:any[] = [];
        private static uiView:SystemTooltipUIComp;

        private static tweens:egret.Tween;
        private static curtip:string = "";

        private static get uiComp():SystemTooltipUIComp {
            if (this.uiView == null) {
                this.uiView = new SystemTooltipUIComp();
            }
            return this.uiView;
        }

        static showTip(val: string,_type: string = tip.TIPS_TYPE.TIPS_NOTHING): void {
            if (val == null || val.length == 0) return;
            if (this.curtip == "") {
                var obj = { tips: val,type: _type }
                this.tips.push(obj);
                this.pop();
            } else if (this.curtip != val) {
                var obj = { tips: val,type: _type }
                this.tips.push(obj);
            }
        }

        static clearTips():void {
            if(this.tweens != null) {
                egret.Tween.removeTweens(this.uiComp);
                // egret.Tween.pauseTweens(this.uiComp);
                // this.tweens = null;
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
                this.uiComp.alpha = 0;
                this.uiComp.top = 0;

                this.tweens = egret.Tween.get(this.uiComp)
                this.tweens.to({alpha: 1}, 300, egret.Ease.sineOut)
                    .wait(1300)
                    .to({alpha: 0}, 300, egret.Ease.sineOut)
                    .call(()=> {
                        this.pop();
                        this.curtip = "";
                    }, this, null);

                AppRoot.gameLayer.addChild(this.uiComp);

            } else {
                this.curtip = "";
                this.uiComp.removeFromParent();
            }
        }
    }
}