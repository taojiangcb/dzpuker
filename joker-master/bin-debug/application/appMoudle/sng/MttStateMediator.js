var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    var MttStateMediator = (function (_super) {
        __extends(MttStateMediator, _super);
        function MttStateMediator(view) {
            return _super.call(this, MttStateMediator.NAME, view) || this;
        }
        Object.defineProperty(MttStateMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        MttStateMediator.prototype.listNotificationInterests = function () {
            return [
                app.NetAction.RESP_MATCH_RANK
            ];
        };
        MttStateMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.NetAction.RESP_MATCH_RANK:
                    this.view.updatePlayersInfoInMatch();
                    break;
            }
        };
        return MttStateMediator;
    }(app.mvc.AbstractMediator));
    MttStateMediator.NAME = "MttStateMediator";
    match.MttStateMediator = MttStateMediator;
    __reflect(MttStateMediator.prototype, "match.MttStateMediator");
})(match || (match = {}));
//# sourceMappingURL=MttStateMediator.js.map