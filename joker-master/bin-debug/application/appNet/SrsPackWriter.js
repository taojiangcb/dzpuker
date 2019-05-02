var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var SrsPackWriter = (function () {
        function SrsPackWriter() {
        }
        SrsPackWriter.prototype.to = function (action) {
            var srspack = new cyvos.SrsPackage();
            srspack.sProcessID = 1;
            srspack.nAppID = user.getProxy().currentRoom == null ?
                0 : user.getProxy().currentRoom.svrOfsId;
            srspack.sXYID = parseInt(action);
            cy.srsServer.send(srspack);
            if (action == '11073') {
                cy.log("leave" +
                    " name:" + user.getProxy().loginName +
                    " ofsid:" + (user.getProxy().currentRoom ? user.getProxy().currentRoom.svrOfsId : "") +
                    " time:" + DateUtils.nowTime, 16 /* ROOM */);
            }
        };
        return SrsPackWriter;
    }());
    app.SrsPackWriter = SrsPackWriter;
    __reflect(SrsPackWriter.prototype, "app.SrsPackWriter");
})(app || (app = {}));
//# sourceMappingURL=SrsPackWriter.js.map