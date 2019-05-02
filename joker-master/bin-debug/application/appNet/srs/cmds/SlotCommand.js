var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cy;
(function (cy) {
    var SlotCommand = (function (_super) {
        __extends(SlotCommand, _super);
        function SlotCommand() {
            var _this = _super.apply(this, arguments) || this;
            _this.TASKMSG = "TASKMSG";
            return _this;
        }
        SlotCommand.prototype.sendHandler = function (data, stream) {
            if (data instanceof Array) {
                var gameid = data[1];
                data = data[0];
            }
            else {
                gameid = AppConst.GAME_ID;
            }
            _super.prototype.sendHandler.call(this, data, stream);
            switch (this.action) {
                case app.NetAction.PROCESS_XYID_REQ_DO_SLOT:
                    stream.putInt(20); //askId
                    stream.putInt(2); //numid;                           //type
                    break;
            }
        };
        SlotCommand.prototype.resultHandler = function (stream) {
            switch (this.action) {
                case app.NetAction.PROCESS_XYID_RESP_DO_SLOT:
                    // var numid:number = stream.getInt();
                    // var areaId:number = stream.getInt();
                    break;
            }
        };
        return SlotCommand;
    }(cy.ToolCommand));
    cy.SlotCommand = SlotCommand;
    __reflect(SlotCommand.prototype, "cy.SlotCommand");
})(cy || (cy = {}));
//# sourceMappingURL=SlotCommand.js.map