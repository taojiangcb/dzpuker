module cyvos {


    export const enum TABLE_STATE {
        EMPTY,//空桌
        READY,//有人
        PLAYING//游戏中
    }


    /**
     * @author huangkan
	 *  服务端推送的桌子信息对象
     */
    export class TableInfo implements cy.IServerSuruct {
    
        /** 服务端tableId */
        svrId: number;
        /** 桌子状态 */
        state: number;
        /** 桌子样式 */
        tableStyle: number;
        /** 是否需要密码 */
        havePwd: boolean;
        /** 桌子的桌位数 */
        chairs: number;
        /** 坐下规则 */
        joinRule: string;
        /** 游戏规则 */
        gameRule: string;
        /** 旁观规则 */
        seeRule: string;
        /** 是否有桌长 */
        haveOwner: boolean;
        /** 桌长的区号 */
        ownerBrandId: number;
        /** 桌长的数字Id */
        ownerNumberId: number;
        /** 客户端keyword */
        gameKeyword: string;
        
        encode(outputStream: cy.SrsStreamWriter): void {
            
        }
        
        decode(inputStream: cy.SrsStreamReader, skip:number=0): void {
            this.svrId = inputStream.getShort(skip);
            this.state = inputStream.getByte();
            this.tableStyle = inputStream.getByte();
            this.havePwd = inputStream.getBool();
            this.chairs = inputStream.getByte();
            this.joinRule = inputStream.getStr();
            this.gameRule = inputStream.getStr();
            this.seeRule = inputStream.getStr();
            this.haveOwner = inputStream.getBool();
            if(this.haveOwner) {
                this.ownerBrandId = inputStream.getInt();
                this.ownerNumberId = inputStream.getInt();
            }
            this.gameKeyword = inputStream.getStr();
        }
    
    }

}

