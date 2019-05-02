module record {
    /**
 *雷达图
 * @author 
 *
 */
    export class RecordRadarComp extends gameabc.UICustomComponent {

        private tabButton1: eui.ToggleButton;
        private tabButton2: eui.ToggleButton;
        private tabButton3: eui.ToggleButton;
        private tarbar: uicomps.ButtonGroup;
        private currentTab: number;
        private typeGroup: eui.Group;
        private currentDIs: any = null;

        private infoUI1: eui.Component;
        private infoUI2: eui.Component;
        private infoUI3: eui.Component;
        private infoUI4: eui.Component;
        private infoUI5: eui.Component;
        private infoUI6: eui.Component;

        private roleVO: appvos.UserInfoVO;
        
        
        //绘制层
        private shape: egret.Shape;
        private maxLen: number = 92;
        private gImg: eui.Group;
        public constructor() {
            super()

            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addedToStage,this);
            this.skinName = "resource/app_skin/record/RecordRadarCompSkin.exml";
            
            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.add(this.tabButton3);

            this.tabButton1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSelectTab,this);
            this.tabButton2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSelectTab,this);
            this.tabButton3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSelectTab,this);

        }
        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
           
        }
        public addedToStage(evt: egret.Event): void {
            this.roleVO = user.getProxy().playInfoVO;

            this.tarbar.select(this.getTabButton(3));
            this.setTab(3);

        }
        private onSelectTab(evt: egret.Event): void {
            this.setTab(this.getTabConstants(evt.target));

        }

        private getTabButton(tabConstants: number): eui.ToggleButton {
            switch(tabConstants) {
                case 1: return this.tabButton1;
                case 2: return this.tabButton2;
                case 3: return this.tabButton3;
                default: return null;
            }
        }

        private getTabConstants(tabButton: eui.ToggleButton) {
            switch(tabButton) {
                case this.tabButton1: return 1;
                case this.tabButton2: return 2;
                case this.tabButton3: return 3;
                default: return null;
            }
        }
        private setTab(tab: number): void {
            this.currentTab = tab;
            if(this.currentDIs) this.currentDIs.removeFromParent(true)
            switch(tab) {
                case 1:

                    break;

                case 2:

                    break;
            }

            this.showRadar()

        }
        public addParent(): void {


        }

        private info1: number = 0;
        private info2: number = 0;
        private info3: number = 0;
        private info4: number = 0;
        private info5: number = 0;
        private info6: number = 0;

        private showRadar(): void {
            this.infoUI1["icon"].source = "img_word_play_type_1_png";
            this.infoUI2["icon"].source = "img_word_play_type_2_png";
            this.infoUI3["icon"].source = "img_word_play_type_3_png";
            this.infoUI4["icon"].source = "img_word_play_type_4_png";
            this.infoUI5["icon"].source = "img_word_play_type_5_png";
            this.infoUI6["icon"].source = "img_word_play_type_6_png";
            this.info1 =0;
            this.info2 = 0;
            this.info3 = 0;
            this.info4 = 0;
            this.info5 = 0;
            this.info6 = 0;
            if(this.roleVO)
            {
                this.info1 = this.numberToEvent(this.roleVO.sbJoinHand,this.roleVO.sbHand);//小盲入局数/小盲局数
                this.info2 = this.numberToEvent(this.roleVO.bbJoinHand,this.roleVO.bbHand);//大盲入局数/大盲局数
                this.info3 = this.numberToEvent(this.roleVO.buttonJoinHand,this.roleVO.buttonHand);//庄家入局数/庄家局数
                this.info4 = this.numberToEvent(this.roleVO.spreadWinHand,this.roleVO.spreadHand);//摊牌胜利数/摊牌胜利局数
                
                //（总胜利数-摊牌胜利数）/（总局数-摊牌局数）
                this.info5 = this.numberToEvent(this.roleVO.winHand - this.roleVO.spreadWinHand,this.roleVO.totalHand - this.roleVO.spreadHand);
               
                //（总入局数-小盲入局- 大盲入局 -庄家入局）/（总局数-小盲局数-大盲局数-庄家局数）
                this.info6 = this.numberToEvent(this.roleVO.joinHand - this.roleVO.sbJoinHand - this.roleVO.bbJoinHand - this.roleVO.buttonJoinHand,
                    this.roleVO.totalHand - this.roleVO.sbHand - this.roleVO.bbHand - this.roleVO.buttonHand);
            }
           
            this.infoUI1["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info1);//
            this.infoUI2["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info2);//
            this.infoUI3["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info3);//
            this.infoUI4["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info4);//
            this.infoUI5["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info5);//
            this.infoUI6["numTxt"].text = utils.HtmlTextUtils.numToPercentage(this.info6);//
            if(this.gImg) this.gImg.removeChildren();
            this.shape = new egret.Shape();
            var cdContainer = new egret.DisplayObjectContainer();
            cdContainer.addChild(this.shape);
            this.gImg.addChild(cdContainer)
            this.shape.x = -100;
            this.shape.y = -103;
            this.shape.touchEnabled = false;
            
            this.shape.graphics.lineStyle(2,0xffffff);
            this.shape.graphics.beginFill(0x30d1ff,0.5);
            this.showMoveTO(this.info1);
            this.showLineTO(this.info2,1)
            this.showLineTO(this.info3,2)
            this.showLineTO(this.info4,3)
            this.showLineTO(this.info5,4)
            this.showLineTO(this.info6,5)
            this.showLineTO(this.info1,6)


        }
        /**
        * 
        * @param _molecule
        * @param fenm
        */
        public numberToEvent(_molecule: number,fenm: number): number {
            var a: number = _molecule / fenm
            if(_molecule == 0 || fenm == 0 || a < 0) {
                return 0.0;
            }
            return Number(a.toFixed(2));
        }
        private showLineTO(_a: number = 0.23,index: number = 1): void {
            var len = this.maxLen * _a
            var angle = index * 60 / 180 * Math.PI;
            if(index == 6) {
                this.shape.graphics.lineTo(Math.cos(0) * len + 100,Math.sin(0) * len + 100);
            } else {
                var tx = Math.cos(angle) * len + 100;
                var ty = Math.sin(angle) * len + 100;
                this.shape.graphics.lineTo(tx,ty);
            }

        }
        private showMoveTO(_a: number = 0.23): void {
            var len = this.maxLen * _a
            this.shape.graphics.moveTo(Math.cos(0) * len + 100,Math.sin(0) * len + 100);
        }
        public dispose(): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addedToStage,this);
            super.dispose();

        }
    }

}
