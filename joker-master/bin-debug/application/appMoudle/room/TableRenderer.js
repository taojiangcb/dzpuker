var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    /**
     *
     * @author
     *
     */
    var TableRenderer = (function (_super) {
        __extends(TableRenderer, _super);
        function TableRenderer() {
            var _this = _super.call(this) || this;
            _this.touchChildren = false;
            _this.touchEnabled = true;
            _this.skinName = "TableItemSkin";
            _this.antiImage.visible = false;
            _this.antiLabel.visible = false;
            _this.addButton(_this.bgImage);
            var len = _this.numChildren;
            for (var i = 0; i < len; ++i) {
                var dpo = _this.getChildAt(i);
                dpo.touchEnabled = dpo == _this.bgImage;
            }
            return _this;
        }
        Object.defineProperty(TableRenderer.prototype, "roomVO", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        TableRenderer.prototype.setBgType = function (index) {
            switch (index) {
                case 0:
                    this.bgImage.source = "icon_chouma4_png";
                    return;
                case 1:
                    this.bgImage.source = "icon_chouma5_png";
                    return;
                case 2:
                case 3:
                case 4:
                case 5:
                    this.bgImage.source = "icon_chouma3_png";
                    return;
            }
        };
        TableRenderer.prototype.dataChanged = function () {
            if (this.roomVO == null)
                return;
            var max = FormatUtils.qian(this.roomVO.maxBank);
            this.maxBankLabel.text = this.maxBankLabelBlack.text = max;
            var sb = FormatUtils.qian(this.roomVO.smallBlinds);
            var bb = FormatUtils.qian(this.roomVO.bigBlinds);
            this.blindsLabel.text = "盲注:" + sb + "/" + bb;
            this.numPlayersLabel.text = "" + this.roomVO.online;
            if (this.roomVO.isFast || this.roomVO.isInsurance) {
                var imageStr = "";
                if (this.roomVO.isFast && this.roomVO.isInsurance)
                    imageStr = "icon_jisu_baoxian_room_png";
                else if (this.roomVO.isFast)
                    imageStr = "icon_jisu_room_png";
                else if (this.roomVO.isInsurance)
                    imageStr = "icon_baoxian_room_png";
                this.fastImg.source = imageStr;
                this.fastImg.visible = true;
            }
            else
                this.fastImg.visible = false;
            if (this.roomVO.anti > 0) {
                this.antiImage.visible = true;
                this.antiLabel.visible = true;
                var at = FormatUtils.qian(this.roomVO.anti);
                this.antiLabel.text = at + "必下";
            }
            else {
                this.antiImage.visible = false;
                this.antiLabel.visible = false;
            }
        };
        TableRenderer.prototype.click = function (tag) {
        };
        return TableRenderer;
    }(uicomps.BaseItemCilckRenderer));
    room.TableRenderer = TableRenderer;
    __reflect(TableRenderer.prototype, "room.TableRenderer");
})(room || (room = {}));
//# sourceMappingURL=TableRenderer.js.map