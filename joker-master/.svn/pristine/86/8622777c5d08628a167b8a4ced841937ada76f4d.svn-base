module smallGame {

	export class ClearCardItem extends playcards.CardItem {

        flip(cardId:number):void {
            this.hideLight();
            this.setBackId(cardId);
            this.turnOver();
        }

        tweenToCard(cardId:number):void {
            this.stopHint();
            egret.Tween.get(this.cardImg).to({alpha:0},200,egret.Ease.sineOut);
            egret.setTimeout(this.setCardId,this,210,cardId);
        }

        setCardId(id:number):void {
            id==-1 ? this.setCardBack() : super.setCardId(id);
            this.displayCard();
        }

        displayCard():void {
            if (this.cardImg.alpha!=1) {
                egret.Tween.get(this.cardImg).to({alpha:1},500,egret.Ease.sineOut);
            }
        }

        hintId:number = -1;
        startHint():void {
            egret.Tween.get(this.cardImg).to({alpha:0},300,egret.Ease.sineOut);
            egret.setTimeout(this.displayCard,this,310);
            this.hintId = egret.setTimeout(this.startHint,this,820);
        }

        stopHint():void {
            egret.Tween.removeTweens(this.cardImg);
            if (this.hintId != -1) {
                egret.clearTimeout(this.hintId);
                this.hintId = -1;
            }
        }


    }
}