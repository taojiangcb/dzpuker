var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    var CreateMoudle = (function (_super) {
        __extends(CreateMoudle, _super);
        function CreateMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "CreateRoomSkin";
            _this.bindButton(_this.backButton);
            _this.bindButton(_this.enterButton);
            _this.bindButton(_this.btnShop);
            _this.bindButton(_this.helpButton);
            var layout = new eui.HorizontalLayout();
            layout.useVirtualLayout = false;
            layout.gap = 5;
            layout.paddingLeft = 40;
            _this.tableList.layout = layout;
            _this.tableList.dataProvider = new eui.ArrayCollection(room.getProxy().room4);
            _this.tableList.itemRenderer = room.CreateRenderer;
            // this.anteGroup.visible = false;
            // this.psdGroup.visible = false;
            if (_this.anteBar != null) {
                _this.anteBar.pageSize = 3;
                _this.anteBar.itemRenderer = uicomps.ChrooseMenuItemRenderer;
            }
            if (_this.menuBar1 != null) {
                _this.menuBar1.pageSize = 2;
                _this.menuBar1.itemRenderer = uicomps.ChrooseMenuItemRenderer;
                _this.menuBar1.dataProvider = [
                    { label: "开" },
                    { label: "关" }
                ];
                _this.menuBar1.addEventListener(egret.Event.CHANGE, _this.changePrivate, _this);
            }
            return _this;
            // this.menuBar2.pageSize = 2;
            // this.menuBar2.itemRenderer = uicomps.ChrooseMenuItemRenderer;
        }
        CreateMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.tableList.selectedIndex = 1; //(暂时关闭其他房间)
            this.onSelectTable();
            this.registerMediator(room.CreateUIMediator);
            this.tableList.addEventListener(egret.Event.CHANGE, this.onSelectTable, this);
        };
        CreateMoudle.prototype.onSelectTable = function (evt) {
            var dataArr = [];
            var tableIndex = this.tableList.selectedIndex;
            var anteList = room.getProxy().anteList[tableIndex];
            var len = anteList.length;
            for (var i = 0; i < len; ++i) {
                var str = FormatUtils.wan(anteList[i]);
                dataArr.push({ label: str });
            }
            if (this.anteBar != null) {
                this.anteBar.dataProvider = dataArr;
            }
        };
        CreateMoudle.prototype.changePrivate = function () {
            if (this.menuBar1.selectItemIndex == 0) {
                this.prvImage.source = "img_word_simishezhi1_png";
            }
            else {
                this.prvImage.source = "img_word_simishezhi_png";
            }
        };
        CreateMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.enterButton:
                    this.chrooseRoom = this.tableList.selectedItem;
                    var silver = user.getProxy().svrGameData.silver;
                    if (this.chrooseRoom.minBank > silver) {
                        tip.popSysCenterTip("彩豆不足，最低带入要求：" + FormatUtils.wan(this.chrooseRoom.minBank));
                        //                        user.getProxy().openMoney();
                        break;
                    }
                    playcards.getProxy().anteType = this.anteBar.selectItemIndex;
                    playcards.getProxy().beginVipRoom = true;
                    playcards.getProxy().openMoudle(4 /* NONE */);
                    // if(null == user.getProxy().currentRoom) {
                    //     tip.popSysCenterTip("您还没有进入私人房",tip.TIPS_TYPE.TIPS_WARNING);
                    //     break;
                    // }  
                    // var silver = user.getProxy().svrGameData.silver;
                    // if(user.getProxy().currentRoom.minBank > silver) {
                    //     user.getProxy().openMoney();
                    // } else {
                    //     if(user.getProxy().currentRoom != this.tableList.selectedItem) {
                    //         this.gotoVipRoom();
                    //     } else {
                    //         this.autoSit();
                    //     }
                    // }
                    break;
                case this.btnShop:
                    user.getProxy().openShop();
                    break;
                case this.helpButton:
                    __OPEN_MOUDLE(AppReg.VIP_ROOM_RULE);
                    break;
            }
        };
        CreateMoudle.prototype.openPlayCall = function () {
            // uicomps.confirmNeedSilver(true,this.chrooseRoom.minBank,this.chrooseRoom.maxBank,
            // false,false,true,(val:number)=>{
            //     if(val > 0) {
            //**进房间前把带入额缓存下*/
            user.getProxy().PKDragInRoom = this.chrooseRoom.maxBank;
            user.gotoRoom(this.chrooseRoom);
            // this.close();
            //     }
            //     else {
            //         this.close();
            //     }
            // },this)
        };
        CreateMoudle.prototype.gotoVipRoom = function (p) {
            this.tableList.selectedIndex = 1; //(暂时关闭其他房间)
            user.gotoRoom(this.tableList.selectedItem);
        };
        CreateMoudle.prototype.autoSit = function () {
            var tableId = room.getProxy().searchEmptyTable();
            var sitId = room.getProxy().searchEmptySit(tableId);
            var joinNumber = room.getProxy().createJoinId(tableId);
            var tablePsd = room.getProxy().parseTablePsd(joinNumber);
            playcards.getProxy().joinNumber = joinNumber;
            playcards.getProxy().anteType = this.anteBar.selectItemIndex;
            playcards.getProxy().beginVipRoom = true;
            if (this.menuBar1.selectItemIndex == 0) {
                this.sendNotification(app.NetAction.PLAYER_SET_LIMIT, tablePsd); //加密
            }
            else {
                this.sendNotification(app.NetAction.PLAYER_SET_LIMIT, null); //不加密
            }
            this.sendNotification(app.NetAction.ROOM_ACTION, [1, tableId, sitId, tablePsd]); //坐下
            // __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [user.ROOM_TYPE.PRIVATE, parseInt(joinNumber)]);
            this.close();
        };
        return CreateMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    room.CreateMoudle = CreateMoudle;
    __reflect(CreateMoudle.prototype, "room.CreateMoudle");
})(room || (room = {}));
//# sourceMappingURL=CreateMoudle.js.map