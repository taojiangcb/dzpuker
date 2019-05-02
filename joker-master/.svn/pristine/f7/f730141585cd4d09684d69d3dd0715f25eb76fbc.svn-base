module app.debug {
    
    export class DebugView extends app.base.BaseUIMoudleComponent {
        
        outputLabel:eui.Label;
        outputRect:eui.Rect;
        
        constructor() {
            super();
            this.skinName = "DebugSkin";
            this.registerMediator(DebugMediator);
            this.bindButton(this,false);
            this.touchChildren = false;
        }
        
         touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
             if(this.outputLabel.x == 0) {
                 this.outputRect.left = this.outputLabel.left = undefined;
                 this.outputRect.right = this.outputLabel.right = 0;
             } else {
                 this.outputRect.right = this.outputLabel.right = undefined;
                 this.outputRect.left = this.outputLabel.left = 0;
             }
         }
        
        
        
        

        
	}
    
}
