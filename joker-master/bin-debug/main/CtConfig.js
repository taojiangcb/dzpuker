var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CtConfig = (function () {
    function CtConfig() {
        this.url = "http://127.0.0.1:8080/update161114/cfg.xml";
    }
    CtConfig.prototype.load = function () {
        this.urlLoader = new egret.URLLoader();
        this.urlRequest = new egret.URLRequest(this.url);
        this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        this.urlLoader.load(this.urlRequest);
    };
    CtConfig.prototype.onLoadComplete = function (evt) {
        var xmlStr = this.urlLoader.data;
        var xml = egret.XML.parse(xmlStr);
        console.log(xmlStr);
        console.log(xml.name);
    };
    return CtConfig;
}());
__reflect(CtConfig.prototype, "CtConfig");
//# sourceMappingURL=CtConfig.js.map