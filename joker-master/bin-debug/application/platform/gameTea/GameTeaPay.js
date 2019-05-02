var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var platform;
(function (platform) {
    /**
     * 商城购买
     */
    var GameTeaPay = (function () {
        function GameTeaPay() {
            /***查询商品列表*****/
            this.createListUrl = "http://npay.gametea.com:8003/mobile/getPropList.json";
            /*****下订单****/
            this.orderUrl = "http://npay.gametea.com:8003/mobile/createOrder.json";
            /*****查询订单****/
            this.checkOrderUrl = "http://npay.gametea.com:8003/mobile/checkOrder.json";
            /**
             * 当前请求的url地址
             * @type {string}
             */
            this.requestUrl = "";
            this.gameID = "417001";
            this.key = "db368f1570d526fe52b8863ef18617d9";
            this.gameID = platform.channelCfg().pay_appid.toString();
        }
        /**
         * 获取列表
         */
        GameTeaPay.prototype.createList = function () {
            this.gameID = platform.channelCfg().pay_appid.toString();
            this.requestUrl = this.createListUrl;
            var sigStr = "props_id=" + this.gameID + this.key;
            var sendData = {
                props_id: this.gameID,
                signature: gameabc.md5.hash(sigStr)
            };
            var jsonData = JSON.stringify(sendData);
            console.log("url " + this.requestUrl + " params :" + jsonData);
            if (this.httpRequest == null) {
                this.httpRequest = new comp.GameHttpRequest();
            }
            this.httpRequest.generateHttp();
            this.httpRequest.send(this.requestUrl, egret.HttpMethod.POST, egret.HttpResponseType.TEXT, jsonData, true, this.onGetComplete, this.onGetIOError, this.onGetProgress, this);
        };
        /**
         * 下订单
         * propid 购买商品ID
         * price 实际支付价格
         * sdkID 充值渠道ID
         */
        GameTeaPay.prototype.createOrderList = function (propid, price, sdkID, ip) {
            if (propid === void 0) { propid = 3; }
            if (price === void 0) { price = 11; }
            if (sdkID === void 0) { sdkID = platform.CHANNE_IDS.ANDROID.toString(); }
            if (ip === void 0) { ip = "127.0.0.1"; }
            console.log("into createOrderList channelID:" + sdkID);
            this.requestUrl = this.orderUrl;
            var params = {
                props_id: this.gameID,
                prop_id: propid,
                numid: user.getProxy().svrNumId,
                sdkid: sdkID,
                par_value: price,
                ip: ip + this.key
            };
            var sigStr = gameabc.StringUtils.formatHttpParams(params);
            console.log("url:" + this.requestUrl + " params : " + sigStr);
            // 充值下单新增字段 
            // ext[mac] => 机器码 
            // ext[appType]=》1 安卓，2=》ios
            var sendData = {
                props_id: this.gameID,
                prop_id: propid,
                numid: user.getProxy().svrNumId,
                sdkid: sdkID,
                par_value: price,
                //ip: ip,
                signature: gameabc.md5.hash(sigStr)
            };
            var jsonData = JSON.stringify(sendData);
            if (this.httpRequest == null) {
                this.httpRequest = new comp.GameHttpRequest();
            }
            this.httpRequest.generateHttp();
            this.httpRequest.send(this.requestUrl, egret.HttpMethod.POST, egret.HttpResponseType.TEXT, jsonData, true, this.onGetComplete, this.onGetIOError, this.onGetProgress, this);
        };
        GameTeaPay.prototype.onGetComplete = function (event) {
            var response_data = "";
            var error_msg;
            var error_id = 0;
            console.log(this.httpRequest.response);
            if (this.requestUrl == this.createListUrl) {
                var json = JSON.parse(this.httpRequest.response);
                response_data = json.data;
                if (parseInt(json.code) == 0) {
                    var obj = response_data[0];
                    shop.getProxy().shopItems = json.data;
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.PAY_SUCCEED_ITMES);
                }
                else {
                    console.log(json["message"]);
                    tip.popSysTopTip(json["message"]);
                }
            }
            else if (this.requestUrl == this.orderUrl) {
                var json = JSON.parse(this.httpRequest.response);
                response_data = json.data;
                if (parseInt(json.code) == 0) {
                    var orderid = response_data["orderid"];
                    var payId = response_data["payId"];
                    var payVO = new shop.PayGoodsVO();
                    payVO.orderId = orderid.toString();
                    payVO.productId = payId.toString();
                    payVO.productName = this.creatData.name.toString();
                    payVO.productPrice = this.creatData.price.toString();
                    payVO.productCount = "1";
                    payVO.roleId = user.getProxy().svrRoleId.toString();
                    payVO.roleName = user.getProxy().svrName;
                    payVO.roleGrade = "";
                    payVO.roleBalance = "";
                    payVO.serverId = "";
                    payVO.notifyUrl = "http://npay.gametea.com:8003/mobile/submit.json";
                    payVO.ext = "";
                    if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                        PaymentInterface.payForH5("1026", "", "", "alipay", payVO.orderId, payVO.productId, payVO.productName, payVO.productPrice, payVO.productCount, payVO.roleId, payVO.roleName, payVO.roleGrade, payVO.roleBalance, payVO.serverId, payVO.notifyUrl, payVO.ext);
                    }
                    else {
                        PaymentInterface.payForProduct(payVO.orderId, payVO.productId, payVO.productName, payVO.productPrice, payVO.productCount, payVO.roleId, payVO.roleName, payVO.roleGrade, payVO.roleBalance, payVO.serverId, payVO.notifyUrl, payVO.ext);
                    }
                    this.creatData = null;
                }
                else {
                    console.log(json["message"]);
                    tip.popSysTopTip(json["message"]);
                }
            }
        };
        GameTeaPay.prototype.submitBuyProduct = function (productData) {
            this.creatData = productData;
        };
        GameTeaPay.prototype.onGetIOError = function (event) {
            console.log("post error : " + event);
        };
        GameTeaPay.prototype.onGetProgress = function (event) {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        };
        return GameTeaPay;
    }());
    GameTeaPay.QUICK_USERID = "QUICK_USERID";
    GameTeaPay.QUICK_PWD = "QUICK_PWD";
    GameTeaPay.QUICK_PTID = "QUICK_PTID";
    platform.GameTeaPay = GameTeaPay;
    __reflect(GameTeaPay.prototype, "platform.GameTeaPay");
})(platform || (platform = {}));
//# sourceMappingURL=GameTeaPay.js.map