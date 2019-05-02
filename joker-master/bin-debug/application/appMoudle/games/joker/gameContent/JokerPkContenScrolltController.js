var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 选择手牌门数时的逻辑处理变化
 */
var joker;
(function (joker) {
    var JokerPkContenScrolltController = (function () {
        function JokerPkContenScrolltController() {
            this.SPACE = 50; //间隔
            this.pkContentIndex = 0; //当前选中的门数索引 0 表示 1 门
            this.pkContentTx = 0; //当前要缓动到的位置
            this.tempWidth = 0;
            this.initPkContents();
        }
        JokerPkContenScrolltController.prototype.initPkContents = function () {
            var ls = [this.viewComp.content5, this.viewComp.content10, this.viewComp.content25, this.viewComp.content50];
            var space = this.SPACE;
            var sx = this.viewComp.width - this.viewComp.content5.width >> 1;
            this.tempWidth = this.viewComp.content5.width;
            for (var i = 0; i < ls.length; i++) {
                ls[i].x = (i + 1) * (this.tempWidth + space);
                ls[i].y = 0;
                ls[i].visible = false;
            }
        };
        /**
         * 只选择一副牌时的动画
         */
        JokerPkContenScrolltController.prototype.onePkContent = function () {
            egret.Tween.removeTweens(this.viewComp.pokerBg);
            egret.Tween.removeTweens(this.viewComp.handPokerContent);
            egret.Tween.get(this.viewComp.pokerBg)
                .set({ visible: true })
                .to({ alpha: 1 }, 300);
            egret.Tween.get(this.viewComp.handPokerContent)
                .wait(300)
                .to({ bottom: (AppGlobal.stageFullHeight >> 1) }, 600, egret.Ease.backOut);
            this.viewComp.pokerComp.arrageAnimateion.normalArrage(true);
        };
        /**
         * 不是一手牌
         */
        JokerPkContenScrolltController.prototype.denyOnePkContent = function () {
            egret.Tween.removeTweens(this.viewComp.pokerBg);
            egret.Tween.removeTweens(this.viewComp.handPokerContent);
            egret.Tween.get(this.viewComp.pokerBg)
                .set({ visible: true })
                .to({ alpha: 1 }, 300);
            egret.Tween.get(this.viewComp.handPokerContent)
                .to({ bottom: 170 }, 600, egret.Ease.backOut);
            this.viewComp.pokerComp.arrageAnimateion.normalArrage(true);
        };
        /**
         * 选择的门数变化
         */
        JokerPkContenScrolltController.prototype.changePkContent = function (val) {
            var _this = this;
            var page_index = joker.getProxy().handlerCount;
            var index = page_index.indexOf(val);
            if (index == -1)
                return;
            if (this.pkContentIndex == index)
                return;
            this.pkContentIndex = index;
            var space = this.SPACE;
            var tx = index * (this.tempWidth + space);
            this.pkContentTx = this.viewComp.pokerContentGroup.localToGlobal(0, 0).x;
            return new Promise(function (resolve, reject) {
                egret.Tween.removeTweens(_this.viewComp.scrollContentGroup);
                egret.Tween.get(_this.viewComp.scrollContentGroup, { loop: false, onChange: _this.onChange, onChangeObj: _this })
                    .to({ x: -tx }, 600, egret.Ease.quartOut)
                    .call(function () {
                    _this.onChange();
                    resolve();
                }, _this);
            });
        };
        //滚动画过程中处理，如果不在显示的范围内则不显示内容项
        JokerPkContenScrolltController.prototype.onChange = function () {
            var _this = this;
            var ls = [this.viewComp.content5, this.viewComp.content10, this.viewComp.content25, this.viewComp.content50];
            ls.forEach(function (element) {
                var tx = element.localToGlobal(0, 0).x;
                var distance = Math.abs(tx - _this.pkContentTx);
                element.alpha = 1 - distance / _this.tempWidth;
                if (distance < _this.tempWidth) {
                    element.visible = true;
                }
                else {
                    element.visible = false;
                }
                // console.log("=======%s,%s",this.pkContentTx,tx);
                // if(this.pkContentTx == Math.round(tx)) {
                // 	console.log("+++++++++++%s,%s",this.pkContentTx,tx);
                // }
            });
        };
        Object.defineProperty(JokerPkContenScrolltController.prototype, "viewComp", {
            get: function () {
                return __GET_MEDIATOR(joker.JokerGameMediator).viewComp;
            },
            enumerable: true,
            configurable: true
        });
        return JokerPkContenScrolltController;
    }());
    joker.JokerPkContenScrolltController = JokerPkContenScrolltController;
    __reflect(JokerPkContenScrolltController.prototype, "joker.JokerPkContenScrolltController");
})(joker || (joker = {}));
//# sourceMappingURL=JokerPkContenScrolltController.js.map