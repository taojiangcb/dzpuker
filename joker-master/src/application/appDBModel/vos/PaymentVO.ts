/**
 * Created by taojiang on 16/10/13.
 */
module appvos {

    export interface ICREAT {
        name:string,
        price:number,
    }

    export class PaymentVO implements ICREAT{
        name:string = "";
        price:number = 0;
    }
}