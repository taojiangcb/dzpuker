module test {
	export class IPV6Test extends app.base.BaseWndUIMoudleComponent {

		public txtIp:eui.EditableText;
		public txtIp0:eui.EditableText;
		public btnConnect:eui.Button;


		socket:egret.WebSocket;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/test/IPV6Test.exml"
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.bindButton(this.btnConnect);
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			tip.popSysCenterTip("开始连接....");
			if(tag == this.btnConnect) {
				if(this.socket == null) {
					this.connection()
				} 
				else {
					if(this.socket.connected) {
						this.socket.close();
					}
					this.connection()
				}
			}
		}

		connection():void {
				var ip_str:string = this.txtIp.text;
				var port_str:string = this.txtIp0.text;
				this.socket = new egret.WebSocket();
				this.socket.addEventListener(egret.Event.CONNECT,(event)=>{
					tip.popSysCenterTip("连接成功");
				},this);
                this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,(event)=> {
					tip.popSysCenterTip("连接失败 io_error");
				},this);
                this.socket.addEventListener(egret.Event.CLOSE,(event)=> {
					tip.popSysCenterTip("连接关闭 close");
				},this);
                this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,()=> {
					tip.popSysCenterTip("收到数据....");
				},this);
				this.socket.connect(ip_str,Number(port_str));
		}
	}
}