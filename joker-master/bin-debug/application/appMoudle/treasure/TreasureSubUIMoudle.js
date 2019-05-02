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
    var TreasureSubUIMoudle = (function (_super) {
        __extends(TreasureSubUIMoudle, _super);
        function TreasureSubUIMoudle() {
            var _this = _super.call(this) || this;
            _this.isBuying = false;
            _this.inTime = false;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.skinName = "TreasureSubUIMoudleSkin";
            __REGISTER_MEDIATOR(treasure.TreasureSubUIMediator, _this);
            return _this;
        }
        TreasureSubUIMoudle.prototype.createComplete = function (event) {
            this.initData();
            this.bindButton(this.btn1);
            this.bindButton(this.btn2);
            this.bindButton(this.btn3);
            this.bindButton(this.btn4);
            __SEND_NOTIFICATION(app.NetAction.REQ_TREASURE_RECORDS, this.data.id);
        };
        TreasureSubUIMoudle.prototype.initData = function () {
            var _this = this;
            var tivo = this.uiOpenData;
            this.data = tivo;
            this.bl1.text = FormatUtils.wan(tivo.totalNum);
            var needNum = Math.floor(tivo.totalNum * 1.1);
            this.bl2.text = needNum.toString();
            var leftNum = Math.floor(needNum - tivo.curNum);
            this.bl3.text = leftNum.toString();
            this.bl5.text = Math.floor(needNum / 100).toString();
            this.lb2.text = "中奖概率:1%";
            this.img.source = treasure.getProxy().progressiveData[this.data.treasrueId - 1][1];
            if (leftNum == 0) {
                this.vs.selectedIndex = 1;
                this.time = this.data.openTime * 1000 - new Date().getTime();
                this.bl6.text = DateUtils.dateFormat(new Date(this.time), "mm:ss");
                this.intervalValue = egret.setInterval(function () {
                    _this.time -= 1000;
                    if (_this.time < 0) {
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.TREASURE_REFRESH_LIST);
                        egret.clearInterval(_this.intervalValue);
                        _this.close();
                    }
                    else {
                        _this.bl6.text = DateUtils.dateFormat(new Date(_this.time), "mm:ss");
                    }
                }, this, 1000);
            }
            else {
                this.vs.selectedIndex = 0;
            }
        };
        TreasureSubUIMoudle.prototype.initList = function (data) {
            this.list.dataProvider = new eui.ArrayCollection(data);
            this.list.itemRenderer = treasure.TreasureSubLabel;
            var allBet = 0;
            var myBet = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].userId == user.getProxy().svrRoleId)
                    myBet += data[i].buyNum;
                allBet += data[i].buyNum;
            }
            var totalNum = this.data.totalNum;
            var needNum = this.data.totalNum * 1.1;
            this.lb1.text = (allBet / needNum * 100).toFixed(0) + "%";
            this.pbv.percentWidth = allBet / needNum * 100;
            this.bl4.text = this.bl7.text = (myBet / needNum * 100).toFixed(0) + "%";
            var leftNum = Math.floor(needNum - allBet);
            this.bl3.text = leftNum.toString();
            if (parseInt(this.bl5.text) > leftNum) {
                this.bl5.text = leftNum.toString();
                this.lb2.text = "中奖概率:" + (leftNum / needNum * 100).toFixed(0) + "%";
            }
            this.do.visible = leftNum <= 0 ? false : true;
            if (this.vs.selectedIndex == 0 && leftNum == 0) {
                tip.popSysCenterTip("您投注的" + FormatUtils.wan(totalNum) + "奖池正在开奖");
            }
        };
        TreasureSubUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btn1:
                    var n = parseInt(this.bl5.text);
                    if (n > this.data.totalNum / 100) {
                        n -= this.data.totalNum * 1.1 / 100;
                        this.bl5.text = n.toString();
                        this.lb2.text = "中奖概率:" + (n / (this.data.totalNum * 1.1) * 100).toFixed(0) + "%";
                    }
                    break;
                case this.btn2:
                    mc2sdk.event(50077 /* TREASURE_ADD */);
                    var n = parseInt(this.bl5.text);
                    if (n <= parseInt(this.bl3.text) - this.data.totalNum / 100) {
                        n += this.data.totalNum * 1.1 / 100;
                        this.bl5.text = n.toString();
                        this.lb2.text = "中奖概率:" + (n / (this.data.totalNum * 1.1) * 100).toFixed(0) + "%";
                    }
                    break;
                case this.btn3:
                    mc2sdk.event(50076 /* TREASURE_DO */);
                    if (this.isBuying)
                        return;
                    if (treasure.getProxy().silver < parseInt(this.bl5.text)) {
                        tip.popSysCenterTip("剩余彩豆不足");
                        return;
                    }
                    this.setBuying(true);
                    if (user.getProxy().roomState == 2) {
                        __SEND_NOTIFICATION(app.NetAction.DO_TREASURE, [this.data.id, parseInt(this.bl5.text)]);
                    }
                    else {
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
        };
        TreasureSubUIMoudle.prototype.setBuying = function (isBuying) {
            this.isBuying = isBuying;
            this.do.touchEnabled = !isBuying;
        };
        TreasureSubUIMoudle.prototype.updateCoin = function () {
            this.sendNotification(app.NetAction.TOOL_RILVER);
        };
        TreasureSubUIMoudle.prototype.treasureFail = function () {
            tip.popSysCenterTip("改期已满，不能购买");
            __SEND_NOTIFICATION(app.NetAction.REQ_GET_TREASURES);
            this.close();
        };
        TreasureSubUIMoudle.prototype.dispose = function () {
            if (this.intervalValue)
                egret.clearInterval(this.intervalValue);
            __REMOVE_MEDIATOR(treasure.TreasureSubUIMediator);
            _super.prototype.dispose.call(this);
        };
        return TreasureSubUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    treasure.TreasureSubUIMoudle = TreasureSubUIMoudle;
    __reflect(TreasureSubUIMoudle.prototype, "treasure.TreasureSubUIMoudle");
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureSubUIMoudle.js.map