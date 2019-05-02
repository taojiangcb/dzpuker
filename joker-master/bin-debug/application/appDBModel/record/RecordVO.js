var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var record;
(function (record) {
    /**
     * 牌型统计vo
     * @author
     *
     */
    var RecordVO = (function () {
        function RecordVO() {
            /*第几手牌 这个值累加**/
            this.id = 0;
            /*房间类型 新手场**/
            this.type = 0;
        }
        return RecordVO;
    }());
    record.RecordVO = RecordVO;
    __reflect(RecordVO.prototype, "record.RecordVO");
})(record || (record = {}));
//# sourceMappingURL=RecordVO.js.map