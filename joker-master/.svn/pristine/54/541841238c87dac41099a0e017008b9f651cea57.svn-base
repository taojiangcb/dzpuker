module guichu {
    var label: GuichuNewNoticeComp;
    export enum NOTICE_TYPE {
        BET,
        WHEEL
    }
	export function showNotice(type: number, callFunc?: Function, thisObject?: any):void {
			var root: egret.DisplayObjectContainer = AppRoot.gameLayer;
			if(label) {
				label.dispose();
				label = null;
			}
			label = new GuichuNewNoticeComp(type, callFunc, thisObject);
            root.addChild(label);
	}
	export function closeNotice():void {
		if(label) {
			label.dispose();
		}
		label = null;
	}
    export class GuichuNewNoticeComp extends gameabc.UICustomComponent {
        type: number;
        callFunc: Function;
        thisObject: any;
        bg: eui.Image;
        word: eui.Image;
        group: eui.Group;
        public constructor(type: number, callFunc: Function, thisObject: any) {
            super();
            this.type = type;
            this.callFunc = callFunc;
            this.thisObject = thisObject;
            this.left = this.top = this.bottom = this.right = 0;
            this.skinName = "GuichuNewNoticeCompSkin";
        }
        createComplete(event: egret.Event) {
            super.createComplete(event);
            this.group.verticalCenter = -80;
            this.bg.source = "guichu_bg_notice_" + this.type + "_png";
            this.word.source = "guichu_word_notice_" + this.type + "_png";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
        }
        addedToStage() {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            egret.Tween.get(this.bg)
            .set({scaleX: 1.5, scaleY: 1.5, alpha: 0})
            .to({scaleX: 1, scaleY: 1, alpha: 1}, 400, egret.Ease.sineIn)
            .call(()=>{
                if (this.type == NOTICE_TYPE.BET) {
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.noticeXiazhu);
                } else if (this.type == NOTICE_TYPE.WHEEL) {
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.noticeKaijiang);
                }
            })
            .wait(700)
            .to({scaleY: 1.5, alpha: 0}, 300)
            .call(()=>{
                if (this.callFunc && this.thisObject) this.callFunc.apply(this.thisObject);
            })
            .call(()=>{
                this.dispose();
            });
            egret.Tween.get(this.word).set({alpha: 0}).to({alpha: 1}, 400).wait(700).to({alpha: 0}, 300);
            // egret.Tween.get(this).wait(1000).call(()=>{
            //     if (this.callFunc && this.thisObject) this.callFunc.apply(this.thisObject);
            // }).to({alpha: 0}, 1000).call(()=>{
            //     this.dispose();
            // });
        }
        dispose() {
            egret.Tween.removeTweens(this.bg);
            egret.Tween.removeTweens(this.word);
            this.removeFromParent();
        }
    }
}