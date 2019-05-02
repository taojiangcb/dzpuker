module room {
	/**
	 *
	 * @author 
	 *
	 */
    export class JoinMoudle extends app.base.BaseWndUIMoudleComponent  {


        // closeBtn:eui.Button;

        createGroup:eui.Group;
        keyboardComp:uicomps.KeyboardComp;

        createButton:eui.ToggleButton;
        joinButton:eui.ToggleButton;

        toVsButton:eui.Button;
        toCreateButton:eui.Button;

        tabBar:uicomps.ButtonGroup;




        
		public constructor() {
    		super();
            // this.top = 0;
            // this.bottom = 0;
            // this.left = 0;
            // this.right = 0;
            this.skinName = "JoinSkin";
		}

        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.registerMediator(JoinUIMediator);
            this.tabBar = new uicomps.ButtonGroup();
            this.tabBar.add(this.createButton);
            this.tabBar.add(this.joinButton);
            this.tabBar.itemClick = this.touchHandler;
            this.tabBar.itemThisObj = this;
            
            this.bindButton(this.toCreateButton);
            this.bindButton(this.toVsButton, false);
            this.keyboardComp.buttonListener = this.touchBindButtonHandler;
            this.keyboardComp.buttonListenerObj = this;
            this.tabBar.select(this.createButton);
            this.showCreateGroup();
            this.verticalCenter = 30;
        }

        showCreateGroup():void {
            this.createGroup.visible = true;
            this.keyboardComp.visible = false;
        }

        showJoinGroup():void {
            this.createGroup.visible = false;
            this.keyboardComp.visible = true;
        }

        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.toCreateButton:
                    // tip.popSysCenterTip("FUNCTION_NO_TIPS");
                    __OPEN_MOUDLE(AppReg.CREATE_ROOM);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.VIP_CREATE);
                    return;
                case this.createButton:
                    this.showCreateGroup();
                    return;
                case this.joinButton:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.VIP_JOIN);
                    this.showJoinGroup();
                    return;
                // case this.closeBtn:
                //     this.close();
                //     return;
                case this.keyboardComp.enterButton:
                case this.keyboardComp.gotoImage:
                    var roomVO = this.parseRoomVoFromInput();
                    if (roomVO == null) {
                        tip.popSysCenterTip("输入房间ID错误，请重新输入！",tip.TIPS_TYPE.TIPS_WARNING);
                        return;
                    // } else if(user.getProxy().currentRoom != roomVO) { //此处为私人房逻辑，暂时去除
                    //     this.gotoVipRoom();
                    // } else {
                    //     this.autoSit();
                    }
                    // if(this.checkJoinNumber()){
                        playcards.getProxy().joinNumber = this.keyboardComp.numberInput.text;
                        playcards.getProxy().openMoudle(playcards.OPEN_PARAM.NONE);
                    // }
                    return;
                case this.toVsButton:
                    if (setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType7, egret.RuntimeType.WEB) == 0) {
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                    } else {
                        __OPEN_MOUDLE(AppReg.CREATE_PK_ROOM);
                    }
                    mc2sdk.event(mc2sdk.EVENT_TYPE.CREATE_PK);
                    break;
            }
        }
        
        parseRoomVoFromInput():appvos.RoomVO {
            return room.getProxy().getRoomVOByJoinNumber(this.keyboardComp.numberInput.text);
        }
                
        gotoVipRoom(p?:any):void {
            user.gotoRoom(this.parseRoomVoFromInput());
        }

        close():void {
            this.keyboardComp.numberInput.text = "";
            super.close();
        }
        
        
        checkJoinNumber():boolean {
            var joinNumber = this.keyboardComp.numberInput.text;
            if(joinNumber=="")return false;
            var tableId = room.getProxy().parseTableId(joinNumber);
            var tablePsd = room.getProxy().parseTablePsd(joinNumber);
            if (room.getProxy().isEmptyTable(tableId)) {
                tip.Alert.show("对不起，您来晚了，人走茶凉~");
                return false;
            }
            var sitId = room.getProxy().searchEmptySit(tableId);
            if (sitId == -1) {
                tip.Alert.show("对不起，您来晚了，已经满员~");
                return false;
            }
            return true;
            // this.sendNotification(app.NetAction.ROOM_ACTION,[1,tableId,sitId,tablePsd]);//坐下
        }
	}
}





