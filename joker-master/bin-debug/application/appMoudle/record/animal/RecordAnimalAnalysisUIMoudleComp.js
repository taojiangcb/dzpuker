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
     * 行为分析主界面
     * */
    var RecordAnimalAnalysisUIMoudleComp = (function (_super) {
        __extends(RecordAnimalAnalysisUIMoudleComp, _super);
        function RecordAnimalAnalysisUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/record/record_animal/RecordAnimalAnalysisUIMoudleSkin.exml";
            return _this;
        }
        RecordAnimalAnalysisUIMoudleComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.bindButton(this._btn_close, true);
            //            this.bindButton(this._btn_ok, true);
            this.bindButton(this._btn_share_weixin, true);
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) // 本地运行
            // {
            // 	this.setButtonVis(false);
            // } else {
            // 	this.setButtonVis(true);
            // }
            // 注册mediator
            app.mvc.AppFacade.getInstance().registerMediator(new record.RecordAnalysisMediator(this));
            // 发送更新事件
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
        };
        RecordAnimalAnalysisUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this._btn_close:
                case this._btn_ok:
                    this.close();
                    break;
                case this._btn_share_weixin:
                    // if (egret.Capabilities.os == "Android") {
                    //     platform.shardShow("行为分析","","先赚1个亿，来边锋德州达成小目标");
                    // } else {
                    //     tip.popSysCenterTip("此功能尚未开放，敬请期待");
                    // }
                    platform.shardShow("行为分析", "先赚1个亿，来边锋德州达成小目标");
                    mc2sdk.event(50103 /* RECORD_ANALYSIS_SHARE */);
                    break;
            }
        };
        RecordAnimalAnalysisUIMoudleComp.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(record.RecordAnalysisMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        /**
         * 设置按钮按键显示
         */
        RecordAnimalAnalysisUIMoudleComp.prototype.setButtonVis = function (visible) {
            this._btn_ok.visible = visible;
            this._btn_share_weixin.visible = !visible;
        };
        /**
         * 设置行为分析描述
         */
        RecordAnimalAnalysisUIMoudleComp.prototype.setDescritpion = function () {
            if (this.uiOpenData) {
                this._comp_animal_analysis.setLastUserInfo(this.uiOpenData);
            }
        };
        return RecordAnimalAnalysisUIMoudleComp;
    }(app.base.BaseSceneUIMoudleComponent));
    record.RecordAnimalAnalysisUIMoudleComp = RecordAnimalAnalysisUIMoudleComp;
    __reflect(RecordAnimalAnalysisUIMoudleComp.prototype, "record.RecordAnimalAnalysisUIMoudleComp");
})(record || (record = {}));
//# sourceMappingURL=RecordAnimalAnalysisUIMoudleComp.js.map