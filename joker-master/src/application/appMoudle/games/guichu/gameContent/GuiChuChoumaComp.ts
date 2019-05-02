module guichu {
    export class GuiChuChoumaComp extends egret.DisplayObjectContainer {
        private static cacheDict: Object = {};
        static produce(index: number): guichu.GuiChuChoumaComp {
            if (guichu.GuiChuChoumaComp.cacheDict[index] == null)
                guichu.GuiChuChoumaComp.cacheDict[index] = [];
            var dict: guichu.GuiChuChoumaComp[] = guichu.GuiChuChoumaComp.cacheDict[index];
            var chouma: guichu.GuiChuChoumaComp;
            if(dict.length > 0) chouma = dict.pop();
            else chouma = new guichu.GuiChuChoumaComp(index);
            return chouma;
        }
        static reclaim(chouma: guichu.GuiChuChoumaComp) {
            var index: string = chouma.name;
            if(guichu.GuiChuChoumaComp.cacheDict[index] == null)
                guichu.GuiChuChoumaComp.cacheDict[index] = [];
            var dict: guichu.GuiChuChoumaComp[] = guichu.GuiChuChoumaComp.cacheDict[index];
            if(dict.indexOf(chouma) == -1)
                dict.push(chouma);
        }
        image: eui.Image;
        point: egret.Point;
        constructor(index: number) {
            super();
            this.width = this.height = 32;
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
            this.touchEnabled = false;
            this.image = new eui.Image("guichu_icon_gold_png");
            // this.image.source = "guichu_icon_gold_png";//"guichu_icon_chouma_" + (index + 1) + "_png";
            this.image.x = this.image.y = 0;
            this.name = index.toString();
            this.addChild(this.image);
        }
        initPoint(index: number) {
            this.point = new egret.Point(Math.random() * -20 - 5, -Math.random() * 20 - 10);
            switch (index) {
                case 0:
                    this.point.x = this.point.x * -0.8;
                    break;
                case 1:
                    this.point.x = this.point.x * 0.5
                    break;
                case 4:
                case 5:
                case 6:
                    this.point.x = this.point.x * 1.5;
                    break;
            }
        }
        rePosition() {
            this.image.x = this.image.y = 0;
        }
        public get factor(): number {
            return 0;
        }
        public set factor(value: number) {
            this.image.x = 2*value*(1-value)*this.point.x+value*value*this.point.x*2;
            this.image.y = 2*value*(1-value)*this.point.y;
        }
    }
}