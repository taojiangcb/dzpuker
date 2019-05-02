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
 *SNG
 * @author
 *
 */
    var MyInfoComp2 = (function (_super) {
        __extends(MyInfoComp2, _super);
        function MyInfoComp2() {
            var _this = _super.call(this) || this;
            _this.current = 3;
            _this.skinName = "MyInfoComp2Skin";
            _this.currentCom = _this.dan3;
            return _this;
        }
        MyInfoComp2.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btn1);
            this.bindButton(this.btn2);
        };
        /**
       * 设置数据
       * @param vo
       */
        MyInfoComp2.prototype.setData = function (vo, playVo) {
            if (vo === void 0) { vo = null; }
            if (playVo === void 0) { playVo = null; }
            if (vo == null)
                vo = user.getProxy().svrPlayerInfo;
            this.roleVO = vo;
            if (playVo) {
                this.playVO = playVo;
            }
            this.current = 3;
            this.showDan1();
            this.showDan2();
            this.showDan3();
        };
        /**
      *
      * 段位规则 总盈利 先注释
      */
        MyInfoComp2.prototype.showDan1 = function () {
            // this.dan1["prog1"].value = this.roleVO.master;
            this.dan1["prog1"].maximum = 3000;
        };
        /**
    *
    * 得分记录
    */
        MyInfoComp2.prototype.showDan2 = function () {
        };
        /**
  *
  * 默认
  */
        MyInfoComp2.prototype.showDan3 = function () {
            //this.dan3["lvImg"].source = "img_word_dan_type" + this.roleVO.masterLV+"_png";
            this.dan3["infoLable1"]["icon"].source = "img_word_info_dashifen_png";
            this.dan3["infoLable1"]["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //this.roleVO.master + "";
        };
        MyInfoComp2.prototype.touchBindButtonHandler = function (evt) {
            switch (evt.target) {
                case this.btn1:
                    if (this.btn1.selected) {
                        this.current = 1;
                        this.btn2.selected = false;
                    }
                    else {
                        this.current = 3;
                        this.btn2.selected = false;
                    }
                    this.choiceEvent();
                    break;
                case this.btn2:
                    if (this.btn2.selected) {
                        this.current = 2;
                        this.btn1.selected = false;
                    }
                    else {
                        this.current = 3;
                        this.btn1.selected = false;
                    }
                    this.choiceEvent();
                    break;
            }
        };
        MyInfoComp2.prototype.choiceEvent = function () {
            this.currentCom.visible = false;
            switch (this.current) {
                case 1:
                    this.currentCom = this.dan1;
                    break;
                case 2:
                    this.currentCom = this.dan2;
                    break;
                case 3:
                    this.currentCom = this.dan3;
                    break;
            }
            this.currentCom.visible = true;
        };
        return MyInfoComp2;
    }(gameabc.UICustomComponent));
    myInfo.MyInfoComp2 = MyInfoComp2;
    __reflect(MyInfoComp2.prototype, "myInfo.MyInfoComp2");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=MyInfoComp2.js.map