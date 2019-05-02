var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var preload;
(function (preload) {
    /**
     *
     * @author
     *
     */
    var PreloadUIMoudleComp = (function (_super) {
        __extends(PreloadUIMoudleComp, _super);
        function PreloadUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/PreloadSkin.exml";
            return _this;
        }
        PreloadUIMoudleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            var data = RES.getRes("puker_loading_json");
            var texture = RES.getRes("puker_loading_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);
            // var border:eui.Component = new eui.Component();
            // border.horizontalCenter = 0;
            // border.verticalCenter = 0;
            // this.addChild(border);
            // this.progressLabel = new eui.Label();
            // border.addChild(this.progressLabel);
            // this.progressLabel.size = 14;
            // this.progressLabel.horizontalCenter = 0;
            // this.progressLabel.textColor = 0xFFFFFF;
            // this.progressLabel.stroke = 1;
            this.puker_mc = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
            this.puker_mc.play(-1);
            this.puker_mc.x = this.border.width - this.puker_mc.width >> 1;
            this.puker_mc.y = this.border.height - this.puker_mc.height >> 1;
            // border.width = this.puker_mc.width;
            // border.height = this.puker_mc.height;
            this.border.addChild(this.puker_mc);
            // this.progressLabel.y = this.puker_mc.height;
            //this.puker_mc.x = AppGlobal.stageFullWidth - this.puker_mc.width >> 1;
            //this.puker_mc.y = AppGlobal.stageFullHeight - this.puker_mc.height >> 1;
        };
        PreloadUIMoudleComp.prototype.addParent = function () {
            _super.prototype.addParent.call(this);
            this.puker_mc.play(-1);
            this.labelContent.visible = false;
            this.progressLabel.text = "";
            // this.visible = true;
        };
        PreloadUIMoudleComp.prototype.setProgress = function (load, total) {
            if (this.progressLabel) {
                this.labelContent.visible = true;
                this.progressLabel.text = gameabc.StringUtils.formatString("{0}/{1}", load, total);
            }
            //if(this.uiProgress) {
            //    this.uiProgress.value = load;
            //    this.uiProgress.maximum = total;
            //}
        };
        Object.defineProperty(PreloadUIMoudleComp.prototype, "featherSpace", {
            get: function () {
                return AppRoot.gameLayer.loadLayer;
            },
            enumerable: true,
            configurable: true
        });
        return PreloadUIMoudleComp;
    }(gameabc.UIMoudleComponent));
    preload.PreloadUIMoudleComp = PreloadUIMoudleComp;
    __reflect(PreloadUIMoudleComp.prototype, "preload.PreloadUIMoudleComp");
})(preload || (preload = {}));
//# sourceMappingURL=PreloadUIMoudleComp.js.map