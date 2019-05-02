module notice {
    /**
     *公告相关界面
     * @author 
     *
     */
    export class NoticeUIMoudle extends app.base.BaseSceneUIMoudleComponent {

        public bgimage: eui.Rect;
        public firstList: eui.List;
        public leftScroller: eui.Scroller;
        public rightScroller: eui.Scroller;
        public contentLabel: eui.Label;
        public contentList: eui.List;
        public urlButton: eui.Image;
        public urlGroup: eui.Group;
        public noticeTitle: eui.Label;
        public timeLabel: eui.Label;
        public moneyLabel: eui.Label;
        public targetUrl: string;
        public selectItem: notice.NoticeLabel;
        public noticeArray: appvos.NoticeVO[];
        
        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "resource/app_skin/notice/NoticeUIMoudleSkin.exml";
        }

        public onListChange(event: egret.Event): void {
            for(var i = 0;i < this.firstList.dataProvider.length; i++) {
                var tab = <notice.NoticeLabel>this.firstList.getElementAt(i);
                tab.setSelect();
            }
            this.updateNotice(this.firstList.selectedIndex);
        }

        public updateNotice(index: number): void {
            this.rightScroller.viewport.scrollV = 0;
            this.setNoticeTitle(index);
            this.setNoticeContant(index);
            this.setNoticeTime(index);
            this.setUrlButton(index);
        }

        public setNoticeTitle(index: number): void {
            this.noticeTitle.text = this.noticeArray[index].title;
        }

        public setNoticeContant(index: number): void {
            this.contentLabel.text = "";
            var s = this.noticeArray[index].content.split("\\n");
            for (var i = 0; i < s.length; i++) {
                this.contentLabel.text += s[i] + "\n";
            }
            this.contentList.height = this.contentLabel.height;
            this.rightScroller.viewport.scrollV = 0;
        }

        public setUrlButton(index: number): void {
            this.targetUrl = this.noticeArray[index].gotoTarget;
            if(this.targetUrl && this.targetUrl != "") {
                this.urlGroup.visible = true;
            } else {
                this.urlGroup.visible = false;
            }
        }

        public setNoticeTime(index:number):void {
            var startTime = DateUtils.dateFormat(new Date(this.noticeArray[index].startTime), "yyyy-MM-dd hh:mm");//this.timeStampToString(this.noticeArray[index].startTime);
            var endTime = DateUtils.dateFormat(new Date(this.noticeArray[index].endTime), "yyyy-MM-dd hh:mm");//this.timeStampToString(this.noticeArray[index].endTime);
            if(endTime) {
                this.timeLabel.text = startTime + " 至 " + endTime;
            } else {
                this.timeLabel.text = endTime;
            }
        }

        public createComplete(event: egret.Event): void {
            this.urlGroup.visible = false;
            this.uiDataFull(true);
            super.createComplete(event);
        }
        
        uiDataFull(succeed:boolean):void {
            this.noticeArray = this.uiOpenData;
            var selectIndex = 0;
            var dataSource = new Array();
            for(var i: number = 0; i < this.noticeArray.length; i++) {
                var setSelect = false;
                if(i === selectIndex) {
                    setSelect = true;
                }
                dataSource.push({ index: i,label: this.noticeArray[i].title,isSelect: setSelect });
            }
            this.firstList.dataProvider = new eui.ArrayCollection(dataSource);
            this.firstList.itemRenderer = notice.NoticeLabel;
            this.firstList.addEventListener(egret.Event.CHANGE,this.onListChange,this);
            this.bindButton(this.bgimage,false);
            this.bindButton(this.urlGroup);
            this.updateNotice(selectIndex);
        }
        
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.bgimage:
                    this.clickBackEvent();
                    break;
                case this.urlGroup:
                    this.clickUrlEvent();
                    break;
            }
        }

        private clickBackEvent(): void {
            this.close();
        }

        private clickUrlEvent(): void {
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                utils.NativeUtils.nativeCall(utils.NATIVE_CMD.OPEN_URL,this.targetUrl);
            }
            else if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                window.open(this.targetUrl);
            }
        }
        
        private initSelect(noticeId:number):number {
            var i;
            for(i = 0; i < this.noticeArray.length; i++) {
                if (noticeId === this.noticeArray[i].noticeId) {
                    break;
                }
            }
            return i;
        }
        
        public dispose():void {
            super.dispose();
        }
    }
}