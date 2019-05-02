module appvos {
    export class TreasureConfigVO {
        public id: number;
        public roomType: number;//房间类型
        public progressiveId: number;//奖池编号
        public delayTime: number;//延迟时间

        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("TreasureConfigVO").decode(data);
                this.setData(vo);
            }
        }

        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            if (vo.id !== null && vo.id !== undefined) this.id = vo.id.toNumber();
            if (vo.roomType !== null && vo.roomType !== undefined) this.roomType = vo.roomType;
            if (vo.progressiveId !== null && vo.progressiveId !== undefined) this.progressiveId = vo.progressiveId.toNumber();
            if (vo.delayTime !== null && vo.delayTime !== undefined) this.delayTime = vo.delayTime.toNumber();
        }
    }
}