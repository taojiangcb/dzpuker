var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main;
(function (main) {
    var MoreTagMoudle = (function (_super) {
        __extends(MoreTagMoudle, _super);
        function MoreTagMoudle() {
            var _this = _super.call(this) || this;
            _this.right = 0;
            _this.left = 0;
            _this.top = 0;
            _this.bottom = 0;
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            _this.skinName = "MoreTagMoudleSkin";
            return _this;
        }
        MoreTagMoudle.prototype.onComplete = function () {
            this.bindButton(this.backImage, false);
            this.bindButton(this.setButton, false);
            // this.bindButton(this.friendButton, false);
            this.bindButton(this.btnItem, false);
            this.bindButton(this._btn_notice, false);
            /**红点 */
            // var friendSubTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.FRIEND_MOUDLE_SUB);
            // var friendSubTipUI = new tip.CountTipUI(friendSubTipData);
            // friendSubTipUI.x = 180;
            // friendSubTipUI.bottom = 45;
            // this.friendButton.addChild(friendSubTipUI);
            var itemTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.PROP_MOUDLE);
            var itemSubTipUI = new tip.CountTipUI(itemTipData);
            itemSubTipUI.x = 180;
            itemSubTipUI.bottom = 45;
            this.btnItem.addChild(itemSubTipUI);
            this.viewGroup.x = 0;
            this.viewGroup.bottom = 88;
            this.viewGroup.mask = new egret.Rectangle(0, 0, this.viewGroup.width, this.viewGroup.height);
            this.tagGroupMove();
        };
        MoreTagMoudle.prototype.tagGroupMove = function () {
            this.tagGroup.x = 0;
            this.tagGroup.y = this.tagGroup.height;
            egret.Tween.get(this.tagGroup).to({ y: 0 }, 200);
        };
        MoreTagMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            this.removeFromParent(true);
            switch (clickTarget) {
                case this.backImage:
                    break;
                case this.setButton:
                    __OPEN_PRE_MOUDLE(AppReg.APP_SETTING_TYPE);
                    break;
                // case this.friendButton:
                //     __OPEN_PRE_MOUDLE(AppReg.APP_FRIEND_MAIN);
                //     break;
                case this.btnItem:
                    gameabc.LocalSO.setItem("PROP_ITEM_NUM", "0");
                    tip.updateTip(AppConst.COUNT_SUB_TAG.PROP_MOUDLE, 0);
                    __OPEN_PRE_MOUDLE(AppReg.APP_PROP);
                    break;
                case this._btn_notice:
                    var param = new appvos.ParamVO();
                    param.strValues = ["1000"];
                    param.longValues = [0];
                    __SEND_NOTIFICATION(app.NetAction.NOTICE_GET_MANY, param);
                    break;
                default:
                    break;
            }
        };
        return MoreTagMoudle;
    }(gameabc.UICustomComponent));
    main.MoreTagMoudle = MoreTagMoudle;
    __reflect(MoreTagMoudle.prototype, "main.MoreTagMoudle");
})(main || (main = {}));
//# sourceMappingURL=MoreTagMoudle.js.map