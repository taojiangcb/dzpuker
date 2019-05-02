module treasure {
    export class TreasureUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        tba: Array<eui.ToggleButton>;
        tb1: eui.ToggleButton;
        tb2: eui.ToggleButton;
        tb3: eui.ToggleButton;
        vs: eui.ViewStack;
        tbsa: Array<eui.ToggleButton>;
        tbs1: eui.ToggleButton;
        tbs2: eui.ToggleButton;
        tbs3: eui.ToggleButton;
        vss: eui.ViewStack;
        closeButton: eui.Image;
        g1l: eui.List;
        g2l: eui.List;
        g3l1: eui.List;
        g3l2: eui.List;
        g3l3: eui.List;
        sendHandlers: any[];
        sendSubHandlers: any[];
        coinLabel: eui.Label;
        tip2l: eui.Label;
        tip3l2: eui.Label;
        tip3l3: eui.Label;
        particleGroup: eui.Group;

        public constructor() {
            super();
            this.top = 0;
            this.left = 0;
            this.bottom = 0;
            this.right = 0;
            this.skinName = "TreasureUIMoudleSkin";
            __REGISTER_PROXY(TreasureProxy);
            __REGISTER_MEDIATOR(TreasureUIMediator, this);
        }
        createComplete(event: egret.Event): void {
            this.sendHandlers = [app.NetAction.REQ_GET_TREASURES,
                                 app.NetAction.REQ_GET_OPEN_TREASURES];
            this.sendSubHandlers = [app.NetAction.REQ_GET_MY_ALL_TREASURES,
                                    app.NetAction.REQ_GET_MY_NOW_TREASURES,
                                    app.NetAction.REQ_MY_GET_REWARD_RECORD];
            this.tb1.selected = true;
            this.tbs1.selected = true;
            this.vs.selectedIndex = 0;
            this.vss.selectedIndex = 0;
            this.g1l.itemRenderer = TreasureItem;
            this.g2l.itemRenderer = TreasureItem;
            this.g3l1.itemRenderer = TreasureLabel;
            this.g3l2.itemRenderer = TreasureItem;
            this.g3l3.itemRenderer = TreasureLabel;
            this.vss.selectedIndex = 0;
            this.tba = [this.tb1, this.tb2, this.tb3];
            this.initToggleButtons();
            this.tbsa = [this.tbs1, this.tbs2, this.tbs3];
            this.initSubToggleButtons();
            this.bindButton(this.closeButton);
            __SEND_NOTIFICATION(this.sendHandlers[this.vs.selectedIndex]);
            this.sendNotification(app.NetAction.TOOL_RILVER);//获取平台银两
            // this.partical();
            // this.test();
            // this.drawcircle();
        }
        initToggleButtons() {
            for (var i = 0; i < this.tba.length; i++) {
                this.tba[i].addEventListener(eui.UIEvent.CHANGE, this.toggleChangeHandler, this);
            }
        }
        toggleChangeHandler(evt: eui.UIEvent) {
            for (var i = 0; i < this.tba.length; i++) {
                var selected = this.tba[i] == evt.target;
                this.tba[i].selected = selected;
                if (selected) {
                    if (i == 2) {
                        __SEND_NOTIFICATION(this.sendSubHandlers[this.vss.selectedIndex]);
                    } else {
                        __SEND_NOTIFICATION(this.sendHandlers[i]);
                    }
                    this.vs.selectedIndex = i;
                }
            }
        }
        initSubToggleButtons() {
            for (var i = 0; i < this.tbsa.length; i++) {
                this.tbsa[i].addEventListener(eui.UIEvent.CHANGE, this.subToggleChangeHandler, this);
            }
        }
        subToggleChangeHandler(evt: eui.UIEvent) {
            for (var i = 0; i < this.tbsa.length; i++) {
                var selected = this.tbsa[i] == evt.target;
                this.tbsa[i].selected = selected;
                if (selected) {
                    this.vss.selectedIndex = i;
                    __SEND_NOTIFICATION(this.sendSubHandlers[this.vss.selectedIndex]);
                }
            }
        }
        getReward(data: any) {
            __SEND_NOTIFICATION(this.sendSubHandlers[this.vss.selectedIndex]);
            this.sendNotification(app.NetAction.TOOL_RILVER);
            // tip.popSysCenterTip("领奖成功");
            this.showRewardLabel("已领取" + FormatUtils.wan(data) + "奖金");
        }
        showRewardLabel(label: string) {
            var group: eui.Group = new eui.Group();
            group.horizontalCenter = 0;
            group.verticalCenter = 0;
            group.alpha = 0;
            var bg: eui.Image = new eui.Image("icon_happy_hj_dt_png");
            bg.width = 720;
            bg.horizontalCenter = 0;
            bg.verticalCenter = 0;
            var lb: eui.Label = new eui.Label(label);
            lb.horizontalCenter = 0;
            lb.verticalCenter = 0;
            group.addChild(bg);
            group.addChild(lb);
            AppRoot.gameLayer.addChild(group);
            egret.Tween.get(group).to({alpha: 1}, 500);
            egret.setTimeout(()=>{egret.Tween.get(group).to({alpha: 0}, 500).call(()=>group.removeFromParent(true))},this,1500,true);
        }
        updateCoin() {
            // getProxy().silver = user.getProxy().svrGameData.silver - user.getProxy().currentRoom.maxBank;
            // if (getProxy().silver < 0) getProxy().silver = 0;
            // this.coinLabel.text = FormatUtils.wan(getProxy().silver) + "";
        }
        refreshList() {
            if (this.vs.selectedIndex == 1) {
                __SEND_NOTIFICATION(this.sendHandlers[1]);
            } else if (this.vs.selectedIndex == 2 && this.vss.selectedIndex == 1) {
                __SEND_NOTIFICATION(this.sendSubHandlers[1]);
            }
        }
        initG1l(data: any) {
            var tivo: appvos.TreasureInfoVO = data as appvos.TreasureInfoVO;
            tivo = this.itemArrayHandler(tivo);
            tivo.treasureVO.sort((a, b)=>{
                return a.totalNum - b.totalNum;
            });
            for (var i = 0; i < tivo.treasureVO.length; i++) {
                tivo.treasureVO[i]["type"] = 0;
            }
            this.g1l.dataProvider = new eui.ArrayCollection(tivo.treasureVO);
        }
        initG2l(data: any) {
            data = this.itemArrayHandler(data);
            if (data.length > 0) {
                data.sort((a, b)=>{
                    return a.openTime - b.openTime;
                })
            }
            this.tip2l.visible = data.length == 0? true: false;
            for (var i = 0; i < data.length; i++) {
                data[i]["type"] = 1;
            }
            this.g2l.dataProvider = new eui.ArrayCollection(data);
        }
        initG3l1(data: any) {
            data.sort((a, b)=>{
                return b.openTime - a.openTime;
            });
            this.g3l1.dataProvider = new eui.ArrayCollection(data);
        }
        initG3l2(data: any) {
            data = this.itemArrayHandler(data);
            this.tip3l2.visible = data.length == 0? true: false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].openTime == 0) data[i]["type"] = 0;
                else data[i]["type"] = 1;
            }
            this.g3l2.dataProvider = new eui.ArrayCollection(data);
        }
        initG3l3(data: any) {
            data.sort((a, b)=>{
                return b.openTime - a.openTime;
            });
            this.tip3l3.visible = data.length == 0? true: false;
            this.g3l3.dataProvider = new eui.ArrayCollection(data);
        }
        itemArrayHandler(data: any): any{
            var n = (3 - data.length % 3) % 3;
            for (var i = 0; i < n; i++) {
                var a = {
                    invisible: true
                    };
                data.push(a);
            }
            return data;
        }
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    break;
            }
        }
        // partical() {
        //     var texture = RES.getRes("newParticle_png");
        //     var config = RES.getRes("newParticle_json");
        //     var system = new particle.GravityParticleSystem(texture, config);
        //     this.particleGroup.mask = new egret.Rectangle(0,0,1136,668);
        //     system.start();
        //     this.particleGroup.addChild(system);
        // }
        dispose(): void {
            super.dispose();
            __REMOVE_PROXY(TreasureProxy);
            __REMOVE_MEDIATOR(TreasureUIMediator);
        }
        test() {
            __SEND_NOTIFICATION(app.NetAction.REQ_PLAYERPLACE);
            // case app.NetAction.RESP_PLAYERPLACE
            // user.getProxy().places
        }
        // drawcircle() {
        //     var shape = new egret.Shape();
		// 	this.r.addChild(shape);
		// 	shape.x = 0;
		// 	shape.y = 0;
        //     var graphics = shape.graphics;
        //     graphics.lineStyle(1, 0x000000);
        //     var r = 300;
        //     var ox = 1136 / 2;
        //     var oy = 768 / 2;
        //     graphics.drawCircle(ox, oy, r);
        //     for (var i = 0; i < 10; i++) {
        //         graphics.moveTo(ox, oy);
        //         graphics.lineTo(ox + Math.sin(36 * i * 2 * Math.PI / 360) * r, oy + Math.cos(36 * i * 2 * Math.PI / 360) * r);
        //     }
        // }
    }
}