var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/6/28.
 */
var mission;
(function (mission) {
    var SignItemRenderer = (function (_super) {
        __extends(SignItemRenderer, _super);
        function SignItemRenderer() {
            var _this = _super.call(this) || this;
            _this.day = 0;
            _this.missionState = mission.MissionState.progress;
            _this.skinName = "resource/app_skin/mission/SignItemRendererSkin.exml";
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        SignItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            var starData = RES.getRes("star_json");
            var textureData = RES.getRes("star_png");
            var startMC = new egret.MovieClipDataFactory(starData, textureData);
            this.star_shine = new egret.MovieClip(startMC.generateMovieClipData("star"));
            this.star_shine.visible = false;
            this.star_shine.x = this.width - 162 >> 1;
            this.star_shine.y = 10; //this.height -102 >> 1;
            this.addChild(this.star_shine);
        };
        SignItemRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.day = this.data.day;
                this.missionState = this.data.state;
                var missionTemplate = mission.getProxy().getMissionTemplate(this.data.type, this.data.subType, this.data.day);
                if (missionTemplate) {
                    if (missionTemplate.descript.length > 0) {
                        this.moneyBar.visible = false;
                        this.txtItemName.visible = true;
                        this.txtItemName.text = missionTemplate.descript;
                    }
                    else {
                        this.moneyBar.visible = true;
                        this.txtItemName.visible = false;
                        this.txtReward.text = missionTemplate.reward;
                    }
                    this.imgReward.source = missionTemplate.imgName + "_png";
                    this.txtDay.text = missionTemplate.level.toString();
                }
                if (this.missionState == mission.MissionState.done) {
                    this.star_shine.visible = true;
                    this.star_shine.play(-1);
                }
                else {
                    this.star_shine.visible = false;
                    this.star_shine.stop();
                }
                if (this.missionState == mission.MissionState.obtaining) {
                    this.imgOb.visible = true;
                }
                else {
                    this.imgOb.visible = false;
                }
            }
        };
        return SignItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    mission.SignItemRenderer = SignItemRenderer;
    __reflect(SignItemRenderer.prototype, "mission.SignItemRenderer");
})(mission || (mission = {}));
//# sourceMappingURL=SignItemRenderer.js.map