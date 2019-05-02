var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var record;
(function (record) {
    /***
 * @author
 *
 */
    var RecordMajorICompInfo = (function (_super) {
        __extends(RecordMajorICompInfo, _super);
        function RecordMajorICompInfo() {
            return _super.call(this) || this;
        }
        RecordMajorICompInfo.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            // this.roleVO = user.getProxy().roleVo;
        };
        RecordMajorICompInfo.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * 获取内部数据
         */
        RecordMajorICompInfo.prototype._getInsideUiData = function () {
            this._data_array = [
                this.txtVpip,
                this.txtPer,
                this.txtAf,
                this.txt3b,
                this.txtStl,
                this.txtCd,
                this.txtWtsd,
                this.txtBs
            ];
            return this._data_array;
        };
        return RecordMajorICompInfo;
    }(gameabc.UICustomComponent));
    record.RecordMajorICompInfo = RecordMajorICompInfo;
    __reflect(RecordMajorICompInfo.prototype, "record.RecordMajorICompInfo");
})(record || (record = {}));
//# sourceMappingURL=RecordMajorICompInfo.js.map