var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var joker;
(function (joker) {
    /**
     * 扑克牌型动画控制类
     */
    var JokerCardArrageAnimation = (function () {
        function JokerCardArrageAnimation(hc) {
            this.space = 5;
            this.handCards = hc;
        }
        /**
         * 默认排列
         */
        JokerCardArrageAnimation.prototype.normalArrage = function (playTween) {
            if (playTween === void 0) { playTween = false; }
            var i = 0;
            for (i = 0; i < joker.FIVE_CARD_NUM; i++) {
                var card = this.handCards.cards[i];
                card.anchorOffsetX = 0;
                card.anchorOffsetY = 0;
                if (playTween) {
                    egret.Tween.removeTweens(card);
                    egret.Tween.get(card)
                        .to({ rotation: 0, x: i * (card.width + this.space), y: 0 }, 300, egret.Ease.quartOut);
                }
                else {
                    card.rotation = 0;
                    card.x = i * (card.width + this.space);
                    card.y = 0;
                }
            }
        };
        /**
         * 飞入到主场景
         */
        JokerCardArrageAnimation.prototype.flyIn = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var cards, scpr, root, moves;
                return __generator(this, function (_a) {
                    cards = this.handCards.cards;
                    scpr = new egret.Point(AppGlobal.stageFullWidth + cards[0].width, AppGlobal.stageFullHeight >> 1);
                    root = AppRoot.gameLayer;
                    moves = [];
                    this.handCards.cards.forEach(function (element) {
                        moves.push(new egret.Point(element.x, element.y));
                    });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            for (var i = 0; i != cards.length; i++) {
                                var sx = cards[i].width >> 1;
                                var sy = cards[i].height >> 1;
                                cards[i].visible = false;
                                var ccpx = cards[i].width >> 1;
                                var ccpy = cards[i].height >> 1;
                                var tempCard = new joker.JokerCardItem();
                                tempCard.x = scpr.x;
                                tempCard.y = scpr.y;
                                tempCard.anchorOffsetX = ccpx;
                                tempCard.anchorOffsetY = ccpy;
                                tempCard.setCardBack();
                                var cp = _this.handCards.localToGlobal(cards[i].x + 1, cards[i].y - 7);
                                var duration = 600;
                                var tw = egret.Tween.get(tempCard)
                                    .call(function (tcard) {
                                    root.addChild(tcard);
                                }, _this, [tempCard])
                                    .set({ x: scpr.x, y: scpr.y, rotation: 760 })
                                    .wait(i * duration * 0.5)
                                    .to({ x: cp.x + ccpx, y: cp.y + ccpy, rotation: 0 }, duration, egret.Ease.quartOut)
                                    .call(function () {
                                    var args = [];
                                    for (var _i = 0; _i < arguments.length; _i++) {
                                        args[_i] = arguments[_i];
                                    }
                                    args[0].removeFromParent(true);
                                    args[1].visible = true;
                                    if (args[2] == cards.length - 1) {
                                        resolve();
                                    }
                                }, _this, [tempCard, cards[i], i]);
                            }
                        })];
                });
            });
        };
        /**
         * 第一手牌时的动画
         */
        JokerCardArrageAnimation.prototype.masterHand = function (cardValues) {
            return __awaiter(this, void 0, void 0, function () {
                var duration, gameModule, imgBg, cards, rect, distance, radiusX, radiusY, centerX, centerY, fiexAngle, angleVector, sp, lsp, tps, angles, _loop_1, this_1, i;
                return __generator(this, function (_a) {
                    this.normalArrage();
                    duration = 300;
                    if (__IS_MOUDLE_OPEN(AppReg.JOKER_MODULE)) {
                        gameModule = __GET_MOUDLE_COMP(AppReg.JOKER_MODULE);
                        imgBg = gameModule.pokerBg;
                        egret.Tween.removeTweens(imgBg);
                        egret.Tween.get(imgBg)
                            .to({ alpha: 0 }, duration, egret.Ease.quadOut);
                    }
                    cards = this.handCards.cards;
                    rect = new egret.Rectangle(cards[0].x, cards[0].y, cards[0].width, cards[0].height);
                    distance = 800;
                    radiusX = distance >> 1;
                    radiusY = radiusX;
                    centerX = AppGlobal.stageFullWidth >> 1;
                    centerY = AppGlobal.stageFullHeight / 2 + 300;
                    fiexAngle = 232;
                    angleVector = 20;
                    sp = new egret.Point(centerX - distance / 2, centerY);
                    lsp = this.handCards.globalToLocal(sp.x, sp.y);
                    tps = [];
                    angles = [];
                    _loop_1 = function (i) {
                        cards[i].anchorOffsetX = rect.width >> 1;
                        cards[i].anchorOffsetY = rect.height;
                        cards[i].x = cards[i].x + cards[i].anchorOffsetX;
                        cards[i].y = cards[i].y + cards[i].anchorOffsetY;
                        var radian = (fiexAngle + i * angleVector) * Math.PI / 180;
                        var angle = radian * 180 / Math.PI;
                        var px = centerX + Math.cos(radian) * radiusX;
                        var py = centerY + Math.sin(radian) * radiusY;
                        var tp = this_1.handCards.globalToLocal(px, py);
                        tps.push(tp);
                        angles.push(angle);
                        //扇形动画函数
                        var fan = function (tps, angles, splice) {
                            if (splice === void 0) { splice = 0; }
                            if (splice >= cards.length) {
                                return;
                            }
                            for (var i_1 = splice; i_1 < cards.length; i_1++) {
                                var tempPos = tps[splice];
                                var tempAngle = angles[splice];
                                egret.Tween.get(cards[i_1])
                                    .to({ x: tempPos.x, y: tempPos.y, rotation: tempAngle - 270 }, splice == 0 ? duration : 200)
                                    .call(function () {
                                    var args = [];
                                    for (var _i = 0; _i < arguments.length; _i++) {
                                        args[_i] = arguments[_i];
                                    }
                                    if (args[0] == cards.length - 1) {
                                        fan(tps, angles, splice + 1);
                                    }
                                }, this, [i_1]);
                            }
                        };
                        egret.Tween.removeTweens(cards[i]);
                        egret.Tween.get(cards[i])
                            .wait(i * duration / 2)
                            .to({ x: lsp.x }, duration, egret.Ease.quartOut)
                            .call(function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            if (args[0] == cards.length - 1) {
                                fan(tps, angles, 0);
                            }
                        }, this_1, [i]);
                    };
                    this_1 = this;
                    for (i = 0; i < cards.length; i++) {
                        _loop_1(i);
                    }
                    return [2 /*return*/];
                });
            });
        };
        return JokerCardArrageAnimation;
    }());
    joker.JokerCardArrageAnimation = JokerCardArrageAnimation;
    __reflect(JokerCardArrageAnimation.prototype, "joker.JokerCardArrageAnimation");
})(joker || (joker = {}));
//# sourceMappingURL=JokerCardArrageAnimation.js.map