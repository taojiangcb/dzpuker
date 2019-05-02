module appvos {
    export class NoticeVO {
        public noticeId: number;
        public title: string;
        public content: string;
        public gotoTarget: string;
        public type: number;
        public imageUrl: string;
        public startTime: number;
        public endTime: number;
        public business: string;

        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("NoticeVO").decode(data);
                this.setData(vo);
            }
        }

        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            this.noticeId = vo.noticeId.toNumber();
            this.title = vo.title;
            this.content = vo.content;
            this.gotoTarget = vo.gotoTarget;
            this.type = vo.type;
            this.imageUrl = vo.imageUrl;
            this.startTime = vo.startTime.toNumber();
            this.endTime = vo.endTime.toNumber();
            this.business = vo.business;
        }

    }
}