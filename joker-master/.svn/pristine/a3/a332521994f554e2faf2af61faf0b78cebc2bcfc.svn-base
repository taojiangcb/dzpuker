module cyvos {
    
    
    export const enum PLAYER_SET_LIMIT_MASK {
        IP = 1, //限制同IP
        PASSWORD = 2, //加密
        NETSPEED = 4, //网速限制
        ESCAPE = 8, //断线限制
        MIN_SCORE = 16, //最低分
        MAX_SCORE = 32, //最高分
        MIN_RICH = 64, //换座位
        MAX_RICH = 128 //离开房间
    }

    
        
    /**
	 * @author huangkan
	 *  客户端设置服务器密码
	 */
    export class PlayerSet implements cy.IServerSuruct {
        
        /** 限制内容 */
        mask : number;
        
        /** 密码 */
        password: string;
        
        decode(inputStream: cy.SrsStreamReader): void {
            
        }

        encode(outputStream: cy.SrsStreamWriter): void {
            if(this.password==null) this.mask = 0;
            else this.mask = cyvos.PLAYER_SET_LIMIT_MASK.PASSWORD;
            outputStream
                .putShort(this.mask)
                .putStr(this.password==null?"":this.password)
                .putInt(0)
                .putInt(0)
                .putLong(0)
                .putLong(0)
                .putLong(0)
                .putLong(0);
        }
    	
    }
}