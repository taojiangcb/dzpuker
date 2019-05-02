module dealer {

	export function getProxy(): DealerProxy {
        return __GET_PROXY(DealerProxy);
    }

	/** 荷官当前状态 */
	export const enum DealerState {
		/**空闲 */
		IDLE = 0,
		/**正在发牌 */
		READY_DEAL = 1,// 
		 /**洗牌 */
		SHUFFLE_CARDS = 2,// 
		 /**暂时离开一会儿(需要托管) */
		LEAVE_SHORT_TIME = 3,// 
		 /**  离开直播房*/
		OUT_ROOM = 4,//
		 /** 荷官下局要手动发牌(取消托管) */
		WILL_COME_BACK,//
		 /**荷官进入直播房 */
		JOIN_ROOM //
	};
	export class DealerProxy extends app.mvc.AbsractProxy {

		public players:number[] = [];
		
		public dealcardType:number = 0;

		public dealStep:number = 1;// 要先发了2001，再发2002

		public dealstate:number = 0;// 默认空闲状态
		
		public constructor() {
			super(DealerProxy.NAME);
		}
	}
}