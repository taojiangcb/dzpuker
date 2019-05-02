module cyvos {
    
    export const enum PLAYER_SEX {
        FEMALE = 0, //女
        MALE = 49   //男
    }
    
    /**
	 * @author huangkan
	 *  服务端查询的游戏数据对象
	 */    
    export class PlayerInfo implements cy.IServerSuruct {

        /** 玩家数字ID */
        // numId: number;
        
        /** 玩家区号 */
        // areaId: number;

        /** [客户端自定义]，位移合并areaId与numId */
        roleId: number;
        
        /** 平台账号 */
        coustomerId : string;
        
        /** 昵称 */
        nickname: string;
  
        /** 基本权限 */
        right: number;
        
        /** 性别 */
        sex: number;
        
        /** 银子 */
        silver: number;
        
        /** 游戏积分 */
        score: number;
        
        /** 经验 */
        exp: number;
        
        /** 游戏累计胜盘数 */
        numWins: number;
        
        /** 游戏累计负盘数 */
        numLosts: number;
        
        /** 游戏累计和盘数 */
        numPeaces: number;
        
        /** 游戏累计断线盘数 */
        numEscapes: number;
        
        /** 帮会ID */
        societyId: number;
        
        /** 帮会名字 */
        societyName: string;
        
        /** 玩家房间内状态 */
        state: number;
        
        /** 桌号 */
        tableId: number;
        
        /** 桌上的座位号 */
        sitorder: number;
        
        /** 网速 */
        netSpeed: number;
        
        /** 服装ID */
        avatarId: number;
        
        /** 会员号 */
        vipId: number;
        
        /** 客户端类型 */
        clientType: number;
        
        /** 硬件标识 */
        hardwareFlag: number;

        /** 玩家自定义头像标记 */
        pictureId: number;

        /** 积分类型 */
        scoreType: number;

        /** 盛大通行证数字账号 */
        ptnumId: string;
        
        /** 操作系统版本号 */
        osVer: number;
        
        decode(inputStream: cy.SrsStreamReader, skip:number = 0): void {
            // this.brandId = inputStream.getInt(skip);
            // this.numId = inputStream.getInt();
            this.roleId = inputStream.getLong(skip,true);
            
            this.coustomerId  = inputStream.getStr();
            this.nickname = inputStream.getStr();
            
            this.right = inputStream.getInt();
            this.sex = inputStream.getByte();
            this.silver = inputStream.getLong();
            this.score = inputStream.getLong();
            this.exp = inputStream.getInt();
            
            this.numWins = inputStream.getInt();
            this.numLosts = inputStream.getInt();
            this.numPeaces = inputStream.getInt();
            this.numEscapes = inputStream.getInt();
            
            this.societyId = inputStream.getInt();

            this.societyName = inputStream.getStr();
            this.state = inputStream.getShort();

            this.tableId = inputStream.getShort();
            this.sitorder = inputStream.getByte();
            
            this.netSpeed = inputStream.getShort();
            this.avatarId = inputStream.getInt();
            this.vipId = inputStream.getInt();
            this.clientType = inputStream.getInt();
            this.hardwareFlag = inputStream.getInt();
            this.pictureId = inputStream.getInt();
            this.scoreType = inputStream.getInt();
            // this.ptnumId = inputStream.getStr();
            // this.osVer = inputStream.getInt();
        }

        encode(outputStream: cy.SrsStreamWriter): void {
        }
        
        
    }
}