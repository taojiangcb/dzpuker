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
    var HappyItemComp = (function (_super) {
        __extends(HappyItemComp, _super);
        function HappyItemComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyItemSkin";
            return _this;
        }
        HappyItemComp.prototype.setVO = function (vo) {
            this.playvo = vo;
            if (vo == null) {
                this.headimg.visible = this.namelab.visible = this.moneylab.visible = false;
                this.sitimg.visible = true;
            }
            else {
                this.headimg.visible = this.namelab.visible = this.moneylab.visible = true;
                this.sitimg.visible = false;
                this.updateUserName(vo.name);
                this.moneylab.text = FormatUtils.wan(vo.totalBet);
                this.refAvatar();
            }
        };
        HappyItemComp.prototype.sitlabvisable = function (value) {
            this.sitimg.visible = value && this.playvo == null;
        };
        HappyItemComp.prototype.setBet = function () {
            if (this.playvo != null)
                this.moneylab.text = FormatUtils.wan(this.playvo.totalBet);
        };
        HappyItemComp.prototype.refAvatar = function () {
            if (this.playvo != null)
                this.headimg.source = user.getProxy().getHeadStr(Number(this.playvo.avatarID));
        };
        HappyItemComp.prototype.setisBank = function () {
            // this.sitlab.text = "";
            this.sitimg.removeFromParent();
            this.isBank = true;
        };
        /**
       * TODO
       * 汉字最多5个字,超过5个则显示4个汉字+..
       * 英文最多8个字，超过显示6个字母+..
       */
        HappyItemComp.prototype.updateUserName = function (newName) {
            var textSize = 19;
            var textLen = 0;
            var textBold = true;
            var isSelf = this.isBank;
            if (newName) {
                var nameLen = newName.length;
                for (var i = 0; i < nameLen; i++) {
                    var charASC = newName.charCodeAt(i);
                    if (charASC < 128) {
                        textLen++;
                    }
                    else {
                        textLen += 2;
                    }
                }
            }
            if (textLen > 11) {
                textSize = 13;
                textBold = false;
            }
            else if (textLen > 9) {
                textSize = 13;
                textBold = false;
            }
            else if (textLen > 8) {
                textSize = 16;
            }
            else if (textLen > 7) {
                textSize = 17;
            }
            else if (textLen > 5) {
                textSize = 18;
            }
            if (!isSelf) {
                textSize--;
            }
            this.namelab.size = textSize;
            this.namelab.text = newName;
        };
        return HappyItemComp;
    }(gameabc.UICustomComponent));
    happy.HappyItemComp = HappyItemComp;
    __reflect(HappyItemComp.prototype, "happy.HappyItemComp");
})(happy || (happy = {}));
//# sourceMappingURL=HappyItemComp.js.map