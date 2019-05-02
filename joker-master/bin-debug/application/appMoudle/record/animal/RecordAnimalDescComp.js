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
    var RecordAnimalDescComp = (function (_super) {
        __extends(RecordAnimalDescComp, _super);
        function RecordAnimalDescComp() {
            return _super.call(this) || this;
        }
        RecordAnimalDescComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this._comp_header._setOnRecordUI();
        };
        RecordAnimalDescComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * 更新打牌风格描述数据
         * @param: number= typeIndex
         */
        RecordAnimalDescComp.prototype.updateAnimalDescUi = function (index) {
            var typeArray = record.RecordSingleObject._getSingle().getTypeDc(index);
            this._txt_animalDesc.text = typeArray[1];
            if (index == 0) {
                this.setUiByType(false);
                this._txt_bianselong.text = typeArray[2];
            }
            else {
                this.setUiByType(true);
                this._txt_rule_1.text = typeArray[2];
                this._txt_rule_2.text = typeArray[3];
                this._txt_rule_3.text = typeArray[4];
            }
            this._comp_header.updateAnimalHeaderUi(index);
        };
        // 根据type设置ui的显示隐藏
        RecordAnimalDescComp.prototype.setUiByType = function (visible) {
            this._txt_rule_1.visible = visible;
            this._txt_rule_2.visible = visible;
            this._txt_rule_3.visible = visible;
            this._txt_bianselong.visible = !visible;
        };
        return RecordAnimalDescComp;
    }(gameabc.UICustomComponent));
    record.RecordAnimalDescComp = RecordAnimalDescComp;
    __reflect(RecordAnimalDescComp.prototype, "record.RecordAnimalDescComp");
})(record || (record = {}));
//# sourceMappingURL=RecordAnimalDescComp.js.map