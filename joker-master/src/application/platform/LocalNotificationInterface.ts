class LocalNotificationInterface {
    public constructor() {
	}
    public static LOCALNOTI_SIGN = "LOCAL_SIGN";
    public static LOCALNOTI_CALLBACK = "LOCALNOTI_CALLBACK";
    public static LOCALNOTI_GOLDTREE = "LOCALNOTI_GOLDTREE";
    public static send(titleValue: string, timeValue: number, contentvalue: string, identityKeyValue: string) {
        var lnNotification = {
            title: titleValue,                          //提示title
            time: timeValue,                            //相隔触发时间 时间单位:s(秒)
            content: contentvalue,                      //本地推送消息的内容
            userData: {                                 //推送时带入的参数 可以在消息接收回时处理(例如{"param":"7799","identityKey":"keykeykey"})
                identityKey: identityKeyValue           //消息的key 相同key的消息会被覆盖以最后一次的为准
            }
        }
        var jsonNoti:string = JSON.stringify(lnNotification);
        platform.pushLocalNotice(lnNotification);
        console.log(lnNotification);
    }
}