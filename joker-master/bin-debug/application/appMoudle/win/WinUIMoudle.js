var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var win;
(function (win) {
    /*** 牌局结束
* @author
*
*/
    var WinUIMoudle = (function (_super) {
        __extends(WinUIMoudle, _super);
        function WinUIMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "WinUIMoudleSkin";
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            return _this;
        }
        WinUIMoudle.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.bindButton(this.pyBtn);
            this.bindButton(this.btnWozhidaole);
            this.bindButton(this.btnXingweifenxi);
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) // 本地运行
            // {
            //     this.pyBtn.visible = true;
            //     this.hyBtn.visible = true;
            // } else {
            //     this.pyBtn.visible = false;
            //     this.hyBtn.visible = false;
            // }
            egret.Tween.get(this.jinbeiLight, { "loop": true }).to({ "rotation": 360 }, 3000);
        };
        WinUIMoudle.prototype.opening = function () {
            this.winTxt.text = FormatUtils.wan(win.getProxy().winNum);
            if (win.getProxy().timeNum) {
                this.timTxt.text = win.getProxy().timeNum + '';
            }
            if (win.getProxy().hand) {
                this.handTxt.text = win.getProxy().hand + '手';
            }
            if (win.getProxy().type > 0) {
                this.typeImg.source = "img_word_win_back" + win.getProxy().type + "_png";
            }
        };
        WinUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnWozhidaole:
                    win.getProxy().cleanData();
                    this.clickBackEvent();
                    break;
                case this.pyBtn:
                    win.getProxy().cleanData();
                    //tip.popSysCenterTip("此功能尚未开放，敬请期待");
                    platform.shardShow("盈利", "先赚1个亿，来边锋德州达成小目标");
                    mc2sdk.event(50104 /* WINUI_SHARE */);
                    this.close();
                    break;
                case this.btnXingweifenxi:
                    this.close();
                    mc2sdk.event(50094 /* RECOR_ANALYSIS */); // 埋点
                    __OPEN_MOUDLE(AppReg.APP_RECORD_ANALYSIS, win.getProxy()._enterData);
                    break;
            }
        };
        Object.defineProperty(WinUIMoudle.prototype, "featherSpace", {
            get: function () {
                return AppRoot.gameLayer.effectLayer;
            },
            enumerable: true,
            configurable: true
        });
        WinUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        WinUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return WinUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    win.WinUIMoudle = WinUIMoudle;
    __reflect(WinUIMoudle.prototype, "win.WinUIMoudle");
})(win || (win = {}));
//# sourceMappingURL=WinUIMoudle.js.map