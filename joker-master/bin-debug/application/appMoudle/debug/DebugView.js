var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var debug;
    (function (debug) {
        var DebugView = (function (_super) {
            __extends(DebugView, _super);
            function DebugView() {
                var _this = _super.call(this) || this;
                _this.skinName = "DebugSkin";
                _this.registerMediator(debug.DebugMediator);
                _this.bindButton(_this, false);
                _this.touchChildren = false;
                return _this;
            }
            DebugView.prototype.touchBindButtonHandler = function (clickTarget) {
                if (this.outputLabel.x == 0) {
                    this.outputRect.left = this.outputLabel.left = undefined;
                    this.outputRect.right = this.outputLabel.right = 0;
                }
                else {
                    this.outputRect.right = this.outputLabel.right = undefined;
                    this.outputRect.left = this.outputLabel.left = 0;
                }
            };
            return DebugView;
        }(app.base.BaseUIMoudleComponent));
        debug.DebugView = DebugView;
        __reflect(DebugView.prototype, "app.debug.DebugView");
    })(debug = app.debug || (app.debug = {}));
})(app || (app = {}));
//# sourceMappingURL=DebugView.js.map