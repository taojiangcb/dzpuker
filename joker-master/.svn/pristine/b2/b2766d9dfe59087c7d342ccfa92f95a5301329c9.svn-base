module cardMemory {
    export class CardMemoryCardItem extends eui.Image {
        public index: number;
        private isBack: Boolean = false;
        private tabel: CardMemoryUIMoudle;
        public constructor(index: number,tabel: CardMemoryUIMoudle) {
            super("card-1-" + index + "_png");
            this.index = index;
            this.tabel = tabel;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.onComplete,this);
        }
        onComplete(event: egret.Event): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.turnCard, this);
        }
        public turnCard(): void {
            if (!this.isBack || this.tabel.chooseCardNumber >= 2) return;
            this.isBack = false;
            this.tabel.chooseCardNumber++;
            egret.Tween.get(this).to({scaleX:0}, 200).call(function() {
                this.source = "card-1-" + this.index + "_png";
            }).to({ scaleX: 1 },200).wait(100).call(function() {
                this.tabel.chooseCard(this);
            });
        }
        
        public turnBack(): void {
            egret.Tween.get(this).to({ scaleX: 0 },200).call(function() {
                this.source = "card-1-0_png";
            }).to({ scaleX: 1 },200).call(function() {
                this.isBack = true;
            });
        }
        
    }
}