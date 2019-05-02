var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cy;
(function (cy) {
    cy.autoAskId = 0;
    cy.askCommandDepot = {};
    function addAskCommand(value) {
        ++cy.autoAskId;
        cy.askCommandDepot[cy.autoAskId] = value;
        return cy.autoAskId;
    }
    cy.addAskCommand = addAskCommand;
    function getAskCommand(askId) {
        var commandData = cy.askCommandDepot[askId];
        cy.askCommandDepot[askId] = undefined;
        return commandData;
    }
    cy.getAskCommand = getAskCommand;
    /**
     * @author huangkan
     *  SRS通信基类，负责结构化开发流程，使得业务只关注包体内容和收发顺序
     */
    var SrsCommand = (function (_super) {
        __extends(SrsCommand, _super);
        function SrsCommand() {
            return _super.apply(this, arguments) || this;
        }
        SrsCommand.prototype.execute = function (notification) {
            if (!cy.srsServer.socket.connected) {
                console.log("socket 已断开不能发指令了 cy.srsServer.socket.connected:" + cy.srsServer.socket.connected);
                return;
            }
            var process_action = notification.getName().split(app.NetAction.PROCESS_CUT);
            if (process_action.length == 1) {
                this.action = process_action[0];
            }
            else if (process_action.length == 2) {
                this.process = process_action[0];
                this.action = process_action[1];
                this.pocsact = this.process + app.NetAction.PROCESS_CUT + this.action;
            }
            var body = notification.getBody();
            if (body instanceof cyvos.SrsPackage) {
                this.recvPackage = body;
                this.resultHandler(new cy.SrsStreamReader(this.recvPackage.data));
            }
            else {
                this.sendPackage = new cyvos.SrsPackage();
                this.sendPackage.sProcessID = parseInt(this.process);
                this.sendPackage.sXYID = parseInt(this.action);
                this.sendHandler(body, new cy.SrsStreamWriter(this.sendPackage.data));
                cy.srsServer.send(this.sendPackage);
            }
        };
        SrsCommand.prototype.tipError = function (flag, title) {
            if (title === void 0) { title = "Error"; }
            var id = this.action + "-" + flag;
            var msg = gameabc.getError(id);
            if (msg != null && msg != "" && msg != "undefined")
                title = msg;
            tip.popSysCenterTip(title + " [" + flag + "]");
        };
        /** 抽象函数，继承实现，对包的内容需在此进行逻辑组装 */
        SrsCommand.prototype.sendHandler = function (data, stream) {
            //抽象函数保持空，可减少子类忽略super引发的错误
        };
        /** 抽象函数，继承实现，对包的内容需在此进行逻辑处理或分流 */
        SrsCommand.prototype.resultHandler = function (stream) {
            //抽象函数保持空，可减少子类忽略super引发的错误
        };
        return SrsCommand;
    }(puremvc.SimpleCommand));
    cy.SrsCommand = SrsCommand;
    __reflect(SrsCommand.prototype, "cy.SrsCommand");
})(cy || (cy = {}));
//# sourceMappingURL=SrsCommand.js.map