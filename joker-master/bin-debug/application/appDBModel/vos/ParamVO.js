var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var ParamVO = (function () {
        function ParamVO(data) {
            if (data === void 0) { data = null; }
            this.strValues = [];
            this.intValues = [];
            this.longValues = [];
            this.data = [];
            if (data != null) {
                var vo = AppGlobal.getMessage("ParamVO").decode(data);
                this.setData(vo);
            }
        }
        ParamVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            var i = 0;
            var len = 0;
            this.strValues = [];
            len = vo.strValues.length;
            for (i = 0; i < len; i++) {
                this.strValues[i] = vo.strValues[i];
            }
            this.intValues = [];
            len = vo.intValues.length;
            for (i = 0; i < len; i++) {
                this.intValues[i] = vo.intValues[i];
            }
            this.longValues = [];
            len = vo.longValues.length;
            for (i = 0; i < len; i++) {
                this.longValues[i] = vo.longValues[i] == null ? 0 : vo.longValues[i].toNumber();
            }
            this.data = [];
            len = vo.data.length;
            for (i = 0; i < len; i++) {
                this.data[i] = vo.data[i];
            }
            vo = null;
        };
        // fixToLong():void {
        // 	var len = this.longValues.length;
        // 	for(var i = 0; i < len; ++i) {
        // 		if (this.longValues[i] instanceof Number) {
        // 			this.longValues[i] = dcodeIO.Long.fromNumber(this.longValues[i]);
        // 		}
        // 	}
        // }
        ParamVO.prototype.getProtoVO = function () {
            var vo = AppGlobal.getMessageVO("ParamVO");
            vo.intValues = this.intValues;
            vo.strValues = this.strValues;
            var i = 0;
            var len = 0;
            vo.longValues = [];
            len = this.longValues.length;
            for (i = 0; i < len; i++) {
                vo.longValues[i] = __SET_INT64(this.longValues[i]);
            }
            vo.data = this.data;
            return vo;
        };
        return ParamVO;
    }());
    appvos.ParamVO = ParamVO;
    __reflect(ParamVO.prototype, "appvos.ParamVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ParamVO.js.map