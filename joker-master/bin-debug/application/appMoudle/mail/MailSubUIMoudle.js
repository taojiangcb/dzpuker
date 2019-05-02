var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mail;
(function (mail) {
    var MailSubUIMoudle = (function (_super) {
        __extends(MailSubUIMoudle, _super);
        function MailSubUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = -20;
            _this.skinName = "resource/app_skin/mail/MailSubUIMoudleSkin.exml";
            return _this;
        }
        MailSubUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.mailSubTitleLabel.text = this.data.title;
            if (this.data.formatId == 1) {
                this.contextLabel.textFlow = mail.MailUIMoudle.getMatchContextFormat(this.data.context);
            }
            else {
                this.contextLabel.text = this.data.context;
            }
            //            console.log(this.data.type);
            this.timeLabel.text = DateUtils.dateFormat(new Date(this.data.createTime + MailSubUIMoudle.time[this.data.type] * (24 * 3600 * 1000)), "yyyy-MM-dd");
        };
        MailSubUIMoudle.prototype.setData = function (data) {
            this.data = data;
        };
        //        protected touchHandler(event: egret.TouchEvent): void {
        //            var tag: egret.DisplayObject = event.currentTarget;
        //            switch (tag) {
        //                case this.confirmButton:
        //                    this.close();
        //                    break;
        //                default:
        //                    break;
        //            }
        //        }
        MailSubUIMoudle.prototype.dispose = function () {
            //            this.unbindButton(this.confirmButton);
            _super.prototype.dispose.call(this);
        };
        return MailSubUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    MailSubUIMoudle.time = [0, 7, 14, 7];
    mail.MailSubUIMoudle = MailSubUIMoudle;
    __reflect(MailSubUIMoudle.prototype, "mail.MailSubUIMoudle");
})(mail || (mail = {}));
//# sourceMappingURL=MailSubUIMoudle.js.map