module playcards {
    /*牌型回顾vo*/
    export class CardResultVO {
        /*ID*/
        public roleId: number;
        /*名称*/
		public name: string;
        /*头像*/
		public avatarID: string;
        /*输赢筹码数量*/
        public bet: number;
        /*是否弃牌*/
        public isFold: boolean;
        /*我的手牌*/
        public myCard: number[];
        /*公共牌*/
        public globalCards: number[];
        /**保险获利 */
        public safeAdd: number;
        /**保存的录像 */
        public record: appvos.DZRecordVO;
    }
}