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
    /**
     * 动物头像组件，调用时需根据情况设置ui类型
     *   */
    var RecordAnimalHeaderComp = (function (_super) {
        __extends(RecordAnimalHeaderComp, _super);
        function RecordAnimalHeaderComp() {
            var _this = _super.call(this) || this;
            _this._img_header_source = [
                "img_bianselong_info_png",
                "img_mianyang_info_png",
                "img_fengniu_info_png",
                "img_shayu_info_png",
                "img_ruoji_info_png",
                "img_shuta_info_png",
                "img_hongyantu_info_png",
                "img_xiaochouyu_info_png"
            ];
            _this._img_type_source = [
                "iw_bianselong_info_png",
                "iw_mianyang_info_png",
                "iw_fengniu_info_png",
                "iw_shayu_info_png",
                "iw_ruoji_info_png",
                "iw_shuta_info_png",
                "iw_hongyantu_info_png",
                "iw_xiaochouyu_info_png"
            ];
            return _this;
        }
        RecordAnimalHeaderComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
        };
        RecordAnimalHeaderComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * 更新动物头像及类别
         */
        RecordAnimalHeaderComp.prototype.updateAnimalHeaderUi = function (index) {
            this.updateAnimalHeaderImg(index);
            this.updateAnimalTypeImg(index);
        };
        // 更新头像
        RecordAnimalHeaderComp.prototype.updateAnimalHeaderImg = function (index) {
            if (index >= this._img_header_source.length)
                index = 0;
            this._img_header.source = this._img_header_source[index];
        };
        // 更新类别图像
        RecordAnimalHeaderComp.prototype.updateAnimalTypeImg = function (index) {
            if (index >= this._img_type_source.length)
                index = 0;
            this._img_type.source = this._img_type_source[index];
        };
        /**
         * 如是行为分析页面则需调用该方法
         * */
        RecordAnimalHeaderComp.prototype._setOnAnalysisUI = function () {
            this._img_type.x = 410;
            //this._group_header.scrollEnabled = false;
        };
        /**
         * 如是行为战绩统计页面则需调用该方法
         */
        RecordAnimalHeaderComp.prototype._setOnRecordUI = function () {
            this._img_type.x = 11;
            //this._group_header.scrollEnabled = true;
        };
        return RecordAnimalHeaderComp;
    }(gameabc.UICustomComponent));
    record.RecordAnimalHeaderComp = RecordAnimalHeaderComp;
    __reflect(RecordAnimalHeaderComp.prototype, "record.RecordAnimalHeaderComp");
})(record || (record = {}));
//# sourceMappingURL=RecordAnimalHeaderComp.js.map