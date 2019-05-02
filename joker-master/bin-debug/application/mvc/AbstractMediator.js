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
    var mvc;
    (function (mvc) {
        /**
         * @author
         */
        var AbstractMediator = (function (_super) {
            __extends(AbstractMediator, _super);
            function AbstractMediator(name, uicomponent) {
                if (uicomponent === void 0) { uicomponent = null; }
                return _super.call(this, name, uicomponent) || this;
            }
            AbstractMediator.prototype.dispose = function () {
            };
            return AbstractMediator;
        }(puremvc.Mediator));
        mvc.AbstractMediator = AbstractMediator;
        __reflect(AbstractMediator.prototype, "app.mvc.AbstractMediator", ["gameabc.IDisposer"]);
    })(mvc = app.mvc || (app.mvc = {}));
})(app || (app = {}));
//# sourceMappingURL=AbstractMediator.js.map