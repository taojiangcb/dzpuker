module sng {

	export class SngStateMoudle extends app.base.BaseWndUIMoudleComponent {

        closeButton:eui.Image;

        tabButton1:eui.ToggleButton;
        tabButton2:eui.ToggleButton;
        tabButton3:eui.ToggleButton;

        infoList:eui.List;

        blindsGroup:eui.Group;
        rankGroup:eui.Group;
        rewardGroup:eui.Group;

        constructor() {
            super();
            this.skinName = "SngMatchStateSkin";

            this.bindTabButton(this.tabButton1,this.tabButton3);
            this.selectTabButton(0);
        }


        createComplete(): void {
            super.createComplete(null);
            this.bindButton(this.closeButton);
        }


        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
            	case this.closeButton:
                    this.close();
                    return;
                case this.tabButton1: //排名
                    if (playcards.getTableVO()==null) {
                        this.infoList.visible = false;
                    } else {
                        var players = playcards.getTableVO().seatPlayerVO.concat();
                        players.sort(this.playersSort);
                        this.infoList.dataProvider = new eui.ArrayCollection(players);
                        this.infoList.itemRenderer = SngPlayerRenderer;
                    }
                    this.blindsGroup.visible = false;
                    this.rankGroup.visible = true;
                    this.rewardGroup.visible = false;
                    return;
                case this.tabButton2: //赛事状态
                    this.infoList.dataProvider = new eui.ArrayCollection(match.getProxy().sngList[0].rewards);
                    this.infoList.itemRenderer = SngRankRenderer;
                    this.infoList.visible = true;
                    this.blindsGroup.visible = false;
                    this.rankGroup.visible = false;
                    this.rewardGroup.visible = true;
                    return;
                case this.tabButton3: //奖励设置
                    this.infoList.dataProvider = new eui.ArrayCollection(match.getProxy().sngList[0].blinds);
                    this.infoList.itemRenderer = SngBlindsRenderer;
                    this.infoList.visible = true;
                    this.blindsGroup.visible = true;
                    this.rankGroup.visible = false;
                    this.rewardGroup.visible = false;
                    return;
            }
        }

        playersSort(a:appvos.SeatPlayerVO, b:appvos.SeatPlayerVO):number {
            return a.nowBet < b.nowBet ? 1 : -1;
        }

    }


}