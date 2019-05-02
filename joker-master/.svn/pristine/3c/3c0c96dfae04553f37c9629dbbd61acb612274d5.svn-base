/**
 * Created by JiangTao on 2016/7/1.
 */
module fiveCard {
    export function getProxy():FiveCardProxy {
        return __GET_PROXY(FiveCardProxy);
    }

    export class FiveCardProxy extends app.mvc.AbsractProxy {

        static NAME:string = "__FiveCard__Proxy__";

        COUNT:number = 7;       //数量
        TIME:number = 60;       //倒计时Time       

        /** 高牌	 */
        static HIGH: number = 0;
        /** 一对 */
        static ONE_PAIR: number = 1;
        /** 两对	 */
        static TWO_PAIRS: number = 2;
        /** 三条	 */
        static THREE_KIND: number = 3;
        /** 顺子	 */
        static STRAIGHT: number = 4;
        /** 同花	 */
        static FLUSH: number = 5;
        /** 葫芦	 */
        static FULL_HOUSE: number = 6;
        /** 四条	 */
        static FOUR_KIND: number = 7;
        /** 同花顺	 */
        static STRAIGHT_FLUSH: number = 8;
        /** 皇家同花顺	 */
        static ROYAL: number = 9;
        
        /**
         * 
         * 所有的牌型列表
         * 
         * */
        allType:number[] = [
            0,1,2,3,4,5,6,7,8,9
        ]


        constructor(name?:string,data?:any) {
            super(FiveCardProxy.NAME,data);
        }

        randomCard():number[] {
            var all_card_values:number[] = playcards.getProxy().m_cbCardData;
            var max_random:number = all_card_values.length - 1;
            var cards:number[] = [];
            var random_nums:number[] = [];
            while(true) {
                var generate:number = Math.round(Math.random() * max_random);
                if(random_nums.indexOf(generate) == -1) {
                    random_nums.push(generate);
                    cards.push(all_card_values[generate]);
                    if(cards.length == this.COUNT) break;
                }
            }
            return cards;
        }
    }
}