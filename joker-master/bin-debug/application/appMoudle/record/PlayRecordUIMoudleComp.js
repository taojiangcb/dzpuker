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
  * 牌局记录模块
  * @author
  *
  */
    var PlayRecordUIMoudleComp = (function (_super) {
        __extends(PlayRecordUIMoudleComp, _super);
        function PlayRecordUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "resource/app_skin/record/PlayRecordUIMoudleCompSkin.exml";
            return _this;
        }
        PlayRecordUIMoudleComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.add(this.tabButton3);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            this.bindButton(this.btnClose);
            this.winarr = record.getProxy().getwinRecord();
            app.mvc.AppFacade.getInstance().registerMediator(new record.PlayRecordMediator(this));
            this.tarbar.select(this.tabButton1);
            this.handList.itemRenderer = record.RecordHistoryItemRender;
            this.showList(1);
            if (record.getProxy().collRecord.length == 0) {
                var param = new appvos.ParamVO();
                param.strValues = [user.getProxy().svrRoleId.toString()];
                __SEND_NOTIFICATION(app.NetAction.DZ_RECORD_GET_MANY, param);
            }
        };
        PlayRecordUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.tabButton1:
                    this.showList(1);
                    break;
                case this.tabButton2:
                    this.showList(2);
                    break;
                case this.tabButton3:
                    this.showList(3);
                    break;
                case this.btnClose:
                    this.clickBackEvent();
                    break;
            }
        };
        PlayRecordUIMoudleComp.prototype.showList = function (index) {
            record.getProxy().indexTab = index;
            var _arr;
            switch (index) {
                case 1:
                    this.txtTips.text = gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS1");
                    _arr = record.getProxy().allRecord;
                    break;
                case 2:
                    this.txtTips.text = gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS1");
                    _arr = this.winarr;
                    break;
                case 3:
                    this.txtTips.text = gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS2");
                    _arr = record.getProxy().collRecord;
                    _arr = _arr.sort(this.collRecordFunction);
                    break;
            }
            if (_arr && _arr.length) {
                this.handList.visible = true;
                this.noBg.visible = false;
                this.handList.dataProvider = new eui.ArrayCollection(_arr);
            }
            else {
                this.handList.visible = false;
                this.noBg.visible = true;
                if (index == 3) {
                    this.noTxt.text = gameabc.ResourceBundleUtil.getMessage("PLAY_NO_RECORD_TIPS2");
                }
                else {
                    this.noTxt.text = gameabc.ResourceBundleUtil.getMessage("PLAY_NO_RECORD_TIPS1");
                }
            }
        };
        PlayRecordUIMoudleComp.prototype.collRecordFunction = function (a, b) {
            return b.id - a.id;
        };
        PlayRecordUIMoudleComp.prototype.clickBackEvent = function () {
            this.close();
        };
        Object.defineProperty(PlayRecordUIMoudleComp.prototype, "dataModel", {
            get: function () {
                return __GET_PROXY(record.RecordProxy);
            },
            enumerable: true,
            configurable: true
        });
        PlayRecordUIMoudleComp.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(record.PlayRecordMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return PlayRecordUIMoudleComp;
    }(app.base.BaseSceneUIMoudleComponent));
    record.PlayRecordUIMoudleComp = PlayRecordUIMoudleComp;
    __reflect(PlayRecordUIMoudleComp.prototype, "record.PlayRecordUIMoudleComp");
})(record || (record = {}));
//# sourceMappingURL=PlayRecordUIMoudleComp.js.map