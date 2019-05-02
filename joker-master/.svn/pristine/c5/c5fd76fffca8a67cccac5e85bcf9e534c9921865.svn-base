module guichu {
    export class GuiChuTestComp extends gameabc.UICustomComponent {
        btn: eui.Button;
        et1: eui.EditableText;
        et2: eui.EditableText;
        et3: eui.EditableText;
        l1: eui.Label;
        l2: eui.Label;
        count: number = 0;
        // h1: number = 0;
        // h2: number = 0;
        // h3: number = 0;
        // h4: number = 0;
        // h5: number = 0;
        // h6: number = 0;
        // h7: number = 0;
        hs: number[] = [];
        constructor() {
            super();
            this.skinName = "GuiChuTestCompSkin";
        }
        createComplete(event: egret.Event) {
            super.createComplete(event);
            this.bindButton(this.btn);
        }
        touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.btn:
                    this.test();
                    break;
            }
        }
        test() {
            this.count = 0;
            // this.h1 = this.h2 = this.h3 = this.h4 = this.h5 = this.h6 = this.h7 = 0;
            this.hs = [0, 0, 0, 0, 0, 0, 0];
            var p1: number = parseInt(this.et1.text);
            var p2: number = parseInt(this.et2.text);
            var p3: number = parseInt(this.et3.text);
            if (this.checkValue(p1) && this.checkValue(p2) && this.checkValue(p3) && p1 <= 7) {
                __PVO().i(p1, p2).l(p3).to(app.NetAction.GUICHU_REQ_ANTE_TEST);
            } else {
                tip.popSysCenterTip("参数有问题");
            }
        }
        checkValue(data: any): boolean {
            return !isNaN(data) && data > 0;
        }
        result(data: any) {
            var v1: number = data[0];
            var v2: number = data[1];
            this.count += v2;
            this.hs[v1 - 1]++;
            this.l1.text = "开奖花色：[";
            for (var i = 0; i < this.hs.length; i++) {
                this.l1.text += this.hs[i];
                if (i != this.hs.length - 1) this.l1.text += ","
            }
            this.l1.text += "]"
            this.l2.text = "输赢值：" + this.count;
        }
    }
}