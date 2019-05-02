var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var friend;
(function (friend) {
    var DEALERLABEL_TYPE;
    (function (DEALERLABEL_TYPE) {
        DEALERLABEL_TYPE[DEALERLABEL_TYPE["FOLLOW"] = 0] = "FOLLOW";
        DEALERLABEL_TYPE[DEALERLABEL_TYPE["ONLINE"] = 1] = "ONLINE";
    })(DEALERLABEL_TYPE = friend.DEALERLABEL_TYPE || (friend.DEALERLABEL_TYPE = {}));
    var DealerFollowLabel = (function (_super) {
        __extends(DealerFollowLabel, _super);
        function DealerFollowLabel() {
            var _this = _super.call(this) || this;
            _this.type = DEALERLABEL_TYPE.FOLLOW;
            _this.skinName = "DealerFollowLabelSkin";
            return _this;
        }
        DealerFollowLabel.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.btn.touchChildren = false;
            this.addButton(this.btn);
            this.addButton(this.clickbtn);
        };
        DealerFollowLabel.prototype.dataChanged = function () {
            var dealerInfo = this.data;
            if (this.data.type)
                this.type = this.data.type;
            this.dealerid = dealerInfo.userid;
            this.headimage.source = dealerInfo.faceid ? dealerInfo.faceid : "img_Default_Avatar_1_png";
            this.namelabel.text = dealerInfo.name;
            this.noticelabel.text = dealerInfo.notice ? dealerInfo.notice : "荷官暂无签名信息";
            var isOnline = dealerInfo.online == 1;
            this.btnlabel.source = this.type == DEALERLABEL_TYPE.FOLLOW ? "iw_qianwang_zr_png" : "iw_guanzhu_zr_png";
            if (dealerInfo.online == 0) {
                this.statusimage.source = "icon_main_lx_png";
                this.statuslabel.text = "离线";
                this.statuslabel.textColor = 0x7A7A7A;
                // this.btn.visible = false;
                this.btn.alpha = 0.4;
                this.btn.touchEnabled = false;
            }
            else {
                this.statusimage.source = "icon_main_zx_png";
                this.statuslabel.text = "在线";
                this.statuslabel.textColor = 0xFFCCFF;
                // this.btn.visible = true;
                this.btn.alpha = 1;
                this.btn.touchEnabled = true;
            }
        };
        DealerFollowLabel.prototype.click = function (tag) {
            switch (tag) {
                case this.clickbtn:
                    if (this.type == DEALERLABEL_TYPE.FOLLOW)
                        __OPEN_PRE_MOUDLE(AppReg.APP_DEALERINFO, this.dealerid);
                    break;
                case this.btn:
                    if (this.type == DEALERLABEL_TYPE.FOLLOW) {
                        var roomVO;
                        for (var i = 0; i < room.getProxy().room7.length; i++) {
                            if (this.data.roomid == room.getProxy().room7[i].svrOfsId) {
                                roomVO = room.getProxy().room7[i];
                                break;
                            }
                        }
                        if (roomVO)
                            user.gotoRoom(roomVO);
                    }
                    else if (this.type == DEALERLABEL_TYPE.ONLINE) {
                        __PVO().l(this.dealerid).to(app.NetAction.REQ_DEALER_FOCUS);
                    }
                    break;
            }
        };
        return DealerFollowLabel;
    }(uicomps.BaseItemCilckRenderer));
    friend.DealerFollowLabel = DealerFollowLabel;
    __reflect(DealerFollowLabel.prototype, "friend.DealerFollowLabel");
})(friend || (friend = {}));
//# sourceMappingURL=DealerFollowLabel.js.map