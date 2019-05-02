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
    /**
     *庄家图片
     * @author
     *
     */
    var PlayCardBankerImg = (function (_super) {
        __extends(PlayCardBankerImg, _super);
        function PlayCardBankerImg() {
            var _this = _super.call(this) || this;
            _this.allx = [510, 230, 232, 286, 334, 767, 830, 868, 859];
            _this.ally = [450, 440, 337, 240, 210, 210, 240, 339, 440];
            _this.all6x = [510, 230, 320, 780, 864, 854];
            _this.all6y = [450, 440, 212, 212, 324, 440];
            _this.all5x = [510, 230, 320, 780, 854];
            _this.all5y = [450, 440, 212, 212, 440];
            _this.all3x = [510, 220, 878];
            _this.all3y = [450, 290, 290];
            return _this;
        }
        PlayCardBankerImg.prototype.resetxy = function () {
            // if(getProxy().mySeat == -1)
            //     var px = 0;
            // else
            //     px = getProxy().mySeat;
            var tableVo = playcards.getTableVO();
            if (tableVo == null) {
                return;
            }
            var index = tableVo.banker - playcards.getProxy().getPX(); // px;
            var size = tableVo.tableSize;
            if (index < 0)
                index += size;
            if (playcards.getProxy().isLive) {
                index = tableVo.banker;
                if (index > 2) {
                    this.x = PlayCardBankerImg.livex[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                }
                else
                    this.x = AppGlobal.stageFullWidth - PlayCardBankerImg.livex[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                this.y = PlayCardBankerImg.livey[index] + (768 - AppGlobal.stageFullHeight) * 0.5;
            }
            else if (size == 6) {
                this.x = this.all6x[index];
                this.y = this.all6y[index];
            }
            else if (size == 5) {
                this.x = this.all5x[index];
                this.y = this.all5y[index];
            }
            else if (size == 3) {
                this.x = this.all3x[index];
                this.y = this.all3y[index];
            }
            else {
                this.x = this.allx[index];
                this.y = this.ally[index];
            }
        };
        return PlayCardBankerImg;
    }(eui.Image));
    PlayCardBankerImg.livex = [135, 135, 135, 90, 90, 90, -200, -200, -200];
    PlayCardBankerImg.livey = [105, 255, 405, 405, 255, 105, -200, -200, -200];
    playcards.PlayCardBankerImg = PlayCardBankerImg;
    __reflect(PlayCardBankerImg.prototype, "playcards.PlayCardBankerImg");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardBankerImg.js.map