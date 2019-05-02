var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guide;
(function (guide) {
    var GreenHandlerUIMoudle = (function (_super) {
        __extends(GreenHandlerUIMoudle, _super);
        function GreenHandlerUIMoudle() {
            var _this = _super.call(this) || this;
            _this.isGetMission = false;
            // this.top = this.left = this.bottom = this.right = 0;
            _this.skinName = "resource/app_skin/guide/GreenHandler.exml";
            return _this;
        }
        GreenHandlerUIMoudle.prototype.opening = function () {
            mission.getProxy().getServerList();
            mission.getProxy().getServerList(AppConst.GAME_ID_FREE);
            if (this.uiOpenData) {
                this.guideCallBack = this.uiOpenData.callBack;
                this.callBackObj = this.uiOpenData.thisObj;
            }
        };
        GreenHandlerUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            __REGISTER_MEDIATOR(guide.GreenHandlerMediator, this);
            // this.guideGruop.visible = false;
            this.showFirstGroup();
            this.bindButton(this.btnGreenHandler);
            this.bindButton(this.btnOldHandler);
            this.bindButton(this.btnClose);
            // this.fapaimv = new gameabc.MovieClip(playcards.getProxy().getTextures("fapai"), 32);
            // this.firstgroup.addChildAt(this.fapaimv, 1);
            // this.fapaimv.x = 502;
            // this.fapaimv.y = 197;
            // // this.fapaimv.play(-1);
            // this.eyemv = new gameabc.MovieClip(playcards.getProxy().getTextures("mv_play_dealer"));
            // this.firstgroup.addChildAt(this.eyemv, 1);
            // this.eyemv.x = 543;
            // this.eyemv.y = 111;
            // this.eyemv.loopdelayTime = 3;
            // this.eyemv.loop = true;
            // this.eyemv.play(-1);
        };
        GreenHandlerUIMoudle.prototype.showFirstGroup = function () {
            this.firstgroup.visible = true;
            this.secondgroup.visible = false;
            this.talkgroup2.visible = false;
            this.selectgroup.visible = true;
            this.talkgroup1.visible = true;
            this.lefttopgroup.visible = false;
            this.bottomgroup.visible = false;
            // egret.Tween.get(this.talkgroup1)
            // 	.set({alpha:0})
            // 	.to({alpha:1},200,egret.Ease.sineOut);
        };
        GreenHandlerUIMoudle.prototype.showSecondGroup = function () {
            this.secondgroup.visible = true;
            this.talkgroup1.visible = false;
            this.talkgroup2.visible = true;
            this.selectgroup.visible = false;
            this.lefttopgroup.visible = true;
            this.bottomgroup.visible = true;
            // egret.Tween.get(this.secondgroup)
            // 	.set({alpha:0})
            // 	.to({alpha:1},200,egret.Ease.sineOut);
            // egret.Tween.get(this.talkgroup2)
            // 	.set({alpha:0})
            // 	.to({alpha:1},200,egret.Ease.sineOut);
        };
        GreenHandlerUIMoudle.prototype.touchBindButtonHandler = function (tag) {
            var _this = this;
            var target = tag;
            if (target == this.btnGreenHandler) {
                // egret.Tween.get(this.onePage)
                // 	.set({alpha:1})
                // 	.to({alpha:0},200,egret.Ease.sineOut);
                // egret.Tween.get(this.guideGruop)
                // 	.set({visible:true,alpha:0})
                // 	.wait(200)
                // 	.to({alpha:1},300,egret.Ease.sineOut);
                this.showSecondGroup();
                mc2sdk.event(50062 /* GREEN_HANDLER */);
                egret.Tween.get(this.btnClose)
                    .wait(3000).call(function () {
                    egret.Tween.get(_this.btnClose, { loop: true })
                        .to({ scaleX: 0.8, scaleY: 0.8 }, 300, egret.Ease.sineOut)
                        .to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.sineOut);
                }, this);
            }
            else if (target == this.btnOldHandler || target == this.btnClose) {
                if (target == this.btnOldHandler) {
                    mc2sdk.event(50063 /* OLD_HANDLER */);
                }
                else if (target == this.btnClose) {
                    mc2sdk.event(50064 /* GUIDE_CLOSE */);
                }
                if (this.guideCallBack != null) {
                    if (this.isGetMission) {
                        user.gotoRoom(room.getProxy().room2[0], AppReg.ROOM);
                    }
                    else {
                        this.guideCallBack.call(this.callBackObj);
                    }
                    __CLOSE_MOUDLE(AppReg.GREEN_HANDLER);
                }
            }
        };
        GreenHandlerUIMoudle.prototype.updateGoldTreeMission = function () {
            if (this.isGetMission)
                return;
            var templs = mission.getProxy().getMissionTemplates(mission.MissionType.godTree, mission.MissionSubType.god_tree);
            var missions = mission.getProxy().getclvMissionInfos(mission.MissionType.godTree, mission.MissionSubType.god_tree);
            if (missions.length > 0) {
                this.mission = missions[0];
                this.isGetMission = true;
                mission.getProxy().getAward(missions[0], AppConst.GAME_ID_FREE);
            }
        };
        GreenHandlerUIMoudle.prototype.dispose = function () {
            __REMOVE_MEDIATOR(guide.GreenHandlerMediator);
            // egret.Tween.removeTweens(this.onePage);
            // egret.Tween.removeTweens(this.guideGruop);
            egret.Tween.removeTweens(this.btnClose);
            _super.prototype.dispose.call(this);
        };
        return GreenHandlerUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    guide.GreenHandlerUIMoudle = GreenHandlerUIMoudle;
    __reflect(GreenHandlerUIMoudle.prototype, "guide.GreenHandlerUIMoudle");
})(guide || (guide = {}));
//# sourceMappingURL=GreenHandlerUIMoudle.js.map