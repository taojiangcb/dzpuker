var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sng;
(function (sng) {
    var SngResultMoudle = (function (_super) {
        __extends(SngResultMoudle, _super);
        function SngResultMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "SngResultSkin";
            return _this;
        }
        SngResultMoudle.prototype.createComplete = function () {
            this.bindButton(this.closeButton);
            this.bindButton(this.shareButton);
            this.bindButton(this.playAgainBtn);
            this.setRank(this.uiOpenData);
        };
        /** 显示金杯以及金杯的动画 */
        SngResultMoudle.prototype.showJinbei = function () {
            this.jinbei.visible = this.jinbeiLight.visible = true;
            egret.Tween.get(this.jinbeiLight, { "loop": true }).to({ "rotation": 360 }, 3000);
            this.secImage.visible = false;
        };
        /** 显示灰色的杯子 */
        SngResultMoudle.prototype.showHuibei = function () {
            this.jinbei.visible = this.jinbeiLight.visible = false;
            this.secImage.visible = true;
        };
        /** 只显示奖励 */
        SngResultMoudle.prototype.showReward = function () {
            this.hongbaoGroup.visible = false;
            this.rewardGroup.visible = true;
            this.rewardGroup.x = 215;
            this.rewardGroup.y = 230;
        };
        /** 只显示红包 */
        SngResultMoudle.prototype.showHongbao = function () {
            this.rewardGroup.visible = false;
            this.hongbaoGroup.visible = true;
            this.hongbaoGroup.x = 215;
            this.hongbaoGroup.y = 230;
        };
        /** 显示奖励和红包 */
        SngResultMoudle.prototype.showRewardAndHongbao = function () {
            this.hongbaoGroup.x = 215;
            this.hongbaoGroup.y = 207;
            this.hongbaoGroup.visible = true;
            this.rewardGroup.x = 215;
            this.rewardGroup.y = 252;
            this.rewardGroup.visible = true;
        };
        SngResultMoudle.prototype.hideRewardAndHongbao = function () {
            this.rewardGroup.visible = false;
            this.hongbaoGroup.visible = false;
        };
        SngResultMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closeButton:
                case this.playAgainBtn:
                    this.close();
                    if (match.getProxy().currentMatchVO instanceof appvos.MttMatchVO) {
                    }
                    match.getProxy().currentMatchVO.isSigned = false;
                    __CLOSE_MOUDLE(AppReg.APP_PLAYCARDS);
                    user.getProxy().leaveRoom();
                    user.getProxy().leaveRoomSuccess(); //服务端不会回复，强制更新，非严谨方案!
                    __SEND_NOTIFICATION(app.NetAction.TOOL_RILVER);
                    __SEND_NOTIFICATION(app.NetAction.REQGETMATCHLIST);
                    item.getProxy().getItemDate();
                    return;
                case this.shareButton:
                    // if (egret.Capabilities.os == "Android") {
                    platform.shardShow("比赛钱圈奖励", "你衰你弃牌，我帅我allin，边锋比赛等你来战");
                    mc2sdk.event(50102 /* SHARE_SNG_WIN */);
                    // } else {
                    //     tip.popSysCenterTip("FUNCTION_NO_TIPS");
                    // }
                    break;
            }
        };
        SngResultMoudle.prototype.setRank = function (value) {
            var matchVO = match.getProxy().currentMatchVO;
            //转轮只有第一名有奖励，MTT根据奖励列表判断
            if ((matchVO.type == 4 /* SNG */ && value == 1) ||
                matchVO.type == 5 /* MTT */ && value <= matchVO.rewards.length) {
                this.rankLabel.font = "fnt06_fnt";
                this.inspireLabel.text = gameabc.getMessage("MATCH_WIN_INSPIRE");
                var coin, propNum; //筹码和道具
                var reward = matchVO.rewards[value - 1]; //读配置的奖励
                propNum = reward == null ? 0 : reward.propNum;
                if (matchVO instanceof appvos.MttMatchVO) {
                    reward == null ? 0 : reward.coin;
                }
                else {
                    coin = matchVO.wheelBonus;
                }
                // 有奖励显示，没奖励就不显示
                // this.scoreLabel.text = String(reward.score);
                this.rewardLabel.text = String(coin);
                this.hongbaoLabel.text = String(propNum);
                if (propNum > 0 && coin > 0) {
                    this.showRewardAndHongbao();
                }
                else if (propNum > 0) {
                    this.showHongbao();
                }
                else if (coin > 0) {
                    this.showReward();
                }
                else
                    this.hideRewardAndHongbao();
                this.showJinbei();
                this.secImage.visible = false;
                this.rankLabel.y = 133;
                this.playAgainBtn.visible = false;
                this.shareButton.visible = true;
            }
            else {
                this.showHuibei();
                this.hideRewardAndHongbao();
                this.secImage.visible = true;
                this.rankLabel.font = "fnt07_fnt";
                this.inspireLabel.text = gameabc.getMessage("MATCH_LOST_INSPIRE");
                this.rankLabel.y = 173;
                this.playAgainBtn.visible = true;
                this.shareButton.visible = false;
            }
            this.rankLabel.text = "第" + String(value) + "名";
        };
        return SngResultMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    sng.SngResultMoudle = SngResultMoudle;
    __reflect(SngResultMoudle.prototype, "sng.SngResultMoudle");
})(sng || (sng = {}));
//# sourceMappingURL=SngResultMoudle.js.map