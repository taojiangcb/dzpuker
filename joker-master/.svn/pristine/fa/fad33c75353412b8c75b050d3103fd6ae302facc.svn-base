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

class LoadingUI extends eui.Component {

    textField: eui.Label;
    gameAdviceLbl: eui.Label;
    logoimg: eui.Image;
    // progress_bar:eui.ProgressBar;
    
    public constructor() {
        super();
        // this.skinName = "resource/app_skin/LoadingSkin.exml";
        
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.logoimg = new eui.Image();
        this.logoimg.source = "btn_mainui_logo_png";
        this.logoimg.horizontalCenter = 0;
        this.logoimg.verticalCenter = -30;
        // this.logoimg.scaleX = this.logoimg.scaleY = 2;
        this.addChild(this.logoimg);
        this.textField = new eui.Label();
        this.textField.bold = true;
        this.textField.size = 20;
        this.textField.horizontalCenter = 0;
        this.textField.verticalCenter = 40;
        this.addChild(this.textField);
        
        this.gameAdviceLbl = new eui.Label();
        this.gameAdviceLbl.horizontalCenter = 0;
        this.gameAdviceLbl.bottom = 2;
        this.gameAdviceLbl.alpha = 0.7;
        this.gameAdviceLbl.size = 12;
//        this.gameAdviceLbl.text = gameabc.getMessage("GAME_ADVICE");
        this.gameAdviceLbl.text = "健康游戏忠告: 抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间, 享受健康生活。";
        this.addChild(this.gameAdviceLbl);
        
    }

    public setProgress(current, total):void {

        this.setText("Loading..." + current + "/" + total)

        // if(this.progress_bar) {
        //     this.progress_bar.maximum = total;
        //     this.progress_bar.value = current;
        // }
    }
    public setText(str:string):void{
        if(this.textField) {
            this.textField.text = str ;
        }
    }
    // public addbgimg(): void{
    //     var imgbg: egret.Bitmap = new egret.Bitmap(RES.getRes("s9_bg_main_jpg"));
    //     imgbg.width =1136;
    //     imgbg.height =768;
    //     this.addChildAt(imgbg, 0);
    //     imgbg.alpha = 0.7;
//        var imgdealer: egret.Bitmap = new egret.Bitmap(RES.getRes("s9_bg_main_dealer_png"));
//        imgdealer.x = 275;
//        imgdealer.y = 140;
//        imgdealer.alpha = 0.5;
//        this.addChildAt(imgdealer, 1);
    //     <e:Image  alpha="0.7" source=""/>
	// <e:Image source="s9_bg_main_dealer_png" alpha="0.5" y="140" x="275"/>
    // }
}
