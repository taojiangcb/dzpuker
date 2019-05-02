var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**
 *牌局统计
 * @author
 *
 */
    var PlayStatisUIMoudleComp = (function (_super) {
        __extends(PlayStatisUIMoudleComp, _super);
        function PlayStatisUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.totalAllBringBet = 0;
            _this.skinName = "PlayStatisUIMoudleCompSkin";
            return _this;
        }
        PlayStatisUIMoudleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.btnList1.itemRenderer = playcards.PlayStatisItemRenderer;
            this.btnList.itemRenderer = playcards.PlayStatisInfoItemRenderer;
            this.bindButton(this.btnClose);
        };
        PlayStatisUIMoudleComp.prototype.opening = function () {
            this.topArr = [];
            this.totalAllBringBet = 0;
            if (this.uiOpenData) {
                this.texVo = this.uiOpenData;
                this.roleVO = user.getPlayerInfo();
                this.handleData();
                this.txtName.text = this.roleVO.nickname;
                // this.label0.text = this.backStr(this.myJoinVO.nowBet,this.myJoinVO.totalBringBet) + '';
                this.label1.text = this.texVo.totalHand + "";
                this.label2.text = this.texVo.maxPot + "";
                this.label3.text = this.totalAllBringBet + "";
                var msgDatas1 = new eui.ArrayCollection(this.texVo.joinPlayerVO);
                this.btnList1.dataProvider = msgDatas1;
                var msgDatas = new eui.ArrayCollection(this.topArr);
                this.btnList.dataProvider = msgDatas;
            }
        };
        PlayStatisUIMoudleComp.prototype.handleData = function () {
            var len = this.texVo.joinPlayerVO.length;
            for (var i = 0; i < len; i++) {
                var info = this.texVo.joinPlayerVO[i];
                this.totalAllBringBet += info.totalBringBet;
                var mInfo = this.topArr[0]; //MVP赢取最多
                var tInfo = this.topArr[1]; //带入最多
                var yInfo = this.topArr[2]; //输钱最多
                if (mInfo && this.backStr(mInfo.nowBet, mInfo.totalBringBet) < this.backStr(info.nowBet, info.totalBringBet)) {
                    this.topArr[0] = info;
                }
                else if (mInfo == null) {
                    this.topArr[0] = info;
                }
                if (tInfo && tInfo.totalBringBet < info.totalBringBet) {
                    this.topArr[1] = info;
                }
                else if (tInfo == null) {
                    this.topArr[1] = info;
                }
                if (yInfo && this.backStr(yInfo.nowBet, yInfo.totalBringBet) > this.backStr(info.nowBet, info.totalBringBet)) {
                    this.topArr[2] = info;
                }
                else if (yInfo == null) {
                    this.topArr[2] = info;
                }
                if (info.roleId == this.roleVO.roleId) {
                    this.myJoinVO = info;
                }
            }
        };
        PlayStatisUIMoudleComp.prototype.backStr = function (a, b) {
            var c = (a - b);
            return c;
        };
        PlayStatisUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnClose:
                    this.close();
                    break;
            }
        };
        Object.defineProperty(PlayStatisUIMoudleComp.prototype, "featherSpace", {
            get: function () {
                return AppRoot.gameLayer.effectLayer;
            },
            enumerable: true,
            configurable: true
        });
        PlayStatisUIMoudleComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PlayStatisUIMoudleComp;
    }(app.base.BaseWndUIMoudleComponent));
    playcards.PlayStatisUIMoudleComp = PlayStatisUIMoudleComp;
    __reflect(PlayStatisUIMoudleComp.prototype, "playcards.PlayStatisUIMoudleComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayStatisUIMoudleComp.js.map