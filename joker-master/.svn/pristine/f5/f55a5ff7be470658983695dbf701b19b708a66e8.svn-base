module cy {

   export var AREA_GAMETEA:number = 1;
   export var AREA_BF:number = 10;

   /**
    * srs 外网正式的连接地址
    */
   export function getSrsIp():SrsIp {
        if(srsList == null) {
            srsList = [
                new SrsIp(3809,    "118.178.85.188",  5601,   427,    3803,  "123.59.14.4:9091",  "123.59.14.4:9092"),
                new SrsIp(3810,    "118.178.85.188",  5602,   427,    3803,  "123.59.14.4:9091",  "123.59.14.4:9092")
            ];
        }
        var i:number = Math.floor(Math.random()*srsList.length);
        return srsList[i]; //如果想强行只指定一个IP，可直接修改i变量
    }

 

    /**
     * 获取srs选择服务列表，debug 内网优先
     */
    export function getChrooseSrsList():SrsIp[] {
        var srsIpList:SrsIp[] = [
                    AppConst.IN_SVR2,
                    AppConst.OUT_SVR,
                    getSrsIp(),
        ]
        
        // if(platform.CHANNE_ID == platform.CHANNE_IDS.DEBUG.toString() && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
        //     srsIpList.unshift(AppConst.OUT_SVR,cy.getSrsIp());
        // } 
        // else {
        //     srsIpList.unshift(cy.getSrsIp(),AppConst.OUT_SVR);
        // }

        return srsIpList;
    }
    
    export function searchNiceServer():SrsIp {
        niceSelect = srsList[0];
        for (var i=1,len=srsList.length; i<len; ++i) {
            if (srsList[i].sobad) continue;
            if (srsList[i].load < niceSelect.load) {
                niceSelect = srsList[i];
            }
        }
        return niceSelect;
    }

    export function searchSrsServer(appId:number):SrsIp {
        if (srsList == null) return null;
        var len = srsList.length;
        for (var i=0; i<len; ++i) {
            if (srsList[i].appId == appId) {
                return srsList[i];
            }
        }
        return null;
    }

    export function getNextNotbadSrs():SrsIp {
        var len = srsList.length;
        var autoIndex = Math.floor(len * Math.random()); //随便找一个
        var autoBads = 0;
        while (autoBads++ < len) { //尝试数量大于等于列表数表明所有连接都不能用了
            if(autoIndex>= len) autoIndex = 0; //如果遍历到末尾，则从头开始继续
            var srsIp = srsList[autoIndex++];
            if (!srsIp.sobad) return srsIp; //如果这个服务器没有连过，则尝试连接
        }
        return null;
    }

    export function clearSrsBadInfo():void {
        var i = srsList.length;
        while (--i>-1) srsList[i].sobad = false;
    }

    export var srsList:SrsIp[];
    export var niceSelect:SrsIp;
    export class SrsIp {
        constructor(appId:number, ip:string, port:number,
                    gameId:number, moduleServerId:number,
                    notice:string, mail:string,
                    label:string="正式环境",
                    roomType:number=room.CONFIG.AUTO_SRS,
                    areaId:number=1) {
                        
            this.appId = appId;
            this.ip = ip;
            this.port = port;
            
            this.gameId = gameId;
            this.moduleServerId = moduleServerId;
            
            this.label = label;
            this.roomType = roomType;

            this.areaId = areaId;

            this.notice = "http://" + notice;
            this.mail = "http://" + mail;
            if (DEBUG) {
                this.mail = "http://192.168.138.131:9092";
            }
        }
        
        ip:string;
        port:number;
        appId:number;
        load:number;
        
        areaId:number=1;
        gameId:number;
        moduleServerId:number;
        
        roomType:number;
        label:string;
        notice:string;
        mail:string;

        /**服务器坏掉时间，将修改该标记位*/
        sobad:boolean; 
    }
    
    export class SrsRoom {

    }
}