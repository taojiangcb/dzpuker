module playcards {

    /**
     */
    export class PlaycardsCountItemRenderer extends uicomps.BaseItemCilckRenderer {

        public ismyimg:eui.Image;
        
        public bgimg: eui.Image;
        
        public  ranklab:eui.Label;
        public namelab:eui.Label;
        public totalebetlab:eui.Label;
        public winbetlab:eui.Label;

        /**
         * 没有选中时的颜色
         * @type {number}
         */
        NORMAL_COLOR:number = 0x7D6386;

        /**
         * 选中时的颜色
         * @type {number}
         */
        CHROOSE_COLOR:number = 0xFFFFFF;


        constructor() {
            super();
            this.skinName = "PlaycardsCountItemSkin";
        }

        dataChanged():void {
            var countVO: CountVO = this.data;
            if(countVO && this.bgimg) {
                if(countVO.roleid == user.getPlayerInfo().roleId) {
                    this.bgimg.source = "s9_bg_play_fangxingxinxi_png";
                    this.ismyimg.visible = true;
                } else {
                    this.bgimg.source = "s9_bg_fangxinditu_png";
                    this.ismyimg.visible = false;
                }
                
                var isPlayerInTable: boolean = null != playcards.getTableVO().searchPlayerInSeats(countVO.roleid); 
                var textColor: number = isPlayerInTable ? this.CHROOSE_COLOR : this.NORMAL_COLOR;
                
                this.ranklab.text = countVO.rank;
                this.namelab.text = countVO.name;
                this.totalebetlab.text = countVO.total;
                this.winbetlab.text = countVO.win;
                this.ranklab.textColor = this.namelab.textColor = this.totalebetlab.textColor = this.winbetlab.textColor = textColor;
            }
        }

    }
}