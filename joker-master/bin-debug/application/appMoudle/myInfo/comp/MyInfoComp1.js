var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var myInfo;
(function (myInfo) {
    /**
 *普通场
 * @author
 *
 */
    var MyInfoComp1 = (function (_super) {
        __extends(MyInfoComp1, _super);
        function MyInfoComp1() {
            var _this = _super.call(this) || this;
            _this.winArr = [100000, 1000000, 10000000, 100000000, 1000000000];
            _this.iconArr = [];
            _this.skinName = "MyInfoComp1Skin";
            return _this;
        }
        MyInfoComp1.prototype.createComplete = function (event) {
            // this.bindButton(this.btnRecord)
            this.iconArr = [this.iconLV1, this.iconLV2, this.iconLV3, this.iconLV4, this.iconLV5];
        };
        MyInfoComp1.prototype.touchBindButtonHandler = function (clickTarget) {
            if (clickTarget == this.btnRecord) {
            }
        };
        /**
         * 设置数据
         * @param vo
         */
        MyInfoComp1.prototype.setData = function (vo, playVO) {
            if (vo === void 0) { vo = null; }
            if (playVO === void 0) { playVO = null; }
            if (vo == null)
                vo = user.getProxy().svrPlayerInfo;
            this.roleVO = vo;
            this.allJU = 0;
            if (playVO)
                this.playVO = playVO;
            this.showEvent();
        };
        MyInfoComp1.prototype.showEvent = function () {
            if (this.roleVO && this.roleVO.numWins) {
                if (this.roleVO.numWins) {
                    this.allJU += this.roleVO.numWins;
                }
                if (this.roleVO.numLosts) {
                    this.allJU += this.roleVO.numLosts;
                }
                if (this.roleVO.numPeaces) {
                    this.allJU += this.roleVO.numPeaces;
                }
                if (this.roleVO.numEscapes) {
                    this.allJU += this.roleVO.numEscapes;
                }
            }
            if (this.playVO) {
                this.infoLable1["label"].text = this.playVO.totalHand + '';
            }
            else {
                this.infoLable1["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //user.getProxy().vipInfo+"";
            }
            //  this.infoLable1["bg"].visible = false;//总局数
            this.infoLable1["icon"].source = "img_word_info_zongjushu_png";
            if (this.playVO) {
                this.infoLable1["label"].text = this.playVO.totalHand + '';
            }
            else {
                this.infoLable1["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //user.getProxy().vipInfo+"";
            }
            // this.infoLable2["bg"].visible = false; //入局率
            this.infoLable2["icon"].source = "img_word_info_rujulv_png";
            if (this.playVO) {
                this.infoLable2["label"].text = utils.HtmlTextUtils.numberToPercentage(this.playVO.joinHand, this.playVO.totalHand) + '';
            }
            else {
                this.infoLable2["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //user.getProxy().vipInfo+"";
            }
            // this.infoLable3["bg"].visible = false; //胜率
            this.infoLable3["icon"].source = "img_word_info_shenglv_png";
            if (this.playVO) {
                this.infoLable3["label"].text = utils.HtmlTextUtils.numberToPercentage(this.playVO.winHand, this.playVO.totalHand);
            }
            else {
                this.infoLable3["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO");
            }
            // this.infoLable4["bg"].visible = false; //摊牌率
            this.infoLable4["icon"].source = "img_word_info_tanpailv_png";
            if (this.playVO) {
                this.infoLable4["label"].text = utils.HtmlTextUtils.numberToPercentage(this.playVO.spreadHand, this.playVO.totalHand) + '';
            }
            else {
                this.infoLable4["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //user.getProxy().vipInfo+"";
            }
            // this.infoLable5["bg"].visible = false; //猎杀数
            this.infoLable5["icon"].source = "img_word_info_lieshashu_png";
            if (this.playVO) {
                if (this.playVO) {
                    this.infoLable5["label"].text = this.playVO.huntKill + "";
                }
                else {
                    this.infoLable5["label"].text = "0";
                }
            }
            else {
                this.infoLable5["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //this.roleVO.huntKill + ""; 
            }
            // this.infoLable6["bg"].visible = false; /总获利
            this.infoLable6["icon"].source = "img_word_info_zonghuoli_png";
            if (this.playVO) {
                if (this.playVO) {
                    this.infoLable6["label"].text = FormatUtils.wan5(this.playVO.totalWin);
                }
                else {
                    this.infoLable6["label"].text = "0";
                }
            }
            else {
                this.infoLable5["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //this.roleVO.huntKill + ""; 
            }
            // this.infoLable7["bg"].visible = false;//魅力
            this.infoLable7["icon"].source = "img_word_info_mlz_png";
            if (this.playVO) {
                this.infoLable7["label"].text = this.playVO.charm + '';
            }
            else {
                this.infoLable7["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //user.getProxy().vipInfo+"";
            }
            // this.infoLable8["bg"].visible = false;//魅力积分
            this.setIcon(this.infoLable8, "iw_meilijifen_png");
            if (this.playVO) {
                this.setLabel(this.infoLable8, this.playVO.charmScore);
            }
            else {
                this.setLabel(this.infoLable8, "TEMPORARY_NO");
            }
            this.infoLable8["_img_meilijifen"].visible = true;
            this.showWinIcon();
        };
        MyInfoComp1.prototype.setLabel = function (comp, str) {
            var rbs = gameabc.ResourceBundleUtil.getMessage(str);
            comp["label"].text = rbs == null || rbs == "" ? String(str) : rbs;
        };
        MyInfoComp1.prototype.setIcon = function (comp, str) {
            var rbs = gameabc.ResourceBundleUtil.getMessage(str);
            comp['icon'].source = rbs == null || rbs == "" ? String(str) : rbs;
        };
        MyInfoComp1.prototype.showWinIcon = function () {
            var maxNum = 10000;
            var valNum = 0;
            if (this.playVO && this.playVO.totalWin) {
                if (this.playVO.totalWin > this.winArr[4]) {
                    maxNum = this.winArr[4];
                    this.showIconEvent(5);
                }
                else if (this.playVO.totalWin > this.winArr[3]) {
                    maxNum = this.winArr[4];
                    this.showIconEvent(4);
                }
                else if (this.playVO.totalWin > this.winArr[2]) {
                    maxNum = this.winArr[3];
                    this.showIconEvent(3);
                }
                else if (this.playVO.totalWin > this.winArr[1]) {
                    maxNum = this.winArr[2];
                    this.showIconEvent(2);
                }
                else if (this.playVO.totalWin > this.winArr[0]) {
                    maxNum = this.winArr[1];
                    this.showIconEvent(1);
                }
                else {
                    maxNum = this.winArr[0];
                    this.showIconEvent(0);
                }
                valNum = this.playVO.totalWin;
            }
            else {
                maxNum = this.winArr[0];
                this.showIconEvent(0);
            }
            // this.progress.maximum = maxNum;//模板生成*等级
            // this.progress.value = valNum;
            // this.proTxt.text = FormatUtils.wan5(valNum) + "/" + FormatUtils.wan5(maxNum);
        };
        MyInfoComp1.prototype.showIconEvent = function (len) {
            if (len === void 0) { len = 0; }
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            for (var i = 0; i < 5; i++) {
                if (i < len && this.iconArr[i]) {
                }
                else {
                }
            }
        };
        return MyInfoComp1;
    }(gameabc.UICustomComponent));
    myInfo.MyInfoComp1 = MyInfoComp1;
    __reflect(MyInfoComp1.prototype, "myInfo.MyInfoComp1");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=MyInfoComp1.js.map