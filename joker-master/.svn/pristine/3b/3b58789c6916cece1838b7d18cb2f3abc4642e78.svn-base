/**
 * Created by JiangTao on 2016/7/15.
 */
module award {
    export class AwardMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__AWARD_MEDIATOR__";

        static OPEN_AWARD_UI:string = "openAwardUI";
        static REWARD_MISSION:string = "rewardMission";


        constructor(viewCompoent:any) {
            super(award.AwardMediator.NAME, viewCompoent);
        }

        listNotificationInterests():string[] {
            return [
                award.AwardMediator.REWARD_MISSION,
                award.AwardMediator.OPEN_AWARD_UI
            ];
        }

        handleNotification(notification:puremvc.INotification):void {
            switch (notification.getName()) {
                case award.AwardMediator.REWARD_MISSION:
                    var reward_str:string = "";
                    var missionInfo:mission.MissionVO = <mission.MissionVO>notification.getBody();
                    var missionTemplate:localDB.MissionTemplateVO = mission.getProxy().getMissionTemplate(missionInfo.type, missionInfo.subtype, missionInfo.level);
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
                        var param:any = {icon: missionTemplate.imgName + "_png", memo: reward_str};
                        __OPEN_PRE_MOUDLE(AppReg.AWARD_MC_WIN, param);
                    }
                    break;
                case award.AwardMediator.OPEN_AWARD_UI:
                    var param:any = notification.getBody();
                    __OPEN_PRE_MOUDLE(AppReg.AWARD_MC_WIN, param);
                    break;

            }
        }
    }
}