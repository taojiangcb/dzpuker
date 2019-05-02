var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**
     *控制回放
     * @author
     *
     */
    var PlayCardsVideoComp = (function (_super) {
        __extends(PlayCardsVideoComp, _super);
        function PlayCardsVideoComp() {
            var _this = _super.call(this) || this;
            _this.jumpTime = 0; //跳转到时间
            _this.skinName = "PlayCardsVideoSkin";
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            return _this;
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
        PlayCardsVideoComp.prototype.setChildVisable = function (dis, visable, parent) {
            if (dis != null) {
                if (visable) {
                    if (dis.parent == null)
                        parent.addChild(dis);
                }
                else if (dis.parent != null)
                    dis.parent.removeChild(dis);
            }
        };
        PlayCardsVideoComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.replaybtn);
            this.bindButton(this.jubaobtn);
            this.bindButton(this.btnbak);
            this.bindButton(this.playbtn);
            this.bindButton(this.speedbtn);
            this.bindButton(this.btnkai);
            this.bindButton(this.btnfan);
            this.bindButton(this.btnzhuan);
            this.bindButton(this.btnhe);
            if (!true) {
                this.setChildVisable(this.idbtn, false, this);
                this.setChildVisable(this.recordidgrp, false, this);
            }
            else {
                this.bindButton(this.getrecordbtn);
                this.bindButton(this.idbtn);
                this.recordidgrp.visible = false;
            }
        };
        /**开始记录 */
        PlayCardsVideoComp.prototype.startVideo = function (playId) {
            this.nowvideo = new appvos.PlayCardsVideoVO();
            this.nowvideo.roleid = user.getProxy().svrRoleId;
            this.nowvideo.startTime = new Date().getTime();
            this.nowvideo.playId = playId;
            var tablevo = new appvos.TexasTableVO();
            this.nowvideo.tablevo = tablevo;
            tablevo.setData(playcards.getProxy().tableVO.getProtoVO());
        };
        PlayCardsVideoComp.prototype.reset = function (allvo) {
            if (this.nowvideo != null) {
                var tablevo = this.nowvideo.tablevo;
                var len = tablevo.seatPlayerVO.length;
                for (var i = 0; i < len; i++) {
                    var seta = tablevo.seatPlayerVO[i];
                    seta.reset(allvo[seta.seatId] != null);
                }
            }
        };
        /**结束记录 */
        PlayCardsVideoComp.prototype.endVideo = function () {
            if (this.nowvideo != null) {
                this.addAction(new appvos.MessageVO(AppGlobal.getMessageVO("MessageVO").toArrayBuffer()), null);
                this.nowvideo = null;
            }
        };
        /**添加记录 */
        PlayCardsVideoComp.prototype.addAction = function (vo, act, clone) {
            if (clone === void 0) { clone = false; }
            if (this.nowvideo != null) {
                this.nowvideo.setActData(vo, act, new Date().getTime(), clone);
            }
        };
        PlayCardsVideoComp.prototype.touchBindButtonHandler = function (clickTarget) {
            _super.prototype.touchBindButtonHandler.call(this, clickTarget);
            switch (clickTarget) {
                case this.btnbak:
                    playcards.getProxy().outbakfun();
                    break;
                case this.replaybtn:
                    this.replay();
                    break;
                case this.jubaobtn:
                    __OPEN_PRE_MOUDLE(AppReg.APP_FEED, record.getProxy().currentInof);
                    break;
                case this.playbtn:
                    if (this.playbtn.source == "btn_play_bofang_png")
                        this.resume();
                    else
                        this.pause();
                    break;
                case this.speedbtn:
                    if (this.x2img.visible)
                        this.setSpeed(1);
                    else
                        this.setSpeed(2);
                    break;
                case this.btnkai:
                case this.btnfan:
                case this.btnzhuan:
                case this.btnhe:
                    this.junpTo(Number(clickTarget.name));
                    break;
                case this.getrecordbtn:
                    if (this.getrecordid.text) {
                        if (this.radio1.selected)
                            __SEND_NOTIFICATION(app.NetAction.DZ_RECODE_GETVO, this.getrecordid.text);
                        else
                            __SEND_NOTIFICATION(app.NetAction.DZ_FEEDBACK_GETVO, this.getrecordid.text);
                    }
                    break;
                case this.idbtn:
                    this.recordidgrp.visible = !this.recordidgrp.visible;
                    break;
            }
        };
        PlayCardsVideoComp.prototype.advanceTime = function (time) {
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
            if (this.nowaction == null)
                this.stop();
        };
        PlayCardsVideoComp.prototype.sendAction = function () {
            var actions = playcards.getProxy().playvideovo.actions;
            while (this.nowaction != null && this.nowTime >= this.nowaction.sendAt) {
                var nextaction = actions.shift();
                if (nextaction != null && this.nowTime >= nextaction.sendAt && this.jumpTime >= nextaction.sendAt)
                    this.nowaction.seqNum = 1;
                if (this.nowaction.name != null)
                    __SEND_NOTIFICATION(this.nowaction.name, this.nowaction);
                this.nowaction = nextaction;
            }
        };
        /**暂停 */
        PlayCardsVideoComp.prototype.pause = function () {
            egret.Ticker.getInstance().pause();
            this.playbtn.source = "btn_play_bofang_png";
            // var fapaimv = this.view.effect.fapaimv;
            // if (fapaimv.isPlaying) {
            //     egret.sys.$ticker.$stopTick(fapaimv['advanceTime'], fapaimv);
            // }
        };
        /**继续 */
        PlayCardsVideoComp.prototype.resume = function () {
            egret.Ticker.getInstance().resume();
            this.playbtn.source = "btn_play_zhagnting_png";
            // var fapaimv = this.view.effect.fapaimv;
            // if (fapaimv.isPlaying) {
            // 	egret.sys.$ticker.$startTick(fapaimv['advanceTime'], fapaimv);
            // }
        };
        /***开始播放 */
        PlayCardsVideoComp.prototype.play = function () {
            this.visible = true;
            var vo = playcards.getProxy().playvideovo;
            this.nowTime = this.startTime = vo.startTime - 1000;
            this.totalTime = vo.actions[vo.actions.length - 1].sendAt;
            this.timebar.maximum = this.totalTime - this.startTime;
            var left = this.totalTime - this.nowTime;
            // this.timelab.text = DateUtils.formatTime7(left,[":",""],true);
            this.timelab.text = DateUtils.dateFormat(left, "mm:ss");
            this.refTime();
            this.refBtn();
            this.nowaction = vo.actions.shift();
            egret.Ticker.getInstance().register(this.advanceTime, this);
            this.replaybtns.visible = false;
            if (user.getProxy().svrRoleId == null) {
                this.setChildVisable(this.btnbak, false, this);
            }
            if (record.getProxy().currentInof != null) {
                this.setChildVisable(this.jubaobtn, true, this);
                this.setChildVisable(this.playInfoTxt, false, this);
            }
            else {
                this.setChildVisable(this.playInfoTxt, true, this);
                this.playInfoTxt.text = "牌局ID：" + vo.playId + "\n牌局开始时间：" + DateUtils.dateFormat(new Date(vo.startTime), "yyyy-MM-dd hh:mm");
                this.setChildVisable(this.jubaobtn, false, this);
            }
            this.playbtns.visible = true;
            this.resume();
            if (this.jumpTime > 0) {
                this.nowTime = this.jumpTime;
            }
            else
                this.setSpeed(1);
            if (record.getProxy().currentInof) {
                this.recordid.text = record.getProxy().currentInof.id + "";
            }
        };
        PlayCardsVideoComp.prototype.tweenShowBtns = function () {
            this.playbtns.bottom = -100;
            egret.Tween.get(this.playbtns).to({ bottom: 0 }, 300);
        };
        /**刷新阶段按钮 */
        PlayCardsVideoComp.prototype.refBtn = function () {
            var actions = playcards.getProxy().playvideovo.actions;
            this.btnkai.visible = false;
            this.btnfan.visible = false;
            this.btnzhuan.visible = false;
            this.btnhe.visible = false;
            var fa = [this.btnkai, this.btnfan, this.btnzhuan, this.btnhe];
            var actvo;
            var act;
            var netaction = app.NetAction;
            var faindex = 0;
            var btn;
            var px = Number(this.timebar.left);
            var w = AppGlobal.stageFullWidth - px - Number(this.timebar.right);
            var startTime = this.startTime;
            var totalTime = this.totalTime - startTime;
            var fristx = -100;
            for (var i = 0, len = actions.length; i < len; i++) {
                actvo = actions[i];
                act = actvo.name;
                faindex = -1;
                if (act == netaction.MATCH_S_START) {
                    faindex = 0;
                }
                else if (act == netaction.MATCH_S_NEWSTART) {
                    faindex = actvo.data.intValues[0];
                    if (faindex == 0)
                        faindex = -1;
                }
                if (faindex > -1) {
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
        };
        /**刷新进度条 */
        PlayCardsVideoComp.prototype.refTime = function () {
            this.timebar.value = this.nowTime - this.startTime;
        };
        /**播放结束 */
        PlayCardsVideoComp.prototype.playover = function () {
            this.playbtns.visible = false;
            this.replaybtns.visible = true;
        };
        /**设置播放速度 */
        PlayCardsVideoComp.prototype.setSpeed = function (value) {
            if (value == 1) {
                egret.Ticker.getInstance().setTimeScale(1);
                this.x2img.visible = false;
                this.speedlab.source = "img_word_play_1x_png";
            }
            else if (value == 2) {
                egret.Ticker.getInstance().setTimeScale(2);
                this.x2img.visible = true;
                this.speedlab.source = "img_word_play_2x._png";
            }
        };
        /**重播 */
        PlayCardsVideoComp.prototype.replay = function () {
            if (playcards.getProxy().videovo) {
                var videovo = playcards.getProxy().videovo.clone();
                playcards.getProxy().tableVO = videovo.tablevo;
                playcards.getProxy().playvideovo = videovo;
                this.view.refVO();
            }
        };
        /**跳转到时间  */
        PlayCardsVideoComp.prototype.junpTo = function (time) {
            this.view.effectui.removeChildren();
            gameabc.clearAllTimeout();
            egret.Ticker.getInstance()["callBackList"] = [];
            this.view.effect.fapaimv.stopAt(0);
            this.view.hideSafe();
            this.jumpTime = time;
            this.replay();
        };
        /***停止播放 */
        PlayCardsVideoComp.prototype.stop = function () {
            egret.Ticker.getInstance().unregister(this.advanceTime, this);
            egret.Ticker.getInstance().setTimeScale(1);
            egret.Ticker.getInstance().resume();
            this.jumpTime = 0;
        };
        return PlayCardsVideoComp;
    }(gameabc.UICustomComponent));
    playcards.PlayCardsVideoComp = PlayCardsVideoComp;
    __reflect(PlayCardsVideoComp.prototype, "playcards.PlayCardsVideoComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsVideoComp.js.map