/**
 * Created by JiangTao on 2016/5/3.
 */
module user {

    /**
     * 用户快速注册和快登录
     */
    export class BFQuickAccount {

        static QUICK_USERID:string = "QUICK_USERID";
        static QUICK_PWD:string = "QUICK_PWD";
        static QUICK_PTID:string = "QUICK_PTID";

        private httpRequest:egret.HttpRequest;

        //本地测试
        // private createCodeUrl:string = "http://thirdauth.gametea.local/newmobile/createcode";
        // private createAccountUrl:string = "http://thirdauth.gametea.local/newmobile/createaccount";

        private createCodeUrl:string = "https://thirdauth.gametea.com/newmobile/createcode";
        private createAccountUrl:string = "https://thirdauth.gametea.com/newmobile/createaccount";

        private requestUrl:string = "";
        private generateCode:string = "";

        private quick_userid:string;    //快速注册userid
        private quick_ptid:string;      //边锋通行证
        private quick_pwd:string;       //快速注册密码

        constructor() {

        }

        /**
         * 用户快速注册和快速登录
         */
        generateAccount():void {
            var quickAccount:string = this.getQuickAccount();
            if(quickAccount != null && quickAccount !="") {
                //从本地读取账号登录游戏
                this.quick_userid = quickAccount;
                this.quick_pwd = gameabc.LocalSO.getItem(BFQuickAccount.QUICK_PWD);
                this.quick_ptid = gameabc.LocalSO.getItem(BFQuickAccount.QUICK_PTID);
                
                //发起登录，用户名和密码
                user.getProxy().loginName = this.quick_userid;
                user.getProxy().loginPass = this.quick_pwd;
                user.getProxy().loginUserType = user.LOGIN_TYPE.GAMETEA;
                cy.connectSrsServer(AppConst.CONNECT_SERVER);
            }
            else {
                __OPEN_PRELOAD();
                //开始注册
                this.createCode();
            }
        }

        /**
         * 获取code
         */
        createCode():void {
            this.requestUrl = this.createCodeUrl;
            var sendData:any = {
                ip:"",
                mac:gameabc.UUID.generateH5UUID()
            };

            console.log("ip:" + sendData.ip + "mac:" + gameabc.UUID.generateH5UUID());
            var jsonData:string = JSON.stringify(sendData);
            var dataM:string = cy.doXorEncrypt(jsonData,cy.getkey1());

            if(this.httpRequest) {
                this.httpRequest.abort();
                this.removeListener(this.httpRequest);
            }
            
            this.httpRequest = new egret.HttpRequest();
            this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            this.httpListener(this.httpRequest);
            this.httpRequest.open(this.requestUrl,egret.HttpMethod.POST);
            this.httpRequest.send(dataM);
        }

        /**
         * 注册账号
         */
        createAccount():void {

//             appType = 1 安卓 2 ios ， 11 其他
//             channelid = 渠道id
//             clientType = 12 web， 14 移动
//             web 的时候 appType 传11 好了

            var clientType:number = egret.Capabilities.runtimeType == egret.RuntimeType.WEB ? 12 : 14;
            var appType : number = 11;
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                appType = egret.Capabilities.os == egret.os.OSType.Android ? 1 : 2
            }
            var channelid:number = Number(platform.CHANNE_ID);
            var gameId:number = platform.CHANNE_ID == platform.CHANNE_IDS.DEBUG.toString() ? 5028 : 417
            this.requestUrl = this.createAccountUrl;
            var data = {
                mac:gameabc.UUID.generateH5UUID(),
                code:this.generateCode,
                gameid:gameId,
                appType:appType,
                channelid:channelid,
                clientType:clientType
            }

            var jsonData:string = JSON.stringify(data);
            var dataM:string = cy.doXorEncrypt(jsonData,cy.getkey1());

            console.log("send json:" + jsonData);
            console.log("send dataM:" + dataM);

             if(this.httpRequest) {
                this.httpRequest.abort();
                this.removeListener(this.httpRequest);
            }

            console.log("requestUrl " + this.requestUrl);

            this.httpRequest = new egret.HttpRequest();
            this.httpListener(this.httpRequest);
            this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            this.httpRequest.open(this.requestUrl,egret.HttpMethod.POST);
            this.httpRequest.send(dataM);
        }

        /**
         * 获取已有的快速注册账号
         * @returns {string}
         */
        getQuickAccount():string {
            return gameabc.LocalSO.getItem(BFQuickAccount.QUICK_USERID);
        }

        private httpListener(request:egret.HttpRequest):void {
            request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
        }

        private onGetComplete(event:egret.Event):void {
            var response_data:string = "";
            var error_msg:string;
            var error_id:number = 0;

            if(this.requestUrl == this.createCodeUrl) {
                response_data = JSON.parse(this.httpRequest.response).data;
                var decrypt:string = cy.doXorDecrypt(response_data,cy.getkey2());
                var jsondata:any = JSON.parse(decrypt);
                if(jsondata != null) {
                    if(jsondata.error_code == 0) {
                        this.generateCode = jsondata.code;
                        //生成快速注册账号
                        __OPEN_PRELOAD();
                        this.createAccount();
                    }
                    else {
                        error_id = jsondata.error_code;
                        error_msg = jsondata.Msg;
                        tip.popSysCenterTip(error_msg,tip.TIPS_TYPE.TIPS_WARNING);
                        console.log("oncreateCode: " + decrypt);
                        console.log(error_msg);
                        __CLOSE_PRELOAD();
                    }
                }
            }
            else if(this.requestUrl == this.createAccountUrl) {
                response_data = JSON.parse(this.httpRequest.response).data;
                var decrypt:string = cy.doXorDecrypt(response_data,cy.getkey2());
                var jsondata:any = JSON.parse(decrypt);
                console.log("recv jsonData : " + jsondata );                
                if(jsondata != null) {
                    if(jsondata.error_code == 0) {

                        this.quick_userid = jsondata.userid;
                        this.quick_pwd = jsondata.pwd;
                        this.quick_ptid = jsondata.ptid;

                        gameabc.LocalSO.setItem(BFQuickAccount.QUICK_USERID,this.quick_userid);
                        gameabc.LocalSO.setItem(BFQuickAccount.QUICK_PTID,this.quick_ptid);
                        gameabc.LocalSO.setItem(BFQuickAccount.QUICK_PWD,this.quick_pwd);

                        //发起登录，用户名和密码
                        user.getProxy().loginName = this.quick_userid;
                        user.getProxy().loginPass = this.quick_pwd;
                        user.getProxy().loginUserType = user.LOGIN_TYPE.GAMETEA;
                        cy.connectSrsServer(AppConst.CONNECT_SERVER);
                    }
                    else {
                        error_id = jsondata.error_code;
                        error_msg = gameabc.getMessage("QUICK_GRENERATE_ERROR",error_id);
//                        tip.popSysCenterTip("oncreateAccount: " + decrypt);
                        tip.popSysCenterTip(error_msg,tip.TIPS_TYPE.TIPS_WARNING);
                        __CLOSE_PRELOAD();
                    }
                }
            }
        }

        private onGetIOError(event:egret.IOErrorEvent):void {
            alert(event.type);
            console.log("post error");
            __CLOSE_PRELOAD();
        }

        private onGetProgress(event:egret.ProgressEvent):void {
            console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        }

        private removeListener(request:egret.HttpRequest):void {
            request.removeEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
            request.removeEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
        }
    }
}

