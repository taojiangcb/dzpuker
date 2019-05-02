var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var bank;
(function (bank) {
    /**
     * 用户快速注册和快登录
     * https://gameteamobile.api-docs.io/v1.0/api/AvSzYhRdCqfbAjLNR
     * https://api.stoplight.io/v1/versions/y5rTWnbn8vu3LapZJ/export/oas.json
     */
    var BankHttpAccount = (function () {
        function BankHttpAccount() {
            this.abUrl = "https://mbank.bianfeng.com";
            this.saveUrl = "/store/bank";
            this.takeUrl = "/store/game";
            /**验证sessionid**/
            this.toKenUrl = "/session/verify";
            /**获取游戏财富信息***/
            this.gameMoney = "/game/money";
            /***游戏转游戏 需要线拉游戏列表***/
            this.gameToGame = "/store/gametogame";
            /***获取游戏列表***/
            this.gameList = "/game/list";
            this.nUrl = "http://192.168.136.45:5001";
            this.requestUrl = "";
            this.isBool = true;
            /**所有游戏***/
            this.allGameArr = [[28], [25], [378]];
            /**当前游戏***/
            this.currentGame = [28, "钱庄"];
            /**当前银子***/
            this.currentMony = 0;
        }
        Object.defineProperty(BankHttpAccount.prototype, "getIsUrl", {
            get: function () {
                return this.isBool ? this.abUrl : this.nUrl;
            },
            enumerable: true,
            configurable: true
        });
        /****
         *
         *  获取零时toKen
         */
        BankHttpAccount.prototype.toKenEvent = function () {
            this.requestUrl = this.getIsUrl + this.toKenUrl;
            var jsonData = "username=" + user.getProxy().svrName
                + "&ssid={" + user.getProxy().formatSvrTmpSession + "}&numid=" + user.getProxy().svrNumId
                + "&md5=" + gameabc.md5.hash(user.getProxy().svrTmpSession)
                + "&areaid=" + user.getProxy().svrAreaId
                + "&hardware=" + 4567897981243132
                + "&channelid=" + platform.CHANNE_ID;
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
        };
        BankHttpAccount.prototype.toDString = function (str) {
            var newStr;
            newStr = str.toUpperCase();
            newStr = newStr.substr(0, 8) + "-" + newStr.substr(8, 4) + "-" + newStr.substr(12, 4)
                + "-" + newStr.substr(16, 8) + "-" + newStr.substr(24);
            return newStr;
        };
        /***
         *
         * 查询对应游戏钱
         * */
        BankHttpAccount.prototype.gameMoneyEvent = function (gameid) {
            if (gameid === void 0) { gameid = AppConst.GAME_BANK_ID; }
            this.requestUrl = this.getIsUrl + this.gameMoney;
            var jsonData = "gameid=" + gameid + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen;
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
        };
        /**
         * 游戏列表
         */
        BankHttpAccount.prototype.gameListEvent = function () {
            this.requestUrl = this.getIsUrl + this.gameList;
            var jsonData = "gameid=" + AppConst.GAME_BANK_ID + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                //发送给native
                utils.NativeUtils.nativeCall(7 /* BANK_HTTPS */, {
                    url: this.requestUrl,
                    data: jsonData,
                    moth: "GET"
                });
            }
            else {
                if (this.httpRequest) {
                    this.httpRequest.abort();
                    this.removeListener(this.httpRequest);
                }
                this.httpRequest = new egret.HttpRequest();
                this.httpListener(this.httpRequest);
                this.httpRequest.open(this.requestUrl + "?" + jsonData, egret.HttpMethod.GET);
                this.httpRequest.send();
            }
        };
        /**
         * 存钱
         */
        BankHttpAccount.prototype.saveCode = function (_money, gameid) {
            if (gameid === void 0) { gameid = AppConst.GAME_BANK_ID; }
            this.requestUrl = this.getIsUrl + this.saveUrl;
            var sendData = {
                fromgameid: gameid,
                money: _money,
                numid: user.getProxy().svrRoleId,
                token: user.getProxy().svrTmpSession
            };
            var jsonData = "fromgameid=" + gameid + "&money=" + _money + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen;
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
        };
        /**
         * 取钱
         */
        BankHttpAccount.prototype.takeAccount = function (_money) {
            this.requestUrl = this.getIsUrl + this.takeUrl;
            var data = {
                togameid: AppConst.GAME_BANK_ID,
                money: _money,
                numid: user.getProxy().svrRoleId,
                token: user.getProxy().svrTmpSession
            };
            var jsonData = "togameid=" + AppConst.GAME_BANK_ID + "&money=" + _money + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen;
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
        };
        /**
         * 游戏转入到游戏
         */
        BankHttpAccount.prototype.gameToGameAccount = function (_money, _fromgameID) {
            this.requestUrl = this.getIsUrl + this.gameToGame;
            var data = {
                fromgameid: _fromgameID,
                togameid: AppConst.GAME_BANK_ID,
                money: _money,
                numid: user.getProxy().svrRoleId,
                token: user.getProxy().svrTmpSession
            };
            var jsonData = "fromgameid=" + _fromgameID + "&togameid=" + AppConst.GAME_BANK_ID + "&money=" + _money + "&numid=" + user.getProxy().svrNumId + "&token=" + user.getProxy().httpToKen;
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
        };
        BankHttpAccount.prototype.setPostData = function (jsonData) {
            __OPEN_PRELOAD();
            if (this.overtime > 0) {
                egret.clearTimeout(this.overtime);
            }
            this.overtime = egret.setTimeout(this.overTimeEvent, this, 1000);
            //console.log("钱庄发送数据： " + jsonData);//
            //console.log("requestUrl " + this.requestUrl);//
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                //发送给native
                utils.NativeUtils.nativeCall(7 /* BANK_HTTPS */, {
                    url: this.requestUrl,
                    data: jsonData,
                    moth: "POST"
                });
            }
            else {
                if (this.httpRequest) {
                    this.httpRequest.abort();
                    this.removeListener(this.httpRequest);
                }
                this.httpRequest = new egret.HttpRequest();
                this.httpListener(this.httpRequest);
                this.httpRequest.responseType = egret.HttpResponseType.TEXT;
                this.httpRequest.open(this.requestUrl, egret.HttpMethod.POST);
                this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.httpRequest.send(jsonData);
            }
        };
        BankHttpAccount.prototype.httpListener = function (request) {
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        BankHttpAccount.prototype.onGetComplete = function (event) {
            this.responseEvent(this.requestUrl, JSON.parse(this.httpRequest.response));
        };
        BankHttpAccount.prototype.responseEvent = function (url, response) {
            this.overTimeEvent();
            var response_data = "";
            var error_msg;
            var error_id = 0;
            var json = response;
            if (url == (this.getIsUrl + this.gameList)) {
                response_data = json.data;
                if (json.code == 0) {
                    var arr = [];
                    if (json.data.list) {
                        this.allGameArr = json.data.list;
                    }
                    if (json.data.defgame) {
                        this.currentGame = json.data.defgame;
                        this.gameMoneyEvent(this.currentGame[0]);
                    }
                    else {
                        this.upBankEvent();
                    }
                }
            }
            else if (url == (this.getIsUrl + this.gameToGame)) {
                response_data = json.data; //游戏转游戏
                if (json.code == 0) {
                    var getmoney = Number(response_data[1]);
                    var add;
                    if (this.currentGame[0] == 28) {
                        add = user.getProxy().bankSilver - getmoney;
                        user.getProxy().bankSilver = getmoney; //Number(response_data[1]);
                    }
                    else {
                        add = this.currentMony - getmoney;
                        this.currentMony = getmoney; //Number(response_data[1]);
                    }
                    user.getProxy().svrGameData.silver += add; //Number(response_data[2]);
                    this.upBankEvent();
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info + ":" + json.code, tip.TIPS_TYPE.TIPS_WARNING);
                }
            }
            else if (url == (this.getIsUrl + this.gameMoney)) {
                response_data = json.data; //
                if (json.code == 0) {
                    if (this.currentGame[0] == 28) {
                        user.getProxy().bankSilver = Number(response_data); //Number(response_data[1]);
                    }
                    else {
                        this.currentMony = Number(response_data); //Number(response_data[1]);
                    }
                    // user.getProxy().svrGameData.silver = Number(response_data);//Number(response_data[2]);
                    this.upBankEvent();
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info + ":" + json.code, tip.TIPS_TYPE.TIPS_WARNING);
                }
            }
            else if (url == (this.getIsUrl + this.toKenUrl)) {
                response_data = json.data;
                if (json.code == 0) {
                    user.getProxy().bankSilver = Number(response_data["bank"]);
                    user.getProxy().httpToKen = response_data["token"];
                    user.getProxy().sessionTime = app.SystemTimer.sysTime;
                    this.upBankEvent();
                    this.gameListEvent(); //获取游戏列表
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info + ":" + json.code, tip.TIPS_TYPE.TIPS_WARNING);
                }
            }
            else if (url == (this.getIsUrl + this.saveUrl)) {
                response_data = json.data;
                if (json.code == 0) {
                    user.getProxy().bankSilver = Number(response_data[0]);
                    user.getProxy().svrGameData.silver = Number(response_data[1]);
                    tip.popSysCenterTip("存钱成功", tip.TIPS_TYPE.TIPS_CORRECT);
                    this.upBankEvent();
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info + ":" + json.code, tip.TIPS_TYPE.TIPS_WARNING);
                }
            }
            else if (url == (this.getIsUrl + this.takeUrl)) {
                response_data = json.data;
                if (json.code == 0) {
                    user.getProxy().bankSilver = Number(response_data[0]);
                    user.getProxy().svrGameData.silver = Number(response_data[1]);
                    tip.popSysCenterTip("取钱成功", tip.TIPS_TYPE.TIPS_CORRECT);
                    this.upBankEvent();
                }
                else {
                    console.log(json.info);
                    tip.popSysCenterTip(json.info);
                }
            }
        };
        BankHttpAccount.prototype.upBankEvent = function () {
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_USER_INFO_DATA);
            if (this.uiModule) {
                this.uiModule.showEvent();
            }
        };
        Object.defineProperty(BankHttpAccount.prototype, "uiModule", {
            get: function () {
                return __GET_MOUDLE_COMP(AppReg.APP_BANK);
            },
            enumerable: true,
            configurable: true
        });
        BankHttpAccount.prototype.onGetIOError = function (event) {
            // __CLOSE_MOUDLE(AppReg.PRELOAD);
            __CLOSE_PRELOAD();
            tip.popSysCenterTip("钱庄不能用" + event.eventPhase, tip.TIPS_TYPE.TIPS_WARNING);
            console.log("post error : " + event.toString());
        };
        BankHttpAccount.prototype.onGetProgress = function (event) {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        };
        //        public toGuid(args: string): void {
        //                // TODO Auto-generated method stub
        //                UUID uuid = UUID.randomUUID();
        //                System.out.println(".{" + uuid.toString() + "}");
        //            }
        //        }
        BankHttpAccount.prototype.overTimeEvent = function () {
            if (this.overtime > 0) {
                egret.clearTimeout(this.overtime);
            }
            this.overtime = 0;
            __CLOSE_PRELOAD();
        };
        BankHttpAccount.prototype.dispose = function () {
            this.overTimeEvent();
        };
        BankHttpAccount.prototype.removeListener = function (request) {
            this.overTimeEvent();
            request.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        return BankHttpAccount;
    }());
    bank.BankHttpAccount = BankHttpAccount;
    __reflect(BankHttpAccount.prototype, "bank.BankHttpAccount");
})(bank || (bank = {}));
//# sourceMappingURL=BankHttpAccount.js.map