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
    var JokerGameModule = (function (_super) {
        __extends(JokerGameModule, _super);
        function JokerGameModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "JokerGameModuleSkin";
            return _this;
        }
        JokerGameModule.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        JokerGameModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            __REGISTER_MEDIATOR(joker.JokerGameMediator, this);
            this.pokerBg.alpha = 0;
            this.pokerComp.visible = false;
            this.JPCS = new joker.JokerPkContenScrolltController();
            this.imgXuanze.visible = false;
            __SEND_NOTIFICATION(joker.JokerGameMediator.GAME_STAET);
            this.bindButton(this.btnGameInfo);
            this.bindButton(this.btnGameSeting);
            this.touchBindButtonHandler;
        };
        JokerGameModule.prototype.touchBindButtonHandler = function (tag) {
            var target = tag;
            switch (target) {
                case this.btnGameInfo:
                    __SEND_NOTIFICATION(joker.JokerGameMediator.GAME_RE_STAET);
                    break;
                case this.btnGameSeting:
                    break;
            }
        };
        JokerGameModule.prototype.dispose = function () {
            __REMOVE_MEDIATOR(joker.JokerGameMediator);
            _super.prototype.dispose.call(this);
        };
        return JokerGameModule;
    }(app.base.BaseSceneUIMoudleComponent));
    joker.JokerGameModule = JokerGameModule;
    __reflect(JokerGameModule.prototype, "joker.JokerGameModule");
})(joker || (joker = {}));
//# sourceMappingURL=JokerGameModule.js.map