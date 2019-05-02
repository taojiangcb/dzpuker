module app {

    export class ParamVoWriter {

        paramVO: appvos.ParamVO = new appvos.ParamVO();

        backListener: Function;

        /** 添加 longValues*/
        l(...args): ParamVoWriter {
            var len: number = args.length;
            for (var i: number = 0; i < len; ++i) {
                this.paramVO.longValues[i] = dcodeIO.Long.fromNumber(args[i]);
            }
            return this;
        }

        /** 添加 intValues*/
        i(...args): ParamVoWriter {
            this.paramVO.intValues = args;
            return this;
        }

        /** 添加 strValues*/
        s(...args): ParamVoWriter {
            this.paramVO.strValues = args;
            return this;
        }

        /** 添加 data*/
        d(...args): ParamVoWriter {
            this.paramVO.data = args;
            return this;
        }

        on(listener: Function): ParamVoWriter {
            this.backListener = listener;
            return this;
        }

        private onLoader(evt: egret.Event): void {
            if (evt.type == egret.Event.COMPLETE) {
                var recvBytes = new egret.ByteArray(evt.target.data);
                var recvMessageVO = new appvos.MessageVO(recvBytes.buffer);
                this.backListener(recvMessageVO.data);
            } else this.backListener(null);
            evt.target.removeEventListener(egret.Event.COMPLETE, this.onLoader, this);
            evt.target.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoader, this);
        }


        /** 发送 action  写在最后 */
        to(action: string): void {

            var MessageVO = AppGlobal.getMessage("MessageVO");
            var sendMessageVO = new MessageVO();
            sendMessageVO.phase = 1;
            sendMessageVO.action = parseInt(action);
            sendMessageVO.data = this.paramVO.getProtoVO();
             if (user.getProxy().messVersion != null) {
                sendMessageVO.sendAt =__SET_INT64( user.getProxy().messVersion);   
            }
            var sendMessageBytes = new egret.ByteArray(sendMessageVO.toArrayBuffer());

            if (action.lastIndexOf(NetAction.TO_GS_PREFIX, 0) == 0 || action.lastIndexOf(NetAction.RE_GS_PREFIX, 0) == 0) {
                if (playcards.getProxy().isSingle)
                    __SEND_NOTIFICATION(action, new appvos.MessageVO(sendMessageVO.toArrayBuffer()));
                else {
                    if (user.getProxy().currentRoom == null) return;
                    var cmds = action.split(".");
                    var sendGamePackage = new cyvos.GamePackage();
                    sendGamePackage.data = sendMessageBytes;
                    sendGamePackage.xyId = parseInt(cmds[1]);
                    __SEND_NOTIFICATION(cmds[0], sendGamePackage);
                }
                return;
            }

            if (action.lastIndexOf(NetAction.TO_MS_PREFIX, 0) == 0
                || action.lastIndexOf(NetAction.PROCESS_REQ_FIRST_ID, 0) == 0 || action.lastIndexOf(NetAction.PROCESS_RESP_FIRST_ID, 0) == 0) {
                var sendPackage = new cyvos.SrsPackage();
                sendPackage.data = sendMessageBytes;
                sendPackage.sXYID = parseInt(action);
                sendPackage.nAppID = NetAction.MS_APPID;
                sendPackage.sProcessID = NetAction.MS_PROCESSID;
                cy.srsServer.send(sendPackage);
                return;
            }

            if (action.lastIndexOf(NetAction.NS_PREFIX, 0) == 0) {
                var loader = new egret.URLLoader();
                var request = new egret.URLRequest(AppConst.CONNECT_SERVER.notice);
                request.method = egret.URLRequestMethod.POST;
                var data = new egret.ByteArray();
                data.writeInt(sendMessageBytes.length);
                data.writeBytes(sendMessageBytes);
                request.data = data.buffer;
                loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
                loader.load(request);
                if (this.backListener != null) {
                    loader.addEventListener(egret.Event.COMPLETE, this.onLoader, this);
                    loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoader, this);
                }
                return;
            }

            //slot
            // if (action.lastIndexOf(NetAction.PROCESS_REQ_FIRST_ID, 0) == 0 || action.lastIndexOf(NetAction.PROCESS_RESP_FIRST_ID, 0) == 0) {

            //     var cmds = action.split(".");
            //     var sendGamePackage = new cyvos.GamePackage();
            //     sendGamePackage.data = sendMessageBytes;
            //     sendGamePackage.xyId = parseInt(cmds[1]);
            //     __SEND_NOTIFICATION(cmds[0], sendGamePackage);
            //     return;
            // }

            cy.log("没有该协议号的快速处理方案", cy.LOG_TYPE.ERROR);

        }




    }
}