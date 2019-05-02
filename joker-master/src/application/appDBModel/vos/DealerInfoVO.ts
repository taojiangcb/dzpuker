module appvos {
    export class DealerInfoVO {
        public userid: number;              //
		public name: string;               //名字
		public matchround: number;          //比赛局
		public gameround: number;           //现金局
		public onlinetime: number;          //在线时长
		public giftpay: number;             //打赏
		public servicepay: number;          //服务费
		public roomid: number;              //房间 svrOfsId
		public tableid: number;             //桌子
		public faceid: string;            //形象
		public online: number;             //是否在线
        public fans: number;               //粉丝数
		public notice: string;            //公告
        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("DealerInfoVO").decode(data);
                this.setData(vo);
            }
        }
        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            if (vo.userid !== null) this.userid = vo.userid.toNumber();
            if (vo.name !== null)　this.name = vo.name;
            if (vo.matchround !== null) this.matchround = vo.matchround;
            if (vo.gameround !== null) this.gameround = vo.gameround;
            if (vo.onlinetime !== null) this.onlinetime = vo.onlinetime;
            if (vo.giftpay !== null) this.giftpay = vo.giftpay.toNumber();
            if (vo.servicepay !== null) this.servicepay = vo.servicepay.toNumber();
            if (vo.roomid !== null) this.roomid = vo.roomid;
            if (vo.tableid !== null) this.tableid = vo.tableid;
            if (vo.faceid !== null) this.faceid = vo.faceid;
            if (vo.online !== null) this.online = vo.online;
            if (vo.fans !== null) this.fans = vo.fans;
            if (vo.notice !== null) this.notice = vo.notice;
        }
    }
}