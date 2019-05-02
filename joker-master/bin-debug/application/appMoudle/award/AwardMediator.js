var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/7/15.
 */
var award;
(function (award) {
    var AwardMediator = (function (_super) {
        __extends(AwardMediator, _super);
        function AwardMediator(viewCompoent) {
            return _super.call(this, award.AwardMediator.NAME, viewCompoent) || this;
        }
        AwardMediator.prototype.listNotificationInterests = function () {
            return [
                award.AwardMediator.REWARD_MISSION,
                award.AwardMediator.OPEN_AWARD_UI
            ];
        };
        AwardMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case award.AwardMediator.REWARD_MISSION:
                    var reward_str = "";
                    var missionInfo = notification.getBody();
                    var missionTemplate = mission.getProxy().getMissionTemplate(missionInfo.type, missionInfo.subtype, missionInfo.level);
                    if (missionInfo.silver > 0) {
                        if (missionInfo.type == mission.MissionType.godTree || missionInfo.type == mission.MissionType.free_broke) {
                            reward_str = "金币:" + missionInfo.silver;
                        }
                        else {
                            reward_str = "彩豆:" + missionInfo.silver;
                        }
                    }
                    else if (missionInfo.itemId > 0) {
                        if (missionTemplate) {
                            reward_str = missionTemplate.descript;
                        }
                    }
                    if (missionTemplate) {
                        var param = { icon: missionTemplate.imgName + "_png", memo: reward_str };
                        __OPEN_PRE_MOUDLE(AppReg.AWARD_MC_WIN, param);
                    }
                    break;
                case award.AwardMediator.OPEN_AWARD_UI:
                    var param = notification.getBody();
                    __OPEN_PRE_MOUDLE(AppReg.AWARD_MC_WIN, param);
                    break;
            }
        };
        return AwardMediator;
    }(app.mvc.AbstractMediator));
    AwardMediator.NAME = "__AWARD_MEDIATOR__";
    AwardMediator.OPEN_AWARD_UI = "openAwardUI";
    AwardMediator.REWARD_MISSION = "rewardMission";
    award.AwardMediator = AwardMediator;
    __reflect(AwardMediator.prototype, "award.AwardMediator");
})(award || (award = {}));
//# sourceMappingURL=AwardMediator.js.map