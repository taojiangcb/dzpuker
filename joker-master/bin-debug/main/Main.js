//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       全年无BUG
*/
/**
 * 这是一个渠道号控制，发使用EGPublish发布工具的时候会替换掉设定的渠道号
 */
var $CHANNEL_ID$ = "90027";
var $DEFAULT_RES$ = "default.res.json";
var $DEFAULT_THM$ = "default.thm.json";
var $RUNTIME_VER$ = "1.0.0";
var $WEB_VER$ = "1.0.0";
var $GAME_ID$ = 3;
var GAME_IDS;
(function (GAME_IDS) {
    GAME_IDS[GAME_IDS["DEFAULT"] = 0] = "DEFAULT";
    GAME_IDS[GAME_IDS["GUICHU_WHEEL"] = 1] = "GUICHU_WHEEL";
    GAME_IDS[GAME_IDS["BF_GUICHU_WHEEL"] = 2] = "BF_GUICHU_WHEEL";
    GAME_IDS[GAME_IDS["JOKER"] = 3] = "JOKER"; //捷克高手
})(GAME_IDS || (GAME_IDS = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        /**
         * 当前的启动流程代理处理
         */
        _this.appDelegate = _this.generateDelegate();
        //渠道ID默认
        platform.CHANNE_ID = $CHANNEL_ID$;
        //游戏运行的版本号
        AppConst.RUNTIME_VER = egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE
            ? $RUNTIME_VER$
            : $WEB_VER$;
        AppRoot.gameLayer.setFullScreen(); //游戏中的主场景
        utils.NativeUtils.init(); //初始化sendToJs
        platform.init(); //初始化魔方统计，并向魔方发送激活数据
        platform.initCfg(); //初始化渠道配置
        /**
         * 初始化有猫腻sdk
         */
        _this.appDelegate.initYouMaoNiSdk();
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            mc2sdk.init();
            mc2sdk.event(59001 /* ON_LOIGN_STEP_1 */);
        }
        //本地os前缀
        gameabc.LocalSO.PREFIX = platform.CHANNE_ID;
        return _this;
    }
    Main.prototype.generateDelegate = function () {
        if ($GAME_ID$ == GAME_IDS.GUICHU_WHEEL)
            return new app.GuichuMainDelegate();
        else if ($GAME_ID$ == GAME_IDS.BF_GUICHU_WHEEL)
            return new app.BF_GuiChuMainDelegate();
        else if ($GAME_ID$ == GAME_IDS.JOKER)
            return new app.JokerMainDelegate();
        else
            return new app.AppDelegate();
    };
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addChild(AppRoot.gameLayer);
        this.appDelegate.appLanuch();
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            window.onresize = function () {
                AppRoot.gameLayer.setFullScreen();
            };
        }
        else if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, function () {
                AppRoot.gameLayer.setFullScreen();
            }, this);
        }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map