/**
 *
 * @author 
 *
 */
class BrowserPlatformExecutor {
    
    private listenr: Function;

    public constructor() {
    }

    public init(): void {
        alert("BrowserPlatformExecutor init");
        this.listenr(-1, "初始化失败");
    }

    public setListener(listenr: Function): void {
        this.listenr = listenr;
    }

    public androidCallBack(msg: string): void {
        var json = JSON.parse(msg);
        this.listenr(json.code,json.msg);
    }
}
