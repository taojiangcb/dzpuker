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
    var MailUIMoudle = (function (_super) {
        __extends(MailUIMoudle, _super);
        function MailUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = -20;
            _this.skinName = "resource/app_skin/mail/MailUIMoudleSkin.exml";
            return _this;
        }
        MailUIMoudle.prototype.createComplete = function (event) {
            var paramVO = new appvos.ParamVO();
            paramVO.longValues = [parseInt(platform.CHANNE_ID), user.getProxy().svrRoleId];
            __SEND_NOTIFICATION(app.NetAction.IMS_GETS, paramVO);
            _super.prototype.createComplete.call(this, event);
            __REGISTER_MEDIATOR(mail.MailUIMediator, this);
        };
        MailUIMoudle.prototype.initList = function () {
            this.tipLabel.visible = user.getProxy().ImsVO.length > 0 ? false : true;
            this.data = new eui.ArrayCollection(user.getProxy().ImsVO);
            this.list.dataProvider = this.data;
            this.list.itemRenderer = mail.MailItemRenderer;
        };
        MailUIMoudle.prototype.refreshData = function () {
            this.data.refresh();
        };
        MailUIMoudle.prototype.dispose = function () {
            user.getProxy().ImsVO = null;
            __REMOVE_MEDIATOR(mail.MailUIMediator);
            _super.prototype.dispose.call(this);
        };
        MailUIMoudle.getMatchContextFormat = function (context) {
            var formatContext = [];
            var contextArray = context.split(",");
            for (var i = 0; i < MailUIMoudle.matchContextFormat.length; i++) {
                formatContext.push({ text: MailUIMoudle.matchContextFormat[i] });
                if (i < contextArray.length)
                    formatContext.push({ text: contextArray[i], style: { "textColor": AppConst.TextColors.red } });
            }
            return formatContext;
        };
        return MailUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    MailUIMoudle.matchContextFormat = ["您于", "在边锋德州SNG比赛", "中获得", "，奖励", "彩豆，", "大师分"];
    mail.MailUIMoudle = MailUIMoudle;
    __reflect(MailUIMoudle.prototype, "mail.MailUIMoudle");
})(mail || (mail = {}));
//# sourceMappingURL=MailUIMoudle.js.map