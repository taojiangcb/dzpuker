var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    var PlayCardsSafeHelpModuleComp = (function (_super) {
        __extends(PlayCardsSafeHelpModuleComp, _super);
        function PlayCardsSafeHelpModuleComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayCardsSafeHelpModuleSkin";
            return _this;
        }
        PlayCardsSafeHelpModuleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.tab1.addEventListener(egret.Event.CHANGE, this.tabclick, this);
            this.tab2.addEventListener(egret.Event.CHANGE, this.tabclick, this);
            this.bindButton(this.btnClose);
        };
        PlayCardsSafeHelpModuleComp.prototype.tabclick = function (evt) {
            if (evt.target.selected)
                this.view.selectedIndex = evt.target.value;
        };
        //tab页按钮触发
        PlayCardsSafeHelpModuleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnClose:
                    this.close();
                    break;
            }
        };
        return PlayCardsSafeHelpModuleComp;
    }(app.base.BaseWndUIMoudleComponent));
    playcards.PlayCardsSafeHelpModuleComp = PlayCardsSafeHelpModuleComp;
    __reflect(PlayCardsSafeHelpModuleComp.prototype, "playcards.PlayCardsSafeHelpModuleComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsSafeHelpModuleComp.js.map