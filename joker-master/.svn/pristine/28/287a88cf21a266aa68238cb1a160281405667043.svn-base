/**
 * Created by JiangTao on 2016/4/21.
 */
module playcards {

    /**
     * 上局回顾界面
     */
    export class PlayCardReviewWinModule extends app.base.BaseWndUIMoudleComponent {

        public btnClose: eui.Image;
        public reviewList: eui.List;
        public messlab: eui.Label;
        public jubaobtn: eui.Group;
        public scbtn:eui.Group;
        private recordvo: appvos.DZRecordVO;
        constructor() {
            super();
            this.horizontalCenter=0;
            this.verticalCenter=0;
            this.skinName="resource/app_skin/playcards/review/ReviewWndModule.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);

            this.reviewList.itemRenderer = playcards.ReviewItemRenderer;
            this.reviewList.dataProvider = new eui.ArrayCollection(getProxy().allResultVO);
            this.bindButton(this.btnClose);
            this.bindButton(this.jubaobtn);
            this.bindButton(this.scbtn)
            var len: number = this.reviewList.dataProvider.length;
            this.messlab.visible = len == 0;
            for (var i: number = 0; i < len; i++){
                var vo: CardResultVO = this.reviewList.dataProvider.getItemAt(i);
                if (vo.record != null) {
                    this.recordvo = vo.record;
                    break;
                }
            }
            this.scbtn.visible =this.jubaobtn.visible = this.recordvo != null;
           
        }

        touchBindButtonHandler(tag:egret.DisplayObject):void {
            if (tag == this.btnClose) this.close();
            else if (tag == this.jubaobtn) {
                __OPEN_PRE_MOUDLE(AppReg.APP_FEED, [this.recordvo, 1], null, null, this.parent);
            }else if(tag ==this.scbtn)
            {
                record.getProxy().collectionRecord(this.recordvo);
            }
        }

        dispose():void {
            this.unbindButton(this.btnClose);
            super.dispose();
        }
    }
}