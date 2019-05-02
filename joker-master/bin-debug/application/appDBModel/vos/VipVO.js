var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/8.
 */
var appvos;
(function (appvos) {
    var VipVO = (function () {
        function VipVO() {
            this.vipId = 0; //vipId
            this.vipTemplateId = 0; //vipģ��
            this.vipGenerate = 0; //��Ա����ʱ��
            this.everyAwardTime = 0; //ÿ�ս���ʱ��
            this.rewardEndTime = 0; //��������ʱ��
            this.AwardCount = 0; //���콱����
        }
        return VipVO;
    }());
    appvos.VipVO = VipVO;
    __reflect(VipVO.prototype, "appvos.VipVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=VipVO.js.map