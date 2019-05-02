var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var UserInfoVO = (function () {
        function UserInfoVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("UserInfoVO").decode(data);
                this.setData(vo);
            }
        }
        UserInfoVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            this.avatarID = vo.avatarID;
            this.totalHand = vo.totalHand;
            this.winHand = vo.winHand;
            this.joinHand = vo.joinHand;
            this.spreadHand = vo.spreadHand;
            this.spreadWinHand = vo.spreadWinHand;
            this.maxHandWin = vo.maxHandWin == null ? 0 : vo.maxHandWin.toNumber();
            this.totalWin = vo.totalWin == null ? 0 : vo.totalWin.toNumber();
            this.maxCard = vo.maxCard == null ? 0 : vo.maxCard.toNumber();
            this.sbHand = vo.sbHand;
            this.sbJoinHand = vo.sbJoinHand;
            this.bbHand = vo.bbHand;
            this.bbJoinHand = vo.bbJoinHand;
            this.buttonHand = vo.buttonHand;
            this.buttonJoinHand = vo.buttonJoinHand;
            this.otherPosHand = vo.otherPosHand;
            this.otherPosJoinHand = vo.otherPosJoinHand;
            this.raiseWhenPreflop = vo.raiseWhenPreflop;
            this.betOrRaiseTime = vo.betOrRaiseTime;
            this.callTime = vo.callTime;
            this.raiseTime = vo.raiseTime;
            this.tmHand = vo.tmHand;
            this.continueBetTime = vo.continueBetTime;
            this.betOrRaiseHand = vo.betOrRaiseHand;
            this.winDivBB = vo.winDivBB;
            this.huntKill = vo.huntKill;
            this.huntKillScore = vo.huntKillScore;
            this.name = vo.name; //FormatUtils.protoToGBK(vo.name);
            // if (vo.nameutf8) this.name = vo.name;
            // else this.name = FormatUtils.protoToGBK(vo.name);
            this.charm = vo.charm;
            this.charmScore = vo.charmScore;
            //  this.label = new UserLabelVO(vo.label);
            this.label = new appvos.UserLabelVO();
            if (vo.label) {
                this.label.setData(vo.label);
            }
            this.phoneValidate = vo.phoneValidate; //是否手机验证（0：未验证，1：已验证）	
            this.foldright = vo.foldright; //弃牌
            this.raiseright = vo.raiseright; //加注
            this.raiseperfect = vo.raiseperfect; //价值下注
            this.havesamecolor = vo.havesamecolor; //在免费房中拿到同花牌型
            this.havethreesheet = vo.havethreesheet; //在免费房中拿到葫芦牌型
            this.havefoursheet = vo.havefoursheet; //在免费房中拿到四条牌型
            this.rewardrecord = vo.rewardrecord ? vo.rewardrecord.split(",") : []; //成长领取记录
            vo = null;
        };
        return UserInfoVO;
    }());
    appvos.UserInfoVO = UserInfoVO;
    __reflect(UserInfoVO.prototype, "appvos.UserInfoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=UserInfoVO.js.map