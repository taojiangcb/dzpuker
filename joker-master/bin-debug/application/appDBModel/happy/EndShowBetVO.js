var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var happy;
(function (happy) {
    var EndShowBetVO = (function () {
        function EndShowBetVO() {
            this.allShowPos = [];
            this.allShowXY = [];
            this.xyindexNum = {};
        }
        EndShowBetVO.prototype.hasPos = function (pos) {
            return this.allShowPos.indexOf(pos) > -1;
        };
        EndShowBetVO.prototype.getXY = function (index) {
            var i = Math.floor(index / this.itemlen);
            var xy = this.allShowXY[i];
            var key = xy[2];
            var num;
            if (this.xyindexNum[key] == null) {
                num = this.xyindexNum[key] = 0;
            }
            else
                num = this.xyindexNum[key];
            this.xyindexNum[key] = num + 1;
            if (num > 25)
                num = 0; //上限25
            xy[3] = num;
            return xy;
        };
        return EndShowBetVO;
    }());
    happy.EndShowBetVO = EndShowBetVO;
    __reflect(EndShowBetVO.prototype, "happy.EndShowBetVO");
})(happy || (happy = {}));
//# sourceMappingURL=EndShowBetVO.js.map