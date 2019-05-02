module mail {
    export class MailUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private list: eui.List;
        private data: any;
        private tipLabel: eui.Label;

        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = -20;
            this.skinName = "resource/app_skin/mail/MailUIMoudleSkin.exml";
        }
        createComplete(event: egret.Event): void {
            var paramVO = new appvos.ParamVO();
            paramVO.longValues = [parseInt(platform.CHANNE_ID),user.getProxy().svrRoleId];
            __SEND_NOTIFICATION(app.NetAction.IMS_GETS,paramVO);
            super.createComplete(event);
            __REGISTER_MEDIATOR(MailUIMediator,this);
        }

        public initList(): void {
            this.tipLabel.visible = user.getProxy().ImsVO.length > 0? false: true;
            this.data = new eui.ArrayCollection(user.getProxy().ImsVO);
            this.list.dataProvider = this.data;
            this.list.itemRenderer = MailItemRenderer;
        }
        
        public refreshData(): void {
            this.data.refresh();
        }
        
        public dispose(): void {
            user.getProxy().ImsVO = null;
            __REMOVE_MEDIATOR(MailUIMediator);
            super.dispose();
        }
        
        static matchContextFormat: string[] = ["您于","在边锋德州SNG比赛","中获得","，奖励","彩豆，","大师分"];
        
        static getMatchContextFormat(context: string): egret.ITextElement[] {
            var formatContext: egret.ITextElement[] = [];
            var contextArray: string[] = context.split(",");
            for(var i = 0;i < MailUIMoudle.matchContextFormat.length;i++) {
                formatContext.push({ text: MailUIMoudle.matchContextFormat[i] });
                if(i < contextArray.length) formatContext.push({ text: contextArray[i],style: { "textColor": AppConst.TextColors.red } });
            }
            return formatContext;
        }
    }
}