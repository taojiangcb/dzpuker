module cyvos {
	export class PlayerPlace implements cy.IServerSuruct {
        
        appId: number;
        
        appSession: number;
        
        gameId: number;

		state: number;
        
        
        decode(inputStream: cy.SrsStreamReader): void {
			this.appId = inputStream.getInt();
			this.appSession = inputStream.getInt();
			this.gameId = inputStream.getInt();
			this.state = inputStream.getByte();
        }
        
        
        encode(outputStream: cy.SrsStreamWriter): void {
		}
	}
}