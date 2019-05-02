/**
 * Created by JiangTao on 2016/6/24.
 */
module antiSystem {
    export class RealNameUIModule extends app.base.BaseWndUIMoudleComponent {

        btnClose:eui.Image;
        txtName:eui.TextInput;
        txtNumber:eui.TextInput;
        okBtn:eui.Button;
        
        //REAL_NAME_URL:string = "http://my.gametea.com/gametea.php/truename/mblauth/%s/%d/%d/%s/%d/%s/%s"
        //http://my.gametea.com/gametea.php/token/appid/areaID/strptid/numid/身份证/名字

        REAL_NAME_URL:string = "http://open.gametea.com/truename/verify";   
        // REAL_NAME_URL:string = "http://my.gametea.com/gametea.php/truename/mblauth/{0}/{1}/{2}/{3}/{4}/{5}/{6}";
        urlRq:egret.HttpRequest;

        constructor() {
            super();
            this.skinName = "resource/app_skin/antiAddiction/RealNameSkin.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.bindButton(this.btnClose);
            this.bindButton(this.okBtn);
        }

        touchBindButtonHandler(tag:egret.DisplayObject):void {
            var target:egret.DisplayObject = tag;
            if (target == this.btnClose) {
                this.close();
            }
            else if (target == this.okBtn) {
                if(!this.urlRq) {
                    this.urlRq = new egret.HttpRequest();
                }
                else  {
                    this.removelistener(this.urlRq);
                    this.urlRq.abort();
                }
                this.urlRq = new egret.HttpRequest();
                this.urlRq.responseType = egret.HttpResponseType.TEXT;
                this.httpListener(this.urlRq);

                var token:string = user.getProxy().propertURL;
                token = token.substr(token.indexOf("=") + 1);

                // var appId:number = AppConst.CONNECT_SERVER.appId;
                // var areaId:number = user.getProxy().svrAreaId;
                // var strptid:string = user.getProxy().reqPlayerPlusData.ptid;
                // var numId:number = user.getProxy().svrNumId;
                // var cardNum:string = this.txtNumber.text;
                // var youname:string = this.txtName.text;

                var params:any={
                    token:token,
                    ptid:user.getProxy().reqPlayerPlusData.ptid,
                    numid:user.getProxy().svrNumId,
                    userName:this.txtName.text,
                    idCard:this.txtNumber.text
                }
                var param_str:string = gameabc.StringUtils.formatHttpParams(params);

                if (params.userName == "") {
                    tip.popSysCenterTip(gameabc.getMessage("NAME_NOT_NULL"));
                    return;
                }

                if(params.idCard < 18) {
                    tip.popSysCenterTip(gameabc.getMessage("CARD_NUM_WRONG"));
                    return;
                }

                //var getUrl:string = gameabc.StringUtils.formatString(this.REAL_NAME_URL, token, appId, areaId, strptid, numId, cardNum, youname);
                this.urlRq.open(this.REAL_NAME_URL, egret.HttpMethod.POST);
                this.urlRq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                this.urlRq.send(param_str);
            }
        }

        private httpListener(request:egret.HttpRequest):void {
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        }

        private removelistener(request:egret.HttpRequest):void {
            request.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        }

        private onGetComplete(event:egret.Event):void {
            console.log(">>" + this.urlRq.response)
            var response_data:any = JSON.parse(this.urlRq.response);

            var msg:string = decodeURI(response_data.msg);
            tip.popSysCenterTip(msg);

            /**
             * 验证成功
             */
            if(parseInt(response_data.result) == 0) {
                user.getProxy().propertURL = "";
                this.close();
            } 
        }

        private onGetIOError(event:egret.IOErrorEvent):void {
            console.log("get error : " + event);
            tip.popSysCenterTip("get error :" + egret.IOErrorEvent.IO_ERROR);
            this.close();
        }

        private onGetProgress(event:egret.ProgressEvent):void {
            console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        }
    }
}