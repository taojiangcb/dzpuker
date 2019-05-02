var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mission;
(function (mission) {
    var MissionBox = (function (_super) {
        __extends(MissionBox, _super);
        function MissionBox() {
            var _this = _super.call(this) || this;
            //监测的任务列表用于tip提示
            _this.watchTypesByTip = [
                { type: 1, subType: 2 }, { type: 1, subType: 3 }, { type: 1, subType: 4 }
            ];
            _this.isOpenBox = false;
            _this.skinName = "resource/app_skin/mission/MissionBox.exml";
            return _this;
        }
        MissionBox.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.tipBox.visible = false;
            this.tipBox.touchChildren = false;
            this.tipBox.touchEnabled = false;
            this.visible = mission.getProxy().allCompleteMission();
            this.imgBox.source = "icon_sign_ticket__box2_png";
            // var data = RES.getRes("AwardBox_json");
            // var texture = RES.getRes("AwardBox_png");
            // var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
            // this.awardBox = new egret.MovieClip(mcFactory.generateMovieClipData("MissionBox"));
            // this.addChild(this.awardBox);
            // this.awardBox.play(-1);
            // this.awardBox.x = this.imgBox.x;
            // this.awardBox.y = this.imgBox.y;
            // this.awardBox.touchEnabled = true;
            var boneFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_PLAYCARDS, "caishensongfu1_json", "caishensongfu1_texture_png", "caishensongfu1_texture_json");
            this.boxAnimation = boneFactory.buildFastArmature("MovieClip", "caishensongfu");
            this.boxAnimation.display.touchEnabled = false;
            this.boxAnimation.display.x = this.imgBox.x + 34;
            this.boxAnimation.display.y = this.imgBox.y + 34;
            dragonBones.WorldClock.clock.add(this.boxAnimation);
            this.boxAnimation.animation.play("bao xiang", -1);
            // this.bindButton(this.imgBox);
            // this.bindButton(this.boxAnimation.display);
            this.boxgroup.addChild(this.boxAnimation.display);
            this.bindButton(this.boxgroup);
        };
        /**
         * 有任务被完成就会显示宝箱被打开
         */
        MissionBox.prototype.openTheBox = function () {
            var missionList = mission.getProxy().getMissionsByType(mission.MissionType.mission);
            var len = missionList.length;
            var flag = false;
            while (--len > -1) {
                if (missionList[len].status == mission.MissionState.done) {
                    flag = true;
                    break;
                }
            }
            this.isOpenBox = flag;
            this.boxStatusChange(flag);
            return flag;
        };
        /**
         * 如果有相关任务快完成则会显示提示
         */
        MissionBox.prototype.openTheTip = function () {
            var missionList = mission.getProxy().missionDatas;
            var len = missionList.length;
            var falg = false;
            while (--len > -1) {
                var i = this.watchTypesByTip.length;
                while (--i > -1) {
                    var watchData = this.watchTypesByTip[i];
                    if (missionList[len].type == watchData.type && missionList[len].subtype == watchData.subType && missionList[len].status == mission.MissionState.done) {
                        falg = true;
                    }
                }
            }
            this.showTipUI(falg || this.isOpenBox);
            return falg;
        };
        MissionBox.prototype.boxStatusChange = function (open) {
            if (this.imgBox == null)
                return;
            if (open) {
                this.imgBox.visible = false;
                this.boxAnimation.display.visible = true;
            }
            else {
                this.imgBox.visible = true;
                this.boxAnimation.display.visible = false;
            }
            //这些房间不显示任务合子
            var roomValida = true;
            if (room.getProxy().currentType == 3 /* VIP */
                || room.getProxy().currentType == 7 /* PK */
                || user.getProxy().willJoinMatchRoom
                || room.getProxy().currentType == 8 /* FREE */) {
                roomValida = false;
            }
            this.visible = (mission.getProxy().allCompleteMission() ? false : true) && roomValida;
        };
        MissionBox.prototype.showTipUI = function (falg) {
            if (this.tipBox == null)
                return;
            if (!falg)
                return;
            this.tipBox.visible = true;
            this.tipBox.x = 0;
            if (this.isOpenBox) {
                this.txtLabel.text = "有任务已完成！";
            }
            else {
                this.txtLabel.text = "有任务即将完成！";
            }
            egret.Tween.removeTweens(this.tipBox);
            egret.Tween.get(this.tipBox)
                .set({ alpha: 0, x: 150 })
                .to({ alpha: 1, x: 0 }, 300, egret.Ease.sineOut)
                .wait(3000)
                .to({ alpha: 0 }, 300, egret.Ease.sineOut);
        };
        MissionBox.prototype.touchBindButtonHandler = function (tag) {
            if (this.boxgroup) {
                __OPEN_PRE_MOUDLE(AppReg.APP_MISSION, null, null, null, this.fatherGroup.view.mainview);
                mc2sdk.event(50049 /* MISSION_BOX */);
            }
        };
        MissionBox.prototype.dispose = function () {
            // if(this.imgBox) this.unbindButton(this.imgBox);
            egret.Tween.removeTweens(this.tipBox);
            if (this.boxAnimation) {
                dragonBones.WorldClock.clock.remove(this.boxAnimation);
                gameabc.destoryFactory(AppReg.APP_PLAYCARDS);
            }
            _super.prototype.dispose.call(this);
        };
        return MissionBox;
    }(gameabc.UICustomComponent));
    mission.MissionBox = MissionBox;
    __reflect(MissionBox.prototype, "mission.MissionBox");
})(mission || (mission = {}));
//# sourceMappingURL=MissionBox.js.map