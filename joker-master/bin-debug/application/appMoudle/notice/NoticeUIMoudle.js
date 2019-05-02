var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var notice;
(function (notice) {
    /**
     *公告相关界面
     * @author
     *
     */
    var NoticeUIMoudle = (function (_super) {
        __extends(NoticeUIMoudle, _super);
        function NoticeUIMoudle() {
            var _this = _super.call(this) || this;
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            _this.skinName = "resource/app_skin/notice/NoticeUIMoudleSkin.exml";
            return _this;
        }
        NoticeUIMoudle.prototype.onListChange = function (event) {
            for (var i = 0; i < this.firstList.dataProvider.length; i++) {
                var tab = this.firstList.getElementAt(i);
                tab.setSelect();
            }
            this.updateNotice(this.firstList.selectedIndex);
        };
        NoticeUIMoudle.prototype.updateNotice = function (index) {
            this.rightScroller.viewport.scrollV = 0;
            this.setNoticeTitle(index);
            this.setNoticeContant(index);
            this.setNoticeTime(index);
            this.setUrlButton(index);
        };
        NoticeUIMoudle.prototype.setNoticeTitle = function (index) {
            this.noticeTitle.text = this.noticeArray[index].title;
        };
        NoticeUIMoudle.prototype.setNoticeContant = function (index) {
            this.contentLabel.text = "";
            var s = this.noticeArray[index].content.split("\\n");
            for (var i = 0; i < s.length; i++) {
                this.contentLabel.text += s[i] + "\n";
            }
            this.contentList.height = this.contentLabel.height;
            this.rightScroller.viewport.scrollV = 0;
        };
        NoticeUIMoudle.prototype.setUrlButton = function (index) {
            this.targetUrl = this.noticeArray[index].gotoTarget;
            if (this.targetUrl && this.targetUrl != "") {
                this.urlGroup.visible = true;
            }
            else {
                this.urlGroup.visible = false;
            }
        };
        NoticeUIMoudle.prototype.setNoticeTime = function (index) {
            var startTime = DateUtils.dateFormat(new Date(this.noticeArray[index].startTime), "yyyy-MM-dd hh:mm"); //this.timeStampToString(this.noticeArray[index].startTime);
            var endTime = DateUtils.dateFormat(new Date(this.noticeArray[index].endTime), "yyyy-MM-dd hh:mm"); //this.timeStampToString(this.noticeArray[index].endTime);
            if (endTime) {
                this.timeLabel.text = startTime + " 至 " + endTime;
            }
            else {
                this.timeLabel.text = endTime;
            }
        };
        NoticeUIMoudle.prototype.createComplete = function (event) {
            this.urlGroup.visible = false;
            this.uiDataFull(true);
            _super.prototype.createComplete.call(this, event);
        };
        NoticeUIMoudle.prototype.uiDataFull = function (succeed) {
            this.noticeArray = this.uiOpenData;
            var selectIndex = 0;
            var dataSource = new Array();
            for (var i = 0; i < this.noticeArray.length; i++) {
                var setSelect = false;
                if (i === selectIndex) {
                    setSelect = true;
                }
                dataSource.push({ index: i, label: this.noticeArray[i].title, isSelect: setSelect });
            }
            this.firstList.dataProvider = new eui.ArrayCollection(dataSource);
            this.firstList.itemRenderer = notice.NoticeLabel;
            this.firstList.addEventListener(egret.Event.CHANGE, this.onListChange, this);
            this.bindButton(this.bgimage, false);
            this.bindButton(this.urlGroup);
            this.updateNotice(selectIndex);
        };
        NoticeUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.bgimage:
                    this.clickBackEvent();
                    break;
                case this.urlGroup:
                    this.clickUrlEvent();
                    break;
            }
        };
        NoticeUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        NoticeUIMoudle.prototype.clickUrlEvent = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                utils.NativeUtils.nativeCall(1 /* OPEN_URL */, this.targetUrl);
            }
            else if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                window.open(this.targetUrl);
            }
        };
        NoticeUIMoudle.prototype.initSelect = function (noticeId) {
            var i;
            for (i = 0; i < this.noticeArray.length; i++) {
                if (noticeId === this.noticeArray[i].noticeId) {
                    break;
                }
            }
            return i;
        };
        NoticeUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return NoticeUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    notice.NoticeUIMoudle = NoticeUIMoudle;
    __reflect(NoticeUIMoudle.prototype, "notice.NoticeUIMoudle");
})(notice || (notice = {}));
//# sourceMappingURL=NoticeUIMoudle.js.map