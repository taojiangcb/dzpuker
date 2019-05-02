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
     *等待其他玩家
     * @author
     *
     */
    var WaitComp = (function (_super) {
        __extends(WaitComp, _super);
        function WaitComp() {
            var _this = _super.call(this) || this;
            // this.x = 515;
            // this.y = 310;
            _this.skinName = "PlaycardsWaitCompSkin";
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStageHandler, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeStageHandler, _this);
            _this.once(eui.UIEvent.CREATION_COMPLETE, _this.createComplete, _this);
            return _this;
        }
        WaitComp.prototype.createComplete = function () {
            this.wordlb.visible = false;
            this.friendimg.visible = false;
            this.friendimg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInvite, this);
            gameabc.BindleButtonUtils.bindClickByTarget(this.friendimg);
            this.fenxiangimg.visible = false;
            this.fenxiangimg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFenxiang, this);
            gameabc.BindleButtonUtils.bindClickByTarget(this.fenxiangimg);
        };
        WaitComp.prototype.addStageHandler = function () {
            // if (this.puker_img == null) {
            // 	this.puker_img = new  eui.Image();
            // 	this.puker_img.source ="icon_play_ddkjzcm_png" ;
            // 	this.addChild(this.puker_img);
            // 	this.puker_img.anchorOffsetX = 28;
            // 	this.puker_img.anchorOffsetY = 28;
            // 	this.puker_img.x = 54;
            // 	this.puker_img.y = 20;	
            // 	var img: eui.Image = new eui.Image();
            // 	img.source = "icon_play_ddkjdhh_png";
            // 	img.anchorOffsetX = 28;
            //     img.anchorOffsetY = 28;
            // 	img.x = 54;
            //  	img.y = 20;
            //     this.addChild(img);
            // 	this.wordimg = new eui.Image();				
            //  	this.wordimg.source = "img_word_win_dengdaikaijuzhong_0_png";
            // 	 this.wordimg.x = 0;
            //  	this.wordimg.y = 60;
            //  	this.addChild(this.wordimg);
            // 	 this.wordlb = new eui.Label();
            // 	 this.wordlb.y = 55;
            // 	 this.wordlb.visible = false;
            // 	 this.addChild(this.wordlb);
            // 		this.friendimg = new eui.Image();
            // 		this.friendimg.source = "btn_friend_yqhy_png";
            // 		// this.friendimg.horizontalCenter = 300;
            // 		// this.friendimg.verticalCenter = -20;
            // 		this.friendimg.x = 160;
            // 		this.friendimg.y = -20;
            // 		this.addChild(this.friendimg);
            // 	 this.friendimg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInvite, this);
            // }
            if (user.getProxy().currentRoom != null && user.getProxy().currentRoom.type == 3 /* VIP */ && playcards.getProxy().joinNumber != null &&
                playcards.getProxy().joinNumber != "-1") {
                this.friendimg.visible = true;
                this.fenxiangimg.visible = (egret.Capabilities.os == "Android" || egret.Capabilities.os == "IOS") ? true : false;
            }
            else {
                this.friendimg.visible = false;
                this.fenxiangimg.visible = false;
            }
            this.time = 0;
            egret.Ticker.getInstance().register(this.advanceTime, this);
        };
        WaitComp.prototype.changeImg = function () {
            this.wordimg.source = "img_word_win_dengdaikaijuzhong_" + this.messType + "_png";
            // switch (this.messType) {
            // 	case 0://宽度108
            // 		this.wordimg.x = 0;	
            // 		break;
            // 	case 1://宽度168
            // 		this.wordimg.x = -30;	
            // 		break;
            // 	case 2://299
            // 		this.wordimg.x = -95;		
            // 		break;
            // 	case 3://113
            // 		this.wordimg.x = -2;		
            // 		break;
            // 	case 4://	204
            // 		this.wordimg.x = -48;	
            // 		break;	
            // }
            this.wordlb.visible = false;
        };
        WaitComp.prototype.setSng = function (label) {
            this.wordimg.source = "img_word_play_xyjmzjts_png";
            // this.wordimg.x = -96;
            // this.wordlb.x = 40;
            this.wordlb.text = String(label);
            this.wordlb.visible = true;
        };
        WaitComp.prototype.showType = function (messType) {
            this.messType = messType;
            if (this.wordimg != null) {
                this.changeImg();
            }
        };
        WaitComp.prototype.removeStageHandler = function () {
            egret.Ticker.getInstance().unregister(this.advanceTime, this);
        };
        WaitComp.prototype.advanceTime = function (time) {
            this.time += time / 5;
            this.puker_img.rotation = this.time;
            if (room.getProxy().current && room.getProxy().isNormal && this.time > 6000) {
                this.time -= 6000;
                __PVO().to(app.NetAction.MATCH_HEART_BEAT);
            }
        };
        WaitComp.prototype.onInvite = function () {
            __OPEN_MOUDLE(AppReg.APP_FRIEND_INVITE);
        };
        WaitComp.prototype.onFenxiang = function () {
            platform.shardShow("邀请游戏外好友", "高大上的扑克游戏，邀您一起来装bility");
            mc2sdk.event(50101 /* SHARE_PRIVATE_ROOM */);
        };
        return WaitComp;
    }(eui.Component));
    playcards.WaitComp = WaitComp;
    __reflect(WaitComp.prototype, "playcards.WaitComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=WaitComp.js.map