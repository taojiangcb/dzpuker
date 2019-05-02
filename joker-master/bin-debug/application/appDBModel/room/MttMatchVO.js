var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var appvos;
(function (appvos) {
    var MttMatchVO = (function (_super) {
        __extends(MttMatchVO, _super);
        function MttMatchVO() {
            var _this = _super.apply(this, arguments) || this;
            _this.allRewards = 0; //总奖池
            return _this;
        }
        return MttMatchVO;
    }(appvos.MatchVO));
    appvos.MttMatchVO = MttMatchVO;
    __reflect(MttMatchVO.prototype, "appvos.MttMatchVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=MttMatchVO.js.map