module sng {

    /** 比赛盲注标签页用的 */
    export class SngBlindsRenderer extends uicomps.BaseItemCilckRenderer {

        levelLabel:eui.Label; //排名
        blindsLabel:eui.Label; //奖励
        antiLabel:eui.Label; //大师分
        timeLabel:eui.Label;

        
        //比赛信息界面，奖励条款
        constructor() {
            super();
            this.skinName = "SngBlindsRendererSkin";
        }

        get blindsVO():appvos.MatchBlindsVO {
            return <appvos.MatchBlindsVO> this.data;
        }

        dataChanged(): void {
            this.levelLabel.text = String(this.blindsVO.level);
            this.blindsLabel.text = this.blindsVO.smallBlinds+"/"+this.blindsVO.bigBlinds;
            this.antiLabel.text = String(this.blindsVO.antiBlinds);
            this.timeLabel.text = String(this.blindsVO.time)+"秒";
            
            var matchVO = match.getProxy().currentMatchVO;
            if(matchVO!=null && matchVO.blindsIndex + 1 == this.blindsVO.level) {
                this.levelLabel.textColor = 0xFF7500;
                this.blindsLabel.textColor = 0xFF7500;
                this.antiLabel.textColor = 0xFF7500;
                this.timeLabel.textColor = 0xFF7500;
            } else {
                this.levelLabel.textColor = 0xFFFFFF;
                this.blindsLabel.textColor = 0xFFFFFF;
                this.antiLabel.textColor = 0xFFFFFF;
                this.timeLabel.textColor = 0xFFFFFF;
            }
        }
    }
}