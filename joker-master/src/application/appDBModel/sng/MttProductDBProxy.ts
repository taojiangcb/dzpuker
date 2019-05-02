// TypeScript file
module match {

    export function getProductProxy():match.MttProductDBProxy {
        return __GET_PROXY(MttProductDBProxy);
    }

    export class MttProductDBProxy extends app.mvc.AbsractProxy {

        static NAME:string = "__MttProductDBProxy__"

        /** 商品列表 参数 numid, username, session, areaid GET */
        exchange_product_list_url:string = "http://match2.gametea.com/2015/activity/public/texas/product";
        /** 激活 numid, username, session  POST */
        active_product_url:string = "http://match2.gametea.com/2015/activity/public/texas/activation";
        /** 兑换 参数 numid, username, session, areaid, pid(商品ID) POST */
        exchange_product_url:string = "http://match2.gametea.com/2015/activity/public/texas/exchange";
        /** 兑换记录 参数 numid, session, areaid  GET */
        history_prouct_url:string = "http://match2.gametea.com/2015/activity/public/texas/exchange/history";

        /** 红包列表 参数未定 */
        exchange_redpack_list_url:string = "http://match2.gametea.com/2015/activity/public/dezredpage/getPropList";
        /** 兑换单个红包 参数未定 */
        exchange_redpack_url:string = "http://match2.gametea.com/2015/activity/public/dezredpage/sendRedPage";
        /** 查看兑换记录 参数未定 */
        history_redpack_url:string = "http://match2.gametea.com/2015/activity/public/dezredpage/getMyRedPages";



        http_req:egret.HttpRequest;         //当前请求的http对象
        curUrl:string = "";                 //当前请求的地
        ticket:number = 0;                  //点卷数量

        /**
         * 商品列表
         */
        product_list:ExProductVO[] = [];

        /**
         * 当前正在兑换的商品id
         */
        curId:string = "";

        netlock:boolean = false;

        constructor(proxyName?: string, data?: any){
            super(MttProductDBProxy.NAME);
        }

        checkLock():boolean {
            if (this.netlock) {
                tip.popSysCenterTip("对不起，您操作太频繁了，请稍后再试");
                return true;
            } else {
                this.netlock = true;
                return false;
            }
        }


        /**
         * 获取商品列表
         */
        updateProductList():void {
            if (this.checkLock()) return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION,()=>{
                this.listenerHttp(this.generateHttp());
                this.curUrl = this.exchange_product_list_url;
                var sendParam:any = this.getSvrParam();
                this.http_req.open(this.curUrl + "?" + gameabc.StringUtils.formatHttpParams(sendParam) ,egret.HttpMethod.GET);
                this.http_req.send();
            });
        }

        /**
         * 获取红包列表
         */
        updateRedpackList():void {
            if (this.checkLock()) return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION,()=>{
                this.listenerHttp(this.generateHttp());
                this.curUrl = this.exchange_redpack_list_url;
                var sendParam:any = this.getSvrParam();
                // var requestUrlStr = this.curUrl + "?" + gameabc.StringUtils.formatHttpParams(sendParam);
                // console.log(requestUrlStr);
                this.http_req.responseType = egret.HttpResponseType.TEXT;
                this.http_req.open(this.curUrl ,egret.HttpMethod.POST);
                this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.http_req.send(gameabc.StringUtils.formatHttpParams(sendParam));
                // this.http_req.send();
            });
        }


        /**
         * 兑换商品
         */
        exchangeProduct(productInfo:MTTProductVO,usrName:string,phone:string):void {
            if (this.checkLock()) return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION,()=>{
                this.listenerHttp(this.generateHttp());
                this.curUrl = this.exchange_product_url;
                this.curId = productInfo.id;
                this.http_req.responseType = egret.HttpResponseType.TEXT;
                this.http_req.open(this.curUrl,egret.HttpMethod.POST);
                var sendParam:any = this.getPtParam(productInfo,usrName,phone);
                this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.http_req.send(gameabc.StringUtils.formatHttpParams(sendParam));
            });
        }

        /**
         * 兑换红包
         */
        exchangeRedpack(redpackVO:MTTRedpackVO):void {
            if (this.checkLock()) return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION,()=>{
                this.listenerHttp(this.generateHttp());
                this.curUrl = this.exchange_redpack_url;
                var sendParam = this.getSvrParam();
                sendParam.propid = redpackVO.id;
                this.http_req.responseType = egret.HttpResponseType.TEXT;
                this.http_req.open(this.curUrl,egret.HttpMethod.POST);
                this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.http_req.send(gameabc.StringUtils.formatHttpParams(sendParam));
            });
        }

        /**
         * 兑换码激活
         */
        activeProduct(code:string):void {
            if (this.checkLock()) return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION,()=>{
                this.listenerHttp(this.generateHttp());
                this.curUrl = this.active_product_url;
                var sendParam:any = this.getSvrParam();
                sendParam["code"] = code;
                this.http_req.responseType = egret.HttpResponseType.TEXT;
                this.http_req.open(this.curUrl,egret.HttpMethod.POST);
                this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.http_req.send(gameabc.StringUtils.formatHttpParams(sendParam));
            });
        }

        /**
         * 历史记录
         */
        getHistory():void {
            if (this.checkLock()) return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION,()=>{
                this.listenerHttp(this.generateHttp());
                this.curUrl = this.history_prouct_url;
                this.http_req.responseType = egret.HttpResponseType.TEXT;
                this.http_req.open(this.curUrl + "?" + gameabc.StringUtils.formatHttpParams(this.getSvrParam()),egret.HttpMethod.GET);
                this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.http_req.send();
            });
        }
        /**
         * 红包历史记录
         */
        getRedpackHistory():void {
            if (this.checkLock()) return;
            __SEND_NOTIFICATION(app.NetAction.TOOL_TEMP_SESSION,()=>{
                this.listenerHttp(this.generateHttp());
                this.curUrl = this.history_redpack_url;
                this.http_req.responseType = egret.HttpResponseType.TEXT;
                this.http_req.open(this.curUrl + "?" + gameabc.StringUtils.formatHttpParams(this.getSvrParam()),egret.HttpMethod.GET);
                this.http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.http_req.send();
            });
        }

        generateHttp():egret.HttpRequest {
            if(this.http_req) {
                this.removeHttpListener(this.http_req);
                this.http_req.abort();
            }
            this.http_req = new egret.HttpRequest();
            return this.http_req;
        }

        removeHttpListener(httpReq:egret.HttpRequest):void {
            httpReq.removeEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
            httpReq.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
            httpReq.removeEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
            this.curUrl = "";
        }

        listenerHttp(httpReq:egret.HttpRequest):void {
            httpReq.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
            httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
            httpReq.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
        }

        onGetComplete(event:egret.Event):void {
            this.netlock = false;
            var response_data:any = "";
            var error_msg:string;
            var error_id:number = 0;
            if(this.curUrl == this.exchange_redpack_list_url) {
                response_data = JSON.parse(this.http_req.response);
                if(response_data.status == 0){
                    this.product_list = [];
                    var list:any[] = response_data.data;
                    if(list) {
                        list.forEach(element => {
                            this.product_list.push(new MTTRedpackVO(element.propid,element.num));
                        });
                    }
                    this.ticket = parseInt(response_data.data.ticket);
                    //列表发生了更新
                    __SEND_NOTIFICATION(MttExchangeMediator.UPDATE_PRODUCT_LIST);
                }
                
            } else if(this.curUrl == this.exchange_product_list_url) {
                response_data = JSON.parse(this.http_req.response);
                if(response_data.status == 0){
                    this.product_list = [];
                    var list:any[] = response_data.data.product;
                    if(list) {
                        list.forEach(element => {
                            this.product_list.push(new MTTProductVO(element.title,element.exprice,element.desc,element.pic,element.id));
                        });
                    }
                    this.ticket = parseInt(response_data.data.ticket);
                    //列表发生了更新
                    __SEND_NOTIFICATION(MttExchangeMediator.UPDATE_PRODUCT_LIST);
                }
                else {
                    error_id = response_data.status;
                    error_msg =  response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
            //兑换操作处理结果
            else if(this.curUrl == this.exchange_product_url) {
                response_data = JSON.parse(this.http_req.response);
                if(response_data.status == 0){
                    var productInfo = this.findProductVO(this.curId);
                    this.ticket = Math.max(this.ticket - productInfo.num,0);
                    var msg:string = response_data.info;
                    tip.popSysCenterTip(msg);
                    console.log(msg);
                    __SEND_NOTIFICATION(MttExchangeMediator.EXCHANGE_RESULT);
                }
                else {
                    error_id = response_data.status;
                    error_msg =  response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
            //兑换红包操作处理结果
            else if (this.curUrl == this.exchange_redpack_url) {
                response_data = JSON.parse(this.http_req.response);
                if(response_data.status == 0){
                    var productInfo = this.findProductVO(response_data.data.propid);
                    --productInfo.num;
                    var msg:string = response_data.info;
                    tip.popSysCenterTip(msg);
                    console.log(msg);
                    match.getProxy().getRedpackStatusAlert(response_data.status);
                    __SEND_NOTIFICATION(MttExchangeMediator.UPDATE_PRODUCT_LIST);
                }
                else {
                    if (response_data.status == 2) {
                        match.getProxy().getRedpackStatusAlert(response_data.status);
                    } else {
                        error_id = response_data.status;
                        error_msg =  response_data.info;
                        tip.popSysCenterTip(error_msg);
                        console.log(error_msg);
                    }
                }
            }
            /**
             * 兑换码激活
             */
            else if(this.curUrl == this.active_product_url) { 
                 response_data = JSON.parse(this.http_req.response);
                  if(response_data.status == 0){
                      tip.popSysCenterTip("激活成功");
                      __SEND_NOTIFICATION(MttExchangeMediator.EXCHANGE_CODE_RESULT);
                  }
                  else {
                    error_id = response_data.status;
                    error_msg =  response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                  }
            }
            else if(this.curUrl == this.history_prouct_url) {
                response_data = JSON.parse(this.http_req.response);
                if(response_data.status == 0){
                    var dateTimes:HitoryVO[] = [];
                    var list:any[] = response_data.data;
                    list.forEach(element => {
                        dateTimes.push(new HitoryVO(element.title,element.time));
                    })
                    __SEND_NOTIFICATION(MttExchangeMediator.EXCHANGE_HISTORY,list);

                }
                else {
                    error_id = response_data.status;
                    error_msg =  response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
            else if(this.curUrl == this.history_redpack_url) {
                response_data = JSON.parse(this.http_req.response);
                if(response_data.status == 0){
                    var dateTimes:HitoryVO[] = [];
                    var list:any[] = response_data.info;
                    list.forEach(element => {
                        dateTimes.push(new HitoryVO(element.title,element.time));
                    })
                    __SEND_NOTIFICATION(MttExchangeMediator.EXCHANGE_HISTORY,list);

                }
                else {
                    error_id = response_data.status;
                    error_msg =  response_data.info;
                    tip.popSysCenterTip(error_msg);
                    console.log(error_msg);
                }
            }
        }

        findProductVO(pid:string):ExProductVO {
            var len:number = this.product_list.length;
            while(--len > -1) {
                if(pid == this.product_list[len].id) return this.product_list[len];
            }
            return null;
        }

        onGetIOError(event:egret.Event):void {
            console.log("post error : " + event);
        }

       onGetProgress(event:egret.ProgressEvent):void {
            console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        }

        /**
         * 基础参数
         */
        getSvrParam():any {
            return {
                numid:user.getProxy().svrNumId,
                username:user.getProxy().svrName,
                session:"{" + user.getProxy().formatSvrTmpSession +"}",
                areaid:user.getProxy().svrAreaId
            }
        }

        /**
         * 兑换参数
         */
        getPtParam(ptvo:MTTProductVO,usrName:string,phone:string):any {
            return {
                numid:user.getProxy().svrNumId,
                username:user.getProxy().svrName,
                session:"{" + user.getProxy().formatSvrTmpSession +"}",
                areaid:user.getProxy().svrAreaId,
                pid:ptvo.id,
                realname:usrName,
                phone:phone
            }
        }
    }


    export class ExProductVO {
        id:string;
        num:number;
    }

    /**
     * 商品列表VO
     */
    export class MTTProductVO extends ExProductVO {
        constructor(title?:string,exprice?:string,desc?:string,pic?:string,id?:string){
            super();
            this.title = title;
            this.desc = desc;
            this.pic = pic;
            this.id = id;
            this.num = parseInt(exprice);
        }
        title:string = "";      //产品名称
        desc:string = "";       //描述
        pic:string = "";        //图片
    }
    /**
     * 红包列表VO
     */
    export class MTTRedpackVO extends ExProductVO {
        constructor(id:number,num:number){
            super();
            this.id = String(id);
            this.num = num;
        }
    }

    /**
     * 历史列表
     */
    export class HitoryVO {
        constructor(title?:string,time?:string){
            this.title = title;
            this.time = time;
        }
        title:string = "";
        time:string = "";
    }
}