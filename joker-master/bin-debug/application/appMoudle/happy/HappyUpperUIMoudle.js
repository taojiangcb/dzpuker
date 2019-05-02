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
  *上庄列表
  * @author
  *
  */
    var HappyUpperUIMoudle = (function (_super) {
        __extends(HappyUpperUIMoudle, _super);
        function HappyUpperUIMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyUpperUIMoudleSkin";
            return _this;
        }
        HappyUpperUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnColse);
            this.bindButton(this.szBtn);
            this.fristList.itemRenderer = happy.HappyUpperItemComp;
        };
        HappyUpperUIMoudle.prototype.opening = function () {
            this.showEvent();
        };
        HappyUpperUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnColse:
                    this.clickBackEvent();
                    break;
                case this.szBtn:
                    this.clickBackEvent();
                    var vo = happy.getTableVO();
                    if (vo != null) {
                        if (this.hasMy) {
                            if (vo.gameStatus == 1 && happy.getProxy().mySeatvo.showPos == 1) {
                                tip.Alert.show("牌局尚未结束，点击确定，将在牌局结束后退出庄家", "", tip.CONFIRM, this.outbakfun, null, this);
                            }
                            else {
                                __PVO().to(app.NetAction.GLXY_REQ_CHANGE_BANKER);
                                tip.popSysCenterTip("离开上庄列表");
                            }
                        }
                        else {
                            if (happy.getProxy().addBank())
                                tip.popSysCenterTip("排队等待上庄");
                        }
                    }
                    break;
            }
        };
        HappyUpperUIMoudle.prototype.outbakfun = function (type) {
            if (type === void 0) { type = tip.YES; }
            if (type == tip.YES) {
                if (happy.getTableVO().gameStatus == 1)
                    happy.getProxy().outState = 2;
                else
                    __PVO().to(app.NetAction.GLXY_REQ_CHANGE_BANKER);
            }
        };
        HappyUpperUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        HappyUpperUIMoudle.prototype.showEvent = function () {
            if (this.collection == null) {
                this.collection = new eui.ArrayCollection();
            }
            var nosetArr = [];
            if (happy.getProxy().tableVO && happy.getProxy().tableVO.allPlayerVO) {
                var allPlayerVO = happy.getProxy().tableVO.allPlayerVO;
                var bankWaiter = happy.getProxy().bankWaiter;
                var myset = happy.getProxy().mySeatvo.seatId;
                this.hasMy = false;
                for (var i = 0; i < bankWaiter.length; i++) {
                    var vo = allPlayerVO[bankWaiter[i]];
                    if (vo != null) {
                        nosetArr.push(vo);
                        if (vo.seatId == myset)
                            this.hasMy = true;
                    }
                }
            }
            if (this.hasMy)
                this.szlab.source = "img_word_happy_xz_png";
            else
                this.szlab.source = "img_word_happy_sz2_png";
            this.collection.source = nosetArr;
            this.fristList.dataProvider = this.collection;
            this.lisTxt.text = "上庄列表（" + nosetArr.length + "）";
        };
        HappyUpperUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return HappyUpperUIMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    happy.HappyUpperUIMoudle = HappyUpperUIMoudle;
    __reflect(HappyUpperUIMoudle.prototype, "happy.HappyUpperUIMoudle");
})(happy || (happy = {}));
//# sourceMappingURL=HappyUpperUIMoudle.js.map