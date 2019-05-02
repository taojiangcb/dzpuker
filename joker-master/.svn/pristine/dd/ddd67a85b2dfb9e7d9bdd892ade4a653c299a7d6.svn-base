module appvos {
	export class UserVO {
    	/**平台账户**/
		userid:string = "";
		/**盛大通行证**/
		ptid:string = "";
		/**盛大数字账号**/
		ptnumid:string = "";
		/**平台昵称**/
		nickname:string = "";
		/**平台明文**/
		identity:string = "";

		/**平台性别**/
		sex:number = 0;					//byte
		/**平台头像**/
		head:number = 0;				//int
		/**平台权限**/
		right:number = 0;				//int
		/**平台账户注册时间**/
		regtime:number = 0;				//int
		/**平台VIP类型 游戏内不用**/
		vipid:number = 0;				//int
		/**平台VIP到期时间**/
		vipendtime:number = 0;			//uint
		/**客户端IP**/
		ip:number = 0;					//int
		/**客户端操作系统版本号**/
		osver:number = 0;				//int
		/**客户端类型**/
		clienttype:number = 0;			//int

		elimited:number = 0;			//int

		eproected:number = 0;			//int
		/**实名认证登记地址**/
		protecturl:string="";			//char[255]

		keylen:number = 0;				//byte

		key:egret.ByteArray = new egret.ByteArray();			//byte[32]
		
		//--------------------------------------


		unpack(bytes:egret.ByteArray):void {
			if(bytes == null) return;
			bytes.endian = egret.Endian.LITTLE_ENDIAN;
			var curLen:number = 0;
			var str_len:number = bytes.dataView.getUint8(curLen);
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
			curLen = Math.max(0,bytes.position - 1);
			str_len = bytes.dataView.getUint8(curLen);
			this.protecturl = bytes.readUTFBytes(str_len);
			this.keylen = bytes.readUnsignedByte();
			bytes.readBytes(this.key,0,this.keylen);
		}

		pack(bytes:egret.ByteArray):egret.ByteArray {
			if(bytes == null) return null;
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
			bytes.writeBytes(this.key,0,this.key.length);
		}
	}
}
