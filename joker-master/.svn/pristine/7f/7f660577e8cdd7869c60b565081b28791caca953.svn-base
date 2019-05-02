module bill {
    export class BillMainUILabel extends eui.ItemRenderer {
        private id: number;
        private blindLabel: eui.BitmapLabel;
        private timeLabel: eui.Label;
        private gainLabel: eui.Label;
        private button: eui.Button;
        public constructor() {
            super();
            this.skinName = "BillMainUILabelSkin";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
        }
        onComplete() {
            this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        }
        onClickButton() {
            gameabc.BindleButtonUtils.bindClickByTarget(this.button);
            // __OPEN_MOUDLE(AppReg.APP_BILL_SUB);
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.OPEN_BILL_SUB, this.id);
        }
        dataChanged() {
            this.id = this.data.id;
            this.blindLabel.text = this.data.blind;
            var date = new Date(this.data.time * 1000);
            this.timeLabel.text = (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "点" + date.getMinutes() + "分";
            this.gainLabel.text = this.data.gain.toString();
        }
    }
}