module appvos {
    export class TreasureVO {
        public id: number;
        public treasrueId: number;//夺宝模板Id treasureId
        public count: number;//期数
        public curNum: number;//当前数量
        public openTime: number;//开奖时间
        public roomType: number;//房间类型
        public createTime: number;//创建时间
        public totalNum: number;//总数时间
        public buyNum: number;//购买数量
        
        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("TreasureVO").decode(data);
                this.setData(vo);
            }
        }

        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            if (vo.id !== null && vo.id !== undefined) this.id = vo.id.toNumber();
            if (vo.treasrueId !== null&& vo.treasrueId !== undefined) this.treasrueId = vo.treasrueId.toNumber();
            if (vo.count !== null && vo.count !== undefined) this.count = vo.count;
            if (vo.curNum !== null && vo.curNum !== undefined) this.curNum = vo.curNum.toNumber();
            if (vo.openTime !== null && vo.openTime !== undefined) this.openTime = vo.openTime.toNumber();
            if (vo.roomType !== null && vo.roomType !== undefined) this.roomType = vo.roomType;
            if (vo.createTime !== null && vo.createTime !== undefined) this.createTime = vo.createTime.toNumber();
            if (vo.totalNum !== null && vo.totalNum !== undefined) this.totalNum = vo.totalNum.toNumber();
            if (vo.buyNum !== null && vo.buyNum !== undefined) this.buyNum = vo.buyNum.toNumber();
        }
    }
}