module setting {

    export function getProxy():SettingProxy {
        return __GET_PROXY(SettingProxy);
    }

    export class SettingProxy extends app.mvc.AbsractProxy {
        static NAME:string = "__SETTING_PROXY__"


        /** 设置震动 0关 1开*/
        public shcokType:number = -1;

        public playBool:boolean = true;

        /** 客户端即要进入的房间 */
        gameConfigVOS:appvos.GameConfigVO[] = [];

        constructor(name?:string, data?:any) {
            super(SettingProxy.NAME, data);
            this.initDB();
        }

        private initDB():void {

//            this.initialSetting();
        }

        /**
         * 根据功能ID返回value
         * type 1 native 2web
         */
        getGameConfigValue(id:number, type:string = egret.RuntimeType.NATIVE):number {
            if (type == egret.RuntimeType.NATIVE) {
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    return this.gameConfigValue(id);
                } else {
                    return 0;
                }
            } else {
                return this.gameConfigValue(id);
            }
        }

        private gameConfigValue(id:number):number {
            var len:number = this.gameConfigVOS.length;
            while (--len > -1) {
                var infoVO = this.gameConfigVOS[len];
                if (infoVO.gcId == id) {
                    return infoVO.gcValue;
                }
            }
            return 1;
        }

        /** 设置震动 0关 1开*/
        public setShock(type:number):void {
            gameabc.LocalSO.setAllItem(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_2, type.toString())
            this.shock();
        }

        /** 获取震动 0关 1开*/
        public getShock():number {
            return this.getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_2);
        }


        /** PC设置 1背景音乐 2 显示昵称 3游戏音效 4 全屏显示*/
        public setType(type:number, index:number):void {
            var str = AppConst.SETTING_TYPE.GAME_SETTING_TYPE_ + index.toString()
            gameabc.LocalSO.setAllItem(str, type.toString())
            if (index == 1 || type == 3) this.initialSetting();
        }

        /** PC设置 1背景音乐 2 显示昵称 3游戏音效 4 全屏显示*/
        public getSettType(index:number):number {
            var str = AppConst.SETTING_TYPE.GAME_SETTING_TYPE_ + index.toString()
            return this.getSettTypeValue(str);//Number(gameabc.LocalDumpManager.getLocalValue(str));;
        }

        /***获取设置缓存值 默认1*/
        public getSettTypeValue(type:string):number {
            var str = gameabc.LocalSO.getAllItem(type)
            return str == "0" ? 0 : 1;
        }

        ///========播放背景声音===============
        //在移动设备上不能主动播放声音必须是被动的,比如加一个按钮事件之类的
        //     public  soundChannel: egret.SoundChannel = null;
        //     public  playPosition: number = 0;
        //     public  playBgSound(): void {
        //         if(!playcards.getProxy().isPlayCard) {
        //             var str = gameabc.LocalDumpManager.getLocalValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_1)
        //             if(str != "0" || str==null)
        //             {
        //                     var sound: egret.Sound = RES.getRes("sng_bgm_mp3");

        //                     if(egret.Capabilities.runtimeType == RuntimeType.NATIVE) {
        //                         if(sound && this.soundChannel == null) {
        //                             this.soundChannel = sound.play(this.playPosition);
        //                         }
        //                     }
        //             }
        //         }
        //     }

        //     //停止背景音乐
        //     public stopBgSound(): void {
        //         if(this.soundChannel) {
        //             this.playPosition = this.soundChannel.position;
        //             this.soundChannel.stop();
        //             this.soundChannel = null;
        //         }
        //   }
        /**
         *
         * 初始化设置
         *
         */

        public initialSetting():void {
            this.playsetBgSound();
        }

        /**
         * 设置背景音乐
         */
        public playsetBgSound():void {
            if (this.getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_1) == 0) {
                utils.SoundUtils.stopBgSound();
            }
            if(this.getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_3) == 0) {
                utils.SoundUtils.clearAllSound();
            }
            if (guichu.getProxy().zpTable && guichu.getProxy().zpTable.gameStatus == guichu.GAME_STATE.GAME_BET) {
                utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgXz);
            }
        }

        /**
         * 手机震动
         */
        public shock():void {
            if (this.getShock()) {
                utils.NativeUtils.shock();
                // console.log("shock  shock  shock  shock  shock  shock  shock");
                // var msg = {"index": "-1", "time": ["100", "400"]};
                // egret.ExternalInterface.call("startVibrator", JSON.stringify(msg));
            }
            // else console.log("-----------------------------------------------------------");
        }
    }
}

