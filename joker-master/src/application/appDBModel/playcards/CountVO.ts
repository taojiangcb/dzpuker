module playcards {
	/**
	 * 牌型统计vo
	 * @author 
	 *
	 */
	export class CountVO {
		public roleid: number;
        public rank:string;
        public name:string;
        public total:string;
        public win:string;
        public winNum:number;
		public constructor() {
		}
	}
}
