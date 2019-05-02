var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mammon;
(function (mammon) {
    var newMammonUIModule = (function (_super) {
        __extends(newMammonUIModule, _super);
        /**------------------------------------------ */
        function newMammonUIModule() {
            var _this = _super.call(this) || this;
            _this._recordNum = 0; // 奖池记录数目
            _this.skinName = "resource/app_skin/mammon/newMammonUIModule.exml";
            return _this;
        }
        newMammonUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this._btn_close, true);
            this.init();
            this._label_intr1.text = gameabc.getMessage("MAMMON_INTR_1");
            this._label_intr2.text = gameabc.getMessage("MAMMON_INTR_2");
            this._label_intr3.text = gameabc.getMessage("MAMMON_INTR_3");
        };
        /**初始化 */
        newMammonUIModule.prototype.init = function () {
            this._resetRecordList();
            this._updateUIData();
        };
        /**
         * 重置视图中获奖记录列表
         * 根据mammon缓存的记录池自动生成
         */
        newMammonUIModule.prototype._resetRecordList = function () {
            var pool = mammon.getProxy()._poolRecords;
            if (!pool.length)
                return;
            for (var i = 0; i < pool.length; i++) {
                this._group_recordList.addChild(new mammon.MammonRecInfoComp(parseInt(pool[i][0]), pool[i][1], parseInt(pool[i][2])));
            }
        };
        /**
         * 往视图中添加一条获奖记录信息
         * @param timeSpan 时间戳
         * @param name 玩家name
         * @param recordNum 获奖金额
         */
        newMammonUIModule.prototype._addRecordList = function (timeSpan, name, recordNum) {
            var length = this._group_recordList.$children.length;
            if (length >= 20) {
                this._group_recordList.removeChildAt(length - 1); // 移除最后一位
                this._group_recordList.addChildAt(new mammon.MammonRecInfoComp(timeSpan, name, recordNum), 0);
            }
        };
        /**
         * 更新ui数据，更新前需先更新proxy中的缓存数据
         */
        newMammonUIModule.prototype._updateUIData = function () {
            this._txt_lastNum.text = mammon.getProxy()._farToWinning ? mammon.getProxy()._farToWinning + "" : "0";
            this._txt_poolNum.text = mammon.getProxy()._getTotalPoolString();
        };
        newMammonUIModule.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this._btn_close:
                    this.close();
                    break;
                default:
                    this.close();
                    break;
            }
        };
        /**关闭模块 */
        newMammonUIModule.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        return newMammonUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    mammon.newMammonUIModule = newMammonUIModule;
    __reflect(newMammonUIModule.prototype, "mammon.newMammonUIModule");
})(mammon || (mammon = {}));
//# sourceMappingURL=newMammonUIModule.js.map