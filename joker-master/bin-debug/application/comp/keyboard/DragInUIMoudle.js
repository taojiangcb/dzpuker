var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uicomps;
(function (uicomps) {
    var DragInUIMoudle = (function (_super) {
        __extends(DragInUIMoudle, _super);
        function DragInUIMoudle() {
            var _this = _super.call(this) || this;
            _this.btnds = [];
            /**
             * 当前输入的数字
             */
            _this.inputValue = 0;
            /**
             * 玩家携带的总额
             */
            _this.totalValue = 0;
            /**
             * 最小带入所需筹码
             * @type {number}
             */
            _this.needSilver = 0;
            /**
             * 最大带入筹码
             * @type {number}
             */
            _this.maxSilver = 0;
            /**
             * 是否显示close按钮
             * @type {boolean}
             */
            _this.showCloseBtn = false;
            _this.skinName = "resource/app_skin/comp/DragInUIModuleSkin.exml";
            return _this;
        }
        DragInUIMoudle.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            this.enterButton = this._comp_subKeyBoard.enterButton;
            this.delButton = this._comp_subKeyBoard.delButton;
            this.btnds = [
                this.enterButton, this.delButton,
                this.btnClear, this.btnGoBank, this.btnClose
            ];
            /**绑定0-9数字按键事件 */
            this._comp_subKeyBoard.inputButtonArray.forEach(function (element) {
                _this.bindButton(element);
            });
            this.btnds.forEach(function (element) {
                _this.bindButton(element);
            });
            __REGISTER_MEDIATOR(uicomps.DragInMediator, this);
        };
        DragInUIMoudle.prototype.opening = function () {
            if (this.uiOpenData) {
                this.updateTotalSilver();
                this.needSilver = this.uiOpenData.minSilver;
                this.maxSilver = this.uiOpenData.maxSilver;
                this.closeCallback = this.uiOpenData.callBack;
                this.callObj = this.uiOpenData.callObj;
                if (uicomps.DEFAULT_NEED_SILVER > 0) {
                    this.txtInput.text = uicomps.DEFAULT_NEED_SILVER.toString();
                }
                else {
                    if (this.uiOpenData.defaultMin) {
                        this.txtInput.text = this.needSilver.toString();
                    }
                    else {
                        if (this.totalValue < this.maxSilver) {
                            this.txtInput.text = this.totalValue.toString();
                        }
                        else {
                            this.txtInput.text = this.maxSilver.toString();
                        }
                    }
                }
                this.btnClose.visible = this.uiOpenData.showCloseBtn;
                this.btnGoBank.visible = this.uiOpenData.showBankBtn;
            }
        };
        DragInUIMoudle.prototype.updateTotalSilver = function () {
            if (this.initialized) {
                this.totalValue = user.getProxy().svrGameData ? user.getProxy().svrGameData.silver : 0;
                this.txtTotal.text = this.totalValue.toString();
            }
        };
        DragInUIMoudle.prototype.touchBindButtonHandler = function (tag) {
            var btn = tag;
            for (var i = 0; i < 10; ++i) {
                if (this._comp_subKeyBoard.inputButtonArray[i] == tag) {
                    this.onInput(i);
                    return;
                }
            }
            if (this.enterButton == btn) {
                this.generatorValue();
                if (this.inputValue > this.maxSilver) {
                    var msg = gameabc.getMessage("DRAG_MAX_MSG", this.maxSilver);
                    tip.popSysCenterTip(msg);
                    this.txtInput.text = this.maxSilver.toString();
                    return;
                }
                if (this.inputValue > this.totalValue) {
                    tip.popSysCenterTip("DRAG_IN_OF");
                    return;
                }
                if (this.inputValue < this.needSilver) {
                    var msg = gameabc.getMessage("DRAG_MIN_MSG", this.needSilver);
                    tip.popSysCenterTip(msg);
                    this.txtInput.text = this.needSilver.toString();
                    return;
                }
                this.closeCallback.call(this.callObj, this.inputValue);
                uicomps.DEFAULT_NEED_SILVER = this.inputValue;
                mc2sdk.event(50080 /* SITDOWN_PK */);
                this.close();
            }
            else if (this.btnClear == btn) {
                this.txtInput.text = "0";
                this.inputValue = 0;
            }
            else if (this.btnClose == btn) {
                if (this.callObj) {
                    this.closeCallback.call(this.callObj, -1);
                }
                this.close();
            }
            else if (this.btnGoBank == btn) {
                __OPEN_PRE_MOUDLE(AppReg.APP_BANK);
            }
            else if (this.delButton == btn) {
                if (this.txtInput.text.length > 0) {
                    var input = this.txtInput.text;
                    input = input.substr(0, input.length - 1);
                    this.txtInput.text = input.length > 0 ? input : "0";
                }
            }
        };
        DragInUIMoudle.prototype.generatorValue = function () {
            this.inputValue = this.txtInput.text == "" ? 0 : parseInt(this.txtInput.text);
        };
        DragInUIMoudle.prototype.onInput = function (val) {
            //如当前为0则不能直接加字符串
            //最大长度限制到10位
            if (this.txtInput.text.length < 10) {
                if (this.txtInput.text == "0") {
                    this.txtInput.text = val.toString();
                }
                else {
                    this.txtInput.text += val.toString();
                }
            }
        };
        DragInUIMoudle.prototype.dispose = function () {
            __REMOVE_MEDIATOR(uicomps.DragInMediator);
            _super.prototype.dispose.call(this);
        };
        return DragInUIMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    uicomps.DragInUIMoudle = DragInUIMoudle;
    __reflect(DragInUIMoudle.prototype, "uicomps.DragInUIMoudle");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=DragInUIMoudle.js.map