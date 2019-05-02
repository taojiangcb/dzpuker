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
    var ProtobuffCommand = (function (_super) {
        __extends(ProtobuffCommand, _super);
        function ProtobuffCommand() {
            return _super.apply(this, arguments) || this;
        }
        ProtobuffCommand.prototype.sendHandler = function (data, action, paramVO) {
            //抽象函数保持空，可减少子类忽略super引发的错误
        };
        ProtobuffCommand.prototype.resultHandler = function (action, paramVO) {
            //抽象函数保持空，可减少子类忽略super引发的错误
        };
        return ProtobuffCommand;
    }(puremvc.SimpleCommand));
    app.ProtobuffCommand = ProtobuffCommand;
    __reflect(ProtobuffCommand.prototype, "app.ProtobuffCommand");
})(app || (app = {}));
//# sourceMappingURL=ProtobuffCommand.js.map