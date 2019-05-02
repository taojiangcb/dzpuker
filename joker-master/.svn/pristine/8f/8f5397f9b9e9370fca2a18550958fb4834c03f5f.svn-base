module appvos {
    export class TreasureRecordVO {
        public id: number; //id
        public userId: number;// 用户Id
        public userName: string;//姓名
        public faceid: string;//头像Id
        public buyNum: number;//购买量
        public totalNum: number;// 总数量
        public openTime: number;//开启时间
        public count: number;//期数
        public state: number;//状态
        public createTime: number;//创建时间
        public iconId: number;//图标id
        public roomType: number;//房间类型
        public treasrueDBId: number;//模板Id
        public title: string;//标题

        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("TreasureRecordVO").decode(data);
                this.setData(vo);
            }
        }

        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            if (vo.id !== null && vo.id !== undefined) this.id = vo.id.toNumber();
            if (vo.userId !== null && vo.userId !== undefined) this.userId = vo.userId.toNumber();
            if (vo.userName !== null && vo.userName !== undefined) this.userName = FormatUtils.protoToGBK(vo.userName);
            if (vo.faceid !== null && vo.faceid !== undefined) this.faceid = FormatUtils.protoToGBK(vo.faceid);
            if (vo.buyNum !== null && vo.buyNum !== undefined) this.buyNum = vo.buyNum.toNumber();
            if (vo.totalNum !== null && vo.totalNum !== undefined) this.totalNum = vo.totalNum.toNumber();
            if (vo.openTime !== null && vo.openTime !== undefined) this.openTime = vo.openTime.toNumber();
            if (vo.count !== null && vo.count !== undefined) this.count = vo.count;
            if (vo.state !== null && vo.state !== undefined) this.state = vo.state;
            if (vo.createTime !== null && vo.createTime !== undefined) this.createTime = vo.createTime.toNumber();
            if (vo.iconId !== null && vo.iconId !== undefined) this.iconId = vo.iconId.toNumber();
            if (vo.roomType !== null && vo.roomType !== undefined) this.roomType = vo.roomType;
            if (vo.treasrueDBId !== null && vo.treasrueDBId !== undefined) this.treasrueDBId = vo.treasrueDBId.toNumber();
            if (vo.title !== null && vo.title !== undefined) this.title = FormatUtils.protoToGBK(vo.title);
        }
    }
}