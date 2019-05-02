module appvos {
	/**
	 * 牌局
	 *  */
	export class DZRecordVO {
		
		
        public myCard: number[];//我的手牌

		public id: number;//牌局ID

		public type: number;//房间类型

		public smallBlinds: number;//小盲

		public bigBlinds: number;//大盲

		public winNum: number;//盈利

		public timeNum: number;//模板id

		public roleId: number;

        // public roleName: string;
        
        public handNum: number;//第几手牌
		
 		public key: string;//本地存储录像key
        
		public video: PlayCardsVideoVO;//回放记录 
		
		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("DZRecordVO").decode(data);
                this.setData(vo);
            }
		}
		public setString(str:string): void{
			var vo: any = AppGlobal.getMessage("DZRecordVO").decode(FormatUtils.strToBuffer(str));
            this.setData(vo);
		}
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.myCard = vo.myCard;

            this.id = vo.id == null ? 0 : vo.id.toNumber();

			this.type = vo.type;

			this.smallBlinds = vo.smallBlinds;

			this.bigBlinds = vo.bigBlinds;

			this.winNum = vo.winNum;

			this.timeNum = vo.timeNum == null ? 0 : vo.timeNum.toNumber();

            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            
            // this.roleName = vo.roleName;
            
            this.handNum = vo.handNum;
            this.key = vo.key;
			if (vo.video) {
				this.video = new PlayCardsVideoVO(vo.video);
			}
			vo = null;
		}
		getProtoVO(): any {
			
            var vo: any = AppGlobal.getMessageVO("DZRecordVO");// 创建DZ对象
			
           vo.myCard = this.myCard;

            vo.id = __SET_INT64(this.id);

			vo.type = this.type;

			vo.smallBlinds = this.smallBlinds;

			vo.bigBlinds = this.bigBlinds;

			vo.winNum = this.winNum;

			vo.timeNum = __SET_INT64(this.timeNum);

            vo.roleId =  __SET_INT64(this.roleId);
            
            // vo.roleName = this.roleName;
            
            vo.handNum = this.handNum;
            vo.key = this.key;
			if (this.video) vo.video = this.video.toArrayBuffer();
            return vo;
        }
        toArrayBuffer():ArrayBuffer{
			var vo: any = this.getProtoVO(); 
			return vo.toArrayBuffer();
		}
		toString():string{
			// var byte: egret.ByteArray = new egret.ByteArray(this.toArrayBuffer());
			// byte.position = 0;
			//byte.readUTF()
			var str = FormatUtils.bufferToStr(this.toArrayBuffer());
			return str;
		}
	}
}

