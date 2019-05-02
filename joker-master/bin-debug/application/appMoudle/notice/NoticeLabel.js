var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var notice;
(function (notice) {
    var NoticeLabel = (function (_super) {
        __extends(NoticeLabel, _super);
        function NoticeLabel() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "resource/app_skin/notice/NoticeLabelSkin.exml";
            _this.setSelect();
            return _this;
        }
        NoticeLabel.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.label.text = this.data.label;
            if (this.data.isSelect === true) {
                this.bg.source = 'btn_notice_type1_png';
                this.poker.visible = true;
                this.label.width = 140;
                this.label.x = 48;
            }
        };
        NoticeLabel.prototype.setSelect = function () {
            if (this.selected === true) {
                this.bg.source = 'btn_notice_type1_png';
                this.poker.visible = true;
                this.label.width = 140;
                this.label.x = 48;
            }
            else {
                this.bg.source = 'btn_notice_type2_png';
                this.poker.visible = false;
                this.label.width = 180;
                this.label.x = 8;
            }
        };
        return NoticeLabel;
    }(uicomps.BaseItemCilckRenderer));
    notice.NoticeLabel = NoticeLabel;
    __reflect(NoticeLabel.prototype, "notice.NoticeLabel");
})(notice || (notice = {}));
//# sourceMappingURL=NoticeLabel.js.map