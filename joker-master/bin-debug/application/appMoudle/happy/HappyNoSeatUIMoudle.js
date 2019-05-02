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
  *无座玩家列表
  * @author
  *
  */
    var HappyNoSeatUIMoudle = (function (_super) {
        __extends(HappyNoSeatUIMoudle, _super);
        function HappyNoSeatUIMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyNoSeatUIMoudleSkin";
            return _this;
        }
        HappyNoSeatUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnColse);
            this.fristList.itemRenderer = happy.HappyNotSeatItem;
        };
        HappyNoSeatUIMoudle.prototype.opening = function () {
            this.showEvent();
        };
        HappyNoSeatUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnColse:
                    this.clickBackEvent();
                    break;
            }
        };
        HappyNoSeatUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        HappyNoSeatUIMoudle.prototype.showEvent = function () {
            if (this.collection == null) {
                this.collection = new eui.ArrayCollection();
            }
            var nosetArr = [];
            if (happy.getProxy().tableVO && happy.getProxy().tableVO.noSeatPlayerVO) {
                var playerVO = happy.getProxy().tableVO.noSeatPlayerVO;
                for (var i = 0; i < playerVO.length; i++) {
                    var newIndex = Math.floor(i / 3);
                    if (nosetArr[newIndex] == null) {
                        nosetArr[newIndex] = [];
                    }
                    nosetArr[newIndex].push(playerVO[i]);
                }
            }
            this.collection.source = nosetArr;
            this.fristList.dataProvider = this.collection;
            this.txtNum.text = "当前无座玩家共有" + playerVO.length + "人";
        };
        HappyNoSeatUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return HappyNoSeatUIMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    happy.HappyNoSeatUIMoudle = HappyNoSeatUIMoudle;
    __reflect(HappyNoSeatUIMoudle.prototype, "happy.HappyNoSeatUIMoudle");
})(happy || (happy = {}));
//# sourceMappingURL=HappyNoSeatUIMoudle.js.map