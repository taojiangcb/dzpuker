module happy {

	export class HappyRuleMoudle extends app.base.BaseSceneUIMoudleComponent {

        playRuleButton:eui.ToggleButton;
        payRuleButton:eui.ToggleButton;
        rewardRuleButton:eui.ToggleButton;
        tarbar:uicomps.ButtonGroup;

		payRuleGroup:eui.Group;
		playRuleGroup:eui.Group;
		playRewardGroup:eui.Group;

		label1:eui.Label;
		label2:eui.Label;
		label3:eui.Label;
		label4:eui.Label;

		public constructor() {
			super();
			this.horizontalCenter = 0;
			this.verticalCenter = 0;
			this.skinName = "HappyRuleSkin";
			this.tarbar = new uicomps.ButtonGroup();
		}

		createComplete(event: egret.Event):void {
			
			super.createComplete(event);
			this.tarbar.add(this.playRuleButton);
			this.tarbar.add(this.payRuleButton);
			this.tarbar.add(this.rewardRuleButton);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;


			var tabIndex = this.uiOpenData;
			var tabArr = [this.playRuleButton,this.rewardRuleButton,this.payRuleButton];
			this.tarbar.select(tabArr[tabIndex]);
			this.touchBindButtonHandler(tabArr[tabIndex]);


			var rule2 = gameabc.getMessage("HAPPY_RULE1",happy.getTableVO().servicePay*getProxy().addTimes);
			this.label1.text = rule2;
			this.label2.text = gameabc.getMessage("HAPPY_RULE2");

			this.label3.text = gameabc.getMessage("HAPPY_REWARD1");
			this.label4.text = gameabc.getMessage("HAPPY_REWARD2"); 
		}


		touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.playRuleButton:
					this.playRuleGroup.visible = true;
					this.playRewardGroup.visible = false;
					this.payRuleGroup.visible = false;
                    return;
				case this.rewardRuleButton:
					this.playRuleGroup.visible = false;
					this.playRewardGroup.visible = true;
					this.payRuleGroup.visible = false;
					return;
                case this.payRuleButton:
					this.playRuleGroup.visible = false;
					this.playRewardGroup.visible = false;
					this.payRuleGroup.visible = true;
                    return;
			}
		}
	}
}
