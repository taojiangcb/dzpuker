/**
 * Created by JiangTao on 2016/7/13.
 */
module app {
    export class NetStateHttpCommand extends HttpCommand {

        /**
         *
         * @type {string}
         */
        public static NET_STATE_CALL: string = "backFun";

        /**
         *
         * @type {string}
         */
        public static NET_THISOBJ: string = "thisObj";

        /**
         * 网络请求完了之后的异步回调处理 (succeed:boolean) => void
         */
        private cbfun: Function = null;
        private cbthisObj: Object = null;

        constructor() {
            super();
        }

        execute(notification:puremvc.INotification):void {
            this.sendParamVO = notification.getBody();

            if (this.sendParamVO[NetStateHttpCommand.NET_STATE_CALL]) {
                this.cbfun = this.sendParamVO[NetStateHttpCommand.NET_STATE_CALL];
                delete this.sendParamVO[NetStateHttpCommand.NET_STATE_CALL];
            }

            if (this.sendParamVO[NetStateHttpCommand.NET_THISOBJ]) {
                this.cbthisObj = this.sendParamVO[NetStateHttpCommand.NET_THISOBJ];
                delete this.sendParamVO[NetStateHttpCommand.NET_THISOBJ];
            }

            super.execute(notification);
        }

        resultHandler(action: string,paramVO: appvos.ParamVO): void {
            if(paramVO) {
                this.responseHandler(action,paramVO);
                if(this.cbfun) {
                    this.cbfun.apply(this.cbthisObj,[true]);
                 }
            }
            else {
                if(this.cbfun) {
                    this.cbfun.apply(this.cbthisObj,[false]);
                }
            }
        }

        /**
         * 成功回调处理
         * @param action
         * @param paramVO
         */
        responseHandler(action:string,paramVO:appvos.ParamVO):void {

        }
    }
}