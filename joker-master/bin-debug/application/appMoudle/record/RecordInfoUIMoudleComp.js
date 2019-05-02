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
    /*** 战绩专业术语
* @author
*
*/
    var RecordInfoUIMoudleComp = (function (_super) {
        __extends(RecordInfoUIMoudleComp, _super);
        function RecordInfoUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/record/RecordInfoUIMoudleCompSkin.exml";
            return _this;
        }
        RecordInfoUIMoudleComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.bindButton(this.bgimage);
            this.bindButton(this.btnClose);
            this.bindButton(this.okBtn);
        };
        RecordInfoUIMoudleComp.prototype.opening = function () {
            if (this.uiOpenData) {
                this.info = this.uiOpenData;
                this.majorInfoUI.txtVpip.text = this.info.vpip + "%";
                this.majorInfoUI.txtPer.text = this.info.pfr + "%";
                this.majorInfoUI.txtAf.text = this.info.af + "";
                this.majorInfoUI.txt3b.text = this.info.b3 + "%";
                this.majorInfoUI.txtStl.text = this.info.stl + "%";
                this.majorInfoUI.txtCd.text = this.info.cd + "%";
                this.majorInfoUI.txtWtsd.text = this.info.wtsd + "%";
                this.majorInfoUI.txtBs.text = this.info.bs + "";
            }
        };
        RecordInfoUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnClose:
                case this.bgimage:
                case this.okBtn:
                    this.clickBackEvent();
                    break;
            }
        };
        RecordInfoUIMoudleComp.prototype.clickBackEvent = function () {
            this.close();
        };
        Object.defineProperty(RecordInfoUIMoudleComp.prototype, "dataModel", {
            get: function () {
                return __GET_PROXY(record.RecordProxy);
            },
            enumerable: true,
            configurable: true
        });
        RecordInfoUIMoudleComp.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(record.RecordMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return RecordInfoUIMoudleComp;
    }(app.base.BaseSceneUIMoudleComponent));
    record.RecordInfoUIMoudleComp = RecordInfoUIMoudleComp;
    __reflect(RecordInfoUIMoudleComp.prototype, "record.RecordInfoUIMoudleComp");
})(record || (record = {}));
//# sourceMappingURL=RecordInfoUIMoudleComp.js.map