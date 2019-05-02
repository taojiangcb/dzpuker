module playcards {
	/**
	 *牌对象
	 * @author 
	 *
	 */
	export class CardVO {
    	
    	/**
    	 * 服务端值
    	 */
    	public value:number;
    	
    	// /**
    	//  * 牌值 A = 0 2=1
    	//  */
    	public cardvalue:number;
    	
    	/**
    	 * 牌逻辑值 A = 13 2=1
    	 */
        public cardLogicvalue: number;
        
        /**
         * 牌花色  0方块，1梅花，2红桃，3黑桃
         */
        public color:number;
        
        /**
         * 图片地址
         */
        public str:string;
        
		public constructor(id:number) {
    		this.value = id;
            this.str = "card-1-" + id + "_png"
            var bCardValue = this.cardvalue = CardVO.getCardValue(id);
            this.cardLogicvalue = bCardValue == 0 ? 13 : bCardValue;
            this.color = CardVO.getCardColor(id);
		}
		
        /**
        * 获取牌数值
        * @param cbCardData
        * @return
        */
        public static getCardValue(cbCardData: number):number {
            return cbCardData % 13;
        }
	
        /**
         * //牌的花色
         * @param cbCardData
         */
        public static getCardColor(cbCardData: number): number {
            return Math.floor((cbCardData-1)/13);
        }
        
        /**
        * //牌的逻辑数值
        * @param cbCardData
        */
        // public static getCardLogicValue(cbCardData: number): number {
        //     var bCardValue: number = this.getCardValue(cbCardData);
        //     //如果是A,则返回(bCardValue+13)，否则返回bCardValue
        //     return (bCardValue == 1) ? (bCardValue + 13) : bCardValue;
        // }
	}
}
