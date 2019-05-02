module utils {
	export class TempSessionUtils {

		/**
		 * 获取到临时session之后的回调列表
		 */
		static receiver_call:(()=>void)[] = [];
		
		public constructor() {
		}
	}
}