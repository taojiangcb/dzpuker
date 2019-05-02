module record {
    /**
 *专业分析
 * @author 
 *
 */
    export class RecordMajorComp extends gameabc.UICustomComponent {
        private roleVO: appvos.UserInfoVO; // user信息
        
        private majorInfoUI: RecordMajorICompInfo;
        private vpip: number = 0;   // 入局率
        private pfr: number = 0;    // 翻牌前加注
        private af: number = 0;     // 激进度
        private b3: number = 0;     // 再加注
        private stl: number = 0;    // 偷盲率
        private cd: number = 0;     // 持续下注率
        private wtsd: number = 0;   // 摊牌率
        private bs: number = 0;     // 每手盈利
        private _data_array:any[];  // 存放内部数据对象
        private txtType:eui.Label;
        private txtTs: eui.Label;
        private txtData: eui.Label;
        btnTerm:eui.Group;

        /** left:打牌风格 */
        private _comp_animalDesc:RecordAnimalDescComp;
        
        public constructor() {
            super();
            this.init();
        }

        // 初始化
        private init():void{
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addedToStage,this);
            this.skinName = "resource/app_skin/record/RecordMajorCompSkin.exml";
        }

        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            this.bindButton(this.btnTerm,true);  // 绑定button
        }


        public addedToStage(evt: egret.Event): void {
             this.roleVO = user.getProxy().playInfoVO; 
             if(this.roleVO && RecordSingleObject._getSingle().validateUserData(this.roleVO)){
                this.updateUIData(); // 更新ui数据
                this.tipsEvent();
            }
            
        }

        // /**
        //  * 获取内部数据
        //  */
        // public _getInsideUiData():any[]{
        //     this._data_array =  [this.vpip,this.pfr,this.af,this.b3,this.stl,this.cd,this.wtsd,this.bs];
        //     return this._data_array;
        // }

        
        
        // 刷新ui数据
        private refreshUIData():void{
            this.majorInfoUI.txtVpip.text = this.vpip+"%";
            this.majorInfoUI.txtPer.text = this.pfr+"%";
            this.majorInfoUI.txtAf.text = this.af+"";
            this.majorInfoUI.txt3b.text = this.b3+"%";
            this.majorInfoUI.txtStl.text = this.stl+"%";
            this.majorInfoUI.txtCd.text = this.cd+"%";
            this.majorInfoUI.txtWtsd.text = this.wtsd+"%";
            this.majorInfoUI.txtBs.text = this.bs+""; 
        }
        
        /**
         * 更新存储的玩家信息,更新完成后会自动调用更新UI的方法
         */
        public _updatePlayerInfo():void{
            this.roleVO = user.getProxy().playInfoVO; 
            if(!this.roleVO) return;
            this.updateUIData();
        }

        /**
         * 更新ui中数据
         */
        public updateUIData():void{
            var dataObj = RecordSingleObject._getSingle()._getNeedUpdateUIData(this.roleVO);
            this.vpip = dataObj["rjl"]?dataObj["rjl"]:0;     // 入局率
            this.pfr = dataObj["pfr"]?dataObj["pfr"]:0;      // 翻牌前加注
            this.af = dataObj["af"]?dataObj["af"]:0;         // 激进度
            this.b3 = dataObj["zjz"]?dataObj["zjz"]:0;       // 再加注
            this.stl = dataObj["tml"]?dataObj["tml"]:0;      // 偷盲率
            this.cd = dataObj["cxxz"]?dataObj["cxxz"]:0;     // 持续下注率
            this.wtsd = dataObj["wtsd"]?dataObj["wtsd"]:0;   // 摊牌率
            this.bs = dataObj["msyl"]?dataObj["msyl"]:0;     // 每手盈利
            this.refreshUIData();
        }

        // 玩家记录计算规则
        private tipsEvent():void
        {
            // 设置单例中user type
            RecordSingleObject._getSingle().setAnimalTypeIndexByUserdata(this.vpip,this.af,this.wtsd,this.pfr);
            // 更新animal描述数据
            this._comp_animalDesc.updateAnimalDescUi(RecordSingleObject._getSingle().getCurrentAnimalType());
        }


        // 点击事件
        touchBindButtonHandler(evt:any):void
        {
            switch (evt) {
                case this.btnTerm:
                    var obj ={
                        vpip:this.vpip,
                         pfr:this.pfr,
                         af:this.af,
                         b3:this.b3,
                         stl:this.stl,
                         cd:this.cd,
                         wtsd:this.wtsd,
                         bs:this.bs,
                    };
                    __OPEN_PRE_MOUDLE(AppReg.APP_RECORD_INFO,obj);
                    
                    // __OPEN_PRE_MOUDLE(AppReg.APP_RECORD_ANALYSIS);
                    
                    // 跳转到战绩专业术语模块
                    break;
                default:
                    break;
            }
        }
        
        public dispose(): void {
            super.dispose();
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addedToStage,this);
            this.unbindButton(this.btnTerm);
        }

        
       
    }
}

