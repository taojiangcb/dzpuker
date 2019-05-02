var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/4.
 */
var appvos;
(function (appvos) {
    var ItemVO = (function () {
        function ItemVO() {
            this.id = 0; //��Ʒid
            this.templateId = 0; //��Ʒģ��id
            this.roleId = 0; //��Ʒ�Ľ�ɫid
            this.itemCount = 0; //��Ʒ����
        }
        return ItemVO;
    }());
    appvos.ItemVO = ItemVO;
    __reflect(ItemVO.prototype, "appvos.ItemVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ItemVO.js.map