var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    /**
  *胜负统计
  * @author
  *
  */
    var HappyStatUIMoudle = (function (_super) {
        __extends(HappyStatUIMoudle, _super);
        function HappyStatUIMoudle() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "HappyStatUIMoudleSkin";
            return _this;
        }
        HappyStatUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.bgimage);
            this.registerMediator(happy.HappyStatUIMediator);
            this.fristList.itemRenderer = happy.HappyStatItem;
            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            this.tarbar.select(this.tabButton1);
        };
        HappyStatUIMoudle.prototype.opening = function () {
            __PVO().to(app.NetAction.GLXY_REQ_WIN_HISTORY);
            this.showEvent();
        };
        HappyStatUIMoudle.prototype.showEvent = function (arr) {
            if (arr === void 0) { arr = null; }
            if (arr) {
                var newArr = [];
                if (this.collection == null) {
                    this.collection = new eui.ArrayCollection();
                }
                var len = arr.length;
                var max = -1;
                if (len > 10) {
                    max = len - 10;
                }
                else {
                    max = 0;
                }
                while (--len >= 0) {
                    newArr.push(arr[len]);
                }
                this.collection.source = newArr;
                this.fristList.dataProvider = this.collection;
            }
        };
        HappyStatUIMoudle.prototype.touchHandler = function (event) {
            var tag = event.currentTarget;
            this.touchBindButtonHandler(tag);
        };
        HappyStatUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.bgimage:
                    this.clickBackEvent();
                    break;
                case this.tabButton1:
                    this.viewStackUI.selectedIndex = 0;
                    break;
                case this.tabButton2:
                    this.viewStackUI.selectedIndex = 1;
                    break;
            }
        };
        HappyStatUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        HappyStatUIMoudle.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(happy.HappyStatUIMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return HappyStatUIMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    happy.HappyStatUIMoudle = HappyStatUIMoudle;
    __reflect(HappyStatUIMoudle.prototype, "happy.HappyStatUIMoudle");
})(happy || (happy = {}));
//# sourceMappingURL=HappyStatUIMoudle.js.map