/**
 * Created by JiangTao on 2016/6/22.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mission;
(function (mission) {
    var MissionVO = (function () {
        function MissionVO() {
            this.type = 0; //任务类型
            this.subtype = 0; //任务id
            this.level = 0; //当前任务的阶段id
            this.progress = 0; //已完成的进度
            this.status = 0; //0进行中,1已完,2已岭取
            this.silver = 0; //银子
            this.itemId = 0; //奖励的道具id
            this.itemNum = 0; //道具数量
            this.time = 0; //任务领取生效时间
        }
        return MissionVO;
    }());
    mission.MissionVO = MissionVO;
    __reflect(MissionVO.prototype, "mission.MissionVO");
    var MissionState;
    (function (MissionState) {
        MissionState[MissionState["progress"] = 0] = "progress";
        MissionState[MissionState["done"] = 1] = "done";
        MissionState[MissionState["obtaining"] = 2] = "obtaining"; //已领取
    })(MissionState = mission.MissionState || (mission.MissionState = {}));
    var MissionType;
    (function (MissionType) {
        MissionType[MissionType["mission"] = 1] = "mission";
        MissionType[MissionType["achievement"] = 2] = "achievement";
        MissionType[MissionType["day"] = 3] = "day";
        MissionType[MissionType["godTree"] = 4] = "godTree";
        MissionType[MissionType["free_broke"] = 5] = "free_broke"; //新手破产任务
    })(MissionType = mission.MissionType || (mission.MissionType = {}));
    var MissionSubType;
    (function (MissionSubType) {
        MissionSubType[MissionSubType["day"] = 1] = "day";
        MissionSubType[MissionSubType["day_accumulate"] = 2] = "day_accumulate";
        MissionSubType[MissionSubType["free_broke"] = 7] = "free_broke";
        MissionSubType[MissionSubType["god_tree"] = 25] = "god_tree"; //摇钱树唯一任务
    })(MissionSubType = mission.MissionSubType || (mission.MissionSubType = {}));
})(mission || (mission = {}));
//# sourceMappingURL=MissionVO.js.map