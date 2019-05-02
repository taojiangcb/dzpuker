var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /**
     * 声音控制
     * @author
     *
     */
    var SoundUtils = (function () {
        function SoundUtils() {
        }
        /**播放背景音乐 */
        SoundUtils.playBgSound = function (type, volume) {
            if (volume === void 0) { volume = 1; }
            type += this.type;
            if (setting.getProxy().getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_1) > 0) {
                this.nowBgSound = type;
                this.volume = volume;
                //  if (egret.Capabilities.runtimeType == RuntimeType.NATIVE||egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {                  
                var sound = RES.getRes(type);
                if (sound) {
                    sound.type = egret.Sound.MUSIC;
                    if (this.soundChannel)
                        this.soundChannel.stop();
                    this.soundChannel = sound.play();
                    this.soundChannel.volume = volume;
                    this.bgTempVoule = volume;
                }
            }
        };
        // /**继续播放背景音乐 */
        // public static goonPlayBgSound(): void {       
        //     if ( setting.getProxy().getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_1) > 0) {                   
        //              var sound: egret.Sound = RES.getRes(this.nowBgSound);
        //             if(sound && this.soundChannel == null) {
        //                 this.soundChannel = sound.play(this.nowposition);
        //        }  
        //     }
        // }
        /**继续播放背景音乐 */
        SoundUtils.setPlayBgSoundvolume = function (value) {
            if (this.soundChannel != null)
                this.soundChannel.volume = value * this.volume;
        };
        //停止背景音乐
        SoundUtils.stopBgSound = function () {
            if (this.soundChannel) {
                this.nowposition = this.soundChannel.position;
                this.soundChannel.stop();
                this.soundChannel = null;
            }
        };
        SoundUtils.minBgSound = function (duration) {
            egret.Tween.get(this).to({ tweenTpVolume: 0 }, duration);
        };
        Object.defineProperty(SoundUtils, "tweenTpVolume", {
            get: function () {
                return this.bgTempVoule;
            },
            set: function (val) {
                this.setPlayBgSoundvolume(this.bgTempVoule);
                this.bgTempVoule = val;
            },
            enumerable: true,
            configurable: true
        });
        /**播放音效 */
        SoundUtils.playEffectSound = function (type, playCount) {
            if (playCount === void 0) { playCount = 1; }
            type += this.type;
            if (this.nowBgSound != type && setting.getProxy().getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_3) > 0) {
                var sound = RES.getRes(type);
                if (sound) {
                    var soundChannel = sound.play(0, playCount);
                    SoundUtils.effect_sound.push(soundChannel);
                    soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.playComplete, this);
                    return soundChannel;
                }
            }
            return null;
        };
        SoundUtils.playComplete = function (event) {
            var tag = event.currentTarget;
            var existIndex = SoundUtils.effect_sound.indexOf(tag);
            if (existIndex > -1) {
                var element = SoundUtils.effect_sound[existIndex];
                element.removeEventListener(egret.Event.SOUND_COMPLETE, this.playBgSound, this);
                SoundUtils.effect_sound.splice(existIndex);
            }
        };
        /**
         * 关闭清理所有的声音
         */
        SoundUtils.clearAllSound = function () {
            var _this = this;
            SoundUtils.effect_sound.forEach(function (element) {
                element.removeEventListener(egret.Event.SOUND_COMPLETE, _this.playBgSound, _this);
                element.stop();
            });
            SoundUtils.effect_sound = [];
            // this.stopBgSound();
        };
        SoundUtils.loadSound = function () {
            if (!this.isLoad) {
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE || egret.Capabilities.isMobile) {
                    this.type = "mp3";
                }
                else {
                    this.type = "ogg";
                }
                RES.loadGroup("playSound" + this.type, -1);
                RES.loadGroup("bgSound" + this.type, -1);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                this.isLoad = true;
            }
        };
        SoundUtils.onResourceLoadComplete = function (event) {
            if (event.groupName == "bgSound" + this.type) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            }
        };
        return SoundUtils;
    }());
    /**用户allin时播放*/
    SoundUtils.allin = "allin_";
    /** 跟注时播放*/
    SoundUtils.call = "call_";
    /** 过牌时使用*/
    SoundUtils.check = "check_";
    /** 弃牌时使用*/
    SoundUtils.fold = "fold_";
    /** 加注时使用*/
    SoundUtils.raise = "raise_";
    /**下注时和相应语音一起播放 */
    SoundUtils.chip = "chip_";
    /** 筹码入底池和发放奖励时伴随筹码飞行时一起播放*/
    SoundUtils.chipfly = "chipfly_";
    /**发手牌和公共牌时播放 */
    SoundUtils.fapai = "fapai_";
    /**行动时间过半时播放 */
    SoundUtils.halftime = "halftime_";
    /**切换用户行动时播放 */
    SoundUtils.kaishixingdong = "kaishixingdong_";
    /** 赢方在结算时听到的音效含旁观者*/
    SoundUtils.ying = "ying_";
    /**牌局结算时播放 */
    SoundUtils.jiesuantishi = "jiesuantishi_";
    /** 公共牌翻牌时播放*/
    SoundUtils.foldpai = "foldpai_";
    /** 领取累积登录礼包*/
    SoundUtils.bx_getCoin = "bx_getCoin_";
    /** 任务完成领取*/
    SoundUtils.btnSound = "btnSound_";
    /** 每日签到*/
    SoundUtils.sign_in = "sign_in_";
    /** 主界面背景音效*/
    SoundUtils.game_bgm = "game_bgm_";
    /** sng房背景音效*/
    SoundUtils.sng_bg = "sng_bg_";
    /** 下注倒计时剩下3s、2s时用*/
    SoundUtils.time_out2 = "time_out2_";
    /** 下注倒计时剩下1s时用*/
    SoundUtils.time_out1 = "time_out1_";
    /** 等待倒计时结束后使用*/
    SoundUtils.start = "start_";
    /** 下注倒计时结束后使用*/
    SoundUtils.stop = "stop_";
    /** 胜利结算时使用*/
    SoundUtils.win = "win_";
    /** 猎杀 */
    SoundUtils.hunt_gun = "hunt_gun_";
    /** slot背景音乐 */
    SoundUtils.slots_bg = "slots_bg_";
    /** slot获奖音乐 */
    SoundUtils.slots_win = "slots_win_";
    /** slots转盘效果1 */
    SoundUtils.slots_effect_1 = "slots_effect_1_";
    /** slots转盘效果2 */
    SoundUtils.slots_effect_2 = "slots_effect_2_";
    /**按钮音 */
    SoundUtils.button = "btnSound_";
    /**九九德州结算时发筹码使用*/
    SoundUtils.coin_fly = "coin_fly_";
    /**魅力转盘音效 */
    SoundUtils.meilizhuanpan = "meilizhuanpan_";
    /** GUICHU */
    /** 点击筹码 */
    SoundUtils.chipOut = "chip_out_01_";
    /** 押注 */
    SoundUtils.chipSkake = "chip_skake_01_";
    /** 转盘加速 */
    SoundUtils.diskUp = "disk_up_01_";
    /** 转盘减速 */
    SoundUtils.diskDown = "disk_down_01_";
    /** 大奖 */
    SoundUtils.guiChuWin = "win_01_";
    SoundUtils.guiChuWin2 = "win_02_";
    /** 派奖筹码 */
    SoundUtils.chipSend = "chip_send_01_";
    /** 重复下注 */
    SoundUtils.chipAll = "chip_all_01_";
    /** bg */
    SoundUtils.guichuBg = "game_bgm_";
    SoundUtils.guichubg = "game_bgm_";
    SoundUtils.gameBgPj = "game_bg_paijiang_";
    SoundUtils.gameBgXz = "game_bg_xiazhu_";
    SoundUtils.guichuDetainBet = "detain_bet_";
    SoundUtils.diskStart = "disk_start_";
    SoundUtils.diskStop = "disk_stop_";
    SoundUtils.noticeKaijiang = "notice_kaijiang_";
    SoundUtils.noticeXiazhu = "notice_xiazhu_";
    SoundUtils.awardPop = "award_pop_";
    SoundUtils.awardGoldSmall = "award_gold_small_";
    SoundUtils.awardGoldBig = "award_gold_big_";
    SoundUtils.disk_one_mp3 = "disk_one_";
    SoundUtils.count_down = "count_down_";
    ///========播放背景声音===============
    //在移动设备上不能主动播放声音必须是被动的,比如加一个按钮事件之类的
    SoundUtils.soundChannel = null;
    SoundUtils.nowposition = 0;
    SoundUtils.volume = 1;
    SoundUtils.effect_sound = [];
    SoundUtils.bgTempVoule = 1;
    SoundUtils.isLoad = false;
    utils.SoundUtils = SoundUtils;
    __reflect(SoundUtils.prototype, "utils.SoundUtils");
})(utils || (utils = {}));
//# sourceMappingURL=SoundUtils.js.map