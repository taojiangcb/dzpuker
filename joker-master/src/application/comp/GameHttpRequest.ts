module comp {
	export class GameHttpRequest {

		httpReq:egret.HttpRequest;

		curUrl:string = "";
		lockScreen:boolean = false;
		thisObj:any;

		onComp:(event:egret.Event)=>void;
		onIo:(event:egret.Event)=>void;
		progress:(event:egret.Event)=>void;

		public constructor() {
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

		generateHttp():egret.HttpRequest {
            if(this.httpReq) {
                this.removeHttpListener(this.httpReq);
                this.httpReq.abort();
            }
            this.httpReq = new egret.HttpRequest();
			this.listenerHttp(this.httpReq);
            return this.httpReq;
        }

		onGetIOError(event:egret.Event):void {
			__CLOSE_PRELOAD();
            console.log("post error : " + event);
			if(this.onIo != null) this.onIo.call(this.thisObj,event)
        }

		onGetComplete(event:egret.Event):void {
			__CLOSE_PRELOAD();
			if(this.onComp != null) this.onComp.call(this.thisObj,event);
		}

		send(url:string,
			method:string,
			type:string,
			params?:string,
			lockScreen:boolean = true,
			compFunc?:(event:egret.Event)=>void,
			ioFunc?:(event:egret.IOErrorEvent)=>void,
			progress?:(event:egret.ProgressEvent)=>void,
			thisObj?:any):void {
			
			this.thisObj = thisObj;

			this.onComp = compFunc;
			this.onIo = ioFunc;
			this.progress = progress;
			
			this.httpReq.responseType = type;
			this.httpReq.open(url,method);
			this.curUrl = url;
			this.lockScreen = lockScreen;
			if(lockScreen) __OPEN_PRELOAD();
			this.httpReq.send(params);
		}

		get response():any{
			return this.httpReq && this.httpReq.response 
				? this.httpReq.response 
				: null;
		}

		setRequestHeader(key:string,value:string):void {
			this.httpReq.setRequestHeader(key,value);
		}

        onGetProgress(event:egret.ProgressEvent):void {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded/event.bytesTotal) + "%");
			if(this.progress != null) this.progress.call(this.thisObj,event);
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        }
	}
}