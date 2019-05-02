module appvos {
    export class FriendVO {
        public id: number; 
        public uid: number;//用户id
        public fid: number;//好友id
        public time: number;//时间
        public fName: string;//名字
        public faceid: string;//头像
        public status: number;//状态
        public roomId: number;//房间号

        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("FriendVO").decode(data);
                this.setData(vo);
            }
        }

        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            if (vo.uid !== null) this.uid = vo.uid.toNumber();
            if (vo.id !== null)　this.id = vo.id.toNumber();
            if (vo.fid !== null) this.fid = vo.fid.toNumber();
            if (vo.time !== null) this.time = vo.time.toNumber();
            if (vo.fName !== null) this.fName = vo.fName;
            if (vo.faceid !== null) this.faceid = vo.faceid;
            if (vo.status !== null) this.status = vo.status;
            if (vo.roomId !== null) this.roomId = vo.roomId;
        }
    }
}