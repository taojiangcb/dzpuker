
module bank {

    /**
     * 用户快速注册和快登录
     * https://gameteamobile.api-docs.io/v1.0/api/AvSzYhRdCqfbAjLNR
     * https://api.stoplight.io/v1/versions/y5rTWnbn8vu3LapZJ/export/oas.json
     */
    export class BankHttpAccount {
        private httpRequest:egret.HttpRequest;
        private abUrl:string = "https://mbank.bianfeng.com"
        private saveUrl:string = "/store/bank";
        private takeUrl:string = "/store/game"
        /**验证sessionid**/
        private toKenUrl:string = "/session/verify"
        /**获取游戏财富信息***/
        private gameMoney:string = "/game/money"
        /***游戏转游戏 需要线拉游戏列表***/
        private gameToGame:string = "/store/gametogame"
        /***获取游戏列表***/
        private gameList:string = "/game/list"
        private nUrl:string = "http://192.168.136.45:5001"
        private requestUrl:string = "";
        private isBool:boolean = true;

        /**所有游戏***/
        public allGameArr:any[] = [[28], [25], [378]];
        /**当前游戏***/
        public currentGame:any[] = [28, "钱庄"]
        /**当前银子***/
        public currentMony:number = 0;

        overtime:number

        constructor() {
        }

        get getIsUrl():string {
            return this.isBool ? this.abUrl : this.nUrl
        }

        /****
         *
         *  获取零时toKen
         */

        toKenEvent():void {

            this.requestUrl = this.getIsUrl + this.toKenUrl;
            var jsonData:string = "username=" + user.getProxy().svrName 
            + "&ssid={" + user.getProxy().formatSvrTmpSession + "}&numid=" + user.getProxy().svrNumId 
                + "&md5=" + gameabc.md5.hash(user.getProxy().svrTmpSession) 
                + "&areaid=" + user.getProxy().svrAreaId 
                + "&hardware=" + 4567897981243132 
                + "&channelid=" + platform.CHANNE_ID


            this.setPostData(jsonData);
            // if(this.httpRequest) {
            //     this.httpRequest.abort();
            //     this.removeListener(this.httpRequest);
            // }
            // this.httpRequest = new egret.HttpRequest();
            // this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            // this.httpListener(this.httpRequest);
            // this.httpRequest.open(this.requestUrl,egret.HttpMethod.POST);
            // this.httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
            // this.httpRequest.send(jsonData);
        }

        toDString(str:string):string {
            var newStr:string;
            newStr = str.toUpperCase();
            newStr = newStr.substr(0, 8) + "-" + newStr.substr(8, 4) + "-" + newStr.substr(12, 4)
                + "-" + newStr.substr(16, 8) + "-" + newStr.substr(24);
            return newStr;
        }

        /***
         *
         * 查询对应游戏钱
         * */
        gameMoneyEvent(gameid:number = AppConst.GAME_BANK_ID):void {
            this.requestUrl = this.getIsUrl + this.gameMoney;
            var jsonData:string = "gameid=" + gameid + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen
            this.setPostData(jsonData);

            // if(this.httpRequest) {
            //     this.httpRequest.abort();
            //     this.removeListener(this.httpRequest);
            // }
            // this.httpRequest = new egret.HttpRequest();
            // this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            // this.httpListener(this.httpRequest);
            // this.httpRequest.open(this.requestUrl,egret.HttpMethod.POST);
            // this.httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
            // this.httpRequest.send(jsonData);
        }

        /**
         * 游戏列表
         */
        gameListEvent():void {
            this.requestUrl = this.getIsUrl + this.gameList;
            var jsonData:string = "gameid=" + AppConst.GAME_BANK_ID + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen


            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                //发送给native
                utils.NativeUtils.nativeCall(utils.NATIVE_CMD.BANK_HTTPS, {
                    url: this.requestUrl,
                    data: jsonData,
                    moth: "GET"
                });
            } else {
                if (this.httpRequest) {
                    this.httpRequest.abort();
                    this.removeListener(this.httpRequest);
                }
                this.httpRequest = new egret.HttpRequest();
                this.httpListener(this.httpRequest);
                this.httpRequest.open(this.requestUrl + "?" + jsonData, egret.HttpMethod.GET);
                this.httpRequest.send();
            }

        }

        /**
         * 存钱
         */
        saveCode(_money:number, gameid:number = AppConst.GAME_BANK_ID):void {
            this.requestUrl = this.getIsUrl + this.saveUrl;
            var sendData = {
                fromgameid: gameid,
                money: _money,
                numid: user.getProxy().svrRoleId,
                token: user.getProxy().svrTmpSession
            }
            var jsonData:string = "fromgameid=" + gameid + "&money=" + _money + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen

            this.setPostData(jsonData);
            // if(this.httpRequest) {
            //     this.httpRequest.abort();
            //     this.removeListener(this.httpRequest);
            // }
            // this.httpRequest = new egret.HttpRequest();
            // this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            // this.httpListener(this.httpRequest);
            // this.httpRequest.open(this.requestUrl,egret.HttpMethod.POST);
            // this.httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
            // this.httpRequest.send(jsonData);
        }

        /**
         * 取钱
         */
        takeAccount(_money:number):void {
            this.requestUrl = this.getIsUrl + this.takeUrl;
            var data = {
                togameid: AppConst.GAME_BANK_ID,
                money: _money,
                numid: user.getProxy().svrRoleId,
                token: user.getProxy().svrTmpSession
            }
            var jsonData:string = "togameid=" + AppConst.GAME_BANK_ID + "&money=" + _money + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen
            console.log("send json:" + jsonData);
            this.setPostData(jsonData);

            //  if(this.httpRequest) {
            //     this.httpRequest.abort();
            //     this.removeListener(this.httpRequest);
            // }
            // console.log("requestUrl " + this.requestUrl);
            // this.httpRequest = new egret.HttpRequest();
            // this.httpListener(this.httpRequest);
            // this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            // this.httpRequest.open(this.requestUrl,egret.HttpMethod.POST);
            // this.httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
            // this.httpRequest.send(jsonData);
        }

        /**
         * 游戏转入到游戏
         */
        gameToGameAccount(_money:number, _fromgameID:number):void {
            this.requestUrl = this.getIsUrl + this.gameToGame;
            var data = {
                fromgameid: _fromgameID,
                togameid: AppConst.GAME_BANK_ID,
                money: _money,
                numid: user.getProxy().svrRoleId,
                token: user.getProxy().svrTmpSession
            }
            var jsonData:string = "fromgameid=" + _fromgameID + "&togameid=" + AppConst.GAME_BANK_ID + "&money=" + _money + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen
            console.log("send json:" + jsonData);

            //  if(this.httpRequest) {
            //     this.httpRequest.abort();
            //     this.removeListener(this.httpRequest);
            // }
            // console.log("requestUrl " + this.requestUrl);
            // this.httpRequest = new egret.HttpRequest();
            // this.httpListener(this.httpRequest);
            // this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            // this.httpRequest.open(this.requestUrl,egret.HttpMethod.POST);
            // this.httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
            // this.httpRequest.send(jsonData);
            this.setPostData(jsonData);
        }

        setPostData(jsonData:string):void {
            __OPEN_PRELOAD();
            if (this.overtime > 0) {
                egret.clearTimeout(this.overtime)
            }
            this.overtime = egret.setTimeout(this.overTimeEvent, this, 1000);
            //console.log("钱庄发送数据： " + jsonData);//
            //console.log("requestUrl " + this.requestUrl);//
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                //发送给native
                utils.NativeUtils.nativeCall(utils.NATIVE_CMD.BANK_HTTPS, {
                    url: this.requestUrl,
                    data: jsonData,
                    moth: "POST"
                });
            } else {
                if (this.httpRequest) {
                    this.httpRequest.abort();
                    this.removeListener(this.httpRequest);
                }
                this.httpRequest = new egret.HttpRequest();
                this.httpListener(this.httpRequest);
                this.httpRequest.responseType = egret.HttpResponseType.TEXT;
                this.httpRequest.open(this.requestUrl, egret.HttpMethod.POST);
                this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                this.httpRequest.send(jsonData);
            }

        }

        private httpListener(request:egret.HttpRequest):void {
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        }

        private onGetComplete(event:egret.Event):void {
            this.responseEvent(this.requestUrl, JSON.parse(this.httpRequest.response));
        }

        responseEvent(url:string, response:any):void {
            this.overTimeEvent()
            var response_data:string = "";
            var error_msg:string;
            var error_id:number = 0;
            var json = response;
            if (url == (this.getIsUrl + this.gameList)) //获取游戏列表
            {
                response_data = json.data;
                if (json.code == 0) {
                    var arr:any[] = [];
                    if (json.data.list) {
                        this.allGameArr = json.data.list;
                    }
                    if (json.data.defgame) {
                        this.currentGame = json.data.defgame;
                        this.gameMoneyEvent(this.currentGame[0])
                    } else {
                        this.upBankEvent();
                    }
                }

            }
            else if (url == (this.getIsUrl + this.gameToGame)) //游戏转游戏
            {
                response_data = json.data;//游戏转游戏
                if (json.code == 0) {
                    var getmoney = Number(response_data[1]);
                    var add:number;
                    if (this.currentGame[0] == 28) {
                        add = user.getProxy().bankSilver - getmoney;
                        user.getProxy().bankSilver = getmoney; //Number(response_data[1]);
                    } else {
                        add = this.currentMony - getmoney
                        this.currentMony = getmoney; //Number(response_data[1]);
                    }

                    user.getProxy().svrGameData.silver += add;//Number(response_data[2]);
                    this.upBankEvent();
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info + ":" + json.code, tip.TIPS_TYPE.TIPS_WARNING)
                }
            } else if (url == (this.getIsUrl + this.gameMoney)) //查询对应游戏的钱
            {
                response_data = json.data;//
                if (json.code == 0) {
                    if (this.currentGame[0] == 28) {
                        user.getProxy().bankSilver = Number(response_data); //Number(response_data[1]);
                    } else {
                        this.currentMony = Number(response_data); //Number(response_data[1]);
                    }
                    // user.getProxy().svrGameData.silver = Number(response_data);//Number(response_data[2]);
                    this.upBankEvent();
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info + ":" + json.code, tip.TIPS_TYPE.TIPS_WARNING)
                }
            } else if (url == (this.getIsUrl + this.toKenUrl)) {//获取toKen
                response_data = json.data;
                if (json.code == 0) {
                    user.getProxy().bankSilver = Number(response_data["bank"]);
                    user.getProxy().httpToKen = response_data["token"];
                    user.getProxy().sessionTime = app.SystemTimer.sysTime;
                    this.upBankEvent();
                    this.gameListEvent();//获取游戏列表
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info + ":" + json.code, tip.TIPS_TYPE.TIPS_WARNING)
                }
            } else if (url == (this.getIsUrl + this.saveUrl)) {//存钱
                response_data = json.data;
                if (json.code == 0) {//存钱
                    user.getProxy().bankSilver = Number(response_data[0]);
                    user.getProxy().svrGameData.silver = Number(response_data[1]);

                    tip.popSysCenterTip("存钱成功", tip.TIPS_TYPE.TIPS_CORRECT)
                    this.upBankEvent();
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info + ":" + json.code, tip.TIPS_TYPE.TIPS_WARNING)
                }
            }
            else if (url == (this.getIsUrl + this.takeUrl)) //取钱
            {
                response_data = json.data;
                if (json.code == 0) {
                    user.getProxy().bankSilver = Number(response_data[0]);
                    user.getProxy().svrGameData.silver = Number(response_data[1]);
                    tip.popSysCenterTip("取钱成功", tip.TIPS_TYPE.TIPS_CORRECT)
                    this.upBankEvent();
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info)
                }
            }
        }

        upBankEvent():void {
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_USER_INFO_DATA);
            if (this.uiModule) {
                this.uiModule.showEvent()
            }
        }

        get uiModule():bank.BankUIMoudle {
            return <bank.BankUIMoudle>__GET_MOUDLE_COMP(AppReg.APP_BANK);
        }

        private onGetIOError(event:egret.Event):void {
            // __CLOSE_MOUDLE(AppReg.PRELOAD);
            __CLOSE_PRELOAD();
            tip.popSysCenterTip("钱庄不能用" + event.eventPhase, tip.TIPS_TYPE.TIPS_WARNING)
            console.log("post error : " + event.toString());
        }

        private onGetProgress(event:egret.ProgressEvent):void {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        }


//        public toGuid(args: string): void {
//                // TODO Auto-generated method stub
//                UUID uuid = UUID.randomUUID();
//                System.out.println(".{" + uuid.toString() + "}");
//            }
//        }
        overTimeEvent():void {
            if (this.overtime > 0) {
                egret.clearTimeout(this.overtime)
            }
            this.overtime = 0;
            __CLOSE_PRELOAD();
        }

        public dispose():void {
            this.overTimeEvent()
        }

        private removeListener(request:egret.HttpRequest):void {
            this.overTimeEvent()
            request.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        }
    }
}

