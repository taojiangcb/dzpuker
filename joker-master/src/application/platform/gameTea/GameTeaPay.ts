module platform {


    /**
     * 商城购买
     */
    export class GameTeaPay {

        static QUICK_USERID: string = "QUICK_USERID";
        static QUICK_PWD: string = "QUICK_PWD";
        static QUICK_PTID: string = "QUICK_PTID";

        private httpRequest:comp.GameHttpRequest;

        /***查询商品列表*****/
        private createListUrl: string = "http://npay.gametea.com:8003/mobile/getPropList.json";
        /*****下订单****/
        private orderUrl: string ="http://npay.gametea.com:8003/mobile/createOrder.json"
        /*****查询订单****/
        private checkOrderUrl: string = "http://npay.gametea.com:8003/mobile/checkOrder.json"
        /**
         * 当前请求的url地址
         * @type {string}
         */
        private requestUrl: string = "";
        private gameID: string = "417001"
        private key: string = "db368f1570d526fe52b8863ef18617d9";

        constructor(){   
            this.gameID = platform.channelCfg().pay_appid.toString();
        }

        /**
         * 获取列表
         */
        createList(): void {
            
            this.gameID = platform.channelCfg().pay_appid.toString();
            this.requestUrl = this.createListUrl;
            var sigStr: string = "props_id=" + this.gameID + this.key
            var sendData: any = {
                props_id: this.gameID,
                signature: gameabc.md5.hash(sigStr)
            };

            var jsonData: string = JSON.stringify(sendData);  
            console.log("url " + this.requestUrl + " params :" + jsonData);

            if(this.httpRequest == null) {
                this.httpRequest = new comp.GameHttpRequest();
            }
            this.httpRequest.generateHttp();
            this.httpRequest.send(
                this.requestUrl,
                egret.HttpMethod.POST,
                egret.HttpResponseType.TEXT,
                jsonData,
                true,
                this.onGetComplete,
                this.onGetIOError,
                this.onGetProgress,
                this
            );
        }
        
        creatData:appvos.ICREAT;

        /**
         * 下订单
         * propid 购买商品ID
         * price 实际支付价格
         * sdkID 充值渠道ID
         */
        createOrderList(propid: number = 3,
            price: number = 11,
            sdkID: string = CHANNE_IDS.ANDROID.toString(),
            ip: string = "127.0.0.1"): void {

            console.log("into createOrderList channelID:" + sdkID);
            this.requestUrl = this.orderUrl;

            var params:Object = {
                props_id:this.gameID,
                prop_id:propid,
                numid:user.getProxy().svrNumId,
                sdkid:sdkID,
                par_value:price,
                ip:ip + this.key
            }

            var sigStr: string = gameabc.StringUtils.formatHttpParams(params); 
            console.log("url:" + this.requestUrl + " params : " + sigStr);


            // 充值下单新增字段 
            // ext[mac] => 机器码 
            // ext[appType]=》1 安卓，2=》ios

            var sendData: any = {
                props_id: this.gameID,
                prop_id: propid,
                numid: user.getProxy().svrNumId,
                sdkid: sdkID,
                par_value: price,
                //ip: ip,
                signature: gameabc.md5.hash(sigStr)
            };

            var jsonData: string = JSON.stringify(sendData);
            if(this.httpRequest == null) {
                this.httpRequest = new comp.GameHttpRequest();
            }

            this.httpRequest.generateHttp();
            this.httpRequest.send(
                this.requestUrl,
                egret.HttpMethod.POST,
                egret.HttpResponseType.TEXT,
                jsonData,
                true,
                this.onGetComplete,
                this.onGetIOError,
                this.onGetProgress,
                this
            );
        }

        private onGetComplete(event: egret.Event): void {
            var response_data: string = "";
            var error_msg: string;
            var error_id: number = 0;
            console.log(this.httpRequest.response);
            if(this.requestUrl == this.createListUrl) {
                var json = JSON.parse(this.httpRequest.response);
                response_data = json.data;
                if(parseInt(json.code) == 0) {
                    var obj = response_data[0]
                    shop.getProxy().shopItems = json.data
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.PAY_SUCCEED_ITMES);
                }
                else {
                    console.log(json["message"]);
                    tip.popSysTopTip(json["message"]);
                }
            } 
            else if(this.requestUrl == this.orderUrl) {
                var json = JSON.parse(this.httpRequest.response);
                response_data = json.data;
                if(parseInt(json.code) == 0) {
                    var orderid = response_data["orderid"]
                    var payId = response_data["payId"]
                    var payVO = new shop.PayGoodsVO()
                    payVO.orderId = orderid.toString();
                    payVO.productId = payId.toString();
                    payVO.productName = this.creatData.name.toString();
                    payVO.productPrice = this.creatData.price.toString();
                    payVO.productCount ="1"
                    payVO.roleId = user.getProxy().svrRoleId.toString();
                    payVO.roleName = user.getProxy().svrName;
                    payVO.roleGrade = "";
                    payVO.roleBalance = "";
                    payVO.serverId = "";
                    payVO.notifyUrl = "http://npay.gametea.com:8003/mobile/submit.json";
                    payVO.ext = "";

                    if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                        PaymentInterface.payForH5(
                            "1026",
                            "",
                            "",
                            "alipay",
                            payVO.orderId,
                            payVO.productId,
                            payVO.productName,
                            payVO.productPrice,
                            payVO.productCount,
                            payVO.roleId,
                            payVO.roleName,
                            payVO.roleGrade,
                            payVO.roleBalance,
                            payVO.serverId,
                            payVO.notifyUrl,
                            payVO.ext
                        );
                    }
                    else {
                        PaymentInterface.payForProduct(payVO.orderId,
                            payVO.productId,
                            payVO.productName,
                            payVO.productPrice,
                            payVO.productCount,
                            payVO.roleId,
                            payVO.roleName,
                            payVO.roleGrade,
                            payVO.roleBalance,
                            payVO.serverId,
                            payVO.notifyUrl,
                            payVO.ext);
                    }
                   this.creatData = null;
                }
                else {
                    console.log(json["message"]);
                    tip.popSysTopTip(json["message"]);
                }
            }
        }

        submitBuyProduct(productData?:appvos.PaymentVO) {
            this.creatData = productData;
        }

        private onGetIOError(event: egret.Event): void {
            console.log("post error : " + event);
        }

        private onGetProgress(event: egret.ProgressEvent): void {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        }

        // private removeListener(request: egret.HttpRequest): void {
        //     request.removeEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        //     request.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        //     request.removeEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
        // }
    }
}

