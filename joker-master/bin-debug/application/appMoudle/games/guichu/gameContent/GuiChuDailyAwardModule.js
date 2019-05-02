var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var GuiChuDailyAwardModule = (function (_super) {
        __extends(GuiChuDailyAwardModule, _super);
        function GuiChuDailyAwardModule() {
            var _this = _super.call(this) || this;
            _this.waitTime = 0;
            _this.skinName = "GuiChuDailyAwardModuleSkin";
            _this.horizontalCenter = 0;
            _this.verticalCenter = -40;
            return _this;
        }
        GuiChuDailyAwardModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.button);
        };
        GuiChuDailyAwardModule.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.button:
                    egret.localStorage.setItem(guichu.GuiChuModuleProxy.showDailyAward, user.getProxy().loginName + guichu.getProxy().getDateString());
                    this.f();
                    this.close();
                    break;
            }
        };
        GuiChuDailyAwardModule.prototype.f = function () {
            this.nb1.removeFromParent();
            this.nb2.removeFromParent();
            this.nb3.removeFromParent();
            this.t(this.nb1);
            this.t(this.nb2);
            this.t(this.nb3);
            this.nb1 = null;
            this.nb2 = null;
            this.nb3 = null;
        };
        GuiChuDailyAwardModule.prototype.t = function (nb) {
            var root = __GET_MOUDLE(AppReg.GUICHU).gui;
            var point = this.localToGlobal(nb.x + this.nbGroup.x, nb.y + this.nbGroup.y);
            root.globalToLocal(point.x, point.y, point);
            nb.x = point.x;
            nb.y = point.y;
            root.addChild(nb);
            var tarPoint = root.tableComp.localToGlobal(326.6, 239);
            root.globalToLocal(tarPoint.x, tarPoint.y, tarPoint);
            this.waitTime++;
            egret.Tween.get(nb).wait(this.waitTime * 50).to({ x: tarPoint.x, y: tarPoint.y }, 300, egret.Ease.sineIn).call(function () {
                guichu.getProxy().freeNum++;
                __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_FREE_END);
                egret.Tween.removeTweens(nb);
                nb.removeFromParent(true);
            });
        };
        return GuiChuDailyAwardModule;
    }(app.base.BaseSceneUIMoudleComponent));
    guichu.GuiChuDailyAwardModule = GuiChuDailyAwardModule;
    __reflect(GuiChuDailyAwardModule.prototype, "guichu.GuiChuDailyAwardModule");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuDailyAwardModule.js.map