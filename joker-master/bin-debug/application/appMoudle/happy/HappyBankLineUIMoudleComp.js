var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var ROOM_TYPE;
    (function (ROOM_TYPE) {
        ROOM_TYPE[ROOM_TYPE["NULL"] = 0] = "NULL";
        ROOM_TYPE[ROOM_TYPE["HAPPY"] = 1] = "HAPPY";
        ROOM_TYPE[ROOM_TYPE["NORMAL"] = 2] = "NORMAL";
    })(ROOM_TYPE = happy.ROOM_TYPE || (happy.ROOM_TYPE = {}));
    var HappyBankLineUIMoudleComp = (function (_super) {
        __extends(HappyBankLineUIMoudleComp, _super);
        function HappyBankLineUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.type = ROOM_TYPE.NULL;
            _this.allType = [25, 50, 100, 500, 1000]; //x轴区间值
            _this.curType = 0;
            _this.skinName = "HappyBankLineUIMoudleSkin";
            return _this;
        }
        ; //我的初始值
        HappyBankLineUIMoudleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnClose);
            this.bindButton(this.addbtn);
            this.bindButton(this.reducebtn);
            this.lineshap = new egret.Shape();
            this.addChild(this.lineshap);
            this.lineshap.x = this.maingroup.x;
            this.lineshap.y = this.maingroup.y + 20;
            // var opendata = this.uiOpenData;
            // var frist:number = opendata[0];//初始筹码 
            // // var total:number = opendata[1];//总局数
            // var total: number = this.allType[this.curType];
            // var allnum: number[] = this.allnum = opendata[2];
            // var mm = this.getMinMax(allnum,frist);
            // this.drawLine(mm[0],mm[1],allnum,frist,total);
            this.changeType();
        };
        //获取最小最大值
        HappyBankLineUIMoudleComp.prototype.getMinMax = function (allnum, frist) {
            var min = 0;
            var max = 0;
            var len = allnum.length;
            for (var i = 0; i < len; i++) {
                if (allnum[i] < min || min == 0)
                    min = allnum[i];
                if (allnum[i] > max)
                    max = allnum[i];
            }
            if (max == 0)
                max = frist;
            // if (min == 0) min = max;
            var setp = (max - min) / 10;
            var yu;
            if (setp >= 100000)
                yu = 10000;
            else if (setp >= 10000)
                yu = 1000;
            else
                yu = 100;
            setp = Math.ceil(setp / yu) * yu;
            if (setp < 10000)
                setp = 10000;
            var mid = min + (max - min) / 2;
            max = Math.ceil(mid / yu) * yu + 5 * setp;
            min = max - 10 * setp;
            if (this.type == ROOM_TYPE.NORMAL) {
                for (var i = 0; i < this.fixNum.length; i++) {
                    if (this.fixNum[i] != 0) {
                        min = 0;
                        break;
                    }
                }
            }
            return [min, max];
        };
        HappyBankLineUIMoudleComp.prototype.drawLine = function (min, max, allnum, frist, total) {
            // var nowAllnum: number[];
            // if (total < allnum.length) nowAllnum = allnum.slice(allnum.length - total, allnum.length);
            // else nowAllnum = allnum;
            if (total < allnum.length) {
                allnum = allnum.slice(allnum.length - total, allnum.length);
                if (this.type == ROOM_TYPE.NORMAL && this.fixNum != [] && total < this.fixNum.length)
                    this.fixNum = this.fixNum.slice(this.fixNum.length - total, this.fixNum.length);
            }
            var graphics = this.lineshap.graphics;
            graphics.clear();
            this.maingroup.removeChildren();
            ////画坐标轴
            graphics.lineStyle(1, 0xb596d7);
            graphics.moveTo(80, 0);
            graphics.lineTo(80, 330);
            graphics.lineTo(830, 330);
            var value = (max - min) / 10;
            for (var i = 0; i < 11; i++) {
                graphics.moveTo(80, 30 * i);
                graphics.lineTo(90, 30 * i);
                var yLabel = new eui.Label(FormatUtils.wan((max - value * i)));
                yLabel.size = 15;
                yLabel.anchorOffsetX = yLabel.width;
                yLabel.x = 75;
                yLabel.y = 14 + 30 * i;
                this.maingroup.addChild(yLabel);
            }
            // var add: number = total - allnum.length+1;
            var add = total / 25;
            if (add < 1)
                add = 1;
            //横坐标
            for (var j = 0; j < 25; j++) {
                graphics.moveTo(110 + 30 * j, 330);
                graphics.lineTo(110 + 30 * j, 320);
                var xLabel = new eui.Label(((j + 1) * add).toString());
                xLabel.size = 15;
                xLabel.anchorOffsetX = xLabel.width / 2;
                xLabel.x = 110 + 30 * j;
                xLabel.y = 355;
                this.maingroup.addChild(xLabel);
            }
            //折线图
            graphics.lineStyle(2, 0xffffff);
            for (var k = add - 1; k < allnum.length; k += add) {
                if (this.type == ROOM_TYPE.NORMAL && this.fixNum != [] && this.fixNum[k] != 0) {
                    var yValue = (max - this.fixNum[k]) / value * 30;
                }
                else {
                    var yValue = (max - allnum[k]) / value * 30;
                }
                var point = [80 + 30 * (k + 1) / add, yValue];
                if (k == add - 1) {
                    graphics.moveTo(point[0], point[1]);
                }
                else {
                    graphics.lineTo(point[0], point[1]);
                }
                graphics.drawCircle(point[0], point[1], 1.5);
                graphics.moveTo(point[0], point[1]);
                if (this.type == ROOM_TYPE.NORMAL && this.fixNum != [] && this.fixNum[k] != 0) {
                    var yValue = (max - allnum[k]) / value * 30;
                    var point = [80 + 30 * (k + 1) / add, yValue];
                    graphics.drawCircle(point[0], point[1], 1.5);
                    graphics.moveTo(point[0], point[1]);
                    var lb = new eui.Label("带入" + FormatUtils.wan(allnum[k] - this.fixNum[k]));
                    lb.size = 15;
                    lb.textColor = 0xB596D7;
                    this.addChild(lb);
                    lb.x = point[0] + this.maingroup.x - lb.width / 2;
                    lb.y = point[1] + this.maingroup.y + 20 - lb.height;
                }
            }
            if (frist <= max && frist >= min) {
                this.myline.y = this.lineshap.y + (max - frist) / value * 30;
                this.myline.visible = true;
            }
            else
                this.myline.visible = false;
        };
        HappyBankLineUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            _super.prototype.touchBindButtonHandler.call(this, clickTarget);
            switch (clickTarget) {
                case this.btnClose:
                    this.close();
                    break;
                case this.reducebtn:
                    if (this.curType <= 0)
                        this.curType = 0;
                    else
                        this.curType--;
                    this.changeType();
                    break;
                case this.addbtn:
                    if (this.curType >= this.allType.length - 1)
                        this.curType = this.allType.length - 1;
                    else
                        this.curType++;
                    this.changeType();
                    break;
            }
        };
        HappyBankLineUIMoudleComp.prototype.changeType = function () {
            var total = this.allType[this.curType];
            var opendata = this.uiOpenData;
            var frist = opendata[0];
            var allnum = this.allnum = opendata[2];
            if (opendata[3])
                this.fixNum = opendata[3];
            else
                this.fixNum = [];
            if (opendata[4])
                this.type = opendata[4];
            var mm = this.getMinMax(allnum, frist);
            this.reducebtn.visible = this.type == ROOM_TYPE.NORMAL ? false : true;
            this.addbtn.visible = this.type == ROOM_TYPE.NORMAL ? false : true;
            this.drawLine(mm[0], mm[1], allnum, frist, total);
        };
        return HappyBankLineUIMoudleComp;
    }(app.base.BaseWndUIMoudleComponent));
    happy.HappyBankLineUIMoudleComp = HappyBankLineUIMoudleComp;
    __reflect(HappyBankLineUIMoudleComp.prototype, "happy.HappyBankLineUIMoudleComp");
})(happy || (happy = {}));
//# sourceMappingURL=HappyBankLineUIMoudleComp.js.map