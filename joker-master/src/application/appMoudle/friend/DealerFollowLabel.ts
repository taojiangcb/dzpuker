module friend {
    export enum DEALERLABEL_TYPE {
        FOLLOW,
        ONLINE
    }
    export class DealerFollowLabel extends uicomps.BaseItemCilckRenderer{
        headimage: eui.Image;
        namelabel: eui.Label;
        noticelabel: eui.Label;
        statusimage: eui.Image;
        statuslabel: eui.Label;
        btn: eui.Group;
        btnlabel: eui.Image;
        clickbtn: eui.Rect;
        dealerid: number;
        type: DEALERLABEL_TYPE = DEALERLABEL_TYPE.FOLLOW;
        constructor() {
            super();
            this.skinName = "DealerFollowLabelSkin";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.btn.touchChildren = false;
            this.addButton(this.btn);
            this.addButton(this.clickbtn);
        }

        dataChanged():void {
            var dealerInfo: appvos.DealerInfoVO = this.data as appvos.DealerInfoVO;
            if (this.data.type) this.type = this.data.type;
            this.dealerid = dealerInfo.userid;
            this.headimage.source = dealerInfo.faceid? dealerInfo.faceid: "img_Default_Avatar_1_png";
            this.namelabel.text = dealerInfo.name;
            this.noticelabel.text = dealerInfo.notice? dealerInfo.notice: "荷官暂无签名信息";
            var isOnline: boolean = dealerInfo.online == 1;
            this.btnlabel.source = this.type == DEALERLABEL_TYPE.FOLLOW? "iw_qianwang_zr_png": "iw_guanzhu_zr_png";
            if (dealerInfo.online == 0) {
                this.statusimage.source = "icon_main_lx_png";
                this.statuslabel.text = "离线";
                this.statuslabel.textColor = 0x7A7A7A;
                // this.btn.visible = false;
                this.btn.alpha = 0.4;
                this.btn.touchEnabled = false;
            } else {
                this.statusimage.source = "icon_main_zx_png";
                this.statuslabel.text = "在线";
                this.statuslabel.textColor = 0xFFCCFF;
                // this.btn.visible = true;
                this.btn.alpha = 1;
                this.btn.touchEnabled = true;
            }
        }

        click(tag: egret.DisplayObject): void {
            switch(tag) {
                case this.clickbtn:
                    if (this.type == DEALERLABEL_TYPE.FOLLOW) __OPEN_PRE_MOUDLE(AppReg.APP_DEALERINFO, this.dealerid);
                    break;
                case this.btn:
                    if (this.type == DEALERLABEL_TYPE.FOLLOW) {
                        var roomVO: appvos.RoomVO;
                        for (var i = 0; i < room.getProxy().room7.length; i++) {
                            if (this.data.roomid == room.getProxy().room7[i].svrOfsId) {
                                roomVO = room.getProxy().room7[i];
                                break;
                            }
                        }
                        if (roomVO) user.gotoRoom(roomVO);
                    } else if (this.type == DEALERLABEL_TYPE.ONLINE) {
                        __PVO().l(this.dealerid).to(app.NetAction.REQ_DEALER_FOCUS);
                    }
                    break;
            }
        }
    }
}