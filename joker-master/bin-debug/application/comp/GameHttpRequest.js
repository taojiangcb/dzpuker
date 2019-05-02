var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var comp;
(function (comp) {
    var GameHttpRequest = (function () {
        function GameHttpRequest() {
            this.curUrl = "";
            this.lockScreen = false;
        }
        GameHttpRequest.prototype.removeHttpListener = function (httpReq) {
            httpReq.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            httpReq.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            httpReq.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
            this.curUrl = "";
        };
        GameHttpRequest.prototype.listenerHttp = function (httpReq) {
            httpReq.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            httpReq.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        GameHttpRequest.prototype.generateHttp = function () {
            if (this.httpReq) {
                this.removeHttpListener(this.httpReq);
                this.httpReq.abort();
            }
            this.httpReq = new egret.HttpRequest();
            this.listenerHttp(this.httpReq);
            return this.httpReq;
        };
        GameHttpRequest.prototype.onGetIOError = function (event) {
            __CLOSE_PRELOAD();
            console.log("post error : " + event);
            if (this.onIo != null)
                this.onIo.call(this.thisObj, event);
        };
        GameHttpRequest.prototype.onGetComplete = function (event) {
            __CLOSE_PRELOAD();
            if (this.onComp != null)
                this.onComp.call(this.thisObj, event);
        };
        GameHttpRequest.prototype.send = function (url, method, type, params, lockScreen, compFunc, ioFunc, progress, thisObj) {
            if (lockScreen === void 0) { lockScreen = true; }
            this.thisObj = thisObj;
            this.onComp = compFunc;
            this.onIo = ioFunc;
            this.progress = progress;
            this.httpReq.responseType = type;
            this.httpReq.open(url, method);
            this.curUrl = url;
            this.lockScreen = lockScreen;
            if (lockScreen)
                __OPEN_PRELOAD();
            this.httpReq.send(params);
        };
        Object.defineProperty(GameHttpRequest.prototype, "response", {
            get: function () {
                return this.httpReq && this.httpReq.response
                    ? this.httpReq.response
                    : null;
            },
            enumerable: true,
            configurable: true
        });
        GameHttpRequest.prototype.setRequestHeader = function (key, value) {
            this.httpReq.setRequestHeader(key, value);
        };
        GameHttpRequest.prototype.onGetProgress = function (event) {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            if (this.progress != null)
                this.progress.call(this.thisObj, event);
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        };
        return GameHttpRequest;
    }());
    comp.GameHttpRequest = GameHttpRequest;
    __reflect(GameHttpRequest.prototype, "comp.GameHttpRequest");
})(comp || (comp = {}));
//# sourceMappingURL=GameHttpRequest.js.map