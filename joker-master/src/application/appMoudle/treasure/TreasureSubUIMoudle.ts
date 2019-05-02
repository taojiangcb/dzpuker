module treasure {
    export class TreasureSubUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        data: appvos.TreasureVO;
        list: eui.List;
        bl1: eui.BitmapLabel;//奖池
        bl2: eui.BitmapLabel;//总需
        bl3: eui.BitmapLabel;//剩余
        bl4: eui.BitmapLabel;//中奖率
        bl5: eui.BitmapLabel;//夺宝次数
        bl6: eui.BitmapLabel;//剩余时间
        bl7: eui.BitmapLabel;//中奖率2
        lb1: eui.Label;//百分比
        lb2: eui.Label;//中奖概率
        btn1: eui.Image;//减
        btn2: eui.Image;//加
        btn3: eui.Group;//夺宝
        btn4: eui.Image;//关闭
        pbv: eui.Image;
        do: eui.Group;
        vs: eui.ViewStack;
        isBuying: boolean = false;
        intervalValue: number;
        time: number;
        inTime: boolean = false;
        img: eui.Image;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
            this.skinName = "TreasureSubUIMoudleSkin";
            __REGISTER_MEDIATOR(TreasureSubUIMediator, this);
        }
        createComplete(event: egret.Event): void {
            this.initData();
            this.bindButton(this.btn1);
            this.bindButton(this.btn2);
            this.bindButton(this.btn3);
            this.bindButton(this.btn4);
            __SEND_NOTIFICATION(app.NetAction.REQ_TREASURE_RECORDS, this.data.id);
        }
        initData() {
            var tivo: appvos.TreasureVO = this.uiOpenData as appvos.TreasureVO;
            this.data = tivo;
            this.bl1.text = FormatUtils.wan(tivo.totalNum);
            var needNum = Math.floor(tivo.totalNum * 1.1);
            this.bl2.text = needNum.toString();
            var leftNum = Math.floor(needNum - tivo.curNum);
            this.bl3.text = leftNum.toString();
            this.bl5.text = Math.floor(needNum / 100).toString();
            this.lb2.text = "中奖概率:1%";
            this.img.source = getProxy().progressiveData[this.data.treasrueId - 1][1];
            if (leftNum == 0) {
                this.vs.selectedIndex = 1;
                this.time = this.data.openTime * 1000 - new Date().getTime();
                this.bl6.text = DateUtils.dateFormat(new Date(this.time), "mm:ss");
                this.intervalValue = egret.setInterval(()=>{
                    this.time -= 1000;
                    if (this.time < 0) {
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.TREASURE_REFRESH_LIST);
                        egret.clearInterval(this.intervalValue);
                        this.close();
                    } else {
                        this.bl6.text = DateUtils.dateFormat(new Date(this.time), "mm:ss");
                    }
                }, this, 1000);
            } else {
                this.vs.selectedIndex = 0;
            }
        }
        initList(data: any) {
            this.list.dataProvider = new eui.ArrayCollection(data);
            this.list.itemRenderer = TreasureSubLabel;
            var allBet: number = 0;
            var myBet: number = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].userId == user.getProxy().svrRoleId) myBet += data[i].buyNum;
                allBet += data[i].buyNum;
            }
            var totalNum = this.data.totalNum;
            var needNum = this.data.totalNum * 1.1;
            this.lb1.text = (allBet / needNum * 100).toFixed(0) + "%";
            this.pbv.percentWidth = allBet / needNum * 100;
            this.bl4.text = this.bl7.text = (myBet / needNum * 100).toFixed(0) + "%";
            var leftNum: number = Math.floor(needNum - allBet);
            this.bl3.text = leftNum.toString();
            if (parseInt(this.bl5.text) > leftNum) {
                this.bl5.text = leftNum.toString();
                this.lb2.text = "中奖概率:" + (leftNum / needNum * 100).toFixed(0) + "%";
            }
            this.do.visible = leftNum <= 0? false: true;
            if (this.vs.selectedIndex == 0 && leftNum == 0) {
                tip.popSysCenterTip("您投注的" + FormatUtils.wan(totalNum) + "奖池正在开奖");
            }
        }
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.btn1:
                    var n: number = parseInt(this.bl5.text);
                    if (n > this.data.totalNum / 100) {
                        n -= this.data.totalNum * 1.1 / 100;
                        this.bl5.text = n.toString();
                        this.lb2.text = "中奖概率:" + (n / (this.data.totalNum * 1.1) * 100).toFixed(0) + "%";
                    }
                    break;
                case this.btn2:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.TREASURE_ADD);
                    var n: number = parseInt(this.bl5.text);
                    if (n <= parseInt(this.bl3.text) - this.data.totalNum / 100 ) {
                        n += this.data.totalNum * 1.1 / 100;
                        this.bl5.text = n.toString();
                        this.lb2.text =  "中奖概率:" + (n / (this.data.totalNum * 1.1) * 100).toFixed(0) + "%";
                    }
                    break;
                case this.btn3:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.TREASURE_DO);
                    if (this.isBuying) return;
                    if (getProxy().silver < parseInt(this.bl5.text)) {
                        tip.popSysCenterTip("剩余彩豆不足");
                        return;
                    }
                    this.setBuying(true);
                    if (user.getProxy().roomState == 2) {
                        __SEND_NOTIFICATION(app.NetAction.DO_TREASURE, [this.data.id, parseInt(this.bl5.text)])
                    } else {
                        // __SEND_NOTIFICATION(app.NetAction.REQ_DO_TREASURE, [this.data.id, parseInt(this.bl5.text)]);
                        tip.popSysCenterTip("你已离开房间，无法夺宝");
                    }
                    break;
                case this.btn4:
                    __SEND_NOTIFICATION(app.NetAction.REQ_GET_TREASURES);
                    __CLOSE_MOUDLE(AppReg.APP_TREASURE_SUB);
                    break;
                default:
                    break;
            }
        }
        setBuying(isBuying: boolean) {
            this.isBuying = isBuying;
            this.do.touchEnabled = !isBuying;
        }
        updateCoin() {
            this.sendNotification(app.NetAction.TOOL_RILVER);
        }
        treasureFail() {
            tip.popSysCenterTip("改期已满，不能购买");
            __SEND_NOTIFICATION(app.NetAction.REQ_GET_TREASURES);
            this.close();
        }
        dispose(): void {
            if (this.intervalValue) egret.clearInterval(this.intervalValue);
            __REMOVE_MEDIATOR(TreasureSubUIMediator);
            super.dispose();
        }
    }
}