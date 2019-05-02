module cyvos {
            
    /**
     * @author huangkan
	 *  SRS基础详细结构
     *  
     *  细节且听张力SAY: 简单来说SRSXY.h里的协议发送时APPID和PROCESSID都是0
     *  其他功能模块的协议PROCESSID必须填，
     *  APPID看情况，有状态的必须填入发到游戏模块，无状态的可以不填，如发到工具模块的
     */
    export class SrsPackage implements cy.IServerSuruct {
        
        /** 标志位 */
        sFlag: number = 16385;   // 2 << 13 | 1
        
        /** 包体大小,不包含包头的大小 */
        sLen: number = 0; 
        
        /** 协议id */
        sXYID: number = 0;
        
        /** 服务器模块id */
        sProcessID: number = 0;
        
        /** 服务器服务id */
        nAppID: number = 0;
        
        /** 包体 */
        data: egret.ByteArray;

        
        constructor() {
            this.data = new egret.ByteArray();
            this.data.endian = egret.Endian.LITTLE_ENDIAN;
        }
        
        
        decode(inputStream: cy.SrsStreamReader): void {
            this.sFlag = inputStream.getUShort()
            this.sLen = inputStream.getUShort();
            this.sXYID = inputStream.getUShort();
            this.sProcessID = inputStream.getUShort();
            this.nAppID = inputStream.getInt();
            
            if(this.sLen > 0) {
                this.data = inputStream.getBytes(this.sLen);
            }
            
            if(this.sFlag & 1) {
                var bytes: ArrayBuffer = cy.helpDecrypt(this.data.buffer);
                this.data = new egret.ByteArray(bytes);
                this.data.endian = egret.Endian.LITTLE_ENDIAN;
            }
            
        }
        
        
        encode(outputStream: cy.SrsStreamWriter): void {
            // console.log("=============================" + this.data.length);
            // console.log(FormatUtils.bufferToStr(this.data.buffer));
            if(this.sFlag & 1) {
                this.data = new egret.ByteArray(cy.helpEncrypt(this.data.buffer));
            }
            // console.log(FormatUtils.bufferToStr(this.data.buffer));
            // console.log("-----------------------------");
            this.sLen = this.data.length;
            outputStream.putUShort(this.sFlag);
            outputStream.putUShort(this.sLen);
            outputStream.putUShort(this.sXYID);
            outputStream.putUShort(this.sProcessID);
            outputStream.putInt(this.nAppID);
            outputStream.putBytes(this.data);
        }

	}
	
}
