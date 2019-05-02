var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var HttpActivate = (function () {
        function HttpActivate() {
            this.url = 'http://42.121.236.133:8080/index.php';
            this.sign = '202dcbcb527924de601b5dcf6bf6128a';
            this.params = {
                appId: 0,
                groupId: 0,
                channelId: 0,
                deviceId: 0,
                account: 0,
                phone: 0,
                osType: 0,
                deviceType: 0,
                version: '0.0.0'
            };
            this.params.deviceId = this.params.account = mc2sdk.Mc2Sdk.deviceId;
            this.params.deviceType = this.params.osType = mc2sdk.Mc2Sdk.deviceType;
            this.params.appId = mc2sdk.Mc2Sdk.appId;
            this.params.groupId = mc2sdk.Mc2Sdk.groupId;
            this.params.channelId = mc2sdk.Mc2Sdk.chanel;
            this.params.account = mc2sdk.Mc2Sdk.userId;
            this.params.phone = mc2sdk.Mc2Sdk.os;
            this.params.version = mc2sdk.Mc2Sdk.version;
            var requestUrl = '';
            var urlParams = '';
            var signParams = '';
            for (var key in this.params) {
                urlParams += key + '=' + this.params[key] + '&';
                signParams += key + '=' + this.params[key] + '|';
            }
            signParams += this.sign;
            urlParams += 'signature=' + gameabc.md5.hash(signParams);
            requestUrl = this.url + '?' + urlParams;
            this.urlLoader = new egret.URLLoader(new egret.URLRequest(requestUrl));
            this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        }
        HttpActivate.prototype.onComplete = function (event) {
            try {
                var data = this.urlLoader.data;
                var json = JSON.parse(data);
                if (json.message == 'success') {
                    mc2sdk.Mc2Sdk.soData.activate = true;
                    mc2sdk.Mc2Sdk.log('激活成功');
                }
                else
                    mc2sdk.Mc2Sdk.log('激活失败：' + data);
            }
            catch (error) {
                mc2sdk.Mc2Sdk.log('激活失败：' + data);
            }
        };
        return HttpActivate;
    }());
    mc2sdk.HttpActivate = HttpActivate;
    __reflect(HttpActivate.prototype, "mc2sdk.HttpActivate");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=HttpActivate.js.map