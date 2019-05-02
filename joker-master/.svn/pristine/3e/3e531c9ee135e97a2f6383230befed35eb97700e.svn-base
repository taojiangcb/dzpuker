module utils {
    /**
     * 声音控制
     * @author
     *
     */
    export class SoundUtils {
        public constructor() {
        }

        /**用户allin时播放*/
        static allin:string = "allin_";
        /** 跟注时播放*/
        static call:string = "call_";
        /** 过牌时使用*/
        static check:string = "check_";
        /** 弃牌时使用*/
        static fold:string = "fold_";
        /** 加注时使用*/
        static raise:string = "raise_";
        /**下注时和相应语音一起播放 */
        static chip:string = "chip_";
        /** 筹码入底池和发放奖励时伴随筹码飞行时一起播放*/
        static chipfly:string = "chipfly_";
        /**发手牌和公共牌时播放 */
        static fapai:string = "fapai_";
        /**行动时间过半时播放 */
        static halftime:string = "halftime_";
        /**切换用户行动时播放 */
        static kaishixingdong:string = "kaishixingdong_";
        /** 赢方在结算时听到的音效含旁观者*/
        static ying:string = "ying_";
        /**牌局结算时播放 */
        static jiesuantishi:string = "jiesuantishi_";
        /** 公共牌翻牌时播放*/
        static foldpai:string = "foldpai_";
        /** 领取累积登录礼包*/
        static bx_getCoin:string = "bx_getCoin_";
        /** 任务完成领取*/
        static btnSound:string = "btnSound_";
        /** 每日签到*/
        static sign_in:string = "sign_in_";
        /** 主界面背景音效*/
        static game_bgm:string = "game_bgm_";
        /** sng房背景音效*/
        static sng_bg:string = "sng_bg_";
        /** 下注倒计时剩下3s、2s时用*/
        static time_out2:string = "time_out2_";
        /** 下注倒计时剩下1s时用*/
        static time_out1:string = "time_out1_";
        /** 等待倒计时结束后使用*/
        static start:string = "start_";
        /** 下注倒计时结束后使用*/
        static stop:string = "stop_";
        /** 胜利结算时使用*/
        static win:string = "win_";
        /** 猎杀 */
        static hunt_gun:string = "hunt_gun_";
        /** slot背景音乐 */
        static slots_bg: string = "slots_bg_";
        /** slot获奖音乐 */
        static slots_win: string = "slots_win_";
        /** slots转盘效果1 */
        static slots_effect_1: string = "slots_effect_1_";
        /** slots转盘效果2 */
        static slots_effect_2: string = "slots_effect_2_";
        /**按钮音 */
        static button: string = "btnSound_";
        /**九九德州结算时发筹码使用*/
        static coin_fly: string = "coin_fly_"
        /**魅力转盘音效 */
        static meilizhuanpan: string  = "meilizhuanpan_"
        /** GUICHU */
        /** 点击筹码 */
        static chipOut: string = "chip_out_01_";
        /** 押注 */
        static chipSkake: string = "chip_skake_01_";
        /** 转盘加速 */
        static diskUp: string = "disk_up_01_";
        /** 转盘减速 */
        static diskDown: string = "disk_down_01_";
        /** 大奖 */
        static guiChuWin: string = "win_01_";
        static guiChuWin2:string = "win_02_"
        /** 派奖筹码 */
        static chipSend: string = "chip_send_01_";
        /** 重复下注 */
        static chipAll: string = "chip_all_01_";
        /** bg */
        static guichuBg: string = "game_bgm_";

        static guichubg:string = "game_bgm_";

        static gameBgPj: string = "game_bg_paijiang_";

        static gameBgXz: string = "game_bg_xiazhu_";
        
        static guichuDetainBet = "detain_bet_";

        static diskStart: string = "disk_start_";

        static diskStop: string = "disk_stop_";

        static noticeKaijiang: string = "notice_kaijiang_";

        static noticeXiazhu: string = "notice_xiazhu_";

        static awardPop: string = "award_pop_";

        static awardGoldSmall: string = "award_gold_small_";

        static awardGoldBig: string = "award_gold_big_";

        static disk_one_mp3:string = "disk_one_";

        static count_down: string = "count_down_";

        /**文件类型 mp3 ogg */
        static type:string;

        ///========播放背景声音===============
        //在移动设备上不能主动播放声音必须是被动的,比如加一个按钮事件之类的
        private static soundChannel:egret.SoundChannel = null;
        private static nowBgSound:string;
        private static nowposition:number = 0;

        public static volume:number = 1;
        static effect_sound:egret.SoundChannel[] = [];


        /**播放背景音乐 */
        public static playBgSound(type:string, volume = 1):void {
            type += this.type;
            if (setting.getProxy().getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_1) > 0) {
                this.nowBgSound = type;
                this.volume = volume;
                //  if (egret.Capabilities.runtimeType == RuntimeType.NATIVE||egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {                  
                var sound:egret.Sound = RES.getRes(type);
                if (sound) {
                    sound.type = egret.Sound.MUSIC;
                    if (this.soundChannel) this.soundChannel.stop();
                    this.soundChannel = sound.play();
                    this.soundChannel.volume = volume;
                    this.bgTempVoule = volume;
                }
                //  }
            }
        }

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
        public static setPlayBgSoundvolume(value:number):void {
            if (this.soundChannel != null) this.soundChannel.volume = value * this.volume;
        }

        //停止背景音乐
        public static stopBgSound():void {
            if (this.soundChannel) {
                this.nowposition = this.soundChannel.position;
                this.soundChannel.stop();
                this.soundChannel = null;
            }
        }

        private static bgTempVoule:number = 1;
        static minBgSound(duration:number):void {
            egret.Tween.get(this).to({tweenTpVolume:0},duration);
        }

        private static set tweenTpVolume(val:number) {
            this.setPlayBgSoundvolume(this.bgTempVoule)
            this.bgTempVoule = val;
        }

        private static get tweenTpVolume():number {
            return this.bgTempVoule;
        }

        /**播放音效 */
        public static playEffectSound(type:string,playCount:number=1):egret.SoundChannel {
            type += this.type;
            if (this.nowBgSound != type && setting.getProxy().getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_3) > 0) {
                var sound:egret.Sound = RES.getRes(type);
                if (sound) {
                    var soundChannel:egret.SoundChannel = sound.play(0, playCount);
                    SoundUtils.effect_sound.push(soundChannel);
                    soundChannel.addEventListener(egret.Event.SOUND_COMPLETE,this.playComplete,this);
                    return soundChannel;
                }
            }
            return null;
        }

        private static playComplete(event:egret.Event):void {
            var tag:egret.SoundChannel = event.currentTarget;
            var existIndex:number = SoundUtils.effect_sound.indexOf(tag); 
            if(existIndex > -1) {
                var element:egret.SoundChannel =  SoundUtils.effect_sound[existIndex];
                element.removeEventListener(egret.Event.SOUND_COMPLETE,this.playBgSound,this);
                SoundUtils.effect_sound.splice(existIndex);
            }
        }

        /**
         * 关闭清理所有的声音
         */
        static clearAllSound():void {
            SoundUtils.effect_sound.forEach(element => {
                element.removeEventListener(egret.Event.SOUND_COMPLETE,this.playBgSound,this);
                element.stop();
            });
            SoundUtils.effect_sound = [];
            // this.stopBgSound();
        }


        private static isLoad:boolean = false;

        public static loadSound():void {
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
                // if (egret.Capabilities.runtimeType == RuntimeType.NATIVE || egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                //         if(egret.Capabilities.runtimeType == RuntimeType.NATIVE) {
                //             this.type = "mp3";
                //         }
                //         else if(egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                //             this.type = "ogg";
                //         } 
                //         RES.loadGroup("playSound"+this.type,1);
                //         RES.loadGroup("bgSound"+this.type, 1);
                //         RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                //         this.isLoad = true;
                //  }
            }
        }

        private static onResourceLoadComplete(event:RES.ResourceEvent):void {
            if (event.groupName == "bgSound" + this.type) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                // this.playBgSound(this.gameBgPj);
                // if (guichu.getProxy().zpTable){
                //     if (guichu.getProxy().zpTable.gameStatus == guichu.GAME_STATE.GAME_BET) {
                //         SoundUtils.playBgSound(utils.SoundUtils.gameBgXz);
                //     } else if (guichu.getProxy().zpTable.gameStatus == guichu.GAME_STATE.GAME_INIT) {
                //         SoundUtils.playBgSound(utils.SoundUtils.gameBgPj);
                //     }
                // }
            }
        }
    }
}
