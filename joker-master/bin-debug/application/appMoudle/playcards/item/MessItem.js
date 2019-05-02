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
     * 聊天泡泡
     * @author
     *
     */
    var MessItem = (function (_super) {
        __extends(MessItem, _super);
        function MessItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MessItemSkin";
            return _this;
            // this.setSend(send);
            // this.mess = mess;
            // this.once(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this)
        }
        MessItem.prototype.setpos = function () {
            egret.clearTimeout(this.timeid);
            this.timeid = egret.setTimeout(this.close, this, 3000);
            this.messlab.text = this.mess;
            if (this.px == null && this.px == null)
                return;
            if (this.send instanceof playcards.PlayCardsItemComp) {
                if (this.py < 100) {
                    //  this.bgimg.scaleY = -1;
                    this.currentState = "top";
                    this.y = this.py + 130;
                    this.x = this.px;
                }
                else if (this.py > 400) {
                    //  this.bgimg.scaleY = 1;
                    this.currentState = "bottom";
                    //  this.y = this.py - 95;
                    this.bottom = 768 - this.py;
                    this.x = this.px;
                }
                else if (this.px < 400) {
                    //  this.bgimg.scaleX = -1;
                    this.currentState = "left";
                    this.x = this.px + 110;
                    this.y = this.py;
                }
                else {
                    //  this.bgimg.scaleX = 1;
                    this.currentState = "right";
                    // this.x = this.px - 70;
                    this.right = 1126 - this.px;
                    this.y = this.py;
                }
            }
            //  else {
            //     this.messlab.left = this.messlab.right = 30;
            //     this.messlab.top = this.messlab.bottom = 20;
            //     this.x = this.px;
            //     this.y = this.py;
            // }
        };
        MessItem.prototype.setSend = function (send) {
            if (send != null) {
                this.send = send;
                send.sendMess = this;
                this.px = send.x;
                this.py = send.y;
            }
        };
        MessItem.prototype.show = function (send, mess) {
            this.setSend(send);
            this.showMess(mess);
        };
        MessItem.prototype.showXY = function (px, py, mess, currentState) {
            this.x = px;
            this.y = py;
            this.showMess(mess);
            this.currentState = currentState;
        };
        MessItem.prototype.showMess = function (mess) {
            this.mess = mess;
            // if (this.messlab != null)
            this.setpos();
        };
        MessItem.prototype.clearTimeout = function () {
            egret.clearTimeout(this.timeid);
        };
        MessItem.prototype.close = function () {
            if (this.send != null) {
                this.send.sendMess = null;
                this.send = null;
            }
            this.removeFromParent(true);
        };
        return MessItem;
    }(eui.Component));
    playcards.MessItem = MessItem;
    __reflect(MessItem.prototype, "playcards.MessItem");
})(playcards || (playcards = {}));
//# sourceMappingURL=MessItem.js.map