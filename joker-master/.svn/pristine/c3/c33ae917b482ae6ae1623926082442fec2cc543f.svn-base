module playcards {
	/**
	 *控制回放
	 * @author 
	 *
	 */
	export class PlayCardsVideoComp extends gameabc.UICustomComponent{
        public view: PlayCardsUIMoudleComp;
		public nowvideo: appvos.PlayCardsVideoVO;//当前记录的录像
		private nowaction: appvos.MessageVO;
		private nowTime: number;//当前播放时间
		private startTime: number;//开始时间
		private totalTime: number;//结束时间
		public playbtns: eui.Group;
		public replaybtns:eui.Group;
		public replaybtn: eui.Image;//重播按钮
        public jubaobtn: eui.Group;//举报按钮
		public btnbak: eui.Image;//返回按钮
		public playbtn:eui.Image;//开始按钮
		public speedbtn:eui.Group;//速度按钮
		public speedlab: eui.Image;//速度文字
		public btnkai: eui.Group;//开局按钮
		public btnfan: eui.Group;//翻牌按钮
		public btnzhuan: eui.Group;//转牌按钮
		public btnhe:eui.Group;//和牌按钮
		public x1img:eui.Image;
		public x2img:eui.Image;
		public timebar:eui.ProgressBar;//时间条
		public timelab: eui.Label;//显示时间
		private jumpTime: number=0;//跳转到时间
		public recordidgrp:eui.Group;
		public recordid:eui.TextInput;
		public getrecordid:eui.TextInput;
		public getrecordbtn:eui.Group;
		public radio1: eui.RadioButton;
		public radio2: eui.RadioButton;
		public idbtn:eui.Group;
        public playInfoTxt:eui.Label; // 显示举报信息
        public constructor() {
			super();
			this.skinName = "PlayCardsVideoSkin";
            this.percentWidth = 100;
            this.percentHeight = 100;
            // this.view = view;
			// if (DEBUG) {
			// 	var that = this;
			// 	if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
			// 		 document.addEventListener("keydown", function (evt) {
			// 			if (that.parent != null) {
			// 				if (evt.keyCode == 39) {//→ 下一帧
			// 					var ticker = egret.Ticker.getInstance();								
			// 					if (ticker["_paused"])
			// 						ticker["_paused"] = false;
			// 						ticker["update"](ticker["_lastTime"] + (1000 / 24))	
			// 						ticker["_paused"] = true;
			// 				} else if (evt.keyCode == 70){//f
			// 					that.recordidgrp.visible = !that.recordidgrp.visible;
			// 				}
			// 			}
			// 		})
			// 	 }
			// }
		}
		public setChildVisable(dis: egret.DisplayObject,visable: boolean,parent:egret.DisplayObjectContainer): void {
            if(dis!=null){
                if(visable) {
                    if (dis.parent == null)
                       parent.addChild(dis);
                } else if(dis.parent != null)
                    dis.parent.removeChild(dis);
            }       
        }
		public createComplete(event: egret.Event): void {
             super.createComplete(event);
			 this.bindButton(this.replaybtn);
			 this.bindButton(this.jubaobtn);
			 this.bindButton(this.btnbak);
			 this.bindButton(this.playbtn);
			 this.bindButton(this.speedbtn);
			 this.bindButton(this.btnkai);
			 this.bindButton(this.btnfan);
			 this.bindButton(this.btnzhuan);
			 this.bindButton(this.btnhe);
			
			 if (!DEBUG) {
				 this.setChildVisable(this.idbtn, false, this);
				 this.setChildVisable(this.recordidgrp, false, this);
			 } else {
				  this.bindButton(this.getrecordbtn);
				  this.bindButton(this.idbtn);
				  this.recordidgrp.visible = false;
			}
		}

		/**开始记录 */
		public startVideo(playId:number): void{
			this.nowvideo = new  appvos.PlayCardsVideoVO();
			this.nowvideo.roleid = user.getProxy().svrRoleId;
			this.nowvideo.startTime = new Date().getTime();
			this.nowvideo.playId = playId;
			var tablevo = new appvos.TexasTableVO()
			this.nowvideo.tablevo = tablevo;
			tablevo.setData(getProxy().tableVO.getProtoVO());
		}
		public reset(allvo: Object): void{
			if (this.nowvideo != null) {
				var tablevo = this.nowvideo.tablevo;
				var len = tablevo.seatPlayerVO.length;
				for (var i: number = 0; i < len; i++){
					var seta = tablevo.seatPlayerVO[i]
					seta.reset(allvo[seta.seatId]!=null);
				}
			}	
		}
		/**结束记录 */
		public endVideo(): void{
			if (this.nowvideo != null) {
				this.addAction(new appvos.MessageVO(AppGlobal.getMessageVO("MessageVO").toArrayBuffer()),null)
				this.nowvideo = null
			}
				
		}
		
		/**添加记录 */
		public addAction(vo:appvos.MessageVO, act:string,clone:boolean=false): void{
			if (this.nowvideo != null) {
				this.nowvideo.setActData(vo, act, new Date().getTime(),clone); 
			}
		}
		protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
			super.touchBindButtonHandler(clickTarget);
			switch (clickTarget) {
				case this.btnbak:				
					getProxy().outbakfun();
					break;	
  				case this.replaybtn://重播
                    this.replay();
                    break;
                 case this.jubaobtn://举报
                    __OPEN_PRE_MOUDLE(AppReg.APP_FEED,record.getProxy().currentInof);
					break;
				 case this.playbtn://暂停 继续
					if (this.playbtn.source == "btn_play_bofang_png")
						this.resume();
					else this.pause();
					 break;	
				 case this.speedbtn://速度
					if (this.x2img.visible)
						this.setSpeed(1);
					else this.setSpeed(2);
					break;
				 case this.btnkai:
				 case this.btnfan:
				 case this.btnzhuan:
				 case this.btnhe:
					this.junpTo(Number(clickTarget.name))
					break;	
				 case this.getrecordbtn:
					if (this.getrecordid.text) {
						if(this.radio1.selected)
							__SEND_NOTIFICATION(app.NetAction.DZ_RECODE_GETVO, this.getrecordid.text);
						else 
						__SEND_NOTIFICATION(app.NetAction.DZ_FEEDBACK_GETVO, this.getrecordid.text);
					}
					break;	
				 case this.idbtn:
					this.recordidgrp.visible = !this.recordidgrp.visible;
					 break;	
			}
		}
		public advanceTime(time: number) {
            this.nowTime += time;
			this.refTime();
			// if (this.nowaction != null) {
			// 	if (this.nowTime >= this.nowaction.sendAt) {
			// 		if(this.nowaction.name!=null)
			// 			__SEND_NOTIFICATION(this.nowaction.name,this.nowaction);
			// 		this.nowaction =  getProxy().playvideovo.actions.shift();
			// 	}
			// } else
			this.sendAction();
			if(this.nowaction==null)
				this.stop();
		}
		private sendAction(): void{
			var actions = getProxy().playvideovo.actions;
			while (this.nowaction != null && this.nowTime >= this.nowaction.sendAt) {
				var nextaction = actions.shift();
				if (nextaction != null && this.nowTime >= nextaction.sendAt&&this.jumpTime>= nextaction.sendAt)
					this.nowaction.seqNum = 1;
				if(this.nowaction.name!=null)
						__SEND_NOTIFICATION(this.nowaction.name,this.nowaction);
				this.nowaction =  nextaction;
			}
		}
		/**暂停 */
		public pause(): void{
			egret.Ticker.getInstance().pause();
			this.playbtn.source = "btn_play_bofang_png";
			// var fapaimv = this.view.effect.fapaimv;
			// if (fapaimv.isPlaying) {
			//     egret.sys.$ticker.$stopTick(fapaimv['advanceTime'], fapaimv);
            // }
		}
		/**继续 */
		public resume(): void{
			egret.Ticker.getInstance().resume();
			this.playbtn.source = "btn_play_zhagnting_png";
			// var fapaimv = this.view.effect.fapaimv;
			// if (fapaimv.isPlaying) {
			// 	egret.sys.$ticker.$startTick(fapaimv['advanceTime'], fapaimv);
            // }
		}
		/***开始播放 */
		public play(): void {	
			this.visible = true;
			var vo = getProxy().playvideovo;
			this.nowTime = this.startTime = vo.startTime - 1000;			
			this.totalTime = vo.actions[vo.actions.length - 1].sendAt;			
			this.timebar.maximum = this.totalTime - this.startTime;
			var left: number = this.totalTime - this.nowTime;
			// this.timelab.text = DateUtils.formatTime7(left,[":",""],true);
			this.timelab.text = DateUtils.dateFormat(left,"mm:ss");
			this.refTime();
			this.refBtn();
			this.nowaction = vo.actions.shift();
			egret.Ticker.getInstance().register(this.advanceTime, this);
			this.replaybtns.visible = false;
			 if (user.getProxy().svrRoleId == null) {
                this.setChildVisable(this.btnbak,false,this);
			}
             if(record.getProxy().currentInof != null) {
                 this.setChildVisable(this.jubaobtn,true,this);
                 this.setChildVisable(this.playInfoTxt,false,this);
                 
			} else {
                 this.setChildVisable(this.playInfoTxt,true,this);
                 this.playInfoTxt.text = "牌局ID：" + vo.playId + "\n牌局开始时间：" + DateUtils.dateFormat(new Date(vo.startTime),"yyyy-MM-dd hh:mm");
                 this.setChildVisable(this.jubaobtn,false,this);
			}
			 
			 this.playbtns.visible = true;
			 this.resume();
			if (this.jumpTime > 0) {
				this.nowTime = this.jumpTime;
			 } else this.setSpeed(1);
			if (record.getProxy().currentInof){
				this.recordid.text = record.getProxy().currentInof.id+"";
			}
		}
		public tweenShowBtns(): void{
			this.playbtns.bottom = -100;
			 egret.Tween.get(this.playbtns).to({ bottom: 0 },300);
		}
		/**刷新阶段按钮 */
        private refBtn(): void{
			var actions = getProxy().playvideovo.actions;
			this.btnkai.visible = false;
			this.btnfan.visible = false;
			this.btnzhuan.visible = false;
			this.btnhe.visible = false;
			var fa:eui.Group[] = [this.btnkai,this.btnfan,this.btnzhuan,this.btnhe]
			var actvo: appvos.MessageVO;
			var act: string;
			var netaction = app.NetAction;
			var faindex: number = 0;
			var btn: eui.Group;
			var px: number =Number(this.timebar.left) ;
			var w: number = AppGlobal.stageFullWidth-px- Number(this.timebar.right);
			var startTime = this.startTime
			var totalTime = this.totalTime - startTime;
			var fristx: number = -100;
			for (var i: number = 0, len: number = actions.length; i < len; i++){
				actvo = actions[i];
				act = actvo.name;
				faindex = -1;
				if (act == netaction.MATCH_S_START) {
					faindex = 0;
				} else if (act == netaction.MATCH_S_NEWSTART) {
					faindex = actvo.data.intValues[0];
					if (faindex == 0)faindex = -1;	
				}
				if (faindex >-1) {//发牌  新一圈开始
					btn = fa[faindex];	
					if (btn) {
						btn.name = actvo.sendAt + "";
						btn.x = px + w * (actvo.sendAt - startTime) / totalTime;
						if (btn.x - fristx > 70) {
							btn.visible = true;
							fristx = btn.x;
						}
					}
				} 
			}
		}
		/**刷新进度条 */
		private refTime():void{
			this.timebar.value = this.nowTime - this.startTime;			
		}
		/**播放结束 */
		public playover(): void{
			this.playbtns.visible = false;
			this.replaybtns.visible = true;
		}
		/**设置播放速度 */
		public setSpeed(value:number): void{
			if (value == 1) {
				egret.Ticker.getInstance().setTimeScale(1);
				this.x2img.visible = false;
				this.speedlab.source = "img_word_play_1x_png";
			} else if (value == 2){
				egret.Ticker.getInstance().setTimeScale(2);
				this.x2img.visible = true;
				this.speedlab.source = "img_word_play_2x._png";
			}
		}
		/**重播 */
		public replay(): void{
			if (playcards.getProxy().videovo) {
				 var videovo = playcards.getProxy().videovo.clone();
				playcards.getProxy().tableVO = videovo.tablevo;
				playcards.getProxy().playvideovo = videovo;
				this.view.refVO();
			}
		}
		/**跳转到时间  */		
		public junpTo(time:number): void{
			this.view.effectui.removeChildren();
			gameabc.clearAllTimeout();
			egret.Ticker.getInstance()["callBackList"] = [];
			this.view.effect.fapaimv.stopAt(0);
			this.view.hideSafe();
			this.jumpTime = time;
			this.replay();
		}
		/***停止播放 */
		public stop(): void{
			egret.Ticker.getInstance().unregister(this.advanceTime, this);
			egret.Ticker.getInstance().setTimeScale(1);
			egret.Ticker.getInstance().resume();
			this.jumpTime = 0;
		}
	}
}
