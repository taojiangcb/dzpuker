var smallGame;
(function (smallGame) {
    function setCoin(value) {
        gameabc.LocalSO.setAllItem("SmallGameCoin", value);
        if (value <= 0)
            tipExit();
    }
    smallGame.setCoin = setCoin;
    function getCoin(add) {
        if (add === void 0) { add = 0; }
        var data = gameabc.LocalSO.getAllItem("SmallGameCoin");
        var coin = data == null || data == "" ? 5000 : Number(data);
        coin += add;
        if (add != 0)
            setCoin(coin);
        return coin;
    }
    smallGame.getCoin = getCoin;
    function setClearGameBestTime(value) {
        gameabc.LocalSO.setAllItem("ClearGameBestTime", value);
    }
    smallGame.setClearGameBestTime = setClearGameBestTime;
    function getClearGameBestTime() {
        var str = gameabc.LocalSO.getAllItem("ClearGameBestTime");
        return str == null ? -1 : parseInt(str);
    }
    smallGame.getClearGameBestTime = getClearGameBestTime;
    function tipExit() {
        tip.Alert.show("金币已用完啦，请选择其他游戏赚点钱吧!", null, tip.ALERT, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            __CLOSE_ALLMOUDLE_OPEN(AppReg.LOGIN);
        }, null, this);
    }
    smallGame.tipExit = tipExit;
})(smallGame || (smallGame = {}));
//# sourceMappingURL=SmallGameProxy.js.map