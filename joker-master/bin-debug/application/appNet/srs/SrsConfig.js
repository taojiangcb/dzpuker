var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cy;
(function (cy) {
    cy.AREA_GAMETEA = 1;
    cy.AREA_BF = 10;
    /**
     * srs 外网正式的连接地址
     */
    function getSrsIp() {
        if (cy.srsList == null) {
            cy.srsList = [
                new SrsIp(3809, "118.178.85.188", 5601, 427, 3803, "123.59.14.4:9091", "123.59.14.4:9092"),
                new SrsIp(3810, "118.178.85.188", 5602, 427, 3803, "123.59.14.4:9091", "123.59.14.4:9092")
            ];
        }
        var i = Math.floor(Math.random() * cy.srsList.length);
        return cy.srsList[i]; //如果想强行只指定一个IP，可直接修改i变量
    }
    cy.getSrsIp = getSrsIp;
    /**
     * 获取srs选择服务列表，debug 内网优先
     */
    function getChrooseSrsList() {
        var srsIpList = [
            AppConst.IN_SVR2,
            AppConst.OUT_SVR,
            getSrsIp(),
        ];
        // if(platform.CHANNE_ID == platform.CHANNE_IDS.DEBUG.toString() && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
        //     srsIpList.unshift(AppConst.OUT_SVR,cy.getSrsIp());
        // } 
        // else {
        //     srsIpList.unshift(cy.getSrsIp(),AppConst.OUT_SVR);
        // }
        return srsIpList;
    }
    cy.getChrooseSrsList = getChrooseSrsList;
    function searchNiceServer() {
        cy.niceSelect = cy.srsList[0];
        for (var i = 1, len = cy.srsList.length; i < len; ++i) {
            if (cy.srsList[i].sobad)
                continue;
            if (cy.srsList[i].load < cy.niceSelect.load) {
                cy.niceSelect = cy.srsList[i];
            }
        }
        return cy.niceSelect;
    }
    cy.searchNiceServer = searchNiceServer;
    function searchSrsServer(appId) {
        if (cy.srsList == null)
            return null;
        var len = cy.srsList.length;
        for (var i = 0; i < len; ++i) {
            if (cy.srsList[i].appId == appId) {
                return cy.srsList[i];
            }
        }
        return null;
    }
    cy.searchSrsServer = searchSrsServer;
    function getNextNotbadSrs() {
        var len = cy.srsList.length;
        var autoIndex = Math.floor(len * Math.random()); //随便找一个
        var autoBads = 0;
        while (autoBads++ < len) {
            if (autoIndex >= len)
                autoIndex = 0; //如果遍历到末尾，则从头开始继续
            var srsIp = cy.srsList[autoIndex++];
            if (!srsIp.sobad)
                return srsIp; //如果这个服务器没有连过，则尝试连接
        }
        return null;
    }
    cy.getNextNotbadSrs = getNextNotbadSrs;
    function clearSrsBadInfo() {
        var i = cy.srsList.length;
        while (--i > -1)
            cy.srsList[i].sobad = false;
    }
    cy.clearSrsBadInfo = clearSrsBadInfo;
    var SrsIp = (function () {
        function SrsIp(appId, ip, port, gameId, moduleServerId, notice, mail, label, roomType, areaId) {
            if (label === void 0) { label = "正式环境"; }
            if (roomType === void 0) { roomType = 2 /* AUTO_SRS */; }
            if (areaId === void 0) { areaId = 1; }
            this.areaId = 1;
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
            if (true) {
                this.mail = "http://192.168.138.131:9092";
            }
        }
        return SrsIp;
    }());
    cy.SrsIp = SrsIp;
    __reflect(SrsIp.prototype, "cy.SrsIp");
    var SrsRoom = (function () {
        function SrsRoom() {
        }
        return SrsRoom;
    }());
    cy.SrsRoom = SrsRoom;
    __reflect(SrsRoom.prototype, "cy.SrsRoom");
})(cy || (cy = {}));
//# sourceMappingURL=SrsConfig.js.map