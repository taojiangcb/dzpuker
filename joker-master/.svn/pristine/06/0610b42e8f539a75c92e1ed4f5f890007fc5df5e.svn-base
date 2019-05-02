module friend {
    export class FriendMailLabel extends eui.ItemRenderer {
        private id: number;
        private fNameLabel: eui.Label;
        private timeLabel: eui.Label;
        private addButton: eui.Group;
        private refuseButton: eui.Group;
        private faceidImage: eui.Image;
        public constructor() {
            super();
            this.skinName = "FriendMailLabelSkin";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
        }
        onComplete() {
            gameabc.BindleButtonUtils.bindClickByTarget(this.addButton);
            gameabc.BindleButtonUtils.bindClickByTarget(this.refuseButton);
            this.addButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
            this.refuseButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        }
        onClickButton(event: egret.Event) {
            var target = event.currentTarget;
            
            switch (target) {
                case this.addButton:
                    if (user.getProxy().friendNum >= user.getProxy().MAXFRIENDNUM) tip.popSysCenterTip("您的好友数已达上限！", tip.TIPS_TYPE.TIPS_WARNING);
                    else __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND, this.data.fid);
                    break;
                case this.refuseButton:
                    __SEND_NOTIFICATION(app.NetAction.REQ_REFUSE_ADD_FRIEND, this.data.fid);
                    break;
                default:
                    break;
            }
        }
        public dataChanged():void {
            if (this.data.faceid) this.faceidImage.source = "img_Default_Avatar_" + this.data.faceid + "_png";
            this.fNameLabel.text = this.data.fName;
            this.timeLabel.text = DateUtils.dateFormat(new Date(this.data.time * 1000), "yyyy-MM-dd");
        }
    }
}