/**
 *
 * 捷克高手的数字选择组件
 * [dispatchEvent Event.CHANGE data:this.chrooseValue] 派发change选择事情，参数是当前选中的值
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var joker;
(function (joker) {
    var JokerNumberInput = (function (_super) {
        __extends(JokerNumberInput, _super);
        function JokerNumberInput() {
            var _this = _super.call(this) || this;
            /**
             * 选译的步值
             */
            _this.$stepValues = [];
            /**
             * 当前选择的步值
             */
            _this.chrooseIndex = -1;
            _this.skinName = "resource/app_skin/joker/JokerNumberInput.exml";
            return _this;
        }
        JokerNumberInput.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnAdd);
            this.bindButton(this.btnReduce);
            if (this.$stepValues.length > 0) {
                this.setDefault();
            }
            else {
                this.chrooseIndex = -1;
                this.updateRenders();
            }
        };
        JokerNumberInput.prototype.setDefault = function () {
            this.chrooseIndex = 0;
            this.updateRenders();
        };
        /**
         * 刷新当前显示的值
         */
        JokerNumberInput.prototype.updateRenders = function () {
            if (this.initialized) {
                if (this.chrooseIndex == -1) {
                    this.txtNumber.text = "...";
                }
                else {
                    this.txtNumber.text = this.chrooseValue.toString();
                }
                this.dispatchEvent(new egret.Event(egret.Event.CHANGE, false, false, this.chrooseValue));
            }
        };
        JokerNumberInput.prototype.touchBindButtonHandler = function (tag) {
            var btn = tag;
            var step = this.$stepValues.length;
            if (step == 0) {
                this.updateRenders();
                return;
            }
            var next = 0;
            switch (btn) {
                case this.btnAdd:
                    next = this.chrooseIndex + 1;
                    if (next < step)
                        this.chrooseIndex = next;
                    else
                        this.chrooseIndex = 0;
                    break;
                case this.btnReduce:
                    next = this.chrooseIndex - 1;
                    if (next == -1)
                        this.chrooseIndex = step - 1;
                    else
                        this.chrooseIndex = next;
                    break;
            }
            this.updateRenders();
        };
        Object.defineProperty(JokerNumberInput.prototype, "stepValues", {
            get: function () {
                return this.$stepValues;
            },
            /**
             * 设置当前可选的步值
             */
            set: function (val) {
                if (this.$stepValues != val && val.length > 0) {
                    this.$stepValues = val;
                    this.setDefault();
                }
                else {
                    this.chrooseIndex = -1;
                    this.updateRenders();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JokerNumberInput.prototype, "chrooseValue", {
            /**
             * 当前可选中的值
             */
            get: function () {
                return this.chrooseIndex < this.$stepValues.length && this.chrooseIndex > -1 ? this.stepValues[this.chrooseIndex] : 0;
            },
            enumerable: true,
            configurable: true
        });
        JokerNumberInput.prototype.$setEnabled = function (val) {
            if (val) {
                this.btnReduce.currentState = "normal";
                this.btnAdd.currentState = "normal";
            }
            else {
                this.btnReduce.currentState = "disable";
                this.btnAdd.currentState = "disable";
            }
            return _super.prototype.$setEnabled.call(this, val);
        };
        return JokerNumberInput;
    }(gameabc.UICustomComponent));
    joker.JokerNumberInput = JokerNumberInput;
    __reflect(JokerNumberInput.prototype, "joker.JokerNumberInput");
})(joker || (joker = {}));
//# sourceMappingURL=JokerNumberInput.js.map