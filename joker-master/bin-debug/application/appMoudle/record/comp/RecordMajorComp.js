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
 *专业分析
 * @author
 *
 */
    var RecordMajorComp = (function (_super) {
        __extends(RecordMajorComp, _super);
        function RecordMajorComp() {
            var _this = _super.call(this) || this;
            _this.vpip = 0; // 入局率
            _this.pfr = 0; // 翻牌前加注
            _this.af = 0; // 激进度
            _this.b3 = 0; // 再加注
            _this.stl = 0; // 偷盲率
            _this.cd = 0; // 持续下注率
            _this.wtsd = 0; // 摊牌率
            _this.bs = 0; // 每手盈利
            _this.init();
            return _this;
        }
        // 初始化
        RecordMajorComp.prototype.init = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            this.skinName = "resource/app_skin/record/RecordMajorCompSkin.exml";
        };
        RecordMajorComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.bindButton(this.btnTerm, true); // 绑定button
        };
        RecordMajorComp.prototype.addedToStage = function (evt) {
            this.roleVO = user.getProxy().playInfoVO;
            if (this.roleVO && record.RecordSingleObject._getSingle().validateUserData(this.roleVO)) {
                this.updateUIData(); // 更新ui数据
                this.tipsEvent();
            }
        };
        // /**
        //  * 获取内部数据
        //  */
        // public _getInsideUiData():any[]{
        //     this._data_array =  [this.vpip,this.pfr,this.af,this.b3,this.stl,this.cd,this.wtsd,this.bs];
        //     return this._data_array;
        // }
        // 刷新ui数据
        RecordMajorComp.prototype.refreshUIData = function () {
            this.majorInfoUI.txtVpip.text = this.vpip + "%";
            this.majorInfoUI.txtPer.text = this.pfr + "%";
            this.majorInfoUI.txtAf.text = this.af + "";
            this.majorInfoUI.txt3b.text = this.b3 + "%";
            this.majorInfoUI.txtStl.text = this.stl + "%";
            this.majorInfoUI.txtCd.text = this.cd + "%";
            this.majorInfoUI.txtWtsd.text = this.wtsd + "%";
            this.majorInfoUI.txtBs.text = this.bs + "";
        };
        /**
         * 更新存储的玩家信息,更新完成后会自动调用更新UI的方法
         */
        RecordMajorComp.prototype._updatePlayerInfo = function () {
            this.roleVO = user.getProxy().playInfoVO;
            if (!this.roleVO)
                return;
            this.updateUIData();
        };
        /**
         * 更新ui中数据
         */
        RecordMajorComp.prototype.updateUIData = function () {
            var dataObj = record.RecordSingleObject._getSingle()._getNeedUpdateUIData(this.roleVO);
            this.vpip = dataObj["rjl"] ? dataObj["rjl"] : 0; // 入局率
            this.pfr = dataObj["pfr"] ? dataObj["pfr"] : 0; // 翻牌前加注
            this.af = dataObj["af"] ? dataObj["af"] : 0; // 激进度
            this.b3 = dataObj["zjz"] ? dataObj["zjz"] : 0; // 再加注
            this.stl = dataObj["tml"] ? dataObj["tml"] : 0; // 偷盲率
            this.cd = dataObj["cxxz"] ? dataObj["cxxz"] : 0; // 持续下注率
            this.wtsd = dataObj["wtsd"] ? dataObj["wtsd"] : 0; // 摊牌率
            this.bs = dataObj["msyl"] ? dataObj["msyl"] : 0; // 每手盈利
            this.refreshUIData();
        };
        // 玩家记录计算规则
        RecordMajorComp.prototype.tipsEvent = function () {
            // 设置单例中user type
            record.RecordSingleObject._getSingle().setAnimalTypeIndexByUserdata(this.vpip, this.af, this.wtsd, this.pfr);
            // 更新animal描述数据
            this._comp_animalDesc.updateAnimalDescUi(record.RecordSingleObject._getSingle().getCurrentAnimalType());
        };
        // 点击事件
        RecordMajorComp.prototype.touchBindButtonHandler = function (evt) {
            switch (evt) {
                case this.btnTerm:
                    var obj = {
                        vpip: this.vpip,
                        pfr: this.pfr,
                        af: this.af,
                        b3: this.b3,
                        stl: this.stl,
                        cd: this.cd,
                        wtsd: this.wtsd,
                        bs: this.bs,
                    };
                    __OPEN_PRE_MOUDLE(AppReg.APP_RECORD_INFO, obj);
                    // __OPEN_PRE_MOUDLE(AppReg.APP_RECORD_ANALYSIS);
                    // 跳转到战绩专业术语模块
                    break;
                default:
                    break;
            }
        };
        RecordMajorComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            this.unbindButton(this.btnTerm);
        };
        return RecordMajorComp;
    }(gameabc.UICustomComponent));
    record.RecordMajorComp = RecordMajorComp;
    __reflect(RecordMajorComp.prototype, "record.RecordMajorComp");
})(record || (record = {}));
//# sourceMappingURL=RecordMajorComp.js.map