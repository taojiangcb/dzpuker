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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    // progress_bar:eui.ProgressBar;
    function LoadingUI() {
        var _this = _super.call(this) || this;
        // this.skinName = "resource/app_skin/LoadingSkin.exml";
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.logoimg = new eui.Image();
        _this.logoimg.source = "btn_mainui_logo_png";
        _this.logoimg.horizontalCenter = 0;
        _this.logoimg.verticalCenter = -30;
        // this.logoimg.scaleX = this.logoimg.scaleY = 2;
        _this.addChild(_this.logoimg);
        _this.textField = new eui.Label();
        _this.textField.bold = true;
        _this.textField.size = 20;
        _this.textField.horizontalCenter = 0;
        _this.textField.verticalCenter = 40;
        _this.addChild(_this.textField);
        _this.gameAdviceLbl = new eui.Label();
        _this.gameAdviceLbl.horizontalCenter = 0;
        _this.gameAdviceLbl.bottom = 2;
        _this.gameAdviceLbl.alpha = 0.7;
        _this.gameAdviceLbl.size = 12;
        //        this.gameAdviceLbl.text = gameabc.getMessage("GAME_ADVICE");
        _this.gameAdviceLbl.text = "健康游戏忠告: 抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间, 享受健康生活。";
        _this.addChild(_this.gameAdviceLbl);
        return _this;
    }
    LoadingUI.prototype.setProgress = function (current, total) {
        this.setText("Loading..." + current + "/" + total);
        // if(this.progress_bar) {
        //     this.progress_bar.maximum = total;
        //     this.progress_bar.value = current;
        // }
    };
    LoadingUI.prototype.setText = function (str) {
        if (this.textField) {
            this.textField.text = str;
        }
    };
    return LoadingUI;
}(eui.Component));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map