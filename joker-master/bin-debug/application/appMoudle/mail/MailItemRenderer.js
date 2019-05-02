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
    var MailItemRenderer = (function (_super) {
        __extends(MailItemRenderer, _super);
        function MailItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/mail/MailListItemSkin.exml";
            return _this;
        }
        MailItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.touchChildren = false;
            this.addButton(this, false);
        };
        MailItemRenderer.prototype.dataChanged = function () {
            this.id = this.data.id;
            this.type = this.data.type;
            this.titleLabel.text = this.data.title;
            this.titleLabel.textColor = this.data.flag == 1 ? AppConst.TextColors.yellow : AppConst.TextColors.white;
            if (this.data.formatId == 1) {
                this.contextLabel.textFlow = mail.MailUIMoudle.getMatchContextFormat(this.data.context);
            }
            else {
                this.contextLabel.text = this.data.context;
            }
            this.contextLabel.text = this.getShortContext(this.contextLabel.text);
            if (this.data.flag == 2) {
                this.contextLabel.textColor = AppConst.TextColors.lightPurple;
            }
            this.timeLabel.text = this.getTime(this.data.createTime);
            this.mailImage.source = this.data.flag == 1 ? "icon_mail_wdzt_png" : "icon_mail_ydzt_png";
            this.redPointImage.visible = this.data.flag == 1 ? true : false;
        };
        MailItemRenderer.prototype.getTime = function (mailTime) {
            var nowTime = new Date().getTime();
            if (nowTime - mailTime < 24 * 3600 * 1000) {
                var hours = Math.floor((nowTime - mailTime) / (3600 * 1000));
                var minutes = Math.floor((nowTime - mailTime) % (3600 * 1000) / (60 * 1000));
                if (hours > 0) {
                    return hours + "小时" + minutes + "分钟";
                }
                else {
                    if (minutes < 5)
                        return "刚刚";
                    else
                        return minutes + "分钟";
                }
            }
            else {
                return DateUtils.dateFormat(new Date(mailTime), "yyyy-MM-dd");
            }
        };
        MailItemRenderer.prototype.getShortContext = function (context) {
            var number = 33;
            var width = 0;
            var shortContext;
            if (context.length <= number) {
                shortContext = context;
            }
            else {
                shortContext = context.substr(0, number - 1);
                for (var i = number - 1; i < context.length; i++) {
                    var shortContextLabel = new eui.Label(shortContext);
                    shortContextLabel.size = 20;
                    var labelWidth = shortContextLabel.width;
                    if (labelWidth >= (number - 1) * 20 && shortContext.length < context.length) {
                        shortContext += "...";
                        break;
                    }
                    else {
                        shortContext += context[i];
                    }
                }
            }
            return shortContext;
        };
        MailItemRenderer.prototype.click = function (tag) {
            var i;
            for (i = 0; i < user.getProxy().ImsVO.length; i++) {
                if (user.getProxy().ImsVO[i].id == this.id) {
                    if (user.getProxy().ImsVO[i].flag == 1) {
                        var paramVO = new appvos.ParamVO();
                        paramVO.longValues = [this.id, user.getProxy().svrRoleId];
                        paramVO.intValues = [this.type];
                        __SEND_NOTIFICATION(app.NetAction.IMS_READ, paramVO);
                    }
                    else {
                        __OPEN_MOUDLE(AppReg.APP_MAIL_SUB, user.getProxy().ImsVO[i]);
                    }
                    break;
                }
            }
        };
        return MailItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    mail.MailItemRenderer = MailItemRenderer;
    __reflect(MailItemRenderer.prototype, "mail.MailItemRenderer");
})(mail || (mail = {}));
//# sourceMappingURL=MailItemRenderer.js.map