module myInfo {
    /**
 *SNG
 * @author 
 *
 */
    export class MyInfoComp2 extends gameabc.UICustomComponent{
        
        public btn1:eui.ToggleButton;
        public btn2: eui.ToggleButton;
        private current:number =3
        
        private dan1:eui.Component;
        private dan2: eui.Component;
        private dan3: eui.Component;
        
        private currentCom: any;
        
        private roleVO: cyvos.PlayerInfo;
        private playVO: appvos.UserInfoVO;
        public constructor() {
            super();
            this.skinName = "MyInfoComp2Skin";
            this.currentCom = this.dan3;
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.btn1)
            this.bindButton(this.btn2)
        }
        /**
       * 设置数据
       * @param vo
       */
        public setData(vo: any = null,playVo:any=null): void {
            if(vo == null) vo = user.getProxy().svrPlayerInfo
                this.roleVO = vo;
            if(playVo)
            {
                this.playVO = playVo
            }
            this.current = 3;
            this.showDan1();
            this.showDan2();
            this.showDan3();
        }
         /**
       * 
       * 段位规则 总盈利 先注释
       */
        private showDan1():void
        {
           // this.dan1["prog1"].value = this.roleVO.master;
            this.dan1["prog1"].maximum = 3000;

        }
           /**
       * 
       * 得分记录
       */
        private showDan2(): void {
            
        }
             /**
       * 
       * 默认
       */
        private showDan3(): void {
          
            //this.dan3["lvImg"].source = "img_word_dan_type" + this.roleVO.masterLV+"_png";
            
            this.dan3["infoLable1"]["icon"].source = "img_word_info_dashifen_png";
            this.dan3["infoLable1"]["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO")//this.roleVO.master + "";
        }
        touchBindButtonHandler(evt: any): void {
            switch(evt.target) {
                case this.btn1:
                    if(this.btn1.selected)
                    {
                        this.current = 1;
                        this.btn2.selected =false;
                    }else{
                        this.current = 3;
                        this.btn2.selected = false;
                    }
                    this.choiceEvent();
                    break;
                case this.btn2:
                    if(this.btn2.selected) {
                        this.current = 2;
                        this.btn1.selected = false;
                    } else {
                        this.current = 3;
                        this.btn1.selected = false;
                    }
                    this.choiceEvent();
                    break; 
                    }
        }
        
        private choiceEvent():void
        {
            this.currentCom.visible =false;
            switch(this.current)
                {
                   case 1:
                    this.currentCom = this.dan1;
                   break;
                   
                   case 2:
                    this.currentCom = this.dan2;
                       break;
                       
                   case 3:
                    this.currentCom = this.dan3;
                       break;
                }
            this.currentCom.visible = true;
        }
    }
}

