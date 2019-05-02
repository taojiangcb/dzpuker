var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/7.
 */
var shop;
(function (shop) {
    var VIPTemplateVO = (function () {
        function VIPTemplateVO(templateId, name, presenter, everydaypull, paiju, expression, nobleExpression, openRoom, collect, price) {
            this.templateId = 0; //ģ��id
            this.name = ""; //ģ������
            this.presenter = 0; //���͵�����
            this.everydaypull = 0; //ÿ����ȡ
            this.expression = 0; //������ 0������ 1����
            this.nobleExpression = 0; //���������� 0������ 1����
            this.paiju = 0; //��¼�ƾ�
            this.openRoom = 0; //����Ȩ��
            this.collect = 0; //�ղ��ƾ���
            this.price = 0; //�۸�
            this.templateId = templateId;
            this.name = name,
                this.presenter = presenter;
            this.everydaypull = everydaypull;
            this.expression = expression;
            this.nobleExpression = nobleExpression;
            this.paiju = paiju;
            this.openRoom = openRoom;
            this.collect = collect;
            this.price = price;
        }
        return VIPTemplateVO;
    }());
    shop.VIPTemplateVO = VIPTemplateVO;
    __reflect(VIPTemplateVO.prototype, "shop.VIPTemplateVO");
    var VIPRowData = (function () {
        function VIPRowData() {
            this.title = "";
            this.values = [];
            this.isSwitch = false;
        }
        return VIPRowData;
    }());
    shop.VIPRowData = VIPRowData;
    __reflect(VIPRowData.prototype, "shop.VIPRowData");
})(shop || (shop = {}));
//# sourceMappingURL=VIPTemplateVO.js.map