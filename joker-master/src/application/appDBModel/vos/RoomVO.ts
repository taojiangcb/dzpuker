module appvos {


    /** 客户端房间类型对象
     * 其中各种参数，使用时请注意……
     * 创建时使用数字(方便与服务端核对，检查)
     * 而实际逻辑判断时，请使用常量 */
	export class RoomVO {
        
        /** 客户端标识：房间在客户端的映射ID，当服务端修改房间数据时，通过该ID匹配客户端同房间配置 */ 
        ctId:number;

        /** 客户端标识：房间类型，详见RoomProxy.TYPE */ 
        type:number;
        /** 客户端标识：是否为私人房  */ 
        isVip:boolean;
        /** 客户端标识：是否可以快速弃牌  */ 
        isFast:boolean;

        /** 服务端配置：房间类型，不同的类型进入流程不同，详见RoomProxy.SVR_MODE  */ 
        svrMode:number;

        /** 在服务端配置的roomId */ 
        svrRoomId:number;
        /** 在服务端配置的ofsId */ 
        svrOfsId:number;
        
        /** 小盲(欢乐城最小投注) */
        smallBlinds: number;
        /** 可以投注筹码量 */
        addBlinds:number[];
        /** 大盲(欢乐城最大投注) */
        bigBlinds: number;
        /** 最小带入 */ 
        minBank: number;
        
        /** 推荐最小带入 */
        tuijianMinBank: number;

        /** 最大带入 */
        maxBank: number;
        /** 欢乐城普通座位带入 */
        normalBank:number;
        /** 欢乐城服务费基数 */
        service:number;

        /** 前注 */
        anti:number;

        /** 在线人数 */
        online:number = 0;
        
        /** 当个房价价格比例 
         * 当个房间魅力比例
         * 当个房间魅力积分比例
         *  当个房间对方魅力比例 
         * 当个房间对方魅力积分比例
         */
        charmList:any[] =[];


        /** 真人房站起(记录状态的临时功能性变量) */
        standInGirl:boolean;

        /** 是否是保险 */
        isInsurance: boolean;
    }
}