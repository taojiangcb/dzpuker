var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/6/24.
 */
var antiSystem;
(function (antiSystem) {
    var RealNameUIModule = (function (_super) {
        __extends(RealNameUIModule, _super);
        function RealNameUIModule() {
            var _this = _super.call(this) || this;
            //REAL_NAME_URL:string = "http://my.gametea.com/gametea.php/truename/mblauth/%s/%d/%d/%s/%d/%s/%s"
            //http://my.gametea.com/gametea.php/token/appid/areaID/strptid/numid/身份证/名字
            _this.REAL_NAME_URL = "http://open.gametea.com/truename/verify";
            _this.skinName = "resource/app_skin/antiAddiction/RealNameSkin.exml";
            return _this;
        }
        RealNameUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnClose);
            this.bindButton(this.okBtn);
        };
        RealNameUIModule.prototype.touchBindButtonHandler = function (tag) {
            var target = tag;
            if (target == this.btnClose) {
                this.close();
            }
            else if (target == this.okBtn) {
                if (!this.urlRq) {
                    this.urlRq = new egret.HttpRequest();
                }
                else {
                    this.removelistener(this.urlRq);
                    this.urlRq.abort();
                }
                this.urlRq = new egret.HttpRequest();
                this.urlRq.responseType = egret.HttpResponseType.TEXT;
                this.httpListener(this.urlRq);
                var token = user.getProxy().propertURL;
                token = token.substr(token.indexOf("=") + 1);
                // var appId:number = AppConst.CONNECT_SERVER.appId;
                // var areaId:number = user.getProxy().svrAreaId;
                // var strptid:string = user.getProxy().reqPlayerPlusData.ptid;
                // var numId:number = user.getProxy().svrNumId;
                // var cardNum:string = this.txtNumber.text;
                // var youname:string = this.txtName.text;
                var params = {
                    token: token,
                    ptid: user.getProxy().reqPlayerPlusData.ptid,
                    numid: user.getProxy().svrNumId,
                    userName: this.txtName.text,
                    idCard: this.txtNumber.text
                };
                var param_str = gameabc.StringUtils.formatHttpParams(params);
                if (params.userName == "") {
                    tip.popSysCenterTip(gameabc.getMessage("NAME_NOT_NULL"));
                    return;
                }
                if (params.idCard < 18) {
                    tip.popSysCenterTip(gameabc.getMessage("CARD_NUM_WRONG"));
                    return;
                }
                //var getUrl:string = gameabc.StringUtils.formatString(this.REAL_NAME_URL, token, appId, areaId, strptid, numId, cardNum, youname);
                this.urlRq.open(this.REAL_NAME_URL, egret.HttpMethod.POST);
                this.urlRq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.urlRq.send(param_str);
            }
        };
        RealNameUIModule.prototype.httpListener = function (request) {
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        RealNameUIModule.prototype.removelistener = function (request) {
            request.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        RealNameUIModule.prototype.onGetComplete = function (event) {
            console.log(">>" + this.urlRq.response);
            var response_data = JSON.parse(this.urlRq.response);
            var msg = decodeURI(response_data.msg);
            tip.popSysCenterTip(msg);
            /**
             * 验证成功
             */
            if (parseInt(response_data.result) == 0) {
                user.getProxy().propertURL = "";
                this.close();
            }
        };
        RealNameUIModule.prototype.onGetIOError = function (event) {
            console.log("get error : " + event);
            tip.popSysCenterTip("get error :" + egret.IOErrorEvent.IO_ERROR);
            this.close();
        };
        RealNameUIModule.prototype.onGetProgress = function (event) {
            console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        };
        return RealNameUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    antiSystem.RealNameUIModule = RealNameUIModule;
    __reflect(RealNameUIModule.prototype, "antiSystem.RealNameUIModule");
})(antiSystem || (antiSystem = {}));
//# sourceMappingURL=RealNameUIModule.js.map