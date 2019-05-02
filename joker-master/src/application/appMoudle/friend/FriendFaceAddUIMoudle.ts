module friend {
    export enum TYPE_FACE2FACE {
        ENTER,
        ROOM
    }
    export class FriendFaceAddUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private roomFriendData: any;
        private roomNumber: string;
        private type: TYPE_FACE2FACE;
        private enterGroup: eui.Group;
        private roomGroup:eui.Group;
        private roomText: eui.EditableText;
        private roomButton: eui.Group;
        private goBackButton: eui.Image;
        private roomNumberLabel: eui.BitmapLabel;
        private addFriendsButton: eui.Group;
        private dataProvider: eui.ArrayCollection;
        private friendList: eui.List;
        _comp_subKeyBoard:uicomps.SubKeyBoardComp; //键盘组件
        // inputButton0:eui.Button;
        // inputButton1:eui.Button;
        // inputButton2:eui.Button;
        // inputButton3:eui.Button;
        // inputButton4:eui.Button;
        // inputButton5:eui.Button;
        // inputButton6:eui.Button;
        // inputButton7:eui.Button;
        // inputButton8:eui.Button;
        // inputButton9:eui.Button;
        // inputButtonArray:eui.Button[];
        enterButton: eui.Button;
        delButton:eui.Button;

        infoLabel: eui.Group;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = -20;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
            this.skinName = "FriendFaceAddUIMoudleSkin";
            this.delButton = this._comp_subKeyBoard.delButton;
            this.enterButton = this._comp_subKeyBoard.enterButton;
        }
        onComplete() {
            __REGISTER_MEDIATOR(FriendFaceAddUIMediator,this);
            // this.roomText.prompt = "输入4位数字进行添加 (注：数字不能连号不能相同)";
            this.roomText.addEventListener(egret.Event.CHANGE,this.onInputChange,this);
            this.roomText.maxChars = 4;
            this.changeType(TYPE_FACE2FACE.ENTER);
            this.bindButton(this.roomButton);
            this.bindButton(this.goBackButton);
            this.bindButton(this.addFriendsButton);
            this.bindButton(this.enterButton);
            this.bindButton(this.delButton);
            this._comp_subKeyBoard.inputButtonArray.forEach(item=>{
                this.bindButton(item);
            })
           
        }
        onInputChange():void {
            // console.log("onChange");
            // var a = this.roomText.text.length == 0;
            this.infoLabel.visible = Boolean(this.roomText.text.length == 0);
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.goBackButton:
                    if (this.type == TYPE_FACE2FACE.ENTER) {
                        __OPEN_MOUDLE(AppReg.APP_FRIEND_MAIN, TYPE.FRIEND_ADD);
                        this.close();
                    } else if (this.type == TYPE_FACE2FACE.ROOM) {
                        this.changeType(TYPE_FACE2FACE.ENTER);
                    }
                    break;
                case this.enterButton:
                case this.roomButton:
                    var s: string = this.roomText.text;
                    if (isNaN(parseInt(s)) || s.length !== 4 || (s[0] == s[1] && s[1] == s[2] && s[2] == s[3]) ||
                        (parseInt(s[0]) - parseInt(s[1]) == 1 && parseInt(s[1]) - parseInt(s[2]) == 1 && parseInt(s[2]) - parseInt(s[3]) == 1) ||
                        (parseInt(s[0]) - parseInt(s[1]) == -1 && parseInt(s[1]) - parseInt(s[2]) == -1 && parseInt(s[2]) - parseInt(s[3]) == -1)) {
                            tip.popSysCenterTip("输入数字格式错误");
                            return;
                    }
                    __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND_FACE2FACE, parseInt(this.roomText.text));
                    break;
                case this.addFriendsButton:
                    if (this.roomFriendData.length == 0) return;
                    var data: number[] = [];
                    data.push(parseInt(this.roomNumber));
                    for (var i = 0; i < this.dataProvider.length; i++) {
                        data.push(this.roomFriendData[i].uid);
                    }
                    if (user.getProxy().friendNum + data.length >= user.getProxy().MAXFRIENDNUM) tip.popSysCenterTip("您的好友数已达上限！", tip.TIPS_TYPE.TIPS_WARNING);
                    else __SEND_NOTIFICATION(app.NetAction.REQ_ADD_FACE2FACE_FRIEND, data);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.FRIEND_ADD);
                    break;
                case this.delButton:
                    var len = this.roomText.text.length;
                    if (len > 0) {
                        this.roomText.text = this.roomText.text.substring(0, len - 1);
                        this.onInputChange();
                    }
                    break;
                default:
                    break;
            }
            if (this.roomText.text.length >= 4) return;
            for(var i = 0; i < 10; i++) {
                if (this._comp_subKeyBoard.inputButtonArray[i] == clickTarget) {
                    this.roomText.text += String(i);
                    this.onInputChange();
                }
            }
        }
        changeType(type: TYPE_FACE2FACE) {
            if (this.type == type) return;
            this.type = type;
            switch (type) {
                case TYPE_FACE2FACE.ENTER:
                    this.roomGroup.visible = false;
                    this.enterGroup.visible = true;
                    break;
                case TYPE_FACE2FACE.ROOM:
                    this.enterGroup.visible = false;
                    this.roomGroup.visible = true;
                    break;
                default:
                    break;
            }
        }
        enterRoom(data: any[]) {
            switch (this.type) {
                case TYPE_FACE2FACE.ENTER:
                    if (this.roomText.text !== this.roomNumber) {
                        this.roomNumber = this.roomText.text;
                        // var timer = new egret.Timer(3 * 60 * 1000, 1);
                        // timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function() {
                        //     this.roomNumber = "0";
                        //     this.changeType(TYPE_FACE2FACE.ENTER);
                        //     tip.popSysCenterTip("互加好友已超时");
                        // },this);
                        // timer.start();
                        this.roomFriendData = [];
                    }
                    this.roomNumberLabel.text = this.roomText.text;
                    this.changeType(TYPE_FACE2FACE.ROOM);
                    break;
                case TYPE_FACE2FACE.ROOM:
                    break;
                default:
                    break;
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].uid !== user.getProxy().svrRoleId) {
                    for (var j = 0; j < this.roomFriendData.length; j++) {
                        if (this.roomFriendData[j] == data[i]) break;
                    }
                    if (j == this.roomFriendData.length) this.roomFriendData.push(data[i]);
                }
            }
            this.dataProvider = new eui.ArrayCollection(this.roomFriendData);
            this.friendList.dataProvider = this.dataProvider;
            this.friendList.itemRenderer = FriendFaceAddLabel;
        }
        addFriendsSuccess() {
            tip.popSysCenterTip("好友申请已发送");
        }
        public dispose(): void {
            __REMOVE_MEDIATOR(FriendFaceAddUIMediator);
            super.dispose();
        }
    }
}