module cyvos {
            
    /**
	 * @author huangkan
	 *  二级指令结构
	 */
    export class GamePackage implements cy.IServerSuruct {
        
        xyId: number;
        
        len: number;
        
        data: egret.ByteArray;
        
        constructor() {
            this.data = new egret.ByteArray();
            this.data.endian = egret.Endian.LITTLE_ENDIAN;
        }
        
        decode(inputStream: cy.SrsStreamReader): void {
            this.xyId = inputStream.getShort()
            this.len = inputStream.getShort();
            if (this.len > 0) {
                this.data = inputStream.getBytes(this.len);
            }
        }
        
        
        encode(outputStream: cy.SrsStreamWriter): void {
            outputStream.putShort(this.xyId);
            this.len = this.data.length;
            outputStream.putShort(this.len);
            if (this.len > 0) {
                outputStream.putBytes(this.data);
            }
        }
        
    }
    
}