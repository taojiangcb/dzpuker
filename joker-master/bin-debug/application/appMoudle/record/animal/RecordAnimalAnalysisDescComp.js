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
     * 行为分析组件
     */
    var RecordAnimalAnalysisDescComp = (function (_super) {
        __extends(RecordAnimalAnalysisDescComp, _super);
        function RecordAnimalAnalysisDescComp() {
            return _super.call(this) || this;
        }
        Object.defineProperty(RecordAnimalAnalysisDescComp.prototype, "userInfo", {
            /**
             * 用户信息
             */
            get: function () {
                return user.getProxy().playInfoVO;
            },
            enumerable: true,
            configurable: true
        });
        // 初始化
        RecordAnimalAnalysisDescComp.prototype.init = function () {
            this.updateUI();
        };
        RecordAnimalAnalysisDescComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this._comp_header._setOnAnalysisUI();
        };
        RecordAnimalAnalysisDescComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        // 更新ui数据
        RecordAnimalAnalysisDescComp.prototype.refreshUIData = function (dataObj) {
            this._txt_djs.text = (win.getProxy().hand + "") == "NaN" ?
                "0" : win.getProxy().hand + ""; // 对局数
            this._txt_rjl.text = dataObj["rjl"] + "%"; // 入局率
            this._txt_wtsd.text = dataObj["wtsd"] + "%"; // 摊牌率
            this._txt_pfr.text = dataObj["pfr"] + "%"; // 翻牌前加注率
            this._txt_af.text = dataObj["af"] + ""; // 激进度
            this._txt_lss.text = (this.changedUserData["huntKill"] + "") == "NaN" ?
                "0" : this.changedUserData["huntKill"] + ""; // 猎杀数
        };
        /**
         * 更新ui中数据和图像等内容
         */
        RecordAnimalAnalysisDescComp.prototype.updateUI = function () {
            if (!record.RecordSingleObject._getSingle().validateUserData(this.changedUserData))
                return; // 数据验证不通过直接跳出
            var dataObj = record.RecordSingleObject._getSingle()._getNeedUpdateUIData(this.changedUserData);
            this.refreshUIData(dataObj);
            // 设置动物头像
            record.RecordSingleObject._getSingle().setAnimalTypeIndexByUserdata(dataObj["rjl"], dataObj["af"], dataObj["wtsd"], dataObj["pfr"]); // 判断当前动物形象
            // 新手保护
            record.RecordSingleObject._getSingle()._protectNewPlayer(this.userInfo.joinHand);
            // 更新animal描述数据
            var type = record.RecordSingleObject._getSingle().getCurrentAnimalType();
            this._comp_header.updateAnimalHeaderUi(type);
            // 更新descrtion
            this._txt_description.text = record.RecordSingleObject._getSingle().getTypeDesc(type);
            win.getProxy().cleanData(); //清空缓存数据
        };
        /**
         * 设置进入牌局时user的数据
         */
        RecordAnimalAnalysisDescComp.prototype.setLastUserInfo = function (data) {
            if (!this.userInfo)
                return;
            this.lastUserData = data;
            this.changedUserData = {
                joinHand: this.userInfo.joinHand - data["joinHand"],
                totalHand: this.userInfo.totalHand - data["totalHand"],
                raiseWhenPreflop: this.userInfo.raiseWhenPreflop - data["raiseWhenPreflop"],
                betOrRaiseTime: this.userInfo.betOrRaiseTime - data["betOrRaiseTime"],
                callTime: this.userInfo.callTime - data["callTime"],
                raiseTime: this.userInfo.raiseTime - data["raiseTime"],
                tmHand: this.userInfo.tmHand - data["tmHand"],
                continueBetTime: this.userInfo.continueBetTime - data["continueBetTime"],
                betOrRaiseHand: this.userInfo.betOrRaiseHand - data["betOrRaiseHand"],
                spreadHand: this.userInfo.spreadHand - data["spreadHand"],
                winDivBB: this.userInfo.winDivBB - data["winDivBB"],
                huntKill: this.userInfo.huntKill - data["huntKill"]
            };
            this.init();
        };
        return RecordAnimalAnalysisDescComp;
    }(gameabc.UICustomComponent));
    record.RecordAnimalAnalysisDescComp = RecordAnimalAnalysisDescComp;
    __reflect(RecordAnimalAnalysisDescComp.prototype, "record.RecordAnimalAnalysisDescComp");
})(record || (record = {}));
//# sourceMappingURL=RecordAnimalAnalysisDescComp.js.map