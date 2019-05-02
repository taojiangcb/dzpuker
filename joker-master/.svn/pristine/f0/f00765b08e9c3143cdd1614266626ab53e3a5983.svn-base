
class CtConfig {

    urlLoader:egret.URLLoader;
    urlRequest:egret.URLRequest;
    url:string = "http://127.0.0.1:8080/update161114/cfg.xml";

    load():void {
        this.urlLoader = new egret.URLLoader();
        this.urlRequest = new egret.URLRequest(this.url);
        this.urlLoader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        this.urlLoader.load(this.urlRequest);
    }

    onLoadComplete(evt:egret.Event):void {
        var xmlStr = this.urlLoader.data;
        var xml:egret.XML = egret.XML.parse(xmlStr);
        console.log(xmlStr);
        console.log(xml.name);
    }
    
}