var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var HappyRewardMoudle = (function (_super) {
        __extends(HappyRewardMoudle, _super);
        function HappyRewardMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyRewardSkin";
            return _this;
        }
        HappyRewardMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnColse);
            //BULLETIN|房间ID|彩金值|奖励牌型|奖励总额|奖励时间|奖励局号|奖励时候奖池|当前局号|奖励账号1|奖励账号2|奖励账号3|奖励金额1|奖励金额2|奖励金额3|个人获奖金额|个人获奖局号
            var bets = this.uiOpenData;
            this.totalreward.text = FormatUtils.wan(Number(bets[7]));
            if (bets[3] > 0) {
                this.nogetlab.visible = false;
                this.rewardgrop.visible = true;
                var cards = playcards.getProxy().getPlayMaxCards(Math.floor(bets[3]));
                var rest = playcards.getProxy().getCardResult(cards);
                this.card1.source = playcards.getProxy().getCardName(rest.allvos[0].value);
                this.card2.source = playcards.getProxy().getCardName(rest.allvos[1].value);
                this.card3.source = playcards.getProxy().getCardName(rest.allvos[2].value);
                this.card4.source = playcards.getProxy().getCardName(rest.allvos[3].value);
                this.card5.source = playcards.getProxy().getCardName(rest.allvos[4].value);
                this.totalget.text = FormatUtils.wan(Number(bets[4]));
                var date = new Date(bets[5] * 1000);
                this.datelab.text = (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
                if (bets[6] == bets[8]) {
                    this.titleimg.source = "img_word_happy_cj_png";
                }
                else
                    this.titleimg.source = "img_word_happy_slcj_png";
                if (bets[6] == bets[16]) {
                    this.imgget.source = "img_word_happy_gxzj_png";
                    this.labget.text = FormatUtils.wan(Number(bets[15]));
                    this.imgget.x = 191;
                }
                else {
                    this.imgget.source = "img_word_happy_wzj_png";
                    this.labget.text = "";
                    this.imgget.x = 282;
                }
                var ids = [];
                var allrole = [];
                if (bets[9] > 0) {
                    ids.push(4294967296.0 + Number(bets[9]));
                    var obj = {};
                    obj["rank"] = 1;
                    // obj["roleId"] = roleid;
                    obj["avatarID"] = user.getProxy().getHeadStr(0);
                    obj["role"] = "";
                    obj["money"] = FormatUtils.wan(Number(bets[12]));
                    allrole.push(obj);
                }
                if (bets[10] > 0) {
                    ids.push(4294967296.0 + Number(bets[10]));
                    var obj = {};
                    obj["rank"] = 2;
                    // obj["roleId"] = roleid;
                    obj["avatarID"] = user.getProxy().getHeadStr(0);
                    obj["role"] = "";
                    obj["money"] = FormatUtils.wan(Number(bets[13]));
                    allrole.push(obj);
                }
                if (bets[11] > 0) {
                    ids.push(4294967296.0 + Number(bets[11]));
                    var obj = {};
                    obj["rank"] = 3;
                    // obj["roleId"] = roleid;
                    obj["avatarID"] = user.getProxy().getHeadStr(0);
                    obj["role"] = "";
                    obj["money"] = FormatUtils.wan(Number(bets[14]));
                    allrole.push(obj);
                }
                if (allrole.length > 0)
                    this.rolelist.dataProvider = new eui.ArrayCollection(allrole);
                if (ids.length > 0) {
                    __SEND_NOTIFICATION(app.NetAction.PROCESS_XYID_REQ_GET_USER_LIST, ids);
                }
            }
            else {
                this.imgget.source = "img_word_happy_wzj_png";
                this.labget.text = "";
                this.imgget.x = 282;
                this.nogetlab.visible = true;
                this.rewardgrop.visible = false;
            }
        };
        HappyRewardMoudle.prototype.refList = function (body) {
            var allrole = [];
            var len = body.length;
            var bets = this.uiOpenData;
            for (var j = 0; j < 3; j++) {
                var roleid = 4294967296.0 + Number(bets[9 + j]);
                if (roleid > 0) {
                    for (var i = 0; i < len; i++) {
                        var vo = body[i];
                        if (vo.roleId == roleid) {
                            var obj = {};
                            obj["rank"] = j + 1;
                            obj["roleId"] = roleid;
                            obj["avatarID"] = user.getProxy().getHeadStr(Number(vo.avatarID));
                            obj["role"] = vo.name;
                            obj["money"] = FormatUtils.wan(Number(bets[12 + j]));
                            allrole.push(obj);
                            break;
                        }
                    }
                }
            }
            if (allrole.length > 0)
                this.rolelist.dataProvider = new eui.ArrayCollection(allrole);
        };
        HappyRewardMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            _super.prototype.touchBindButtonHandler.call(this, clickTarget);
            switch (clickTarget) {
                case this.btnColse:
                    this.close();
                    break;
            }
        };
        return HappyRewardMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    happy.HappyRewardMoudle = HappyRewardMoudle;
    __reflect(HappyRewardMoudle.prototype, "happy.HappyRewardMoudle");
})(happy || (happy = {}));
//# sourceMappingURL=HappyRewardMoudle.js.map