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
    var Table2Renderer = (function (_super) {
        __extends(Table2Renderer, _super);
        function Table2Renderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "TableItem2Skin";
            return _this;
        }
        Table2Renderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.addButton(this.continer, true);
            this.continer.touchChildren = false;
        };
        Object.defineProperty(Table2Renderer.prototype, "tableVo", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table2Renderer.prototype, "roomVo", {
            get: function () {
                // return this.tableVo.roomInfo;
                return user.getProxy().currentRoom;
            },
            enumerable: true,
            configurable: true
        });
        Table2Renderer.prototype.dataChanged = function () {
            if (this.tableVo == null || this.roomVo == null)
                return;
            var sb = FormatUtils.qian(this.roomVo.smallBlinds);
            var bb = FormatUtils.qian(this.roomVo.bigBlinds);
            this.blindsLabel.text = "盲注:" + sb + '/' + bb;
            this.maxBankLabel.text = FormatUtils.qian(this.roomVo.maxBank) + "带入";
            this.txt3.text = room.getProxy().getNumPlayers(this.tableVo) + "/9";
            this.tableIdTxt.text = "桌号:" + this.tableVo.svrTableInfo.svrId;
        };
        Table2Renderer.prototype.click = function (tag) {
            _super.prototype.click.call(this, tag);
            var tableId = this.tableVo.svrTableInfo.svrId;
            var sitId = room.getProxy().searchEmptySit(tableId);
            __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION, [1, tableId, sitId, ""]); //坐下
        };
        return Table2Renderer;
    }(uicomps.BaseItemCilckRenderer));
    room.Table2Renderer = Table2Renderer;
    __reflect(Table2Renderer.prototype, "room.Table2Renderer");
})(room || (room = {}));
//# sourceMappingURL=Table2Renderer.js.map