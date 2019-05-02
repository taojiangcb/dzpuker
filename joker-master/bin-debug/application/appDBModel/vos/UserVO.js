var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var UserVO = (function () {
        function UserVO() {
            /**平台账户**/
            this.userid = "";
            /**盛大通行证**/
            this.ptid = "";
            /**盛大数字账号**/
            this.ptnumid = "";
            /**平台昵称**/
            this.nickname = "";
            /**平台明文**/
            this.identity = "";
            /**平台性别**/
            this.sex = 0; //byte
            /**平台头像**/
            this.head = 0; //int
            /**平台权限**/
            this.right = 0; //int
            /**平台账户注册时间**/
            this.regtime = 0; //int
            /**平台VIP类型 游戏内不用**/
            this.vipid = 0; //int
            /**平台VIP到期时间**/
            this.vipendtime = 0; //uint
            /**客户端IP**/
            this.ip = 0; //int
            /**客户端操作系统版本号**/
            this.osver = 0; //int
            /**客户端类型**/
            this.clienttype = 0; //int
            this.elimited = 0; //int
            this.eproected = 0; //int
            /**实名认证登记地址**/
            this.protecturl = ""; //char[255]
            this.keylen = 0; //byte
            this.key = new egret.ByteArray(); //byte[32]
        }
        //--------------------------------------
        UserVO.prototype.unpack = function (bytes) {
            if (bytes == null)
                return;
            bytes.endian = egret.Endian.LITTLE_ENDIAN;
            var curLen = 0;
            var str_len = bytes.dataView.getUint8(curLen);
            this.userid = bytes.readUTFBytes(str_len);
            curLen += str_len + 1;
            str_len = bytes.dataView.getUint8(curLen);
            this.ptid = bytes.readUTFBytes(str_len);
            curLen += str_len + 1;
            str_len = bytes.dataView.getUint8(curLen);
            this.ptnumid = bytes.readUTFBytes(str_len);
            curLen += str_len + 1;
            str_len = bytes.dataView.getUint8(curLen);
            this.nickname = bytes.readUTFBytes(str_len);
            curLen += str_len + 1;
            str_len = bytes.dataView.getUint8(curLen);
            this.identity = bytes.readUTFBytes(str_len);
            this.sex = bytes.readUnsignedByte();
            this.head = bytes.readInt();
            this.right = bytes.readInt();
            this.regtime = bytes.readInt();
            this.vipid = bytes.readInt();
            this.vipendtime = bytes.readUnsignedInt();
            this.ip = bytes.readInt();
            this.osver = bytes.readInt();
            this.clienttype = bytes.readInt();
            this.elimited = bytes.readInt();
            this.eproected = bytes.readInt();
            curLen = Math.max(0, bytes.position - 1);
            str_len = bytes.dataView.getUint8(curLen);
            this.protecturl = bytes.readUTFBytes(str_len);
            this.keylen = bytes.readUnsignedByte();
            bytes.readBytes(this.key, 0, this.keylen);
        };
        UserVO.prototype.pack = function (bytes) {
            if (bytes == null)
                return null;
            bytes.endian = egret.Endian.LITTLE_ENDIAN;
            bytes.writeUTF(this.userid);
            bytes.writeUTF(this.ptid);
            bytes.writeUTF(this.ptnumid);
            bytes.writeUTF(this.nickname);
            bytes.writeUTF(this.identity);
            bytes.writeByte(this.sex);
            bytes.writeInt(this.head);
            bytes.writeInt(this.right);
            bytes.writeInt(this.regtime);
            bytes.writeInt(this.vipid);
            bytes.writeUnsignedInt(this.vipendtime);
            bytes.writeInt(this.ip);
            bytes.writeInt(this.osver);
            bytes.writeInt(this.clienttype);
            bytes.writeByte(this.keylen);
            this.key.endian = egret.Endian.LITTLE_ENDIAN;
            bytes.writeBytes(this.key, 0, this.key.length);
        };
        return UserVO;
    }());
    appvos.UserVO = UserVO;
    __reflect(UserVO.prototype, "appvos.UserVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=UserVO.js.map