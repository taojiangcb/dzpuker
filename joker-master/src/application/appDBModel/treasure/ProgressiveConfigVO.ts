module appvos {
    export class ProgressiveConfigVO {
        public id: number;
        public title: string;//标题
        public iconId: number;//图标Id
        public totalNum: number;//总数
        
        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("ProgressiveConfigVO").decode(data);
                this.setData(vo);
            }
        }

        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            if (vo.id !== null && vo.id !== undefined) this.id = vo.id.toNumber();
            if (vo.title !== null && vo.title !== undefined) this.title = FormatUtils.protoToGBK(vo.title);
            if (vo.iconId !== null && vo.iconId !== undefined) this.iconId = vo.iconId;
            if (vo.totalNum !== null && vo.totalNum !== undefined) this.totalNum = vo.totalNum.toNumber();
        }
    }
}