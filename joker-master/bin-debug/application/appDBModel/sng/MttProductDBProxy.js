var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var match;
(function (match) {
    function getProductProxy() {
        return __GET_PROXY(MttProductDBProxy);
    }
    match.getProductProxy = getProductProxy;
    var MttProductDBProxy = (function (_super) {
        __extends(MttProductDBProxy, _super);
        function MttProductDBProxy(proxyName, data) {
            var _this = _super.call(this, MttProductDBProxy.NAME) || this;
            /** 商品列表 参数 numid, username, session, areaid GET */
            _this.exchange_product_list_url = "http://match2.gametea.com/2015/activity/public/texas/product";
            /** 激活 numid, username, session  POST */
            _this.active_product_url = "http://match2.gametea.com/2015/activity/public/texas/activation";
            /** 兑换 参数 numid, username, session, areaid, pid(商品ID) POST */
            _this.exchange_product_url = "http://match2.gametea.com/2015/activity/public/texas/exchange";
            /** 兑换记录 参数 numid, session, areaid  GET */
            _this.history_prouct_url = "http://match2.gametea.com/2015/activity/public/texas/exchange/history";
            /** 红包列表 参数未定 */
            _this.exchange_redpack_list_url = "http://match2.gametea.com/2015/activity/public/dezredpage/getPropList";
            /** 兑换单个红包 参数未定 */
            _this.exchange_redpack_url = "http://match2.gametea.com/2015/activity/public/dezredpage/sendRedPage";
            /** 查看兑换记录 参数未定 */
            _this.history_redpack_url = "http://match2.gametea.com/2015/activity/public/dezredpage/getMyRedPages";
            _this.curUrl = ""; //当前请求的地
            _this.ticket = 0; //点卷数量
            /**
             * 商品列表
             */
            _this.product_list = [];
            /**
             * 当前正在兑换的商品id
             */
            _this.curId = "";
            _this.netlock = false;
            return _this;
        }
        MttProductDBProxy.prototype.checkLock = function () {
            if (this.netlock) {
                tip.popSysCenterTip("对不起，您操作太频繁了，请稍后再试");
                return true;
            }
            else {
                this.netlock = true;
                return false;
            }
        };
        /**
         * 获取商品列表
         */
        MttProductDBProxy.prototype.updateProductList = function () {
            var _this = this;
            if (this.checkLock())
                return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION, function () {
                _this.listenerHttp(_this.generateHttp());
                _this.curUrl = _this.exchange_product_list_url;
                var sendParam = _this.getSvrParam();
                _this.http_req.open(_this.curUrl + "?" + gameabc.StringUtils.formatHttpParams(sendParam), egret.HttpMethod.GET);
                _this.http_req.send();
            });
        };
        /**
         * 获取红包列表
         */
        MttProductDBProxy.prototype.updateRedpackList = function () {
            var _this = this;
            if (this.checkLock())
                return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION, function () {
                _this.listenerHttp(_this.generateHttp());
                _this.curUrl = _this.exchange_redpack_list_url;
                var sendParam = _this.getSvrParam();
                // var requestUrlStr = this.curUrl + "?" + gameabc.StringUtils.formatHttpParams(sendParam);
                // console.log(requestUrlStr);
                _this.http_req.responseType = egret.HttpResponseType.TEXT;
                _this.http_req.open(_this.curUrl, egret.HttpMethod.POST);
                _this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                _this.http_req.send(gameabc.StringUtils.formatHttpParams(sendParam));
                // this.http_req.send();
            });
        };
        /**
         * 兑换商品
         */
        MttProductDBProxy.prototype.exchangeProduct = function (productInfo, usrName, phone) {
            var _this = this;
            if (this.checkLock())
                return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION, function () {
                _this.listenerHttp(_this.generateHttp());
                _this.curUrl = _this.exchange_product_url;
                _this.curId = productInfo.id;
                _this.http_req.responseType = egret.HttpResponseType.TEXT;
                _this.http_req.open(_this.curUrl, egret.HttpMethod.POST);
                var sendParam = _this.getPtParam(productInfo, usrName, phone);
                _this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                _this.http_req.send(gameabc.StringUtils.formatHttpParams(sendParam));
            });
        };
        /**
         * 兑换红包
         */
        MttProductDBProxy.prototype.exchangeRedpack = function (redpackVO) {
            var _this = this;
            if (this.checkLock())
                return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION, function () {
                _this.listenerHttp(_this.generateHttp());
                _this.curUrl = _this.exchange_redpack_url;
                var sendParam = _this.getSvrParam();
                sendParam.propid = redpackVO.id;
                _this.http_req.responseType = egret.HttpResponseType.TEXT;
                _this.http_req.open(_this.curUrl, egret.HttpMethod.POST);
                _this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                _this.http_req.send(gameabc.StringUtils.formatHttpParams(sendParam));
            });
        };
        /**
         * 兑换码激活
         */
        MttProductDBProxy.prototype.activeProduct = function (code) {
            var _this = this;
            if (this.checkLock())
                return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION, function () {
                _this.listenerHttp(_this.generateHttp());
                _this.curUrl = _this.active_product_url;
                var sendParam = _this.getSvrParam();
                sendParam["code"] = code;
                _this.http_req.responseType = egret.HttpResponseType.TEXT;
                _this.http_req.open(_this.curUrl, egret.HttpMethod.POST);
                _this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                _this.http_req.send(gameabc.StringUtils.formatHttpParams(sendParam));
            });
        };
        /**
         * 历史记录
         */
        MttProductDBProxy.prototype.getHistory = function () {
            var _this = this;
            if (this.checkLock())
                return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION, function () {
                _this.listenerHttp(_this.generateHttp());
                _this.curUrl = _this.history_prouct_url;
                _this.http_req.responseType = egret.HttpResponseType.TEXT;
                _this.http_req.open(_this.curUrl + "?" + gameabc.StringUtils.formatHttpParams(_this.getSvrParam()), egret.HttpMethod.GET);
                _this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                _this.http_req.send();
            });
        };
        /**
         * 红包历史记录
         */
        MttProductDBProxy.prototype.getRedpackHistory = function () {
            var _this = this;
            if (this.checkLock())
                return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION, function () {
                _this.listenerHttp(_this.generateHttp());
                _this.curUrl = _this.history_redpack_url;
                _this.http_req.responseType = egret.HttpResponseType.TEXT;
                _this.http_req.open(_this.curUrl + "?" + gameabc.StringUtils.formatHttpParams(_this.getSvrParam()), egret.HttpMethod.GET);
                _this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                _this.http_req.send();
            });
        };
        MttProductDBProxy.prototype.generateHttp = function () {
            if (this.http_req) {
                this.removeHttpListener(this.http_req);
                this.http_req.abort();
            }
            this.http_req = new egret.HttpRequest();
            return this.http_req;
        };
        MttProductDBProxy.prototype.removeHttpListener = function (httpReq) {
            httpReq.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            httpReq.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            httpReq.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
            this.curUrl = "";
        };
        MttProductDBProxy.prototype.listenerHttp = function (httpReq) {
            httpReq.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            httpReq.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        MttProductDBProxy.prototype.onGetComplete = function (event) {
            var _this = this;
            this.netlock = false;
            var response_data = "";
            var error_msg;
            var error_id = 0;
            if (this.curUrl == this.exchange_redpack_list_url) {
                response_data = JSON.parse(this.http_req.response);
                if (response_data.status == 0) {
                    this.product_list = [];
                    var list = response_data.data;
                    if (list) {
                        list.forEach(function (element) {
                            _this.product_list.push(new MTTRedpackVO(element.propid, element.num));
                        });
                    }
                    this.ticket = parseInt(response_data.data.ticket);
                    //列表发生了更新
                    __SEND_NOTIFICATION(match.MttExchangeMediator.UPDATE_PRODUCT_LIST);
                }
            }
            else if (this.curUrl == this.exchange_product_list_url) {
                response_data = JSON.parse(this.http_req.response);
                if (response_data.status == 0) {
                    this.product_list = [];
                    var list = response_data.data.product;
                    if (list) {
                        list.forEach(function (element) {
                            _this.product_list.push(new MTTProductVO(element.title, element.exprice, element.desc, element.pic, element.id));
                        });
                    }
                    this.ticket = parseInt(response_data.data.ticket);
                    //列表发生了更新
                    __SEND_NOTIFICATION(match.MttExchangeMediator.UPDATE_PRODUCT_LIST);
                }
                else {
                    error_id = response_data.status;
                    error_msg = response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
            else if (this.curUrl == this.exchange_product_url) {
                response_data = JSON.parse(this.http_req.response);
                if (response_data.status == 0) {
                    var productInfo = this.findProductVO(this.curId);
                    this.ticket = Math.max(this.ticket - productInfo.num, 0);
                    var msg = response_data.info;
                    tip.popSysCenterTip(msg);
                    console.log(msg);
                    __SEND_NOTIFICATION(match.MttExchangeMediator.EXCHANGE_RESULT);
                }
                else {
                    error_id = response_data.status;
                    error_msg = response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
            else if (this.curUrl == this.exchange_redpack_url) {
                response_data = JSON.parse(this.http_req.response);
                if (response_data.status == 0) {
                    var productInfo = this.findProductVO(response_data.data.propid);
                    --productInfo.num;
                    var msg = response_data.info;
                    tip.popSysCenterTip(msg);
                    console.log(msg);
                    match.getProxy().getRedpackStatusAlert(response_data.status);
                    __SEND_NOTIFICATION(match.MttExchangeMediator.UPDATE_PRODUCT_LIST);
                }
                else {
                    if (response_data.status == 2) {
                        match.getProxy().getRedpackStatusAlert(response_data.status);
                    }
                    else {
                        error_id = response_data.status;
                        error_msg = response_data.info;
                        tip.popSysCenterTip(error_msg);
                        console.log(error_msg);
                    }
                }
            }
            else if (this.curUrl == this.active_product_url) {
                response_data = JSON.parse(this.http_req.response);
                if (response_data.status == 0) {
                    tip.popSysCenterTip("激活成功");
                    __SEND_NOTIFICATION(match.MttExchangeMediator.EXCHANGE_CODE_RESULT);
                }
                else {
                    error_id = response_data.status;
                    error_msg = response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
            else if (this.curUrl == this.history_prouct_url) {
                response_data = JSON.parse(this.http_req.response);
                if (response_data.status == 0) {
                    var dateTimes = [];
                    var list = response_data.data;
                    list.forEach(function (element) {
                        dateTimes.push(new HitoryVO(element.title, element.time));
                    });
                    __SEND_NOTIFICATION(match.MttExchangeMediator.EXCHANGE_HISTORY, list);
                }
                else {
                    error_id = response_data.status;
                    error_msg = response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
            else if (this.curUrl == this.history_redpack_url) {
                response_data = JSON.parse(this.http_req.response);
                if (response_data.status == 0) {
                    var dateTimes = [];
                    var list = response_data.info;
                    list.forEach(function (element) {
                        dateTimes.push(new HitoryVO(element.title, element.time));
                    });
                    __SEND_NOTIFICATION(match.MttExchangeMediator.EXCHANGE_HISTORY, list);
                }
                else {
                    error_id = response_data.status;
                    error_msg = response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
        };
        MttProductDBProxy.prototype.findProductVO = function (pid) {
            var len = this.product_list.length;
            while (--len > -1) {
                if (pid == this.product_list[len].id)
                    return this.product_list[len];
            }
            return null;
        };
        MttProductDBProxy.prototype.onGetIOError = function (event) {
            console.log("post error : " + event);
        };
        MttProductDBProxy.prototype.onGetProgress = function (event) {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        };
        /**
         * 基础参数
         */
        MttProductDBProxy.prototype.getSvrParam = function () {
            return {
                numid: user.getProxy().svrNumId,
                username: user.getProxy().svrName,
                session: "{" + user.getProxy().formatSvrTmpSession + "}",
                areaid: user.getProxy().svrAreaId
            };
        };
        /**
         * 兑换参数
         */
        MttProductDBProxy.prototype.getPtParam = function (ptvo, usrName, phone) {
            return {
                numid: user.getProxy().svrNumId,
                username: user.getProxy().svrName,
                session: "{" + user.getProxy().formatSvrTmpSession + "}",
                areaid: user.getProxy().svrAreaId,
                pid: ptvo.id,
                realname: usrName,
                phone: phone
            };
        };
        return MttProductDBProxy;
    }(app.mvc.AbsractProxy));
    MttProductDBProxy.NAME = "__MttProductDBProxy__";
    match.MttProductDBProxy = MttProductDBProxy;
    __reflect(MttProductDBProxy.prototype, "match.MttProductDBProxy");
    var ExProductVO = (function () {
        function ExProductVO() {
        }
        return ExProductVO;
    }());
    match.ExProductVO = ExProductVO;
    __reflect(ExProductVO.prototype, "match.ExProductVO");
    /**
     * 商品列表VO
     */
    var MTTProductVO = (function (_super) {
        __extends(MTTProductVO, _super);
        function MTTProductVO(title, exprice, desc, pic, id) {
            var _this = _super.call(this) || this;
            _this.title = ""; //产品名称
            _this.desc = ""; //描述
            _this.pic = ""; //图片
            _this.title = title;
            _this.desc = desc;
            _this.pic = pic;
            _this.id = id;
            _this.num = parseInt(exprice);
            return _this;
        }
        return MTTProductVO;
    }(ExProductVO));
    match.MTTProductVO = MTTProductVO;
    __reflect(MTTProductVO.prototype, "match.MTTProductVO");
    /**
     * 红包列表VO
     */
    var MTTRedpackVO = (function (_super) {
        __extends(MTTRedpackVO, _super);
        function MTTRedpackVO(id, num) {
            var _this = _super.call(this) || this;
            _this.id = String(id);
            _this.num = num;
            return _this;
        }
        return MTTRedpackVO;
    }(ExProductVO));
    match.MTTRedpackVO = MTTRedpackVO;
    __reflect(MTTRedpackVO.prototype, "match.MTTRedpackVO");
    /**
     * 历史列表
     */
    var HitoryVO = (function () {
        function HitoryVO(title, time) {
            this.title = "";
            this.time = "";
            this.title = title;
            this.time = time;
        }
        return HitoryVO;
    }());
    match.HitoryVO = HitoryVO;
    __reflect(HitoryVO.prototype, "match.HitoryVO");
})(match || (match = {}));
//# sourceMappingURL=MttProductDBProxy.js.map