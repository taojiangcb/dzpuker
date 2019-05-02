module appvos {
	/**
	 *牌局记录
	 * @author 
	 *
	 */
	export class PlayCardsVideoVO {
        sourceData: any;
        tablevo:appvos.TexasTableVO;//座子内人物信息
        actions: appvos.MessageVO[];//动作
        startTime:number;//开始时间
        roleid: number;//角色id
        playId:number;// 牌局ID
        public constructor(data: any = null) {
            if(data != null) {
                this.sourceData = AppGlobal.getMessage("PlayCardsVideoVO").decode(data);
                this.setData(this.sourceData);
            }
		}
        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            var i: number = 0; var len: number = 0;
            this.tablevo = new appvos.TexasTableVO(); if(vo.tablevo) {  this.tablevo.setData(vo.tablevo); } 
            this.actions = []; if(vo.actions) {  len = vo.actions.length; for(i = 0;i < len;i++) { this.actions[i] = new appvos.MessageVO(vo.actions[i].toArrayBuffer()); } } 
            this.startTime = vo.startTime == null ? 0 : vo.startTime.toNumber();
            this.roleid = vo.roleid == null ? 0 : vo.roleid.toNumber();
            this.playId = vo.playId == null ? 0 : vo.playId.toNumber();
        }
        public setActData(vo: appvos.MessageVO, act: string, time: number, clone: boolean = false): any {
            if (clone) {
                vo = new appvos.MessageVO( vo.sourceData.toArrayBuffer()) 
            }
            vo.name = vo.sourceData.name = act;
            vo.sendAt = time;
            vo.sourceData.sendAt = __SET_INT64(time);
            if(this.actions == null) this.actions = [];
            this.actions.push(vo);
        }
        public setString(str:string): void{
			var vo: any = AppGlobal.getMessage("PlayCardsVideoVO").decode(FormatUtils.strToBuffer(str));
            this.setData(vo);
		}
        getProtoVO(): any {
            var vo: any = AppGlobal.getMessageVO("PlayCardsVideoVO");
             vo.tablevo = this.tablevo.getProtoVO();
            var i: number = 0; var len: number = 0;
            vo.actions = []; len = this.actions.length; for (i = 0; i < len; i++) { vo.actions[i] = this.actions[i].sourceData };
            vo.startTime = __SET_INT64(this.startTime);
            vo.roleid = __SET_INT64(this.roleid);
            vo.playId = __SET_INT64(this.playId);
            return vo;
        }
        toArrayBuffer():any{
			var vo: any = this.getProtoVO(); 
			return vo.toArrayBuffer();
        }
        toString():string{
            // var byte: egret.ByteArray = new egret.ByteArray(this.toArrayBuffer());
            // byte.position = 0;
            // return byte.readUTF();
            var str = FormatUtils.bufferToStr(this.toArrayBuffer());
			return str;
        }
        clone(): PlayCardsVideoVO{
            var vo = new PlayCardsVideoVO(this.toArrayBuffer()); 
            return vo;
        }
	}
}
