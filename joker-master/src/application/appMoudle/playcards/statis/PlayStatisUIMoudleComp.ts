module playcards {
    /**
 *牌局统计
 * @author 
 *
 */
    export class PlayStatisUIMoudleComp extends app.base.BaseWndUIMoudleComponent {
        private btnList1: eui.List;  
        private btnList: eui.List; 
        private btnClose:eui.Label;
        private texVo: appvos.TexasTableVO;
        
        private roleVO:cyvos.PlayerInfo;
        
        private txtName:eui.Label;
        private label0:eui.Label;
        private label1:eui.Label;
        private label2: eui.Label;
        private label3: eui.Label;
        
        private myJoinVO:appvos.JoinPlayerVO;
        private totalAllBringBet:number =0;
        private topArr:appvos.JoinPlayerVO[];
        public constructor() {
            super()
            this.skinName = "PlayStatisUIMoudleCompSkin";
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            
            this.btnList1.itemRenderer = PlayStatisItemRenderer;
            
            this.btnList.itemRenderer = PlayStatisInfoItemRenderer;
            this.bindButton(this.btnClose)
                
        }
        public opening():void
        {
            this.topArr =[];
            this.totalAllBringBet =0;
            if(this.uiOpenData)
            {
                this.texVo = this.uiOpenData;
                this.roleVO = user.getPlayerInfo();
                this.handleData();
                this.txtName.text = this.roleVO.nickname;
                // this.label0.text = this.backStr(this.myJoinVO.nowBet,this.myJoinVO.totalBringBet) + '';
                this.label1.text = this.texVo.totalHand + "";
                this.label2.text = this.texVo.maxPot + "";
                this.label3.text = this.totalAllBringBet + "";


                var msgDatas1: eui.ArrayCollection = new eui.ArrayCollection(this.texVo.joinPlayerVO);
                this.btnList1.dataProvider = msgDatas1;

                var msgDatas: eui.ArrayCollection = new eui.ArrayCollection(this.topArr);
                this.btnList.dataProvider = msgDatas;
            }
           
        }
        private handleData():void
        {
            var len = this.texVo.joinPlayerVO.length
            for(var i:number =0;i<len;i++)
            {
                var info = this.texVo.joinPlayerVO[i]
                this.totalAllBringBet += info.totalBringBet;
                var mInfo = this.topArr[0];//MVP赢取最多
                var tInfo = this.topArr[1];//带入最多
                var yInfo = this.topArr[2];//输钱最多
                if(mInfo && this.backStr(mInfo.nowBet,mInfo.totalBringBet) < this.backStr(info.nowBet,info.totalBringBet))
                {
                    this.topArr[0] = info;
                } else if(mInfo==null){
                    this.topArr[0] = info;
                }
                
                if(tInfo && tInfo.totalBringBet < info.totalBringBet) {
                    this.topArr[1] = info;
                } else if(tInfo==null) {
                    this.topArr[1] = info;
                }
                if(yInfo && this.backStr(yInfo.nowBet,yInfo.totalBringBet) > this.backStr(info.nowBet,info.totalBringBet)) {
                    this.topArr[2] = info;
                } else if(yInfo==null){
                    this.topArr[2] = info;
                }
                if(info.roleId==this.roleVO.roleId)
                {
                    this.myJoinVO = info;
                }
            }
        }
        private backStr(a:number,b:number):number
        {
            var c:number  = (a-b)
            return c;
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.btnClose:
                this.close();
                    break;
                    }
        }
        public get featherSpace(): egret.DisplayObjectContainer {
            return AppRoot.gameLayer.effectLayer;
        }
        public dispose(): void {
            super.dispose();
        }
    }
}

