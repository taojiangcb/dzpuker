var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var Message = (function () {
        function Message(session) {
            this.session = session.toArray();
        }
        Message.prototype.toArray = function () {
            return [new mc2sdk.Integer(2), this.session];
        };
        return Message;
    }());
    mc2sdk.Message = Message;
    __reflect(Message.prototype, "mc2sdk.Message");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=Message.js.map