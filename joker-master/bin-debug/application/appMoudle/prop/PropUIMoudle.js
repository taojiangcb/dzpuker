var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var item;
(function (item) {
    /**
  *道具界面相关
  * @author
  *
  */
    var PropUIMoudle = (function (_super) {
        __extends(PropUIMoudle, _super);
        function PropUIMoudle() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "PropUIMoudleSkin";
            return _this;
        }
        PropUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.bgimage);
            this.bindButton(this.btnColse);
            app.mvc.AppFacade.getInstance().registerMediator(new item.PropUIMoudleMediator(this));
            item.getProxy().getItemDate();
            this.fristList.itemRenderer = item.PropInfoItem;
        };
        PropUIMoudle.prototype.opening = function () {
            this.showEvent();
        };
        PropUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.bgimage:
                case this.btnColse:
                    this.clickBackEvent();
                    break;
            }
        };
        PropUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        PropUIMoudle.prototype.showEvent = function () {
            if (this.collection == null) {
                this.collection = new eui.ArrayCollection();
            }
            if (item.getProxy().allPropDatas.length) {
                this.notTxt.visible = false;
            }
            else {
                this.notTxt.visible = true;
            }
            this.collection.source = item.getProxy().allPropDatas;
            this.fristList.dataProvider = this.collection;
        };
        PropUIMoudle.prototype.dispose = function () {
            app.mvc.AppFacade.getInstance().removeMediator(item.PropUIMoudleMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return PropUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    item.PropUIMoudle = PropUIMoudle;
    __reflect(PropUIMoudle.prototype, "item.PropUIMoudle");
})(item || (item = {}));
//# sourceMappingURL=PropUIMoudle.js.map