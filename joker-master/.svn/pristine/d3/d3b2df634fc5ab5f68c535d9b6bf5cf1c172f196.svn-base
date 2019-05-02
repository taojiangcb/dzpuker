module sng {

    /** 比赛玩家即时排名标签页用的 */
    export class SngPlayerRenderer extends uicomps.BaseItemCilckRenderer {

        rankLabel:eui.BitmapLabel; //排名
        rewardLabel:eui.BitmapLabel; //奖励
        nameLabel:eui.Label;
        idBgImage:eui.Image;

        constructor() {
            super();
            this.skinName = "SngPlayerInfoRendererSkin";
        }

        get playerVO():appvos.SeatPlayerVO {
            return <appvos.SeatPlayerVO> this.data;
        }

        get rankVO():appvos.MttRankVO {
            return <appvos.MttRankVO> this.data;
        }

        dataChanged(): void {

            if (this.data instanceof appvos.SeatPlayerVO) {
                this.rankLabel.text = String(this.itemIndex+1);
                this.nameLabel.text = String(this.playerVO.name);
                var bet = this.playerVO.nowBet+this.playerVO.totalBet;
                this.rewardLabel.text = bet<0?"0":FormatUtils.wan(bet);
                this.idBgImage.visible = this.itemIndex+1 <= 3; 

            } else if (this.data instanceof appvos.MttRankVO) {
                this.rankLabel.text = String(this.rankVO.rank);
                this.nameLabel.text = this.rankVO.playerName;
                this.rewardLabel.text = String(this.rankVO.bet);
                this.idBgImage.visible = this.rankVO.rank <= 3; 
            }

        }
    }
}