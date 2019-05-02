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
    var RecordUIMoudleComp = (function (_super) {
        __extends(RecordUIMoudleComp, _super);
        function RecordUIMoudleComp() {
            var _this = _super.call(this) || this;
            // handScroll: eui.Scroller;                    //把局滚动组件
            //  handScrollV: number = 0;
            _this.isUpdateFalg = false;
            _this.skinName = "resource/app_skin/record/RecordUIMoudleCompSkin.exml";
            return _this;
        }
        RecordUIMoudleComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            // btn group组件
            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            app.mvc.AppFacade.getInstance().registerMediator(new record.RecordMediator(this));
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
            this.tarbar.select(this.tabButton1);
            // 绑定button事件
            this.bindButton(this.btnClose);
            this.bindButton(this.bgimage);
        };
        RecordUIMoudleComp.prototype.opening = function () {
            this.upDataEvent();
        };
        RecordUIMoudleComp.prototype.upDataEvent = function () {
        };
        //牌局列表滚动结束
        RecordUIMoudleComp.prototype.scrollEnd = function (event) {
            if (this.isUpdateFalg) {
                this.isUpdateFalg = false;
                //获取列表
                this.upDataEvent();
                this.txtUpdateLabel.alpha = 0;
            }
        };
        RecordUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.tabButton1:
                    this.viewStackUI.selectedIndex = 0;
                    break;
                case this.tabButton2:
                    this.viewStackUI.selectedIndex = 1;
                    break;
                case this.bgimage:
                case this.btnClose:
                    this.clickBackEvent();
                    break;
            }
        };
        // 关闭事件
        RecordUIMoudleComp.prototype.clickBackEvent = function () {
            this.close();
        };
        Object.defineProperty(RecordUIMoudleComp.prototype, "dataModel", {
            // 获取user数据
            get: function () {
                return __GET_PROXY(record.RecordProxy);
            },
            enumerable: true,
            configurable: true
        });
        RecordUIMoudleComp.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(record.RecordMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        /**
         * 更新玩家的数据，同时刷新ui中行为描述的相关数据
         */
        RecordUIMoudleComp.prototype.updateDescData = function () {
            this.majorUI._updatePlayerInfo();
        };
        return RecordUIMoudleComp;
    }(app.base.BaseSceneUIMoudleComponent));
    record.RecordUIMoudleComp = RecordUIMoudleComp;
    __reflect(RecordUIMoudleComp.prototype, "record.RecordUIMoudleComp");
})(record || (record = {}));
//# sourceMappingURL=RecordUIMoudleComp.js.map