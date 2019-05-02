module win {
    /*** 牌局结束
* @author 
*
*/
    export class WinUIMoudle extends app.base.BaseSceneUIMoudleComponent {

        pyBtn: eui.Group;//朋友圈
        btnXingweifenxi: eui.Image;//跳到行为分析
        jinbeiLight: eui.Image;// 金杯的光效
        btnWozhidaole: eui.Image;// 我知道了

        winTxt: eui.BitmapLabel;//盈利
        timTxt: eui.Label;//时长
        handTxt: eui.Label;//手数

        typeImg: eui.Image;// 拍马屁类型
        public constructor() {
            super();
            this.skinName = "WinUIMoudleSkin";
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
        }
        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            this.bindButton(this.pyBtn)
            this.bindButton(this.btnWozhidaole)
            this.bindButton(this.btnXingweifenxi)
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) // 本地运行
            // {
            //     this.pyBtn.visible = true;
            //     this.hyBtn.visible = true;
            // } else {
            //     this.pyBtn.visible = false;
            //     this.hyBtn.visible = false;
            // }
            egret.Tween.get(this.jinbeiLight,{"loop":true}).to({"rotation":360},3000);  
        }
        public opening(): void {
            this.winTxt.text = FormatUtils.wan(win.getProxy().winNum);
            if (win.getProxy().timeNum) {
                this.timTxt.text = win.getProxy().timeNum + '';
            }
            if (win.getProxy().hand) {
                this.handTxt.text = win.getProxy().hand + '手';
            }
            if (win.getProxy().type > 0) {
                this.typeImg.source = "img_word_win_back" + win.getProxy().type + "_png";
            }
        }


        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.btnWozhidaole:
                    win.getProxy().cleanData();
                    this.clickBackEvent();
                    break;

                case this.pyBtn:
                    win.getProxy().cleanData();
                    //tip.popSysCenterTip("此功能尚未开放，敬请期待");
                    platform.shardShow("盈利","先赚1个亿，来边锋德州达成小目标");
                    mc2sdk.event(mc2sdk.EVENT_TYPE.WINUI_SHARE);
                    this.close();
                    break;

                case this.btnXingweifenxi:
                    this.close();
                    mc2sdk.event(mc2sdk.EVENT_TYPE.RECOR_ANALYSIS); // 埋点
                    __OPEN_MOUDLE(AppReg.APP_RECORD_ANALYSIS,getProxy()._enterData);
                    break;
            }

        }
        public get featherSpace(): egret.DisplayObjectContainer {
            return AppRoot.gameLayer.effectLayer;
        }
        private clickBackEvent(): void {
            this.close();
        }
        public dispose(): void {
            super.dispose();
        }
    }

}
