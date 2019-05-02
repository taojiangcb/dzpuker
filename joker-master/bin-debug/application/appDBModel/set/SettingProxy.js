var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var setting;
(function (setting) {
    function getProxy() {
        return __GET_PROXY(SettingProxy);
    }
    setting.getProxy = getProxy;
    var SettingProxy = (function (_super) {
        __extends(SettingProxy, _super);
        function SettingProxy(name, data) {
            var _this = _super.call(this, SettingProxy.NAME, data) || this;
            /** 设置震动 0关 1开*/
            _this.shcokType = -1;
            _this.playBool = true;
            /** 客户端即要进入的房间 */
            _this.gameConfigVOS = [];
            _this.initDB();
            return _this;
        }
        SettingProxy.prototype.initDB = function () {
            //            this.initialSetting();
        };
        /**
         * 根据功能ID返回value
         * type 1 native 2web
         */
        SettingProxy.prototype.getGameConfigValue = function (id, type) {
            if (type === void 0) { type = egret.RuntimeType.NATIVE; }
            if (type == egret.RuntimeType.NATIVE) {
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    return this.gameConfigValue(id);
                }
                else {
                    return 0;
                }
            }
            else {
                return this.gameConfigValue(id);
            }
        };
        SettingProxy.prototype.gameConfigValue = function (id) {
            var len = this.gameConfigVOS.length;
            while (--len > -1) {
                var infoVO = this.gameConfigVOS[len];
                if (infoVO.gcId == id) {
                    return infoVO.gcValue;
                }
            }
            return 1;
        };
        /** 设置震动 0关 1开*/
        SettingProxy.prototype.setShock = function (type) {
            gameabc.LocalSO.setAllItem(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_2, type.toString());
            this.shock();
        };
        /** 获取震动 0关 1开*/
        SettingProxy.prototype.getShock = function () {
            return this.getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_2);
        };
        /** PC设置 1背景音乐 2 显示昵称 3游戏音效 4 全屏显示*/
        SettingProxy.prototype.setType = function (type, index) {
            var str = AppConst.SETTING_TYPE.GAME_SETTING_TYPE_ + index.toString();
            gameabc.LocalSO.setAllItem(str, type.toString());
            if (index == 1 || type == 3)
                this.initialSetting();
        };
        /** PC设置 1背景音乐 2 显示昵称 3游戏音效 4 全屏显示*/
        SettingProxy.prototype.getSettType = function (index) {
            var str = AppConst.SETTING_TYPE.GAME_SETTING_TYPE_ + index.toString();
            return this.getSettTypeValue(str); //Number(gameabc.LocalDumpManager.getLocalValue(str));;
        };
        /***获取设置缓存值 默认1*/
        SettingProxy.prototype.getSettTypeValue = function (type) {
            var str = gameabc.LocalSO.getAllItem(type);
            return str == "0" ? 0 : 1;
        };
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
        SettingProxy.prototype.initialSetting = function () {
            this.playsetBgSound();
        };
        /**
         * 设置背景音乐
         */
        SettingProxy.prototype.playsetBgSound = function () {
            if (this.getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_1) == 0) {
                utils.SoundUtils.stopBgSound();
            }
            if (this.getSettTypeValue(AppConst.SETTING_TYPE.GAME_SETTING_TYPE_3) == 0) {
                utils.SoundUtils.clearAllSound();
            }
            if (guichu.getProxy().zpTable && guichu.getProxy().zpTable.gameStatus == guichu.GAME_STATE.GAME_BET) {
                utils.SoundUtils.playBgSound(utils.SoundUtils.gameBgXz);
            }
        };
        /**
         * 手机震动
         */
        SettingProxy.prototype.shock = function () {
            if (this.getShock()) {
                utils.NativeUtils.shock();
            }
            // else console.log("-----------------------------------------------------------");
        };
        return SettingProxy;
    }(app.mvc.AbsractProxy));
    SettingProxy.NAME = "__SETTING_PROXY__";
    setting.SettingProxy = SettingProxy;
    __reflect(SettingProxy.prototype, "setting.SettingProxy");
})(setting || (setting = {}));
//# sourceMappingURL=SettingProxy.js.map