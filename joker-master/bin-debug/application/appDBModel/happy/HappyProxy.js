var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    function getProxy() {
        return __GET_PROXY(HappyProxy);
    }
    happy.getProxy = getProxy;
    function getTableVO() {
        return getProxy().tableVO;
    }
    happy.getTableVO = getTableVO;
    var HappyProxy = (function (_super) {
        __extends(HappyProxy, _super);
        function HappyProxy(name, data) {
            var _this = _super.call(this, HappyProxy.NAME) || this;
            /**牌局结束时 是否退出  1庄家退出游戏 2庄家下庄 */ // 
            _this.outState = 0;
            _this.historyValues = [];
            _this.historyWin = [];
            /**所有奖池 */
            _this.allWinBet = {};
            _this.nowLuckyCard = null;
            _this.nextLuckyCard = null;
            /**
             * 挂机换房间标记
             */
            // changeHook:boolean = false;
            /**
             * 是否在挂机中
             */
            _this.hookingFlag = false;
            /**上限倍数 */
            _this.addTimes = 1;
            _this.typeNums = [1, 1, 1, 2, 3, 3, 4, 5, 6, 7];
            return _this;
        }
        /**
         * 设置为默认值
         */
        HappyProxy.prototype.defaultHook = function () {
            this.hookInfo = new happy.HookVO();
            // this.changeHook = false;
            this.hookingFlag = false;
        };
        /**
         * 设置牌局输赢
         * 赢 1 输 0
         *  */
        HappyProxy.prototype.processingData = function (newN) {
            var len = this.historyValues.length;
            if (newN >= 0) {
                if (len >= 20)
                    this.historyValues.splice(20, 1);
                this.historyValues.push(newN);
            }
        };
        /**
        * 获取牌局输赢
        * 10.5% 99.9% 99.9%
        *  */
        HappyProxy.prototype.getProcessingData = function () {
            var winNum = [0, 0, 0, 0];
            var aNum = 0;
            var bNum = 0;
            var cNum = 0;
            var dNum = 0;
            var len = this.historyValues.length;
            while (--len >= 0) {
                var single = this.historyValues[len];
                if ((single & 1) == 1)
                    aNum++;
                if ((single & 2) == 2)
                    bNum++;
                if ((single & 4) == 4)
                    cNum++;
                if ((single & 8) == 8)
                    dNum++;
            }
            len = this.historyValues.length;
            winNum = [this.numberToEvent(aNum, len),
                this.numberToEvent(bNum, len),
                this.numberToEvent(cNum, len),
                this.numberToEvent(dNum, len)
            ];
            return winNum;
        };
        HappyProxy.prototype.numberToEvent = function (_a, _b) {
            var re = Math.floor(_a / _b * 100);
            if (re) {
                return re;
            }
            else {
                return 0;
            }
        };
        /**关闭  */
        HappyProxy.prototype.outRoom = function () {
            if (this.isPlay) {
                if (this.alert != null) {
                    this.alert.closeAndClear();
                    this.alert = null;
                }
                else {
                    if (this.tableVO != null && this.mySeatvo != null && this.tableVO.gameStatus == 1 && this.mySeatvo.showPos == 1)
                        // tip.popSysCenterTip("正在下注，您不能下庄....", tip.TIPS_TYPE.TIPS_WARNING);
                        this.alert = tip.Alert.show("牌局尚未结束，点击确定，将在牌局结束后退出游戏", "", tip.CONFIRM, this.outbakfun, null, this);
                    else {
                        this.leaveRoom();
                    }
                }
                return false;
            }
            return true;
        };
        /**打开打牌界面 */
        HappyProxy.prototype.openMoudle = function (opendata) {
            if (opendata === void 0) { opendata = null; }
            if (user.getProxy().exitToMoudle == -1) {
                var arr = gameabc.UIManager.instance.getOpenList([AppReg.APP_HAPPY, __PRELOAD__]);
                __OPEN_PRE_MOUDLE(AppReg.APP_HAPPY, opendata, arr);
            }
            else {
                __OPEN_PRE_MOUDLE(AppReg.APP_HAPPY, opendata, [user.getProxy().exitToMoudle]);
            }
        };
        HappyProxy.prototype.outbakfun = function (type) {
            if (type === void 0) { type = tip.YES; }
            if (type == tip.YES) {
                if (this.tableVO.gameStatus == 1)
                    this.outState = 1;
                else
                    this.leaveRoom();
            }
        };
        HappyProxy.prototype.leaveRoom = function () {
            if (user.getProxy().exitToMoudle == -1) {
                __CLOSE_MOUDLE(AppReg.APP_HAPPY);
            }
            else {
                __CLOSE_ALLMOUDLE_OPEN(user.getProxy().exitToMoudle, null, [AppReg.ALERT]);
            }
            user.getProxy().leaveRoom();
        };
        /**我的筹码 */
        HappyProxy.prototype.getMoney = function () {
            var money = 0;
            if (this.mySeatvo != null) {
                money = this.mySeatvo.totalBet;
            }
            else if (user.getProxy().svrGameData) {
                money = user.getProxy().svrGameData.silver;
            }
            return money;
        };
        /**加注人数量 */
        HappyProxy.prototype.getAddNum = function () {
            var num = 0;
            var vos = this.tableVO.playerVO;
            for (var i = 0, len = vos.length; i < len; i++) {
                var play = vos[i];
                if (play.posBet1 > 0 || play.posBet2 > 0 || play.posBet3 > 0 || play.posBet4 > 0)
                    num++;
            }
            return num;
        };
        /**上庄 */
        HappyProxy.prototype.addBank = function () {
            var money = room.getProxy().current.bigBlinds * 100;
            if (this.getMoney() >= money) {
                __PVO().to(app.NetAction.GLXY_REQ_BECOME_BANKER);
                return true;
            }
            else {
                user.getProxy().notMoney("上庄需要筹码大于等于" + FormatUtils.wan(money) + " 您的筹码不足，请回到主界面前往钱庄取款或充值"); // tip.popSysCenterTip("筹码达到" + FormatUtils.wan(money) + "上庄..", tip.TIPS_TYPE.TIPS_WARNING);
                return false;
            }
        };
        /*
        *动画库
        */
        HappyProxy.prototype.getFaceFactory = function () {
            if (this.faceFactory == null) {
                var data = RES.getRes("happy_mv_json");
                var txtr = RES.getRes("happy_mv_png");
                this.faceFactory = new egret.MovieClipDataFactory(data, txtr);
            }
            return this.faceFactory;
        };
        /**
        * 客户端发送聊天
        * @param mess 信息
        * @param send 发送座位号
        * @param rev 收座位号 -1表情 -2文字 >=0魔法接收座位号
        * @param messcode 统计用的code 100+ 表情 200+ 文字 300+魔法表情   400+是普通表情  500+是玩家表情
        * @param l 不为空 收费表情
        * */
        HappyProxy.prototype.sendChat = function (mess, send, rev, messcode, l) {
            if (l === void 0) { l = null; }
            var p = __PVO().s(mess).i(send, rev);
            if (l != null)
                p.l(messcode);
            p.to(app.NetAction.GLXY_REQ_CHAT);
            var code;
            if (rev == -1)
                code = 52000 /* PLAYCARD_FACE */ + messcode + 300;
            else
                code = 52000 /* PLAYCARD_FACE */ + messcode + 200;
            mc2sdk.event(code, this.tableVO.servicePay); //统计
        };
        HappyProxy.prototype.removeFactory = function () {
            if (this.faceFactory != null) {
                this.faceFactory.clearCache();
                this.faceFactory = null;
            }
        };
        /**可以添加的筹码 */
        HappyProxy.prototype.canAddbet = function (index, dec, add) {
            if (dec === void 0) { dec = 0; }
            if (add === void 0) { add = 0; }
            var vo = this.mySeatvo;
            var tablevo = this.tableVO;
            if (vo == null || tablevo == null || tablevo.gameStatus == 0 || room.getProxy().current == null || vo.showPos == 1) {
                return -1;
            }
            var total = room.getProxy().current.bigBlinds * getProxy().addTimes;
            var servicePay = tablevo.servicePay * getProxy().addTimes;
            if (vo.showPos > 0) {
                total = total + total; //在座位上的2倍上限 
                servicePay = servicePay + servicePay;
            }
            return Math.min(vo.getLeftAdd(servicePay + dec, add), total - vo.getBet(index));
        };
        /***牌型对应赔率 */
        HappyProxy.prototype.typeToAddNum = function (type) {
            return this.typeNums[type];
        };
        return HappyProxy;
    }(app.mvc.AbsractProxy));
    HappyProxy.NAME = "HappyProxy";
    happy.HappyProxy = HappyProxy;
    __reflect(HappyProxy.prototype, "happy.HappyProxy");
})(happy || (happy = {}));
//# sourceMappingURL=HappyProxy.js.map