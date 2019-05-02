
class AppGlobal {

    /*
     * 游戏的显示层的根层级
     */
    public static appRoot: AppRoot = null;
    public static appReg: AppReg = null;
    
    /*
     * 全屏的大小
     */
    public static stageFullWidth: number = 0;
    public static stageFullHeight: number = 0;

    /*
     * 显示最大宽
     */
    public static pageMaxWidth: number = 1136 ;//

    /*
     * 显示最大高
     */
    public static pageMaxHeight: number = 768;//
    /*
     * 显示最小宽
     */
    public static pageMinWidth: number = 960;//
    /*
     * 显示最小高
     */
    public static pageMinHeight: number = 640;//
    public static isPCPlay: boolean = false;//
    public static isRotation: boolean = false;//

    /**
     * 本地服务器工具调试模式
     */
    static isSvrDebug:boolean;

    /**
     * 当前调试的玩家id
     * @type {number}
     */
    static DebugRoleId:number = 0;

    /**
     * 标记用户是否已经登录过（在这个项目里已经没有用了----------）
     */
    static isLoginFlag:boolean = false;

    /*
     * 获取游戏当前的 canvas
     */
    public static get gameCanvas(): any {
        var aa = document.getElementsByClassName("egret-player") 
        if(aa && aa.length > 0) {
            var can = aa[0]["children"][0];
            return can;
        }
        return null;
    }

    public constructor() {
    }
    
    public static get AppStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    private static message;
    
    /**返回protobuf 类*/
    public static getMessage(str: string): any {
        if(AppGlobal.message == null) {
            //初始化template_proto
            var mess = RES.getRes("MessageVO_proto");
            if(mess == null)
                return null;
            AppGlobal.message = dcodeIO.ProtoBuf.loadProto(mess);
        }
        return AppGlobal.message.build("com.gameabc.ipad.http."+str);
    }
    
    /**返回 protobufVO */
    public static getMessageVO(str: string,data: ArrayBuffer=null): any {
        var msgClass = this.getMessage(str);
        if(data == null)
            return new msgClass();
        return msgClass.decode(data);
    }

    /**返回 protobufVO 的ArrayBuffer数据*/
    public static getMessageArrayBuffer(vo:any): ArrayBuffer{
        return vo.toArrayBuffer();
    }
    
    private static stageTexture:egret.RenderTexture
    public static drawStage(scale:number): egret.RenderTexture{
        if (this.stageTexture != null)
            this.stageTexture.dispose();
        this.stageTexture = new egret.RenderTexture();
        var display = egret.MainContext.instance.stage;
        this.stageTexture.drawToTexture(display, new egret.Rectangle(0,0,display.stageWidth,display.stageHeight),scale);
        return this.stageTexture;
    }
}
