module appvos {
    export class TreasureInfoVO {
        public treasureConfigVO: TreasureConfigVO[];
        public progressiveConfigVO: ProgressiveConfigVO[];
        public treasureVO: TreasureVO[];

        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("TreasureInfoVO").decode(data);
                this.setData(vo);
            }
        }

        public setData(vo: any): void {
            if(vo == null) {
                return;
            }

            var i: number = 0; var len: number = 0;
			if(vo.treasureConfigVO) { this.treasureConfigVO = [];len = vo.treasureConfigVO.length;for(i = 0;i < len;i++) {this.treasureConfigVO[i] = new TreasureConfigVO(); this.treasureConfigVO[i].setData(vo.treasureConfigVO[i]);}} else { this.treasureConfigVO = null; }
            if(vo.progressiveConfigVO) { this.progressiveConfigVO = [];len = vo.progressiveConfigVO.length;for(i = 0;i < len;i++) {this.progressiveConfigVO[i] = new ProgressiveConfigVO(); this.progressiveConfigVO[i].setData(vo.progressiveConfigVO[i]);}} else { this.progressiveConfigVO = null; }
            if(vo.treasureVO) { this.treasureVO = [];len = vo.treasureVO.length;for(i = 0;i < len;i++) {this.treasureVO[i] = new TreasureVO(); this.treasureVO[i].setData(vo.treasureVO[i]);}} else { this.treasureVO = null; }
        }
    }
}