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
    var CreateRenderer = (function (_super) {
        __extends(CreateRenderer, _super);
        function CreateRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "CreateRoomRendererSkin";
            return _this;
        }
        CreateRenderer.prototype.click = function (tag) {
            this.currentState = "down";
        };
        Object.defineProperty(CreateRenderer.prototype, "roomVO", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        CreateRenderer.prototype.dataChanged = function () {
            var sb = FormatUtils.qian(this.roomVO.smallBlinds);
            var bb = FormatUtils.qian(this.roomVO.bigBlinds);
            var bk = FormatUtils.qian(this.roomVO.maxBank);
            this.maxBankLabel1.text = this.maxBankLabel2.text = bk;
            this.blindsLabel.text = "盲注:" + sb + "/" + bb;
            if (this.itemIndex != 1) {
                //(暂时关闭其他房间)
                this.enabled = false;
                this.alpha = .5;
                this.removeButton(this);
                this.blindsLabel.text = "暂未开放";
            }
            else {
                this.enabled = true;
                this.alpha = 1;
                this.addButton(this, false);
            }
            this.setYPosition();
            this.drawCircle();
        };
        CreateRenderer.prototype.setYPosition = function () {
            if (this.itemIndex % 2 == 0) {
                this.bodyGroup.top = 20;
            }
            else {
                this.bodyGroup.bottom = -20;
            }
        };
        CreateRenderer.prototype.drawCircle = function () {
            var shape = new egret.Shape();
            this.bodyGroup.addChildAt(shape, 0);
            var graphics = shape.graphics;
            graphics.beginFill(0x9992bc, 0.2);
            graphics.lineStyle(0, 0x000000);
            graphics.drawCircle(98, 124, 90);
            if (this.itemIndex != 0) {
                var shape1 = new egret.Shape();
                this.addChildAt(shape1, 0);
                var graphics1 = shape1.graphics;
                graphics1.beginFill(0x9992bc, 0.2);
                graphics1.lineStyle(0, 0x000000);
                graphics1.drawCircle(-2.5, 220, 10);
            }
        };
        return CreateRenderer;
    }(uicomps.BaseItemCilckRenderer));
    room.CreateRenderer = CreateRenderer;
    __reflect(CreateRenderer.prototype, "room.CreateRenderer");
})(room || (room = {}));
//# sourceMappingURL=CreateRenderer.js.map