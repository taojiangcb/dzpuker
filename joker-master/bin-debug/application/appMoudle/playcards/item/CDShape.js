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
     * cd
     * @author
     *
     */
    var CDShape = (function (_super) {
        __extends(CDShape, _super);
        function CDShape() {
            var _this = _super.call(this) || this;
            if (CDShape.linecolor == null) {
                var color = new GradualColor();
                // color.addColor(0x00FF00);//绿
                color.addColor(0xFFFF00, 1); //黄
                color.addColor(0xF55905, 2); //橙色
                color.addColor(0xFF0000, 2); //红
                CDShape.linecolor = color;
            }
            _this.touchEnabled = false;
            return _this;
        }
        CDShape.prototype.resize = function (ismy) {
            if (ismy) {
                this.cdWidth = 99;
                this.cdHeight = 145;
                this.y = -10;
                this.x = 15;
            }
            else {
                this.cdWidth = 82;
                this.cdHeight = 122;
                this.y = 4;
                this.x = 23;
            }
            var radius = this.radius = 8;
            var cdWidth = this.cdWidth;
            var cdHeight = this.cdHeight;
            var hw = cdWidth * 0.5;
            this.lines = [hw - radius, cdHeight - radius - radius, cdWidth - radius - radius, cdHeight - radius - radius, hw - radius];
            this.linepotx = [radius, 0, cdWidth - radius, cdWidth, hw];
            this.linepoty = [0, cdHeight - radius, cdHeight, radius, 0];
            this.arcpotx = [radius, radius, cdWidth - radius, cdWidth - radius];
            this.arcpoty = [radius, cdHeight - radius, cdHeight - radius, radius];
        };
        /**画线 */
        CDShape.prototype.draw = function (angle) {
            if (angle > 1)
                angle = 1;
            this.graphics.clear();
            this.graphics.lineStyle(4, CDShape.linecolor.getColor(angle));
            var hw = this.cdWidth * 0.5;
            var radius = this.radius;
            var total = (this.cdWidth + this.cdWidth + this.cdHeight + this.cdHeight) * (1 - angle);
            this.graphics.moveTo(hw, 0);
            for (var i = 0; i < 4; i++) {
                var lx = this.linepotx[i];
                var ly = this.linepoty[i];
                if (total > this.lines[i]) {
                    this.graphics.lineTo(lx, ly);
                    total -= this.lines[i];
                    total = this.drawArc(this.arcpotx[i], this.arcpoty[i], total, radius, 0.75 - 0.25 * i);
                }
                else
                    break;
            }
            if (total > 0) {
                switch (i) {
                    case 0:
                        lx = hw - total;
                        ly = this.linepoty[i];
                        break;
                    case 1:
                        lx = this.linepotx[i];
                        ly = total + radius;
                        break;
                    case 2:
                        lx = total + radius;
                        ly = this.linepoty[i];
                        break;
                    case 3:
                        lx = this.linepotx[i];
                        ly = this.cdHeight - total - radius;
                        break;
                    case 4:
                        lx = this.cdWidth - total - radius;
                        ly = this.linepoty[i];
                        break;
                }
                this.graphics.lineTo(lx, ly);
            }
        };
        CDShape.prototype.drawArc = function (x, y, total, radius, startAngle) {
            var radius2 = radius + radius;
            var pi2 = Math.PI + Math.PI;
            if (total < radius2) {
                var pec = total / radius2;
                this.graphics.drawArc(x, y, radius, startAngle * pi2, (startAngle - pec * 0.25) * pi2, true);
                return 0;
            }
            else {
                this.graphics.drawArc(x, y, radius, startAngle * pi2, (startAngle - 0.25) * pi2, true);
                return total - radius2;
            }
        };
        return CDShape;
    }(egret.Shape));
    playcards.CDShape = CDShape;
    __reflect(CDShape.prototype, "playcards.CDShape");
})(playcards || (playcards = {}));
//# sourceMappingURL=CDShape.js.map