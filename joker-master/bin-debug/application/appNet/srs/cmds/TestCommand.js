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
    var TestCommand = (function (_super) {
        __extends(TestCommand, _super);
        function TestCommand() {
            return _super.apply(this, arguments) || this;
        }
        TestCommand.prototype.sendHandler = function (data, action, paramVO) {
        };
        TestCommand.prototype.resultHandler = function (action, paramVO) {
        };
        return TestCommand;
    }(app.HttpCommand));
    app.TestCommand = TestCommand;
    __reflect(TestCommand.prototype, "app.TestCommand");
})(app || (app = {}));
//# sourceMappingURL=TestCommand.js.map