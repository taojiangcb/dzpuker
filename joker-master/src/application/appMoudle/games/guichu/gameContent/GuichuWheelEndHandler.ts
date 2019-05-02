module guichu {

	export enum AWARD_TYPE {
		NORMAL_AWARD = 1,
		SMALL_AWARD,
		BIG_AWARD
	}

	var handler:GuichuWheelEndHandler;

	/**
	 * 结算流程处理
	 * popImg 中奖时弹出来的小图
	 * awardType 中奖的类型
	 * awardCount 奖励的金额
	 */
	export function playAwardAnimation(popImg:string="",awardType:number,awardCount:number) {
		if(handler == null) handler = new GuichuWheelEndHandler();
		handler.popImgFile = popImg;
		handler.awardType = awardType;
		handler.awardCount = awardCount
		handler.play();
	}

	export function clearAwardAnimation():void {
		if(handler != null){
			handler.clear();
		}
		handler = null;
			
	}

	/**
	 * 鬼畜转盘动画结束时的反馈节奏处理
	 */
	export class GuichuWheelEndHandler implements gameabc.IDisposer {

		/**
		 * 转盘组件
		 */
		wheelComp:guichu.GuiChuWheelComp;

		/**
		 * 指针动画
		 */
		itemPointMc:dragonBones.Movie;


		/**
		 * 转盘的中心点位置
		 */
		centerPoint:egret.Point;

		/**
		 * 当前的奖励类型
		 */
		awardType:number = 0;

		/**
		 * 中奖时的图标文件
		 */
		popImgFile:string = "";


		/**
		 * 奖励的金额
		 */
		awardCount:number = 0;

		
		/**
		 * 显示的主级层
		 */
		rootContent:egret.DisplayObjectContainer;

		public constructor() {
			this.internalInit();
		}

		internalInit():void {
			this.rootContent = AppRoot.gameLayer;
			this.wheelComp = (<guichu.GuiChuModule>__GET_MOUDLE_COMP(AppReg.GUICHU)).wheelComp;
			var w:number = this.wheelComp.width;
			var h:number = this.wheelComp.height;
			this.centerPoint = this.wheelComp.localToGlobal(w >> 1,h >> 1);

 			/*this.itemPointMc = */
			gameabc.addMovieGroup("guichu_wheel_db_dbmv", "guichu_wheel_db_tex_png", AppReg.GUICHU_WHEEL_DB);//("guichu_wheel_db_dbmv", "guichu_wheel_db_tex_png", AppReg.GUICHU_WHEEL_DB);
            this.itemPointMc = gameabc.buildMovie("MovieClip", AppReg.GUICHU_WHEEL_DB);
			this.itemPointMc.x = 278;//this.centerPoint.x;
			this.itemPointMc.y = 280;//this.centerPoint.y;
			this.itemPointMc.blendMode = egret.BlendMode.ADD;
			this.itemPointMc.stop();
			this.itemPointMc.touchChildren = this.itemPointMc.touchEnabled = false;
		}
			
		playStartTime: number;
		play():void {
			this.playStartTime = egret.getTimer();
			if(this.itemPointMc) {
				this.wheelComp.wheelAniGroup.addChild(this.itemPointMc);
			}
			this.wheelComp.wheelAniGroup.rotation = 7.5 + this.wheelComp.randRotation - this.wheelComp.wheelCircle.rotation;

			//定义一个泛型函数
			var awarcFunc:(num:number,popFile:string)=>void;
			//奖励时的动画时间
			var awardWaitTime:number = 0;
			var growthGoldTime:number = 0;
			if(this.awardType == AWARD_TYPE.NORMAL_AWARD) {
				awarcFunc = guichu.popAward;
				awardWaitTime = 1500;										//普通中奖时的等待动画时间
				growthGoldTime = 0;
			} 
			else if(this.awardType == AWARD_TYPE.SMALL_AWARD) {
				awarcFunc = guichu.popSmallAward;
				awardWaitTime = 4900;										//中小奖的时候动画等待时间
				growthGoldTime = 1500;
			}
			else if(this.awardType == AWARD_TYPE.BIG_AWARD) {
				awarcFunc = guichu.popBigAward;
				awardWaitTime = 5200;										//中大奖的时候动画等待时间
				growthGoldTime = 1500;
			}

			//主体的节奏控制
			var tween:egret.Tween = egret.Tween.get(this.wheelComp)
				.call(()=>{
					utils.SoundUtils.playEffectSound(utils.SoundUtils.diskStop);
					this.itemPointMc.play("newAnimation",4);				//播放指针动画
				},this)
				.wait(1000)													//等待1秒
				.call(()=>{
					__SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_TABLE_END);
					awarcFunc(this.awardCount,this.popImgFile);				//之后播放中奖动画
				},this)
				.wait(growthGoldTime)
				.call(()=>{
					var index:number = getProxy().zpGamEndVO ? getProxy().zpGamEndVO.card - 1 : -1;
					if(index > -1) {
						GuiChuTableItemComp.instance[index].copyChouma();
					}
				})
				.wait(awardWaitTime - growthGoldTime)						//等待一会儿
				.call(()=>{
					if(this.awardCount > 0) {
						getProxy().playWinChoumaAni();
					} else {
						__SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_PRO_CHANGE);
					}
					this.clear();											//执行清理
					if (this.awardType == AWARD_TYPE.NORMAL_AWARD) __SEND_NOTIFICATION(GuiChuModuleMediator.SHOW_PAIJIANG);
					var playTime = egret.getTimer() - this.playStartTime;
					var downTime:number = Math.floor((guichu.getProxy().zpTable.timeLast - 10000 - playTime) / 1000);
					if(downTime - 2 > 0) {
						showCountdown(downTime * 1000);
					} 
				},this)
		}

		clear():void {
			guichu.closeBigAward();
			guichu.closeSmallAward();
			guichu.closeAward();
			if(this.itemPointMc) {
				this.itemPointMc.removeFromParent();
			}
		}

		dispose():void {
			this.clear();
			this.wheelComp = null;
		}
	}
}