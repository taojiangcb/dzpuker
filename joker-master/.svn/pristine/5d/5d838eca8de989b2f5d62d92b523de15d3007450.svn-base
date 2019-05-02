module treasure {
    export class TreasureSubLabel extends eui.ItemRenderer {
        img: eui.Image;
        lb1: eui.Label;//名字
        lb2: eui.Label;//次数
        lb3: eui.Label;//概率
        lb4: eui.Label;//日期
        lb5: eui.Label;//时间
        public constructor() {
            super();
            this.skinName = "TreasureSubLabelSkin";
        }
        dataChanged() {
            this.lb1.text = this.data.userName;
            this.lb2.text = "参与" + this.data.buyNum + "次";
            this.lb3.text = "中奖概率:" + (this.data.buyNum / (this.data.totalNum * getProxy().rate) * 100).toFixed(0) + "%";
            this.lb4.text = DateUtils.dateFormat(new Date(this.data.createTime * 1000), "yyyy-M-d");
            this.lb5.text = DateUtils.dateFormat(new Date(this.data.createTime * 1000), "hh:mm:ss");
            this.img.source = this.data.faceid == ""? "img_Default_Avatar_png": "img_Default_Avatar_" + this.data.faceid + "_png";
        }
    }
}