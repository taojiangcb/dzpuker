/**
 * Created by taojiang on 16/9/13.
 */
module room {
    export class CreatePKRoomUIMoudle extends app.base.BaseSceneUIMoudleComponent {

        public btnShop:eui.Image;
        public backButton:eui.Button;
        public room1:eui.Image;
        public room2:eui.Image;
        public room3:eui.Image;

        helpButton:eui.Image;
        btnClose:eui.Image;
        descriptGroup:eui.Group;

        roomBtns:eui.Image[] = [];
        chrooseRoom:appvos.RoomVO;

        constructor() {
            super();
            this.skinName = "resource/app_skin/room/CreatePKRoom.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.roomBtns = [
                this.room1,this.room2,this.room3,this.btnShop,this.helpButton,this.btnClose
            ];

            this.roomBtns.forEach(element=> {
                this.bindButton(element);
            });

            this.descriptGroup.visible = false;
        }


        touchBindButtonHandler(tag:egret.DisplayObject):void {
            switch(tag) {
                case this.room1:
                    this.chrooseRoom = room.getProxy().room6[0];
                    playcards.getProxy().openMoudle(playcards.OPEN_PARAM.NONE);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.IN_PK_1);
                    break;
                case this.room2:
                    this.chrooseRoom = room.getProxy().room6[1];
                    playcards.getProxy().openMoudle(playcards.OPEN_PARAM.NONE);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.IN_PK_2);
                    break;
                case this.room3:
                    this.chrooseRoom = room.getProxy().room6[2];
                    playcards.getProxy().openMoudle(playcards.OPEN_PARAM.NONE);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.IN_PK_3);
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
        }

        openPlayCall():void {
            if(playcards.getProxy().isPlayCard) {
                uicomps.confirmNeedSilver(true,this.chrooseRoom.minBank,this.chrooseRoom.maxBank,false,true,true,(val:number)=>{
                    if(val > 0) {
                        //**进房间前把带入额缓存下*/
                        user.getProxy().PKDragInRoom = val;
                        user.gotoRoom(this.chrooseRoom);
                        this.close();
                    }
                    else {
                        //退出打牌
                        playcards.getProxy().outbakfun();
                    }
                },this)
            }
        }

        dispose():void {
            super.dispose();
        }
    }
}