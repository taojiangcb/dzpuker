var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uicomps;
(function (uicomps) {
    var SubKeyBoardComp = (function (_super) {
        __extends(SubKeyBoardComp, _super);
        function SubKeyBoardComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "SubKeyBoardSkin";
            _this.inputButtonArray = [
                _this.inputButton0, _this.inputButton1, _this.inputButton2, _this.inputButton3, _this.inputButton4,
                _this.inputButton5, _this.inputButton6, _this.inputButton7, _this.inputButton8, _this.inputButton9
            ];
            return _this;
        }
        SubKeyBoardComp.prototype.createComplete = function (event) {
        };
        SubKeyBoardComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return SubKeyBoardComp;
    }(gameabc.UICustomComponent));
    uicomps.SubKeyBoardComp = SubKeyBoardComp;
    __reflect(SubKeyBoardComp.prototype, "uicomps.SubKeyBoardComp");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=SubKeyBoardComp.js.map