var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var treasure;
(function (treasure) {
    var TreasureUIMoudle = (function (_super) {
        __extends(TreasureUIMoudle, _super);
        function TreasureUIMoudle() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.left = 0;
            _this.bottom = 0;
            _this.right = 0;
            _this.skinName = "TreasureUIMoudleSkin";
            __REGISTER_PROXY(treasure.TreasureProxy);
            __REGISTER_MEDIATOR(treasure.TreasureUIMediator, _this);
            return _this;
        }
        TreasureUIMoudle.prototype.createComplete = function (event) {
            this.sendHandlers = [app.NetAction.REQ_GET_TREASURES,
                app.NetAction.REQ_GET_OPEN_TREASURES];
            this.sendSubHandlers = [app.NetAction.REQ_GET_MY_ALL_TREASURES,
                app.NetAction.REQ_GET_MY_NOW_TREASURES,
                app.NetAction.REQ_MY_GET_REWARD_RECORD];
            this.tb1.selected = true;
            this.tbs1.selected = true;
            this.vs.selectedIndex = 0;
            this.vss.selectedIndex = 0;
            this.g1l.itemRenderer = treasure.TreasureItem;
            this.g2l.itemRenderer = treasure.TreasureItem;
            this.g3l1.itemRenderer = treasure.TreasureLabel;
            this.g3l2.itemRenderer = treasure.TreasureItem;
            this.g3l3.itemRenderer = treasure.TreasureLabel;
            this.vss.selectedIndex = 0;
            this.tba = [this.tb1, this.tb2, this.tb3];
            this.initToggleButtons();
            this.tbsa = [this.tbs1, this.tbs2, this.tbs3];
            this.initSubToggleButtons();
            this.bindButton(this.closeButton);
            __SEND_NOTIFICATION(this.sendHandlers[this.vs.selectedIndex]);
            this.sendNotification(app.NetAction.TOOL_RILVER); //获取平台银两
            // this.partical();
            // this.test();
            // this.drawcircle();
        };
        TreasureUIMoudle.prototype.initToggleButtons = function () {
            for (var i = 0; i < this.tba.length; i++) {
                this.tba[i].addEventListener(eui.UIEvent.CHANGE, this.toggleChangeHandler, this);
            }
        };
        TreasureUIMoudle.prototype.toggleChangeHandler = function (evt) {
            for (var i = 0; i < this.tba.length; i++) {
                var selected = this.tba[i] == evt.target;
                this.tba[i].selected = selected;
                if (selected) {
                    if (i == 2) {
                        __SEND_NOTIFICATION(this.sendSubHandlers[this.vss.selectedIndex]);
                    }
                    else {
                        __SEND_NOTIFICATION(this.sendHandlers[i]);
                    }
                    this.vs.selectedIndex = i;
                }
            }
        };
        TreasureUIMoudle.prototype.initSubToggleButtons = function () {
            for (var i = 0; i < this.tbsa.length; i++) {
                this.tbsa[i].addEventListener(eui.UIEvent.CHANGE, this.subToggleChangeHandler, this);
            }
        };
        TreasureUIMoudle.prototype.subToggleChangeHandler = function (evt) {
            for (var i = 0; i < this.tbsa.length; i++) {
                var selected = this.tbsa[i] == evt.target;
                this.tbsa[i].selected = selected;
                if (selected) {
                    this.vss.selectedIndex = i;
                    __SEND_NOTIFICATION(this.sendSubHandlers[this.vss.selectedIndex]);
                }
            }
        };
        TreasureUIMoudle.prototype.getReward = function (data) {
            __SEND_NOTIFICATION(this.sendSubHandlers[this.vss.selectedIndex]);
            this.sendNotification(app.NetAction.TOOL_RILVER);
            // tip.popSysCenterTip("领奖成功");
            this.showRewardLabel("已领取" + FormatUtils.wan(data) + "奖金");
        };
        TreasureUIMoudle.prototype.showRewardLabel = function (label) {
            var group = new eui.Group();
            group.horizontalCenter = 0;
            group.verticalCenter = 0;
            group.alpha = 0;
            var bg = new eui.Image("icon_happy_hj_dt_png");
            bg.width = 720;
            bg.horizontalCenter = 0;
            bg.verticalCenter = 0;
            var lb = new eui.Label(label);
            lb.horizontalCenter = 0;
            lb.verticalCenter = 0;
            group.addChild(bg);
            group.addChild(lb);
            AppRoot.gameLayer.addChild(group);
            egret.Tween.get(group).to({ alpha: 1 }, 500);
            egret.setTimeout(function () { egret.Tween.get(group).to({ alpha: 0 }, 500).call(function () { return group.removeFromParent(true); }); }, this, 1500, true);
        };
        TreasureUIMoudle.prototype.updateCoin = function () {
            // getProxy().silver = user.getProxy().svrGameData.silver - user.getProxy().currentRoom.maxBank;
            // if (getProxy().silver < 0) getProxy().silver = 0;
            // this.coinLabel.text = FormatUtils.wan(getProxy().silver) + "";
        };
        TreasureUIMoudle.prototype.refreshList = function () {
            if (this.vs.selectedIndex == 1) {
                __SEND_NOTIFICATION(this.sendHandlers[1]);
            }
            else if (this.vs.selectedIndex == 2 && this.vss.selectedIndex == 1) {
                __SEND_NOTIFICATION(this.sendSubHandlers[1]);
            }
        };
        TreasureUIMoudle.prototype.initG1l = function (data) {
            var tivo = data;
            tivo = this.itemArrayHandler(tivo);
            tivo.treasureVO.sort(function (a, b) {
                return a.totalNum - b.totalNum;
            });
            for (var i = 0; i < tivo.treasureVO.length; i++) {
                tivo.treasureVO[i]["type"] = 0;
            }
            this.g1l.dataProvider = new eui.ArrayCollection(tivo.treasureVO);
        };
        TreasureUIMoudle.prototype.initG2l = function (data) {
            data = this.itemArrayHandler(data);
            if (data.length > 0) {
                data.sort(function (a, b) {
                    return a.openTime - b.openTime;
                });
            }
            this.tip2l.visible = data.length == 0 ? true : false;
            for (var i = 0; i < data.length; i++) {
                data[i]["type"] = 1;
            }
            this.g2l.dataProvider = new eui.ArrayCollection(data);
        };
        TreasureUIMoudle.prototype.initG3l1 = function (data) {
            data.sort(function (a, b) {
                return b.openTime - a.openTime;
            });
            this.g3l1.dataProvider = new eui.ArrayCollection(data);
        };
        TreasureUIMoudle.prototype.initG3l2 = function (data) {
            data = this.itemArrayHandler(data);
            this.tip3l2.visible = data.length == 0 ? true : false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].openTime == 0)
                    data[i]["type"] = 0;
                else
                    data[i]["type"] = 1;
            }
            this.g3l2.dataProvider = new eui.ArrayCollection(data);
        };
        TreasureUIMoudle.prototype.initG3l3 = function (data) {
            data.sort(function (a, b) {
                return b.openTime - a.openTime;
            });
            this.tip3l3.visible = data.length == 0 ? true : false;
            this.g3l3.dataProvider = new eui.ArrayCollection(data);
        };
        TreasureUIMoudle.prototype.itemArrayHandler = function (data) {
            var n = (3 - data.length % 3) % 3;
            for (var i = 0; i < n; i++) {
                var a = {
                    invisible: true
                };
                data.push(a);
            }
            return data;
        };
        TreasureUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    break;
            }
        };
        // partical() {
        //     var texture = RES.getRes("newParticle_png");
        //     var config = RES.getRes("newParticle_json");
        //     var system = new particle.GravityParticleSystem(texture, config);
        //     this.particleGroup.mask = new egret.Rectangle(0,0,1136,668);
        //     system.start();
        //     this.particleGroup.addChild(system);
        // }
        TreasureUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            __REMOVE_PROXY(treasure.TreasureProxy);
            __REMOVE_MEDIATOR(treasure.TreasureUIMediator);
        };
        TreasureUIMoudle.prototype.test = function () {
            __SEND_NOTIFICATION(app.NetAction.REQ_PLAYERPLACE);
            // case app.NetAction.RESP_PLAYERPLACE
            // user.getProxy().places
        };
        return TreasureUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    treasure.TreasureUIMoudle = TreasureUIMoudle;
    __reflect(TreasureUIMoudle.prototype, "treasure.TreasureUIMoudle");
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureUIMoudle.js.map