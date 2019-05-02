module guichu {
    var countdownComp: GuiChuCountdownComp;
    export function showCountdown(countTime: number, callFunction: Function = null, callObject: any = null, ...args) {
        
        if (countdownComp) countdownComp.removeFromParent(true);
        countdownComp = new GuiChuCountdownComp(countTime, callFunction, callObject, args);
        var root: GuiChuModule = <guichu.GuiChuModule>__GET_MOUDLE(AppReg.GUICHU).gui;
        countdownComp.horizontalCenter = 0;
        root.countdownGroup.addChild(countdownComp);
    }
    export function clearCountdown() {
        if (countdownComp) countdownComp.removeFromParent(true);
        countdownComp = null
    }

    export class GuiChuCountdownComp extends gameabc.UICustomComponent {
        bg: eui.Image;
        label: eui.BitmapLabel;
        tween: egret.tween.TweenGroup;
        countTime: number;
        lastTime: number;
        callFunction: Function;
        callObject: any;
        callArgs: any[];
        DEBUG: boolean = false;
        constructor(countTime: number, callFunction: Function, callObject: any, args: any[]) {
            super();
            this.countTime = countTime;
            this.callFunction = callFunction;
            this.callObject = callObject;
            this.callArgs = args;
            this.skinName = "GuiChuCountdownCompSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        }

        addedToStage() {
            this.tween.play();
        }
        enterFrame() {
            var nowTime: number = app.SystemTimer.getServerTime();
            var frameTime: number;
            if (this.lastTime == null) this.lastTime = nowTime;
            frameTime = nowTime - this.lastTime;
            this.countTime -= frameTime;
            if (this.DEBUG) console.log("nowTime = " + nowTime + " frameSeconds = " + frameTime + " countTime = " + this.countTime);
            if (this.countTime < 0) {
                if (this.callFunction && this.callObject) this.callFunction.apply(this.callObject, this.callArgs);
                // this.removeFromParent(true);
                this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            } else {
                this.label.text = Math.floor(this.countTime / 1000).toString();
                this.lastTime = nowTime;
            }
        }
        dispose() {
            super.dispose();
            if (this.DEBUG) console.log("countdown comp remove");
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
        }
    }
}