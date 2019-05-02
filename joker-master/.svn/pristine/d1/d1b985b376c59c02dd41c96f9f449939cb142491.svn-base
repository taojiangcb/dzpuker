/**
 * Created by taojiang on 16/3/10.
 */
module uicomps {
    export class AvatarImage extends gameabc.UICustomComponent {

        //borderImg:eui.Image;
        img:eui.Image;
        $source:any;
        $sFlag:Boolean = false;
        
        chrooseImg:eui.Image;
        
        chrooseBool:boolean =true

        constructor(){
            super();
            this.width = this.height = 88;
        }

        createChildren():void {
            super.createChildren();
//            this.borderImg = new eui.Image();
//            this.borderImg.source = "s9_bg_item_normal1_png";
//            this.addChild(this.borderImg);
//            this.borderImg.width = this.width;
//            this.borderImg.height = this.height;

            this.img = new eui.Image();
            this.img.left = 4;
            this.img.right = 4;
            this.img.bottom = 4;
            this.img.top = 4;
            this.img.source = "img_Default_Avatar_1_png";
            this.addChild(this.img);
            
            this.chrooseImg = new eui.Image();
            this.chrooseImg.left = 4;
            this.chrooseImg.right = 4;
            this.chrooseImg.bottom = 4;
            this.chrooseImg.top = 4;
            this.chrooseImg.source = "s9_bg_head_1_png";
            this.chrooseImg.visible = this.chrooseBool;
            this.chrooseImg.scale9Grid = new egret.Rectangle(4,4,2,2)
            this.addChild(this.chrooseImg);
        }
        chroose(val:boolean):void
        {
            if(this.chrooseBool == val)return;
            if(this.chrooseBool)
            {
                this.chrooseImg.source = "s9_bg_head_2_png";
            }else{
                this.chrooseImg.source = "s9_bg_head_1_png"; 
            }
            this.chrooseImg.visible = val;
            this.chrooseBool = val;
            this.invalidateProperties();
        }
        set source(val:any) {
            if(val == this.$source) return;
            this.$source = val;
            if(this.img) {
                this.img.source = val;
            }
            else {
                this.$sFlag = true
                this.invalidateProperties();
            }
        }

        get source():any {
            return this.$source;
        }
    }
}
