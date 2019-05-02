module cy {
    /**
     * @author huangkan
	 *  服务端对象，使用读写器序列化与反序列化流中的子对象
     */
    export interface IServerSuruct {
        
        encode(outputStream: SrsStreamWriter, skip?:number): void;
        decode(inputStream: SrsStreamReader, skip?:number): void;
        
    }
}

