/**
 * Created by JiangTao on 2016/7/14.
 */
module app {
    export class RFRollNoticeCommand extends cy.SrsCommand {
        constructor(){
            super();
        }
        
        resultHandler(stream: cy.SrsStreamReader): void {
            switch (this.action) {
                case app.NetAction.GOGO_NOTICE_GET_REFLUSH:
                    __SEND_PARAMVO(app.NetAction.GOGO_NOTICE_GET_MANY,[],[],[__SET_INT64(Number(platform.CHANNE_ID))]);
                    break;
            }
        }
    }
}