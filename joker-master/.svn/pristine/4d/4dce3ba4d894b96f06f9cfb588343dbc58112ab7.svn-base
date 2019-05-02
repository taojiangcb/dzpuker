module guichu {
    export class GuiChuSetComp extends gameabc.UICustomComponent {
        backImage: eui.Rect;
        viewGroup: eui.Group;
        tagGroup: eui.Group;
        yyButton: eui.ToggleButton;
        yxButton: eui.ToggleButton;
        public constructor() {
            super();
            this.right = 0;
            this.left = 0;
            this.top = 0;
            this.bottom = 0;
            this.skinName = "GuiChuSetCompSkin";
        }
        createComplete() {
            this.bindButton(this.backImage, false);
            this.yyButton.selected = setting.getProxy().getSettType(1) == 0? true : false;
            this.yxButton.selected = setting.getProxy().getSettType(3) == 0? true : false;
            this.yyButton.addEventListener(eui.UIEvent.CHANGE, this.onButtonChange, this);
            this.yxButton.addEventListener(eui.UIEvent.CHANGE, this.onButtonChange, this);
            this.viewGroup.x = 24;
            this.viewGroup.top = 50;
            this.viewGroup.mask = new egret.Rectangle(0,0,this.viewGroup.width,this.viewGroup.height);
            this.tagGroupMove();
        }
        tagGroupMove() {
            this.tagGroup.x = 0;
            this.tagGroup.y = -this.tagGroup.height;
            egret.Tween.get(this.tagGroup).to({y: 0}, 300, egret.Ease.sineIn);
        }
        onButtonChange(evt: eui.UIEvent) {
            var target = evt.target;
            switch (target) {
                case this.yyButton:
                    setting.getProxy().setType(this.yyButton.selected? 0 : 1, 1);
                    break;
                case this.yxButton:
                    setting.getProxy().setType(this.yxButton.selected? 0 : 1, 3);
                    break;
                default:
                    break;
            }
        }
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            this.removeFromParent();
            switch (clickTarget) {
                case this.backImage:
                    break;
                default:
                    break;
            }
        }
    }
}