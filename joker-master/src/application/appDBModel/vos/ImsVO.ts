module appvos {
    export class ImsVO {
        public id: number;
        public title: string;
        public context: string;
        public formatId: number;
        public createTime: number;
        public flag: number;
        public type: number;

        public constructor(data: any = null) {
            if(data != null) {
                var vo: any = AppGlobal.getMessage("ImsVO").decode(data);
                this.setData(vo);
            }
        }

        public setData(vo: any): void {
            if(vo == null) {
                return;
            }
            this.id = vo.id.toNumber();
            this.title = vo.title;
            this.context = vo.context;
            this.formatId = vo.formatId.toNumber();
            this.createTime = vo.createTime.toNumber();
            this.flag = vo.flag;
            this.type = vo.type;
        }
    }
}