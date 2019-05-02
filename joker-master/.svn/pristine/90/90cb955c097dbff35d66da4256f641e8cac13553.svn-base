module sng {


    /** 比赛奖励标签页用的 */
    export class SngRankRenderer extends uicomps.BaseItemCilckRenderer {

        rankLabel:eui.BitmapLabel; //排名
        rewardLabel:eui.BitmapLabel; //奖励
        scoreLabel:eui.BitmapLabel; //大师分
        idBgImage:eui.Image;
        iconImage:eui.Image;

        constructor() {
            super();
            this.skinName = "SngRankRendererSkin";
            this.scoreLabel.visible = false;
        }

        get rewardVO():appvos.MatchRewardVO {
            return <appvos.MatchRewardVO> this.data;
        }

        dataChanged(): void {
            this.rankLabel.text = String(this.rewardVO.rank);
            this.scoreLabel.text = String(this.rewardVO.score);
            this.idBgImage.visible = this.rewardVO.rank <= 3;
            if (this.rewardVO.propId != 0 && this.rewardVO.propNum!= 0) {
                //如果有道具就是红包，其他道具当前版本不会出现，出现时要修改道具系统
                this.iconImage.source = "icon_hongbao_mtt_png";
                this.rewardLabel.text = String(this.rewardVO.propNum);
            } else {
                this.iconImage.source = "icon_caoma_png";
                this.rewardLabel.text = String(this.rewardVO.coin);
            }
        }
    }
}