module guide {
	export class GreenHandlerUIMoudle extends app.base.BaseSceneUIMoudleComponent {
		
		public btnOldHandler:eui.Group;
		public btnGreenHandler:eui.Group;
		// public guideGruop:eui.Group;
		// public onePage:eui.Group;
		public btnClose:eui.Group;

		guideCallBack:Function;
		callBackObj:any;
		isGetMission: boolean = false;
		mission: mission.MissionVO;

		firstgroup: eui.Group;
		secondgroup: eui.Group;
		talkgroup1: eui.Group;
		talkgroup2: eui.Group;
		selectgroup: eui.Group;
		lefttopgroup: eui.Group;
		bottomgroup: eui.Group;
		//fapaimv: gameabc.MovieClip;//发牌动画
        //eyemv: gameabc.MovieClip;//眨眼动画

		player0: playcards.PlayCardsItemComp;
		player1: playcards.PlayCardsItemComp;

		public constructor() {
			super();
			// this.top = this.left = this.bottom = this.right = 0;
			this.skinName = "resource/app_skin/guide/GreenHandler.exml";
		}

		opening() {
			mission.getProxy().getServerList();
			mission.getProxy().getServerList(AppConst.GAME_ID_FREE);
			if(this.uiOpenData) {
				this.guideCallBack = this.uiOpenData.callBack;
				this.callBackObj = this.uiOpenData.thisObj;
			}
		}


		createComplete(event:egret.Event) {
			super.createComplete(event);
			__REGISTER_MEDIATOR(GreenHandlerMediator, this);
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
		}

		showFirstGroup() {
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
		}

		showSecondGroup() {
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
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			var target = tag;
			if(target == this.btnGreenHandler) {
				// egret.Tween.get(this.onePage)
				// 	.set({alpha:1})
				// 	.to({alpha:0},200,egret.Ease.sineOut);
				
				// egret.Tween.get(this.guideGruop)
				// 	.set({visible:true,alpha:0})
				// 	.wait(200)
				// 	.to({alpha:1},300,egret.Ease.sineOut);
				this.showSecondGroup();
				mc2sdk.event(mc2sdk.EVENT_TYPE.GREEN_HANDLER);

				egret.Tween.get(this.btnClose)
				.wait(3000).call(()=>{
					egret.Tween.get(this.btnClose,{loop:true})
					.to({scaleX:0.8,scaleY:0.8},300,egret.Ease.sineOut)
					.to({scaleX:1,scaleY:1},300,egret.Ease.sineOut)
				},this)
				
			}
			else if(target == this.btnOldHandler || target == this.btnClose) {
				if(target == this.btnOldHandler) {
					mc2sdk.event(mc2sdk.EVENT_TYPE.OLD_HANDLER);
				}
				else if(target == this.btnClose) {
					mc2sdk.event(mc2sdk.EVENT_TYPE.GUIDE_CLOSE);
				}
				if(this.guideCallBack != null) {
					if (this.isGetMission) {
						user.gotoRoom(room.getProxy().room2[0], AppReg.ROOM);
					} else {
						this.guideCallBack.call(this.callBackObj);
					}
					__CLOSE_MOUDLE(AppReg.GREEN_HANDLER);
				}
			}
		}

		updateGoldTreeMission() {
			if (this.isGetMission) return;
			var templs:localDB.MissionTemplateVO[] = mission.getProxy().getMissionTemplates(mission.MissionType.godTree,mission.MissionSubType.god_tree);
			var missions:mission.MissionVO[] = mission.getProxy().getclvMissionInfos(mission.MissionType.godTree,mission.MissionSubType.god_tree);
			if (missions.length > 0) {
				this.mission = missions[0];
				this.isGetMission = true;
				mission.getProxy().getAward(missions[0],AppConst.GAME_ID_FREE);
			}
		}

		dispose():void {
			__REMOVE_MEDIATOR(GreenHandlerMediator);
			// egret.Tween.removeTweens(this.onePage);
			// egret.Tween.removeTweens(this.guideGruop);
			egret.Tween.removeTweens(this.btnClose);
			super.dispose();
		}
	}
}