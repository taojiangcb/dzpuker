var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by taojiang on 16/9/13.
 */
var room;
(function (room) {
    var CreatePKRoomUIMoudle = (function (_super) {
        __extends(CreatePKRoomUIMoudle, _super);
        function CreatePKRoomUIMoudle() {
            var _this = _super.call(this) || this;
            _this.roomBtns = [];
            _this.skinName = "resource/app_skin/room/CreatePKRoom.exml";
            return _this;
        }
        CreatePKRoomUIMoudle.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            this.roomBtns = [
                this.room1, this.room2, this.room3, this.btnShop, this.helpButton, this.btnClose
            ];
            this.roomBtns.forEach(function (element) {
                _this.bindButton(element);
            });
            this.descriptGroup.visible = false;
        };
        CreatePKRoomUIMoudle.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this.room1:
                    this.chrooseRoom = room.getProxy().room6[0];
                    playcards.getProxy().openMoudle(4 /* NONE */);
                    mc2sdk.event(50081 /* IN_PK_1 */);
                    break;
                case this.room2:
                    this.chrooseRoom = room.getProxy().room6[1];
                    playcards.getProxy().openMoudle(4 /* NONE */);
                    mc2sdk.event(50082 /* IN_PK_2 */);
                    break;
                case this.room3:
                    this.chrooseRoom = room.getProxy().room6[2];
                    playcards.getProxy().openMoudle(4 /* NONE */);
                    mc2sdk.event(50083 /* IN_PK_3 */);
                    break;
                case this.btnShop:
                    user.getProxy().openShop();
                    break;
                case this.btnClose:
                    this.descriptGroup.visible = false;
                    break;
                case this.helpButton:
                    this.descriptGroup.visible = true;
                    break;
            }
        };
        CreatePKRoomUIMoudle.prototype.openPlayCall = function () {
            var _this = this;
            if (playcards.getProxy().isPlayCard) {
                uicomps.confirmNeedSilver(true, this.chrooseRoom.minBank, this.chrooseRoom.maxBank, false, true, true, function (val) {
                    if (val > 0) {
                        //**进房间前把带入额缓存下*/
                        user.getProxy().PKDragInRoom = val;
                        user.gotoRoom(_this.chrooseRoom);
                        _this.close();
                    }
                    else {
                        //退出打牌
                        playcards.getProxy().outbakfun();
                    }
                }, this);
            }
        };
        CreatePKRoomUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return CreatePKRoomUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    room.CreatePKRoomUIMoudle = CreatePKRoomUIMoudle;
    __reflect(CreatePKRoomUIMoudle.prototype, "room.CreatePKRoomUIMoudle");
})(room || (room = {}));
//# sourceMappingURL=CreatePKRoomUIMoudle.js.map