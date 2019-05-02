var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dealer;
(function (dealer) {
    function getProxy() {
        return __GET_PROXY(DealerProxy);
    }
    dealer.getProxy = getProxy;
    ;
    var DealerProxy = (function (_super) {
        __extends(DealerProxy, _super);
        function DealerProxy() {
            var _this = _super.call(this, DealerProxy.NAME) || this;
            _this.players = [];
            _this.dealcardType = 0;
            _this.dealStep = 1; // 要先发了2001，再发2002
            _this.dealstate = 0; // 默认空闲状态
            return _this;
        }
        return DealerProxy;
    }(app.mvc.AbsractProxy));
    dealer.DealerProxy = DealerProxy;
    __reflect(DealerProxy.prototype, "dealer.DealerProxy");
})(dealer || (dealer = {}));
//# sourceMappingURL=DealerProxy.js.map