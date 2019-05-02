module cyvos {
    
    /**
	 * @author huangkan
	 *  服务端推送的消息对象
	 */
    export class MsgBox implements cy.IServerSuruct {
        
         mtype : number
         szCaption: string;
         szText: string
         dwIconBtn: number
         delay: number
         color: number
         szWeb: string;
         dwAction: number;
        
        
        decode(inputStream: cy.SrsStreamReader): void {
            this.mtype = inputStream.getByte();
            this.szCaption = inputStream.getStr();
            this.szText = inputStream.getStr();
            this.dwIconBtn = inputStream.getInt();
            this.delay = inputStream.getByte();
            this.color = inputStream.getInt();
            this.szWeb = inputStream.getStr();
            this.dwAction = inputStream.getByte();
        }

        encode(outputStream: cy.SrsStreamWriter): void {
        }
    	

	}
}
