module mail {
    export class MailSubUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private data: appvos.ImsVO;
        private list: eui.List;
        private mailSubTitleLabel: eui.Label;
        private contextLabel: eui.Label;
        private timeLabel: eui.Label;
        static time: number[] = [0, 7, 14, 7];

        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = -20;
            this.skinName = "resource/app_skin/mail/MailSubUIMoudleSkin.exml";
        }
        
        createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.mailSubTitleLabel.text = this.data.title;
            if (this.data.formatId == 1) {
                this.contextLabel.textFlow = MailUIMoudle.getMatchContextFormat(this.data.context);
            }else {
                this.contextLabel.text = this.data.context;
            }
//            console.log(this.data.type);
            this.timeLabel.text = DateUtils.dateFormat(new Date(this.data.createTime + MailSubUIMoudle.time[this.data.type] * (24 * 3600 * 1000)), "yyyy-MM-dd");
        }
        
        setData(data: any) {
            this.data = data;
        }
        
//        protected touchHandler(event: egret.TouchEvent): void {
//            var tag: egret.DisplayObject = event.currentTarget;
//            switch (tag) {
//                case this.confirmButton:
//                    this.close();
//                    break;
//                default:
//                    break;
//            }
//        }
        
        public dispose(): void {
//            this.unbindButton(this.confirmButton);
            super.dispose();
        }
    }
}