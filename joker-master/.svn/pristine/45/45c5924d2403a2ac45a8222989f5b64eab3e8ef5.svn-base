module tip {
	   export class SystemTooltipUIComp extends gameabc.UICustomComponent {
        bgIcon:eui.Image;
        txtLabel:eui.Label;
        
        tipIcon:eui.Image;

        valStr:string = "";
        iconStr: string = "";
        changeFlag:boolean = false;

        constructor(){
            super();
            this.touchEnabled = false;
            this.touchChildren = false;
        }

        createChildren():void {
            super.createChildren();
            this.horizontalCenter = 0;
            //this.bottom = 30;

            this.bgIcon = new eui.Image();
            this.bgIcon.source ="s9_bg_play_fjzjdt_png"
            this.bgIcon.percentWidth = 100;
            this.bgIcon.percentHeight = 100;
            this.addChild(this.bgIcon);

            this.tipIcon = new eui.Image();
            this.tipIcon.width = this.tipIcon.height = 50;
            this.tipIcon.x = 40;
            this.addChild(this.tipIcon);
            
            this.txtLabel = new eui.Label();
            this.txtLabel.horizontalCenter = 0;
            this.txtLabel.verticalCenter = 0;
            this.txtLabel.textColor = 0xFFFFFF;
            this.txtLabel.size = 24;
            this.txtLabel.minWidth = 150;
            this.txtLabel.wordWrap = false;
            this.txtLabel.multiline = false;
            this.txtLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this.txtLabel);
        }

        commitProperties():void {
            super.commitProperties();
            if(this.changeFlag){
                this.changeFlag = false;
                this.txtLabel.text = this.valStr;
                var addW:number =40;
                var addH:number =10;
                if(this.iconStr)
                {
                    this.tipIcon.source = this.iconStr;  
                    addW = 150;
                }
                else
                {
                    addW = 10;
                    this.tipIcon.source =""
                }
                this.width = this.txtLabel.width + addW + 100;
                this.height = this.txtLabel.height + 10 + 30;
                this.tipIcon.y = (this.height - this.tipIcon.height) / 2;
            }
        }
        
        set text(val:string) {
            this.valStr = val;
            this.changeFlag = true;
            this.invalidateProperties();
        }

        get text():string {
            return this.valStr;
        }
    }
}