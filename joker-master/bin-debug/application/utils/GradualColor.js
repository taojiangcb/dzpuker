var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *	一个色阶工具类，添加若干个颜色形成虚拟渐变色，并通过参数获取渐变过渡中任何点的颜色值。
    * @author huangkan
    *
    */
var GradualColor = (function () {
    function GradualColor() {
        this.colors = [];
        this.allPorwer = 0;
    }
    /** 添加一个颜色 并设定他的占比*/
    GradualColor.prototype.addColor = function (value, power) {
        if (power === void 0) { power = 1; }
        if (this.allPorwer == 0 && power != 0)
            this.addColor(value, 0);
        var color = new ColorValue();
        color.p = this.allPorwer + power;
        // color.a = (value >> 24) & 255;
        color.r = (value >> 16) & 255;
        color.g = (value >> 8) & 255;
        color.b = (value & 0xFF);
        this.colors.push(color);
        this.allPorwer += power;
    };
    /** 输入一个比例值，返回色条上的颜色，最左为0，最右为1 */
    GradualColor.prototype.getColor = function (ratio) {
        if (this.colors.length == 0) {
            return 0xFFFFFF;
        }
        var color;
        if (ratio >= 1) {
            color = this.colors[this.colors.length - 1];
            return (color.r << 16) + (color.g << 8) + color.b;
        }
        else if (ratio <= 0) {
            color = this.colors[0];
            return (color.r << 16) + (color.g << 8) + color.b;
        }
        else {
            var i = this.colors.length - 1;
            while (--i > -1) {
                color = this.colors[i];
                var cr = color.p / this.allPorwer;
                if (ratio > cr)
                    break;
            }
            var targetColor = this.colors[i + 1];
            var colorRatio = color.p / this.allPorwer;
            var targetRatio = targetColor.p / this.allPorwer;
            var gapRatio = (ratio - colorRatio) / (targetRatio - colorRatio);
            // var a:number = (targetColor.a - color.a) * gapRatio + color.a;
            var r = (targetColor.r - color.r) * gapRatio + color.r;
            var g = (targetColor.g - color.g) * gapRatio + color.g;
            var b = (targetColor.b - color.b) * gapRatio + color.b;
            return (r << 16) + (g << 8) + (b);
        }
    };
    return GradualColor;
}());
__reflect(GradualColor.prototype, "GradualColor");
var ColorValue = (function () {
    function ColorValue() {
    }
    return ColorValue;
}());
__reflect(ColorValue.prototype, "ColorValue");
//# sourceMappingURL=GradualColor.js.map