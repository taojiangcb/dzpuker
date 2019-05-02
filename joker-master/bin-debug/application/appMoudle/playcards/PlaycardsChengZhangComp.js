var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    var PlaycardsChengZhangComp = (function (_super) {
        __extends(PlaycardsChengZhangComp, _super);
        function PlaycardsChengZhangComp() {
            var _this = _super.call(this) || this;
            _this.toscale = 1;
            _this.skinName = "PlaycardsChengZhangSkin";
            return _this;
        }
        PlaycardsChengZhangComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.itemimage);
            this.bindButton(this.btnClose);
            this.chengzhanglist.itemRenderer = ChengzhangListItem;
        };
        PlaycardsChengZhangComp.prototype.opening = function () {
            _super.prototype.opening.call(this);
            var json = RES.getRes("chengzhang_json");
            // var e = EXML.parse(RES.getRes("chengzhang_xml"));
            // var xml = egret.XML.parse(RES.getRes("chengzhang_xml"));   
            this.chengzhanglist.dataProvider = new eui.ArrayCollection(json.data);
            this.refGift();
        };
        //刷新奖励显示
        PlaycardsChengZhangComp.prototype.refGift = function () {
            var json = RES.getRes("chengzhang_json");
            var myuser = user.getProxy().playInfoVO;
            var totalget = 0; //已经获得积分
            var max = 0; //积分上限
            if (myuser && json) {
                var data = json.data;
                for (var i = 0, len = data.length; i < len; i++) {
                    totalget += Math.min(Number(myuser[data[i].num]), Number(data[i].maxnum)) * Number(data[i].mark);
                }
                var gift = json.gift; //可领奖积分列表 可能不是顺序
                var giftItem = json.giftItem; //可领奖物品列表
                var getgift = myuser.rewardrecord;
                var giftindex = gift.length - 1; //当前显示
                var canget = false; //当前是否可领取
                for (var i = 0, len = gift.length; i < len; i++) {
                    var g = Number(gift[i]);
                    max = Math.max(g, max);
                    if (totalget >= g) {
                        var nohas = getgift.indexOf(i + "") == -1;
                        if (nohas) {
                            giftindex = i;
                            canget = true;
                        }
                    }
                    else if (!canget && i < giftindex) {
                        giftindex = i;
                    }
                }
                if (totalget >= max && !canget) {
                    this.giftView.selectedIndex = 1;
                    win.getProxy()._isApprenticeship = true;
                }
                else {
                    this.itemsgroup.removeChildren();
                    for (var i = 0, len = gift.length; i < len; i++) {
                        var g = Number(gift[i]);
                        var px = (g / max) * 300;
                        var img = new eui.Image(RES.getRes("img_cut_line_jbc_png"));
                        this.itemsgroup.addChild(img);
                        img.x = px - 6;
                        img.y = 4;
                        var lab = new eui.Label();
                        lab.size = 20;
                        lab.width = 80;
                        lab.textAlign = "center";
                        lab.textColor = 0xcab1d7;
                        lab.x = px - 40;
                        lab.y = 20;
                        lab.text = g + "";
                        this.itemsgroup.addChild(lab);
                    }
                    this.giftView.selectedIndex = 0;
                    this.bar.maximum = max;
                    this.bar.value = totalget;
                    this.barlab.text = totalget + "/" + max;
                    var item = giftItem[giftindex];
                    this.itemimage.source = item[1];
                    this.bartipimg.source = "iw_chengzhangl" + giftindex + "_png";
                    this.itemimage.touchEnabled = canget;
                    this.itemimage.alpha = canget ? 1 : 0.5;
                    this.itemimage.name = giftindex + "";
                    this.itemname.text = canget ? "" : item[2];
                    this.img_lingqu.visible = canget;
                    this.img_lingqu.scaleX = 1;
                    this.img_lingqu.scaleY = 1;
                    egret.Tween.removeTweens(this.img_lingqu);
                    if (canget) {
                        this.lingqutween();
                    }
                }
                this.giftView.visible = true;
            }
            else
                this.giftView.visible = false;
        };
        PlaycardsChengZhangComp.prototype.lingqutween = function () {
            if (this.toscale == 1)
                this.toscale = 0.8;
            else
                this.toscale = 1;
            egret.Tween.get(this.img_lingqu).to({ scaleX: this.toscale, scaleY: this.toscale }, 500).call(this.lingqutween, this);
        };
        /**领取奖励返回 */
        PlaycardsChengZhangComp.prototype.getItem = function (index) {
            var json = RES.getRes("chengzhang_json");
            var gift = json.gift; //可领奖积分列表 可能不是顺序
            var giftItem = json.giftItem; //可领奖物品列表
            if (index != -1) {
                var item = giftItem[index];
                var param = { icon: item[1], memo: item[2] };
                __OPEN_PRE_MOUDLE(AppReg.AWARD_MC_WIN, param);
            }
            this.refGift();
        };
        PlaycardsChengZhangComp.prototype.dispose = function () {
            egret.Tween.removeTweens(this.img_lingqu);
            _super.prototype.dispose.call(this);
        };
        PlaycardsChengZhangComp.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this.btnClose:
                    this.close();
                    break;
                case this.itemimage:
                    __PVO().i(Number(this.itemimage.name)).to(app.NetAction.REQ_USER_REWARD);
                    mc2sdk.event(50093 /* CHENGZHANG_GIFT */);
                    break;
            }
        };
        return PlaycardsChengZhangComp;
    }(app.base.BaseWndUIMoudleComponent));
    playcards.PlaycardsChengZhangComp = PlaycardsChengZhangComp;
    __reflect(PlaycardsChengZhangComp.prototype, "playcards.PlaycardsChengZhangComp");
})(playcards || (playcards = {}));
//显示条定义
var ChengzhangListItem = (function (_super) {
    __extends(ChengzhangListItem, _super);
    function ChengzhangListItem() {
        return _super.apply(this, arguments) || this;
    }
    ChengzhangListItem.prototype.createComplete = function (evt) {
        _super.prototype.createComplete.call(this, evt);
        this.addButton(this.btn);
    };
    ChengzhangListItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (user.getProxy().playInfoVO)
            this.num.text = Math.min(Number(user.getProxy().playInfoVO[this.data.num]), Number(this.data.maxnum)) + '/' + this.data.maxnum;
    };
    ChengzhangListItem.prototype.click = function (tag) {
        if (__IS_MOUDLE_OPEN(AppReg.APP_PLAYCARDS)) {
            var parent = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS)["mainview"];
        }
        __OPEN_PRE_MOUDLE(AppReg.APP_GOLD_TREE_TIP, this.itemIndex, null, null, parent);
        //  __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWTIP);  
    };
    return ChengzhangListItem;
}(uicomps.BaseItemCilckRenderer));
__reflect(ChengzhangListItem.prototype, "ChengzhangListItem");
//# sourceMappingURL=PlaycardsChengZhangComp.js.map