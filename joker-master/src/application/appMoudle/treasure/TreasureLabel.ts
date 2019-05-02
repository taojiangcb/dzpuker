module treasure {
    export class TreasureLabel extends eui.ItemRenderer {
        gp: eui.Group;//领奖
        btn: eui.Group;
        img1: eui.Image;//icon
        img2: eui.Image;//已领取
        bl1: eui.BitmapLabel;//期数
        bl2: eui.BitmapLabel;//奖池
        lb1: eui.Label;//中奖者
        lb2: eui.Label;//中奖概率
        lb3: eui.Label;//揭晓时间
        lb4: eui.Label;
        lb5: eui.Label;
        public constructor() {
            super();
            this.skinName = "TreasureLabelSkin";
            this.once(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
        }
        onComplete() {
            // gameabc.BindleButtonUtils.bindClickByTarget(this.btn);
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        dataChanged() {
            if (this.data.userId == user.getProxy().svrRoleId && this.data.state == 1) {
                this.gp.visible = true;
                this.btn.visible = true;
                this.img2.visible = false;
            } else if (this.data.userId == user.getProxy().svrRoleId && this.data.state == 2) {
                this.gp.visible = true;
                this.btn.visible = false;
                this.img2.visible = true;
            } else {
                this.gp.visible = false;
            }
            this.bl1.text = this.data.count.toString();
            this.bl2.text = FormatUtils.wan(this.data.totalNum);
            this.lb1.text = this.data.userName;
            this.lb2.text = Math.floor(this.data.buyNum / (this.data.totalNum * getProxy().rate) * 100)  + "%";
            this.lb4.text = DateUtils.dateFormat(new Date(this.data.openTime * 1000), "yyyy-MM-dd");
            this.lb5.text = DateUtils.dateFormat(new Date(this.data.openTime * 1000), "hh:mm:ss");
        }
        onClick() {
            mc2sdk.event(mc2sdk.EVENT_TYPE.TREASURE_GET);
            __SEND_NOTIFICATION(app.NetAction.REQ_MY_GET_REWARD, this.data.id);
        }
    }
}