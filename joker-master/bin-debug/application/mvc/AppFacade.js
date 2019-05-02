var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author
 */
var app;
(function (app) {
    var mvc;
    (function (mvc) {
        var AppFacade = (function (_super) {
            __extends(AppFacade, _super);
            function AppFacade() {
                return _super.call(this) || this;
            }
            AppFacade.getInstance = function () {
                if (this.__infcade == null)
                    this.__infcade = new AppFacade();
                return (this.__infcade);
            };
            return AppFacade;
        }(puremvc.Facade));
        mvc.AppFacade = AppFacade;
        __reflect(AppFacade.prototype, "app.mvc.AppFacade");
    })(mvc = app.mvc || (app.mvc = {}));
})(app || (app = {}));
/***
 * 发送数据
 * */
var __SEND_PARAMVO = function (action, intValues, strValues, longValues, data, cbFunc, thisObj) {
    if (intValues === void 0) { intValues = []; }
    if (strValues === void 0) { strValues = []; }
    if (longValues === void 0) { longValues = []; }
    if (data === void 0) { data = []; }
    if (cbFunc === void 0) { cbFunc = null; }
    if (thisObj === void 0) { thisObj = null; }
    //    var pramClass = AppGlobal.getMessage("ParamVO");
    //    var pram = new pramClass({
    //        "intValues": intValues,
    //        "strValues": strValues,
    //        "longValues": longValues,
    //        "data": data
    //    });
    var pram = __GET_PARAMVO(intValues, strValues, longValues, data);
    pram.backFun = cbFunc;
    pram.thisObj = thisObj;
    app.mvc.AppFacade.getInstance().sendNotification(action, pram);
};
var __GET_PARAMVO = function (intValues, strValues, longValues, data) {
    if (intValues === void 0) { intValues = []; }
    if (strValues === void 0) { strValues = []; }
    if (longValues === void 0) { longValues = []; }
    if (data === void 0) { data = []; }
    var pramClass = AppGlobal.getMessage("ParamVO");
    var pram = new pramClass({
        "intValues": intValues,
        "strValues": strValues,
        "longValues": longValues,
        "data": data
    });
    return pram;
};
var __SEND_NOTIFICATION = function (name, body, type) {
    app.mvc.AppFacade.getInstance().sendNotification(name, body, type);
};
var __HAS_NOTIFICATION = function (name) {
    return app.mvc.AppFacade.getInstance().hasCommand(name);
};
/**
* 返回protobuf Int64长整型
* */
var __SET_INT64 = function (num) {
    return dcodeIO.Long.fromNumber(num);
};
var __REGISTER_MEDIATOR = function (mediator_cls, uiComp) {
    if (uiComp === void 0) { uiComp = null; }
    if (mediator_cls.NAME) {
        var mediator = new mediator_cls(uiComp);
        app.mvc.AppFacade.getInstance().registerMediator(mediator);
    }
};
var __GET_MEDIATOR = function (mediator_cls) {
    if (mediator_cls.NAME) {
        return app.mvc.AppFacade.getInstance().retrieveMediator(mediator_cls.NAME);
    }
};
var __DISPOSE_MEDIATOR = function (mediator_cls) {
    if (mediator_cls.NAME) {
        __GET_MEDIATOR(mediator_cls).dispose();
    }
};
var __REMOVE_MEDIATOR = function (mediator_cls) {
    if (mediator_cls.NAME) {
        return app.mvc.AppFacade.getInstance().removeMediator(mediator_cls.NAME);
    }
};
var __REGISTER_PROXY = function (proxy_cls, data) {
    if (data === void 0) { data = null; }
    if (proxy_cls.NAME) {
        var proxy = new proxy_cls(data);
        app.mvc.AppFacade.getInstance().registerProxy(proxy);
    }
};
var __GET_PROXY = function (proxy_cls) {
    if (proxy_cls.NAME) {
        return app.mvc.AppFacade.getInstance().retrieveProxy(proxy_cls.NAME);
    }
};
var __DISPOSE_PROXY = function (proxy_cls) {
    if (proxy_cls.NAME) {
        __GET_PROXY(proxy_cls).dispose();
    }
};
var __REMOVE_PROXY = function (proxy_cls) {
    if (proxy_cls.NAME) {
        return app.mvc.AppFacade.getInstance().removeProxy(proxy_cls.NAME);
    }
};
var __REGISTER_NET_COMMAND = function (_ACTION_ID, CMD_CLS) {
    app.mvc.AppFacade.getInstance().registerCommand(_ACTION_ID.toString(), CMD_CLS);
};
var __REMOVE_NET_COMMAND = function (_ACTION_ID) {
    app.mvc.AppFacade.getInstance().removeCommand(_ACTION_ID.toString());
};
var __REGISTER_COMMAND = function (commandName, CMD_CLS) {
    app.mvc.AppFacade.getInstance().registerCommand(commandName, CMD_CLS);
};
//# sourceMappingURL=AppFacade.js.map