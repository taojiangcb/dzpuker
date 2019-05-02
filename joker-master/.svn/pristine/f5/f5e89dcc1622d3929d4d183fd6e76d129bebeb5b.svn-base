module cyvos {
 
    export class PlayerGameData implements cy.IServerSuruct {
        
        /** 玩家区号 */
        // brandId: number;
        
        /** 玩家数字ID */
        // numId: number;

        /** [客户端自定义]，位移合并brandId与numId */
        roleId: number;
        
        /** 银子 */
        silver: number;
        
        /** 游戏积分 */
        score: number;
        
        /** 银行里的银子 */
        bankSilver:number

        /** 游戏累计胜盘数 */
        numWins: number;
        
        /** 游戏累计负盘数 */
        numLosts: number;
        
        /** 游戏累计和盘数 */
        numPeaces: number;
        
        /** 游戏累计断线盘数 */
        numEscapes: number;
        
        /** 经验 */
        exp: number;
        
        /** 经验 */
        profit:number;
        
        /** 是否新玩家 */
        isNew:boolean;
        
        decode(inputStream: cy.SrsStreamReader): void {
            
            // this.numId = inputStream.getInt(skip);
            // this.brandId = inputStream.getInt();
            this.roleId = inputStream.getLong();
            
            this.score = inputStream.getLong();
            this.silver = inputStream.getLong();
            
            this.numWins = inputStream.getInt();
            this.numLosts = inputStream.getInt();
            this.numPeaces = inputStream.getInt();
            this.numEscapes = inputStream.getInt();
            
            this.exp = inputStream.getInt();
            this.profit = inputStream.getInt();
            this.isNew = inputStream.getBool();
            this.bankSilver = inputStream.getLong();
        }

        encode(outputStream: cy.SrsStreamWriter): void {
        }
    	
    }
}