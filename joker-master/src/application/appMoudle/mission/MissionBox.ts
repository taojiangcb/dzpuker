module mission {
	export class MissionBox extends gameabc.UICustomComponent {
		imgBox:eui.Image;
		tipBox:eui.Group;
		txtLabel:eui.Label;
		// awardBox:egret.MovieClip;
		boxAnimation: dragonBones.Armature;
		boxgroup: eui.Group;

		//监测的任务列表用于tip提示
		watchTypesByTip:any[] = [
			{type:1,subType:2},{type:1,subType:3},{type:1,subType:4}
		];

		/**父级容器 */
		fatherGroup:egret.DisplayObject;
		isOpenBox:boolean = false;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/mission/MissionBox.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.tipBox.visible = false;
			this.tipBox.touchChildren = false;
			this.tipBox.touchEnabled = false;
			this.visible = getProxy().allCompleteMission();

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

			var boneFactory:dragonBones.EgretFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_PLAYCARDS,"caishensongfu1_json","caishensongfu1_texture_png","caishensongfu1_texture_json");
            this.boxAnimation = boneFactory.buildFastArmature("MovieClip","caishensongfu");
            this.boxAnimation.display.touchEnabled = false;
            this.boxAnimation.display.x = this.imgBox.x + 34;
            this.boxAnimation.display.y = this.imgBox.y + 34;
            dragonBones.WorldClock.clock.add(this.boxAnimation);
			this.boxAnimation.animation.play("bao xiang", -1);
			// this.bindButton(this.imgBox);
			// this.bindButton(this.boxAnimation.display);
            this.boxgroup.addChild(<egret.DisplayObject>this.boxAnimation.display);
			this.bindButton(this.boxgroup);
		}

		/**
		 * 有任务被完成就会显示宝箱被打开
		 */
		openTheBox():boolean {
			var missionList:MissionVO[] = mission.getProxy().getMissionsByType(mission.MissionType.mission);
			var len:number = missionList.length;
			var flag:boolean = false;
			while(--len > -1) {
				if(missionList[len].status == MissionState.done) {
					flag = true;
					break;
				}
			}
			this.isOpenBox = flag;
			this.boxStatusChange(flag);
			return flag;
		}

		/**
		 * 如果有相关任务快完成则会显示提示
		 */
		openTheTip():boolean {
			var missionList:MissionVO[] = mission.getProxy().missionDatas;
			var len:number = missionList.length;
			var falg:boolean = false;
			while(--len > -1) {
				var i:number = this.watchTypesByTip.length;
				while(--i > -1) {
					var watchData = this.watchTypesByTip[i];
					if(missionList[len].type == watchData.type && missionList[len].subtype == watchData.subType && missionList[len].status == mission.MissionState.done) {
						falg = true;
					}
				}
			}
			this.showTipUI(falg || this.isOpenBox);
			return falg;	
		}

		private boxStatusChange(open:boolean):void {
			if(this.imgBox == null) return;

			if(open) {
				this.imgBox.visible = false;
				this.boxAnimation.display.visible = true;
				// this.boxAnimation.animation.play("bao xiang", -1);
			}
			else {
				this.imgBox.visible = true;
				this.boxAnimation.display.visible = false;
			}

			//这些房间不显示任务合子
			var roomValida:boolean = true;
			if ( room.getProxy().currentType == room.TYPE.VIP
				|| room.getProxy().currentType == room.TYPE.PK
				|| user.getProxy().willJoinMatchRoom
				|| room.getProxy().currentType == room.TYPE.FREE) {
				roomValida = false;
			}

			this.visible = (getProxy().allCompleteMission() ? false : true) && roomValida;
		}

		private showTipUI(falg:boolean):void {
			if(this.tipBox == null) return;
			if(!falg) return;

			this.tipBox.visible = true;
			this.tipBox.x = 0;

			if(this.isOpenBox) {
				this.txtLabel.text = "有任务已完成！"
			} else {
				this.txtLabel.text = "有任务即将完成！"
			}

			egret.Tween.removeTweens(this.tipBox);
			egret.Tween.get(this.tipBox)
			.set({alpha:0,x:150})
			.to({alpha:1,x:0},300,egret.Ease.sineOut)
			.wait(3000)
			.to({alpha:0},300,egret.Ease.sineOut);
		}

		protected touchBindButtonHandler(tag:egret.DisplayObject):void {
			if(this.boxgroup) {
				__OPEN_PRE_MOUDLE(AppReg.APP_MISSION,null,null,null,(<playcards.PlayCardsPlayComp>this.fatherGroup).view.mainview);
				mc2sdk.event(mc2sdk.EVENT_TYPE.MISSION_BOX);
			}
		}

		dispose():void {
			// if(this.imgBox) this.unbindButton(this.imgBox);
			egret.Tween.removeTweens(this.tipBox);
			if (this.boxAnimation) {              
                dragonBones.WorldClock.clock.remove(this.boxAnimation);
                gameabc.destoryFactory(AppReg.APP_PLAYCARDS);
            }
			super.dispose();
		}
	}
}