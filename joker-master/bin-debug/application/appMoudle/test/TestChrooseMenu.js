var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/20.
 */
var test;
(function (test) {
    var TestChrooseMenu = (function (_super) {
        __extends(TestChrooseMenu, _super);
        function TestChrooseMenu() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/test/TestChrooseMenuSkin.exml";
            return _this;
        }
        TestChrooseMenu.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            //每一页显示的个数
            this.menuBar.pageSize = 4;
            //如果数据源长度超过了每页显示的个数会出现翻页按钮，没超过就不会出现翻页按钮
            var datas = [
                { label: "测试1" },
                { label: 2 },
                { label: "测试3" },
                { label: 4 },
                { label: 5 },
                { label: "测试6" },
                { label: "测试7" },
                { label: "测试8" },
                { label: "测试9" },
                { label: "测试10" },
                { label: "测试11" },
                { label: "测试12" },
                { label: "测试13" }
            ];
            //数据呈现项，可自己覆盖实现功能
            this.menuBar.itemRenderer = uicomps.ChrooseMenuItemRenderer;
            this.menuBar.dataProvider = datas;
            this.menuBar.addEventListener(egret.Event.CHANGE, function (event) {
                //都是当前你点击的数据项,下面两个都是一样的
                console.log(event.data);
                console.log(_this.menuBar.selectItemData);
            }, this);
        };
        TestChrooseMenu.prototype.dispose = function () {
            //记得擦屁股
            if (this.menuBar) {
                this.menuBar.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        return TestChrooseMenu;
    }(gameabc.UIMoudleComponent));
    test.TestChrooseMenu = TestChrooseMenu;
    __reflect(TestChrooseMenu.prototype, "test.TestChrooseMenu");
})(test || (test = {}));
//# sourceMappingURL=TestChrooseMenu.js.map