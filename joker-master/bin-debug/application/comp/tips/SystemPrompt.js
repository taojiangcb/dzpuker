var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by taojiang on 16/3/22.
 */
var tip;
(function (tip) {
    var ui = null;
    function popSysPrompt(val, callFunc, callObj) {
        if (ui == null) {
            ui = new SystemPromptUI();
        }
        ui.popPrompt(val, callFunc, callObj);
    }
    tip.popSysPrompt = popSysPrompt;
    var SystemPromptUI = (function (_super) {
        __extends(SystemPromptUI, _super);
        function SystemPromptUI() {
            var _this = _super.call(this) || this;
            _this.str_prompt = "";
            _this.callFunc = null;
            _this.callObj = null;
            _this.skinName = "SystemErrorTipsSkin";
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            return _this;
        }
        SystemPromptUI.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                _this.removeFromParent();
                if (_this.callFunc != null) {
                    _this.callFunc.apply(_this.callObj);
                }
                _this.callFunc = null;
                _this.callObj = null;
            }, this);
        };
        SystemPromptUI.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            this.txtMsg.text = this.str_prompt;
        };
        SystemPromptUI.prototype.popPrompt = function (val, callFunc, callObj) {
            this.str_prompt = val;
            if (this.initialized) {
                this.txtMsg.text = this.str_prompt;
            }
            this.callFunc = callFunc;
            this.callObj = callObj;
            if (this.parent == null) {
                AppRoot.gameLayer.addChild(this);
            }
        };
        return SystemPromptUI;
    }(gameabc.UICustomComponent));
    tip.SystemPromptUI = SystemPromptUI;
    __reflect(SystemPromptUI.prototype, "tip.SystemPromptUI");
})(tip || (tip = {}));
//# sourceMappingURL=SystemPrompt.js.map