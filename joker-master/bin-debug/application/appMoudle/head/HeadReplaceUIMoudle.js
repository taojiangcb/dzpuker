var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var head;
(function (head) {
    /**
     *签到相关界面
     * @author
     *
     */
    var HeadReplaceUIMoudle = (function (_super) {
        __extends(HeadReplaceUIMoudle, _super);
        function HeadReplaceUIMoudle() {
            var _this = _super.call(this) || this;
            _this.listdata = ["1", "2", "3", "4", ""];
            _this.buyData = ["", "", "", "", "", "", "", "", "", "", ""];
            _this.seleIndex = 0;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "resource/app_skin/head/HeadReplaceUIMoudleSkin.exml";
            return _this;
        }
        HeadReplaceUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            app.mvc.AppFacade.getInstance().registerMediator(new head.HeadUIMoudMediator(this));
            this.bindButton(this.bgimage, false);
            this.bindButton(this.btnColse);
            this.bindButton(this.btnOk);
            //this.bindButton(this.btnCan);
            this.txtName.text = user.getProxy().svrName;
            this.currList.addEventListener(egret.Event.CHANGE, this.currItemclick, this);
            this.buyList.addEventListener(egret.Event.CHANGE, this.buyItemclick, this);
            this.chandID = user.getProxy().svrHeadId;
            this.showAvat();
        };
        HeadReplaceUIMoudle.prototype.currItemclick = function () {
            this.chandID = this.currList.selectedItem;
            this.selectedChange();
            this.showAvat();
        };
        HeadReplaceUIMoudle.prototype.selectedChange = function (id) {
            if (id === void 0) { id = -1; }
            for (var i = 0; i < this.currList.dataProvider.length; i++) {
                var item = this.currList.getElementAt(i);
                if (item.data && Number(item.data) == id) {
                    item.selected = true;
                }
                item.selectedChange();
            }
        };
        HeadReplaceUIMoudle.prototype.showAvat = function () {
            this.myAvat.chroose(true);
            this.myAvat.source = user.getProxy().getHeadStr(this.chandID);
        };
        HeadReplaceUIMoudle.prototype.buyItemclick = function () {
            this.chandID = this.buyList.selectedItem;
        };
        HeadReplaceUIMoudle.prototype.opening = function () {
            this.showEvent();
        };
        HeadReplaceUIMoudle.prototype.showEvent = function () {
            this.currList.itemRenderer = head.HeadListItem;
            if (this.collection == null) {
                this.collection = new eui.ArrayCollection();
            }
            this.collection.source = this.listdata;
            this.currList.dataProvider = this.collection;
            if (this.chandID) {
                this.seleIndex = this.collection.getItemIndex(this.chandID.toString());
            }
            this.currList.selectedIndex = this.seleIndex;
            if (this.buyData.length) {
                this.noHead.visible = false;
            }
            else {
                this.noHead.visible = true;
            }
            this.buyList.itemRenderer = head.HeadListItem;
            if (this.buyCollection == null) {
                this.buyCollection = new eui.ArrayCollection(this.buyData);
            }
            this.buyList.dataProvider = this.buyCollection;
        };
        HeadReplaceUIMoudle.prototype.changeEvent = function () {
            this.clickBackEvent();
        };
        HeadReplaceUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.bgimage:
                case this.btnColse:
                    this.clickBackEvent();
                    break;
                case this.btnOk:
                    this.sedHeadId();
                    this.chandID = 0;
                    break;
            }
        };
        /***
         * 发送选择的头像
         * **/
        HeadReplaceUIMoudle.prototype.sedHeadId = function () {
            if (this.chandID != 0) {
                __SEND_NOTIFICATION(app.NetAction.SET_HEAD_INFO, [this.chandID.toString()]);
            }
        };
        HeadReplaceUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        HeadReplaceUIMoudle.prototype.dispose = function () {
            this.collection = null;
            this.buyCollection = null;
            app.mvc.AppFacade.getInstance().removeMediator(head.HeadUIMoudMediator.NAME);
            if (this.buyList)
                this.buyList.removeEventListener(egret.Event.CHANGE, this.buyItemclick, this);
            if (this.currList)
                this.currList.removeEventListener(egret.Event.CHANGE, this.currItemclick, this);
            _super.prototype.dispose.call(this);
        };
        return HeadReplaceUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    head.HeadReplaceUIMoudle = HeadReplaceUIMoudle;
    __reflect(HeadReplaceUIMoudle.prototype, "head.HeadReplaceUIMoudle");
})(head || (head = {}));
//# sourceMappingURL=HeadReplaceUIMoudle.js.map