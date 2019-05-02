var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    /**
     * @author huangkan
     *  与SRS连接的进入房间环节命令集，进入房间过程在此完成
     */
    var JoinRoomCommands = (function (_super) {
        __extends(JoinRoomCommands, _super);
        function JoinRoomCommands() {
            return _super.apply(this, arguments) || this;
        }
        JoinRoomCommands.prototype.sendHandler = function (data, stream) {
            this.sendPackage.sProcessID = 1;
            this.sendPackage.nAppID = user.getProxy().willJoinRoom.svrOfsId;
            // 传类型2时服务端不广播座位信息
            var clientType = user.getProxy().willJoinRoom.isVip ? 0 : 2;
            stream.putInt(user.getProxy().willJoinRoom.svrOfsId); //陈卫华SAY:此处传ofs appid
            stream.putInt(clientType); //客户端类型(手机) 
            stream.putInt(0); //硬件标识
            stream.putInt(0); //版本号
            var bytes = user.getProxy().svrUserInfoBytesCache;
            if (bytes == null)
                return;
            stream.putShort(bytes.length); //data size(限制1000长度)
            stream.putBytes(bytes);
            stream.putInt(parseInt(platform.CHANNE_ID)); //渠道号
            cy.log("join" +
                " numId:" + user.getProxy().svrNumId +
                " ofsId:" + user.getProxy().willJoinRoom.svrOfsId +
                " time:" + DateUtils.nowTime, 16 /* ROOM */);
        };
        return JoinRoomCommands;
    }(cy.SrsCommand));
    app.JoinRoomCommands = JoinRoomCommands;
    __reflect(JoinRoomCommands.prototype, "app.JoinRoomCommands");
})(app || (app = {}));
//# sourceMappingURL=JoinRoomCommand.js.map