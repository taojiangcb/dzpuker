var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/6/23.
 */
var mission;
(function (mission) {
    var MissionItemRenderer = (function (_super) {
        __extends(MissionItemRenderer, _super);
        function MissionItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/mission/MissionItemRenderer.exml";
            _this.touchChildren = true;
            _this.touchEnabled = false;
            return _this;
        }
        MissionItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.btnAward.touchEnabled = true;
            this.btnAward.touchChildren = false;
            this.addButton(this.btnAward, true);
        };
        MissionItemRenderer.prototype.dataChanged = function () {
            var missionInfo = this.data;
            this.missionTemplate = mission.getProxy().getMissionTemplate(missionInfo.type, missionInfo.subtype, missionInfo.level);
            if (this.missionTemplate) {
                if (this.missionTemplate.missionName.length > 0) {
                    this.title.visible = true;
                    this.txtName.text = this.missionTemplate.missionName;
                }
                else {
                    this.title.visible = false;
                }
                if (this.missionTemplate.itemId.length > 0) {
                    this.chipBar.visible = false;
                }
                else {
                    this.chipBar.visible = true;
                }
                this.txtMemo.text = this.missionTemplate.descript;
                this.txtReward.text = this.missionTemplate.reward;
                this.imgReward.source = this.missionTemplate.imgName + "_png";
                this.progress.maximum = this.missionTemplate.total;
                this.progress.minimum = 0;
            }
            if (missionInfo.status == mission.MissionState.progress) {
                this.progress.visible = true;
                this.btnAward.visible = false;
                this.imgOB.visible = false;
                this.progress.value = missionInfo.progress;
                this.imgBg.visible = false;
            }
            else if (missionInfo.status == mission.MissionState.done) {
                this.progress.visible = false;
                this.btnAward.visible = true;
                this.imgOB.visible = false;
                this.imgBg.visible = true;
            }
            else if (missionInfo.status == mission.MissionState.obtaining) {
                this.progress.visible = false;
                this.btnAward.visible = false;
                this.imgOB.visible = true;
                this.imgBg.visible = false;
            }
        };
        MissionItemRenderer.prototype.click = function (tag) {
            if (tag == this.btnAward) {
                mission.getProxy().getAward(this.data);
                if (this.missionTemplate) {
                    mc2sdk.event(50050 /* MISSION_AWARD */, { templateId: this.missionTemplate.id, name: this.missionTemplate.missionName });
                }
            }
        };
        return MissionItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    mission.MissionItemRenderer = MissionItemRenderer;
    __reflect(MissionItemRenderer.prototype, "mission.MissionItemRenderer");
})(mission || (mission = {}));
//# sourceMappingURL=MissionItemRenderer.js.map