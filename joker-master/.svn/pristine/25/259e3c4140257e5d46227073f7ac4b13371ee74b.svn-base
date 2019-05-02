module main {
    export class MoreTagMoudle extends gameabc.UICustomComponent {
        private backImage: eui.Rect;
        private viewGroup: eui.Group;
        private tagGroup: eui.Group;
        private setButton: eui.Group;
        private friendButton: eui.Group;
        private _btn_notice:eui.Group;  // 公告按钮
        btnItem:eui.Group;

        public constructor() {
            super();
            this.right = 0;
            this.left = 0;
            this.top = 0;
            this.bottom = 0;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
            this.skinName = "MoreTagMoudleSkin";
        }
        onComplete() {
            this.bindButton(this.backImage, false);
            this.bindButton(this.setButton, false);
            // this.bindButton(this.friendButton, false);
            this.bindButton(this.btnItem, false);
            this.bindButton(this._btn_notice,false);

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
            this.viewGroup.mask = new egret.Rectangle(0,0,this.viewGroup.width,this.viewGroup.height);
            this.tagGroupMove();
        }
        tagGroupMove() {
            this.tagGroup.x = 0;
            this.tagGroup.y = this.tagGroup.height;
            egret.Tween.get(this.tagGroup).to({y: 0}, 200);
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
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
                    gameabc.LocalSO.setItem("PROP_ITEM_NUM","0");
                    tip.updateTip(AppConst.COUNT_SUB_TAG.PROP_MOUDLE,0);
                    __OPEN_PRE_MOUDLE(AppReg.APP_PROP);
                    break;
                case this._btn_notice:
                    var param = new appvos.ParamVO();
                    param.strValues = ["1000"];
                    param.longValues = [0];
                    __SEND_NOTIFICATION(app.NetAction.NOTICE_GET_MANY,param);
                    break;
                default:
                    break;
            }
        }
    }
}