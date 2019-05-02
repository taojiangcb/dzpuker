var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var friend;
(function (friend) {
    var DealerOnlineListUIMoudle = (function (_super) {
        __extends(DealerOnlineListUIMoudle, _super);
        function DealerOnlineListUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = -20;
            _this.skinName = "DealerOnlineListSkin";
            return _this;
        }
        DealerOnlineListUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.list.itemRenderer = friend.DealerFollowLabel;
            this.initList(this.uiOpenData);
        };
        DealerOnlineListUIMoudle.prototype.initList = function (data) {
            if (data == null || data.length == 0) {
                this.tiplabel.visible = true;
            }
            else {
                this.tiplabel.visible = false;
                var onlineData = [];
                for (var i = 0; i < data.length; i++) {
                    data[i]["type"] = friend.DEALERLABEL_TYPE.ONLINE;
                    if (data[i].online != 0 && data[i].userid != user.getProxy().svrRoleId)
                        onlineData.push(data[i]);
                }
                this.list.dataProvider = new eui.ArrayCollection(onlineData);
            }
        };
        DealerOnlineListUIMoudle.prototype.dispose = function () {
            __PVO().to(app.NetAction.REQ_DEALER_FOCUS_LIST);
            _super.prototype.dispose.call(this);
        };
        return DealerOnlineListUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    friend.DealerOnlineListUIMoudle = DealerOnlineListUIMoudle;
    __reflect(DealerOnlineListUIMoudle.prototype, "friend.DealerOnlineListUIMoudle");
})(friend || (friend = {}));
//# sourceMappingURL=DealerOnlineListUIMoudle.js.map