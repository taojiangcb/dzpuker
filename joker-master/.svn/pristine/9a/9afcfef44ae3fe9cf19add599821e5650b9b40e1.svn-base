module dealerInfo {
    export class DealerInfoUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        closebtn: eui.Image;
        headimg: eui.Image;
        namelabel: eui.Label;
        idlabel: eui.Label;
        stargroup: eui.Group;
        noticelabel: eui.Label;
        datalabel0: eui.Label;//总局数
        datalabel1: eui.Label;//入局率
        datalabel2: eui.Label;//摊派率
        datalabel3: eui.Label;//猎杀数
        datalabel4: eui.Label;//单局最大赢取
        datalabel5: eui.Label;//盈利排名
        sharebtn: eui.Group;
        followbtn: eui.Group;
        dealerid: number;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
            this.skinName = "DealerInfoSkin";
        }
        createComplete(event: egret.Event): void {
            super.createComplete(event);
            __REGISTER_MEDIATOR(DealerInfoUIMediator,this);
            this.bindButton(this.closebtn);
            this.bindButton(this.sharebtn);
            this.bindButton(this.followbtn);
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [this.uiOpenData]);
            __SEND_NOTIFICATION(app.NetAction.REQ_DEALER_INFO, this.uiOpenData);
        }
        updatePlayInfo(data: any) {
            var playerInfo: appvos.UserInfoVO = data as appvos.UserInfoVO;
            this.datalabel0.text = playerInfo.totalHand + "";
            this.datalabel1.text = (playerInfo.joinHand/playerInfo.totalHand*100).toFixed(1) + "%";
            this.datalabel2.text = (playerInfo.spreadHand/playerInfo.totalHand*100).toFixed(1) + "%";
            this.datalabel3.text = playerInfo.huntKill + "";
            this.datalabel4.text = playerInfo.maxHandWin + "";
            this.datalabel5.text = "暂无";
        }
        updateDealerInfo(data: any) {
            var dealerInfo: appvos.DealerInfoVO = data as appvos.DealerInfoVO;
            this.headimg.source = dealerInfo.faceid? dealerInfo.faceid: "img_Default_Avatar_1_png";
            this.dealerid = dealerInfo.userid;
            this.namelabel.text = dealerInfo.name;
            this.idlabel.text = "ID:" + dealerInfo.userid;
            this.noticelabel.text = dealerInfo.notice? dealerInfo.notice: "荷官暂无签名信息";
        }
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.closebtn:
                    this.close();
                    break;
                case this.sharebtn:
                    tip.popSysCenterTip("FUNCTION_NO_TIPS");
                    break;
                case this.followbtn:
                    if (this.dealerid) __PVO().l(this.dealerid).to(app.NetAction.REQ_DEALER_FOCUS);
                    break;
            }
        }
        public dispose(): void {
            __REMOVE_MEDIATOR(DealerInfoUIMediator);
            super.dispose();
        }
    }
}