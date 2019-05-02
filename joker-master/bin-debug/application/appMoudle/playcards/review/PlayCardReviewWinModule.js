var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/21.
 */
var playcards;
(function (playcards) {
    /**
     * 上局回顾界面
     */
    var PlayCardReviewWinModule = (function (_super) {
        __extends(PlayCardReviewWinModule, _super);
        function PlayCardReviewWinModule() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.skinName = "resource/app_skin/playcards/review/ReviewWndModule.exml";
            return _this;
        }
        PlayCardReviewWinModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.reviewList.itemRenderer = playcards.ReviewItemRenderer;
            this.reviewList.dataProvider = new eui.ArrayCollection(playcards.getProxy().allResultVO);
            this.bindButton(this.btnClose);
            this.bindButton(this.jubaobtn);
            this.bindButton(this.scbtn);
            var len = this.reviewList.dataProvider.length;
            this.messlab.visible = len == 0;
            for (var i = 0; i < len; i++) {
                var vo = this.reviewList.dataProvider.getItemAt(i);
                if (vo.record != null) {
                    this.recordvo = vo.record;
                    break;
                }
            }
            this.scbtn.visible = this.jubaobtn.visible = this.recordvo != null;
        };
        PlayCardReviewWinModule.prototype.touchBindButtonHandler = function (tag) {
            if (tag == this.btnClose)
                this.close();
            else if (tag == this.jubaobtn) {
                __OPEN_PRE_MOUDLE(AppReg.APP_FEED, [this.recordvo, 1], null, null, this.parent);
            }
            else if (tag == this.scbtn) {
                record.getProxy().collectionRecord(this.recordvo);
            }
        };
        PlayCardReviewWinModule.prototype.dispose = function () {
            this.unbindButton(this.btnClose);
            _super.prototype.dispose.call(this);
        };
        return PlayCardReviewWinModule;
    }(app.base.BaseWndUIMoudleComponent));
    playcards.PlayCardReviewWinModule = PlayCardReviewWinModule;
    __reflect(PlayCardReviewWinModule.prototype, "playcards.PlayCardReviewWinModule");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardReviewWinModule.js.map