module smallGame {
    
    export function setCoin(value:number):void {
        gameabc.LocalSO.setAllItem("SmallGameCoin",value);
        if (value <= 0) tipExit();
    }

    export function getCoin(add:number=0):number {
        var data = gameabc.LocalSO.getAllItem("SmallGameCoin");
        var coin = data==null||data==""? 5000 : Number(data);
        coin += add;
        if (add!=0) setCoin(coin);
        return coin;
    }

    export function setClearGameBestTime(value:number):void {
        gameabc.LocalSO.setAllItem("ClearGameBestTime",value);
    }
    
    export function getClearGameBestTime():number {
        var str = gameabc.LocalSO.getAllItem("ClearGameBestTime");
        return str==null ? -1 : parseInt(str);
    }

    export function tipExit():void {
        tip.Alert.show("金币已用完啦，请选择其他游戏赚点钱吧!",null,tip.ALERT,(...args)=>{
            __CLOSE_ALLMOUDLE_OPEN(AppReg.LOGIN);
        },null,this);
    }

}
