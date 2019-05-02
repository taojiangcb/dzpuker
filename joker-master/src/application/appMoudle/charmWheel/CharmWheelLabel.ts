module charmWheel {
    export class CharmWheelLabel extends eui.ItemRenderer {
        private label: eui.Label;
        public constructor() {
            super();
            this.skinName = "CharmWheelLabelSkin";
        }
        dataChanged() {
            if (!isNaN(this.data)) {
                this.label.textFlow = <Array<egret.ITextElement>>[
                {text: "恭喜", style: {"textColor": AppConst.TextColors.white}},
                {text: "您", style: {"textColor": AppConst.TextColors.yellow}},
                {text: "获得", style: {"textColor": AppConst.TextColors.white}},
                {text: getProxy().rewardList[this.data][2], style: {"textColor": AppConst.TextColors.yellow}}];
            } else {
                this.label.textFlow = <Array<egret.ITextElement>>[
                {text: "恭喜", style: {"textColor": AppConst.TextColors.white}},
                {text: this.data.name, style: {"textColor": AppConst.TextColors.yellow}},
                {text: "获得", style: {"textColor": AppConst.TextColors.white}},
                {text: getProxy().rewardList[this.data.item][2], style: {"textColor": AppConst.TextColors.yellow}}];
            }
        }
    }
}