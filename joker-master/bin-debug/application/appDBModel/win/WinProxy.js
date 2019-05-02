var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var win;
(function (win) {
    function getProxy() {
        return __GET_PROXY(WinProxy);
    }
    win.getProxy = getProxy;
    var WinProxy = (function (_super) {
        __extends(WinProxy, _super);
        function WinProxy(name, data) {
            var _this = _super.call(this, WinProxy.NAME, data) || this;
            /**房间BB数***/
            _this.bb = 0;
            /**进房间打牌手数***/
            _this.hand = 0;
            /**进房间总盈利数***/
            _this.winNum = 0;
            /**时间***/
            _this._timeNum = 0;
            /**打开ui的类型 */
            _this.type = 0;
            /**是否最后一次领取成长奖励 */
            _this._isApprenticeship = false;
            /**是否是没钱导致离开游戏 */
            _this._isNoMoney = false;
            /**是否清空了缓存的数据 */
            _this.isClean = true;
            return _this;
        }
        WinProxy.prototype.playOven = function (winNum, bb) {
            this.hand++;
            this.winNum += winNum;
            this.bb = bb;
            if (this._timeNum == 0) {
                this._timeNum = new Date().getTime();
            }
        };
        /**
         * 结算跳转
         */
        WinProxy.prototype.isOpen = function () {
            var roomVO = user.getProxy().currentRoom;
            // mtt 和 sng房不弹出行为分析
            if (!roomVO || roomVO.type == 4 /* SNG */ || roomVO.type == 5 /* MTT */) {
                this.cleanData();
                return;
            }
            if (this.hand >= 12) {
                var mul = this.winNum / this.bb;
                if (mul < 300) {
                    this.type = 1;
                }
                else if (mul > 300) {
                    this.type = 2;
                }
            }
            if (this._isApprenticeship && roomVO.type == 8 /* FREE */) {
                this.type = 3;
            }
            this._openModule();
        };
        /**根据type打开页面
         * 试用时需先限制type
         * type>0
         */
        WinProxy.prototype._openModule = function () {
            if (this.type) {
                switch (this.type) {
                    case 1:
                        if (this._enterData["joinHand"] != undefined) {
                            __OPEN_PRE_MOUDLE(AppReg.APP_RECORD_ANALYSIS, this._enterData);
                        }
                        else {
                            this.cleanData();
                        }
                        break;
                    case 2:
                        __OPEN_PRE_MOUDLE(AppReg.APP_PLAY_OVEN);
                        break;
                    case 3:
                        this.cleanData();
                        __OPEN_PRE_MOUDLE(AppReg.WIN_APPRENTICESHIP);
                }
            }
            else {
                this.cleanData();
            }
        };
        Object.defineProperty(WinProxy.prototype, "timeNum", {
            get: function () {
                var str = "";
                var now = new Date().getTime() - this._timeNum;
                str = DateUtils.dateFormat(now, DateUtils.HMS);
                return str;
            },
            enumerable: true,
            configurable: true
        });
        WinProxy.prototype.cleanData = function () {
            this.hand = 0;
            this.winNum = 0;
            this.bb = 0;
            this._timeNum = 0;
            this.type = 0;
            this._enterData = {};
            this.isClean = true;
            this._isApprenticeship = false;
            this._isNoMoney = false;
        };
        /**
         * 获取进入游戏时的玩家对局数据
         * 注：对局数据存储在_enterData
         */
        WinProxy.prototype.getEnterData = function () {
            if (!this.isClean) {
                return;
            }
            this.isClean = false; // 进入时把isClean设置为false，标识有数据
            var userInfo = user.getProxy().playInfoVO;
            // var freeGold = user.getProxy().freeGold;
            if (userInfo == null) {
                this._enterData = {};
                return;
            }
            var obj = {
                joinHand: userInfo.joinHand,
                totalHand: userInfo.totalHand,
                raiseWhenPreflop: userInfo.raiseWhenPreflop,
                betOrRaiseTime: userInfo.betOrRaiseTime,
                callTime: userInfo.callTime,
                raiseTime: userInfo.raiseTime,
                tmHand: userInfo.tmHand,
                continueBetTime: userInfo.continueBetTime,
                betOrRaiseHand: userInfo.betOrRaiseHand,
                spreadHand: userInfo.spreadHand,
                winDivBB: userInfo.winDivBB,
                huntKill: userInfo.huntKill
            };
            this._enterData = obj;
        };
        return WinProxy;
    }(app.mvc.AbsractProxy));
    WinProxy.NAME = "__WIN_PROXY__";
    win.WinProxy = WinProxy;
    __reflect(WinProxy.prototype, "win.WinProxy");
})(win || (win = {}));
//# sourceMappingURL=WinProxy.js.map