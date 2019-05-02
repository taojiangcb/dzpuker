var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    /**
     * 牌局
     *  */
    var DZRecordVO = (function () {
        function DZRecordVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("DZRecordVO").decode(data);
                this.setData(vo);
            }
        }
        DZRecordVO.prototype.setString = function (str) {
            var vo = AppGlobal.getMessage("DZRecordVO").decode(FormatUtils.strToBuffer(str));
            this.setData(vo);
        };
        DZRecordVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.myCard = vo.myCard;
            this.id = vo.id == null ? 0 : vo.id.toNumber();
            this.type = vo.type;
            this.smallBlinds = vo.smallBlinds;
            this.bigBlinds = vo.bigBlinds;
            this.winNum = vo.winNum;
            this.timeNum = vo.timeNum == null ? 0 : vo.timeNum.toNumber();
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            // this.roleName = vo.roleName;
            this.handNum = vo.handNum;
            this.key = vo.key;
            if (vo.video) {
                this.video = new appvos.PlayCardsVideoVO(vo.video);
            }
            vo = null;
        };
        DZRecordVO.prototype.getProtoVO = function () {
            var vo = AppGlobal.getMessageVO("DZRecordVO"); // 创建DZ对象
            vo.myCard = this.myCard;
            vo.id = __SET_INT64(this.id);
            vo.type = this.type;
            vo.smallBlinds = this.smallBlinds;
            vo.bigBlinds = this.bigBlinds;
            vo.winNum = this.winNum;
            vo.timeNum = __SET_INT64(this.timeNum);
            vo.roleId = __SET_INT64(this.roleId);
            // vo.roleName = this.roleName;
            vo.handNum = this.handNum;
            vo.key = this.key;
            if (this.video)
                vo.video = this.video.toArrayBuffer();
            return vo;
        };
        DZRecordVO.prototype.toArrayBuffer = function () {
            var vo = this.getProtoVO();
            return vo.toArrayBuffer();
        };
        DZRecordVO.prototype.toString = function () {
            // var byte: egret.ByteArray = new egret.ByteArray(this.toArrayBuffer());
            // byte.position = 0;
            //byte.readUTF()
            var str = FormatUtils.bufferToStr(this.toArrayBuffer());
            return str;
        };
        return DZRecordVO;
    }());
    appvos.DZRecordVO = DZRecordVO;
    __reflect(DZRecordVO.prototype, "appvos.DZRecordVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=DZRecordVO.js.map