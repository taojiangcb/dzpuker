var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by taojiang on 16/10/13.
 */
var platform;
(function (platform) {
    var AndroidPlatform = (function (_super) {
        __extends(AndroidPlatform, _super);
        function AndroidPlatform() {
            return _super.call(this) || this;
        }
        ;
        /** 发起支付的SDK，具体的支付参数在_paymentVo中*/
        AndroidPlatform.prototype.payment = function (payData) {
            console.log("paymen=====>");
            platform.getGameTeaPay().creatData = payData;
            platform.getGameTeaPay().createOrderList(payData.propid, payData.price, platform.CHANNE_IDS.ANDROID.toString());
        };
        return AndroidPlatform;
    }(platform.BasePlatform));
    platform.AndroidPlatform = AndroidPlatform;
    __reflect(AndroidPlatform.prototype, "platform.AndroidPlatform");
})(platform || (platform = {}));
//# sourceMappingURL=AndroidPlatform.js.map