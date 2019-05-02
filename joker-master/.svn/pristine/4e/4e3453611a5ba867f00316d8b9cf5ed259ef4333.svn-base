module treasure {
    export class TreasureItem extends eui.ItemRenderer {
        button: eui.Image;
        vs: eui.ViewStack;
        bl1: eui.BitmapLabel;//奖池
        bl2: eui.BitmapLabel;//总需
        bl3: eui.BitmapLabel;//剩余
        bl4: eui.BitmapLabel;//中奖率1
        bl5: eui.BitmapLabel;//剩余时间
        bl6: eui.BitmapLabel;//中奖率2
        pb: eui.ProgressBar;
        img: eui.Image;
        pbv: eui.Image;
        leftTime: number;
        intervalValue: number;
        inTime: boolean = false;
        public constructor() {
            super();
            this.skinName = "TreasureItemSkin";
            this.once(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
        }
        onComplete() {
            this.initButton();
        }
        initButton() {
            // gameabc.BindleButtonUtils.bindClickByTarget(this.button);
            this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        }
        onClickButton() {
            mc2sdk.event(getProxy().progressiveData[this.data.treasrueId - 1][2]);
            __OPEN_MOUDLE(AppReg.APP_TREASURE_SUB, this.data);
        }
        dataChanged() {
            if (this.data.invisible) {
                this.visible = false;
                return;
            }
            this.vs.selectedIndex = this.data.type;
            if (this.data.type == 0) {
                var totalNum: number = this.data.totalNum;
                var needNum: number = Math.floor(this.data.totalNum * 1.1);
                var curNum: number = this.data.curNum;
                var buyNum: number = this.data.buyNum? this.data.buyNum: 0;
                this.bl1.text = FormatUtils.wan(totalNum);
                this.bl2.text = needNum.toString();
                this.bl3.text = (needNum - curNum).toString();
                this.bl4.text = (buyNum / needNum * 100).toFixed(0) + "%";
                this.img.source = getProxy().progressiveData[this.data.treasrueId - 1][1];
                this.pbv.percentWidth = curNum / needNum * 100;
            } else {
                var totalNum: number = this.data.totalNum;
                var needNum: number = this.data.totalNum * 1.1;
                var buyNum: number = this.data.buyNum;
                this.bl1.text = FormatUtils.wan(totalNum);
                this.leftTime = (this.data.openTime - Math.floor((new Date().getTime()) / 1000)) * 1000;
                this.leftTime = this.leftTime < 0? 0: this.leftTime;
                this.bl5.text = DateUtils.dateFormat(new Date(this.leftTime), "mm:ss");
                this.bl6.text = (buyNum / needNum * 100).toFixed(0) + "%";
                this.button.visible = false;
                this.pbv.percentWidth = 100;
                this.img.source = getProxy().progressiveData[this.data.treasrueId - 1][1];
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
                if (!this.intervalValue)
                 this.intervalValue = egret.setInterval(this.updateTime, this, 1000);
            }
        }
        updateTime() {
            this.leftTime -= 1000;
            if (!this.inTime && this.leftTime <= 0) {
                this.inTime = true;
                egret.clearInterval(this.intervalValue);
                // this.removeFromParent(true);
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.TREASURE_REFRESH_LIST);
            }
            if (this.leftTime < 0) this.leftTime = 0;
            this.bl5.text = DateUtils.dateFormat(new Date(this.leftTime), "mm:ss");
        }
    }
}