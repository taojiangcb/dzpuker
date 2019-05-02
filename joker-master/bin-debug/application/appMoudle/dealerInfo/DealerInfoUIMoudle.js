var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dealerInfo;
(function (dealerInfo_1) {
    var DealerInfoUIMoudle = (function (_super) {
        __extends(DealerInfoUIMoudle, _super);
        function DealerInfoUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.skinName = "DealerInfoSkin";
            return _this;
        }
        DealerInfoUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            __REGISTER_MEDIATOR(dealerInfo_1.DealerInfoUIMediator, this);
            this.bindButton(this.closebtn);
            this.bindButton(this.sharebtn);
            this.bindButton(this.followbtn);
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [this.uiOpenData]);
            __SEND_NOTIFICATION(app.NetAction.REQ_DEALER_INFO, this.uiOpenData);
        };
        DealerInfoUIMoudle.prototype.updatePlayInfo = function (data) {
            var playerInfo = data;
            this.datalabel0.text = playerInfo.totalHand + "";
            this.datalabel1.text = (playerInfo.joinHand / playerInfo.totalHand * 100).toFixed(1) + "%";
            this.datalabel2.text = (playerInfo.spreadHand / playerInfo.totalHand * 100).toFixed(1) + "%";
            this.datalabel3.text = playerInfo.huntKill + "";
            this.datalabel4.text = playerInfo.maxHandWin + "";
            this.datalabel5.text = "暂无";
        };
        DealerInfoUIMoudle.prototype.updateDealerInfo = function (data) {
            var dealerInfo = data;
            this.headimg.source = dealerInfo.faceid ? dealerInfo.faceid : "img_Default_Avatar_1_png";
            this.dealerid = dealerInfo.userid;
            this.namelabel.text = dealerInfo.name;
            this.idlabel.text = "ID:" + dealerInfo.userid;
            this.noticelabel.text = dealerInfo.notice ? dealerInfo.notice : "荷官暂无签名信息";
        };
        DealerInfoUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closebtn:
                    this.close();
                    break;
                case this.sharebtn:
                    tip.popSysCenterTip("FUNCTION_NO_TIPS");
                    break;
                case this.followbtn:
                    if (this.dealerid)
                        __PVO().l(this.dealerid).to(app.NetAction.REQ_DEALER_FOCUS);
                    break;
            }
        };
        DealerInfoUIMoudle.prototype.dispose = function () {
            __REMOVE_MEDIATOR(dealerInfo_1.DealerInfoUIMediator);
            _super.prototype.dispose.call(this);
        };
        return DealerInfoUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    dealerInfo_1.DealerInfoUIMoudle = DealerInfoUIMoudle;
    __reflect(DealerInfoUIMoudle.prototype, "dealerInfo.DealerInfoUIMoudle");
})(dealerInfo || (dealerInfo = {}));
//# sourceMappingURL=DealerInfoUIMoudle.js.map