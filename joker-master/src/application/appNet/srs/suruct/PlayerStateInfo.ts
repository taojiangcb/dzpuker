module cyvos {
    
    
    export const enum PLAYER_ACTION {
        SITDOWN = 1,//坐下
        STANDUP,//站起
        READY,//房间模块按了开始
        SEEGAME,//桌上有人旁观
        CHANGE_TO_START,//坐着按了开始
        CHANGE_TO_SEEGAME,//坐着变成旁观
        CHANGE_SEAT,//换座位
        LEAVE_ROOM,//离开房间
        SEEGAME2//空桌旁观
    }

    
        
    /**
	 * @author huangkan
	 *  服务端推送的玩家状态对象
	 */
    export class PlayerStateInfo implements cy.IServerSuruct {
        
        /** 玩家状态 */
        state : number;
        
        /** 房间编号 */
        roomId: number;
        
        /** 桌子ID */
        tableId: number;
        
        /** 玩家所在桌位号 */
        sitorder: number;
        
        /** 玩家区号 */
        // brandId: number;
        
        /** 玩家数字ID */
        // numId: number;
        
        /** [客户端自定义，位移合并brandId与numId */
        roleId: number;
        
        decode(inputStream: cy.SrsStreamReader): void {
            this.state = inputStream.getByte();
            this.roomId = inputStream.getInt();
            this.tableId = inputStream.getShort();
            this.sitorder = inputStream.getByte();
            // this.brandId = inputStream.getInt();
            // this.numId = inputStream.getInt();
            this.roleId = inputStream.getLong(0,true);
        }

        encode(outputStream: cy.SrsStreamWriter): void {
            
        }
    	
    }
}