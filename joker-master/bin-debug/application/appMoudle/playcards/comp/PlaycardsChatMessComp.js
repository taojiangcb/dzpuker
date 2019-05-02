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
    var PlaycardsChatMessComp = (function (_super) {
        __extends(PlaycardsChatMessComp, _super);
        function PlaycardsChatMessComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlaycardsChatMessSkin";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
        }
        PlaycardsChatMessComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.bgimage);
            this.bindButton(this.sendbtn);
        };
        PlaycardsChatMessComp.prototype.touchBindButtonHandler = function (clickTarget) {
            if (this.bgimage == clickTarget) {
                this.close();
            }
            else if (this.sendbtn == clickTarget) {
                if (this.messinput.text.length > 0) {
                    playcards.getProxy().sendChat(this.messinput.text, user.getProxy().svrNumId, -3, 600);
                    this.messinput.text = "";
                }
                else
                    tip.popSysBottomTip("请输入发送文字");
            }
        };
        PlaycardsChatMessComp.prototype.refText = function (messTextFlow) {
            this.messlab.textFlow = messTextFlow;
            if (this.textScroller.viewport.contentHeight > this.textScroller.height)
                this.textScroller.viewport.scrollV = this.textScroller.viewport.contentHeight - this.textScroller.height;
        };
        return PlaycardsChatMessComp;
    }(playcards.PlaycardsUIComp));
    playcards.PlaycardsChatMessComp = PlaycardsChatMessComp;
    __reflect(PlaycardsChatMessComp.prototype, "playcards.PlaycardsChatMessComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardsChatMessComp.js.map