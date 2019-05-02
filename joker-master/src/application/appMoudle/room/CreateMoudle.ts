module room {

    
    export class CreateMoudle extends app.base.BaseSceneUIMoudleComponent {
        tableSceoller: eui.Scroller;
        tableList: eui.List;
        enterButton: eui.Button;
        btnShop:eui.Image;
        
        anteGroup:eui.Group;
        psdGroup:eui.Group;
        
        //前注
        anteBar:uicomps.ChrooseMenu;
        //私密设置
        menuBar1: uicomps.ChrooseMenu;
        //人数
        menuBar2: uicomps.ChrooseMenu;

        prvImage:eui.Image;

        helpButton:eui.Image;
        
        
        public constructor() {
    		super();
    		this.skinName = "CreateRoomSkin";
            
            this.bindButton(this.backButton);
            this.bindButton(this.enterButton);
            this.bindButton(this.btnShop);
            this.bindButton(this.helpButton);
            var layout = new eui.HorizontalLayout();
            layout.useVirtualLayout = false;
            layout.gap = 5;
            layout.paddingLeft = 40;
            this.tableList.layout = layout;
            this.tableList.dataProvider = new eui.ArrayCollection(room.getProxy().room4);
            this.tableList.itemRenderer = CreateRenderer;
            
            // this.anteGroup.visible = false;
            // this.psdGroup.visible = false;
            
            if (this.anteBar != null) {
                this.anteBar.pageSize = 3;
                this.anteBar.itemRenderer = uicomps.ChrooseMenuItemRenderer;
            }

            if(this.menuBar1 != null) {
                this.menuBar1.pageSize = 2;
                this.menuBar1.itemRenderer = uicomps.ChrooseMenuItemRenderer;
                this.menuBar1.dataProvider = [
                    {label:"开"},
                    {label:"关"}
                ];
                this.menuBar1.addEventListener(egret.Event.CHANGE,this.changePrivate,this);
            }
            // this.menuBar2.pageSize = 2;
            // this.menuBar2.itemRenderer = uicomps.ChrooseMenuItemRenderer;
        }
        
         public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.tableList.selectedIndex = 1;//(暂时关闭其他房间)
            this.onSelectTable();
            this.registerMediator(CreateUIMediator);
            this.tableList.addEventListener(egret.Event.CHANGE,this.onSelectTable,this);
         }
         
         onSelectTable(evt?:egret.Event):void {
            var dataArr = [];
            var tableIndex = this.tableList.selectedIndex;
            var anteList = room.getProxy().anteList[tableIndex];
            var len = anteList.length;
            for(var i=0; i<len; ++i) {
                var str = FormatUtils.wan(anteList[i]);
                dataArr.push({label:str});
            }
            if (this.anteBar != null) {
                this.anteBar.dataProvider = dataArr;
            }
         }
         

         changePrivate():void {
             if (this.menuBar1.selectItemIndex == 0) {
                this.prvImage.source="img_word_simishezhi1_png";
             } else {
                this.prvImage.source="img_word_simishezhi_png";
             }
         }


        chrooseRoom:appvos.RoomVO;
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.enterButton:
                    this.chrooseRoom = this.tableList.selectedItem;
                    var silver = user.getProxy().svrGameData.silver;
                    if(this.chrooseRoom.minBank > silver) {
                        tip.popSysCenterTip("彩豆不足，最低带入要求：" + FormatUtils.wan(this.chrooseRoom.minBank));
//                        user.getProxy().openMoney();
                        break;
                    }
                
                    
                    playcards.getProxy().anteType = this.anteBar.selectItemIndex;
                    playcards.getProxy().beginVipRoom = true;
                    playcards.getProxy().openMoudle(playcards.OPEN_PARAM.NONE);
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
        }


        openPlayCall():void {
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
        }


        gotoVipRoom(p?:any):void {
            this.tableList.selectedIndex = 1;//(暂时关闭其他房间)
            user.gotoRoom(this.tableList.selectedItem);
        }

        autoSit():void {
            var tableId = room.getProxy().searchEmptyTable();
            var sitId = room.getProxy().searchEmptySit(tableId);
            var joinNumber = room.getProxy().createJoinId(tableId);
            var tablePsd = room.getProxy().parseTablePsd(joinNumber);
            playcards.getProxy().joinNumber = joinNumber;
            playcards.getProxy().anteType = this.anteBar.selectItemIndex;
            playcards.getProxy().beginVipRoom = true;
            if(this.menuBar1.selectItemIndex == 0) {
                this.sendNotification(app.NetAction.PLAYER_SET_LIMIT,tablePsd);//加密
            } else {
                this.sendNotification(app.NetAction.PLAYER_SET_LIMIT,null);//不加密
            }
            this.sendNotification(app.NetAction.ROOM_ACTION, [1, tableId, sitId, tablePsd]);//坐下
            // __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [user.ROOM_TYPE.PRIVATE, parseInt(joinNumber)]);
            this.close();
        }
        
    }
}