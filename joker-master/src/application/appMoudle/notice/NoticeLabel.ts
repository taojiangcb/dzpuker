module notice {
    
    export class NoticeLabel extends uicomps.BaseItemCilckRenderer {
        public index: number;
        private label: eui.Label;
        public bg: eui.Image;
        public poker: eui.Image;
        
        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "resource/app_skin/notice/NoticeLabelSkin.exml";
            this.setSelect();
        }
        
        public dataChanged():void {
            this.index = this.data.index;
            this.label.text = this.data.label;
            if (this.data.isSelect === true) {
                this.bg.source = 'btn_notice_type1_png';
                this.poker.visible = true;
                this.label.width = 140;
                this.label.x = 48;
            }
        }
        
        public setSelect(): void {
            if (this.selected === true) {
                this.bg.source = 'btn_notice_type1_png';
                this.poker.visible = true;
                this.label.width = 140;
                this.label.x = 48;
            } else {
                this.bg.source = 'btn_notice_type2_png';
                this.poker.visible = false;
                this.label.width = 180;
                this.label.x = 8;
            }
        }
    }
}