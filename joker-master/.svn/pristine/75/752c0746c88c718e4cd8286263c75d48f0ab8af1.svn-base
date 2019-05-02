module record {
    /*** record单例
    * @author 
    *
    */
    export enum AnimalType{
        _ANIMAL_BIANSELONG = 0,     // 变色龙
        _ANIMAL_MIANYANG = 1,       // 绵羊
        _ANIMAL_FENGNIU = 2,        // 疯牛
        _ANIMAL_SHAYU = 3,          // 鲨鱼
        _ANIMAL_RUOJI = 4,          // 弱鸡
        _ANIMAL_SHUTA = 5,          // 树獭
        _ANIMAL_HONGYANYU = 6,      // 红眼鱼
        _ANIMAL_XIAOCHOUYU = 7      // 小丑鱼
    };

    export class RecordSingleObject{
        private static _single_instance = null;
        private _type_dic:any[]=[// 类型-风格
            ["变色龙","打牌风格飘忽不定，无法判断玩家类型","数据匹配类型未知"],
            ["绵羊","只会被动的跟注","入局率>75%","激进度<=1.2","摊牌率>45%"],
            ["疯牛","疯狂的玩家，热衷于诈唬，非常激进","入局率>75%","激进度>1.42","翻牌前加注率>45%"],
            ["鲨鱼","玩的很紧且具有一定的攻击性","入局率<=65%","激进度>1.42","翻牌前加注率>35%"],
            ["弱鸡","玩的很紧，较胆小，容易被诈唬吓跑的玩家","入局率<=65%","激进度<=1.42","翻牌前加注率<=35%"],
            ["树濑","非常紧且被动。你不会在这种对手身上得到太多行动","入局率<=65%","激进度<=1.42","翻牌前加注率>35%"],
            ["红眼兔","玩太多牌，而且容易高估自己的牌力","入局率>65%","激进度>1.42","翻牌前加注率<=35%"],
            ["小丑鱼","玩太多牌，而翻牌后打法又很被动","入局率>75%","激进度<=1.42","翻牌前加注率<=35%"]
        ];
        
        /**
         * 当前animaltype
         */
        private _current_type:AnimalType = 0; 

        

        /**
         * 获取一个单例对象
         * return:单例对象
         */
        public static _getSingle():record.RecordSingleObject{
            if(this._single_instance==null){
                this._single_instance = new this();
            }
            return this._single_instance;
        }


        /**
         * 数字转化成百分比（精确）
         * 计算激进度
         */
        public numberToPercentage(_molecule: number,fenm: number): number {
            if(_molecule==0) return 0;
            if(fenm==0) return 4;
            var retrunA: number = 0;
            var s: string = "";
            retrunA = _molecule / fenm + 1;
            s = retrunA.toFixed(2);
            if(s == "NaN" || s == "") {
                s = "0";
            }
            return Number(s) ;
        }
        /**
         * 数字转化成小数
         */
        public numberToEvent(_a:number,_b:number):number
        {
            var re = Math.ceil(_a / _b * 100);
            var s :string = re+"";
            if(s == "NaN" || s == "") {
                re = 0;
            }
            
            return re?re:0;
        }

        /**
         * 获取需计算的数据
         */
        private calulateUIData(data:Object):Object{
            var result = {};
            result["rjl"] = this.numberToEvent(data["joinHand"],data["totalHand"]);                  // 入局率
            result["pfr"] = this.numberToEvent(data["raiseWhenPreflop"],data["totalHand"]);          // 翻牌前加注
            result["af"] = (this.numberToPercentage(data["betOrRaiseTime"],data["callTime"]))
                            .toFixed(2);                                                             // 激进度
            result["zjz"] = this.numberToEvent(data["raiseTime"],data["totalHand"]);                 // 再加注
            result["tml"] = this.numberToEvent(data["tmHand"],data["totalHand"]);                    // 偷盲率
            result["cxxz"] = this.numberToEvent(data["continueBetTime"],data["betOrRaiseHand"]);     // 持续下注率
            result["wtsd"] = this.numberToEvent(data["spreadHand"],data["totalHand"]);               // 摊牌率
            var msyl = Math.ceil(data["winDivBB"]/data["totalHand"]);
            result["msyl"] = (msyl+"")=="NaN" || (msyl+"") ==""? 0 : msyl;                           // 每手盈利
            return result;
        }

        /**
         * 为数据中每条记录添加某个特定字符，加在结尾
         * @return : 新的data数组
         */
        public addStringOnLast(data:string[],shortStr:string):string[]{
            var result : string[] = [];
            for(var i = 0; i < data.length; i ++){
                result.push(data[i]+shortStr);
            }
            return result;
        }

        /**
         * 验证玩家数据是否异常
         * @return : 异常为false
         */
        public validateUserData(data:Object):any{
            var result= (data["raiseWhenPreflop"]!=undefined && data["totalHand"]!=undefined && data["betOrRaiseTime"]!=undefined &&
                     data["callTime"]!=undefined && data["raiseTime"]!=undefined && data["tmHand"]!=undefined && data["continueBetTime"]!=undefined &&
                      data["betOrRaiseHand"]!=undefined && data["spreadHand"]!=undefined && data["winDivBB"]!=undefined);
            return result;
        }

        /**
         * 获取风格相关描述
         * @param : 风格index
         */
        public getTypeDc(index:number):Array<string>{
            if(index >= this._type_dic.length) index = 0; // 如index范围异常则调整index值
            return this._type_dic[index];
        }

        /**
         * 获取打牌风格
         * @return : animaltype +'-' +description
         */
        public getTypeDesc(index:number):string{
            if(index >=this._type_dic.length) index = 0;
            return this._type_dic[index][0]+"-"+this._type_dic[index][1];
        }
        
        /**
         * 玩家记录计算规则
         * @param : vpip 入局率
         * @param : af 激进度
         * @param : wtsd 翻牌前加注
         * @param : pfr 摊牌率
         */
        public setAnimalTypeIndexByUserdata(vpip:number,af:number,wtsd:number,pfr:number)
        {
            try{
                if(vpip > 75 && af <= 1.2 && wtsd > 45) { 
                    this._current_type = AnimalType._ANIMAL_MIANYANG;   // 绵羊
                } else if(vpip > 75 && af > 1.42 && pfr > 45) {
                    this._current_type = AnimalType._ANIMAL_FENGNIU;    // 疯牛
                } else if(vpip <= 65 && af > 1.42 && pfr > 35) {
                    this._current_type = AnimalType._ANIMAL_SHAYU;      // 鲨鱼
                } else if(vpip <= 65 && af <= 1.42 && pfr <= 35) {
                    this._current_type = AnimalType._ANIMAL_RUOJI;      // 弱鸡
                } else if(vpip <= 65 && af <= 1.42 && pfr > 35) {
                    this._current_type = AnimalType._ANIMAL_SHUTA;      // 树濑
                } else if(vpip > 65 && af > 1.42 && pfr <= 35) {
                    this._current_type = AnimalType._ANIMAL_HONGYANYU;  // 红眼兔
                } else if(vpip > 75 && af <= 1.42 && pfr <= 35) {
                    this._current_type = AnimalType._ANIMAL_XIAOCHOUYU; // 小丑鱼
                } else {
                    this._current_type = AnimalType._ANIMAL_BIANSELONG; // 变色龙
                }
            }catch(e){
                this._current_type = AnimalType._ANIMAL_BIANSELONG;
            }
            // this._current_type = 2;
        }

        /**
         * 设置用户的风格-动物形象
         * @param : 风格
         */
        public setAnimalType(type:AnimalType){
            this._current_type = type;
        }

        /**
         * 获取当前user打牌风格类型
         */
        public getCurrentAnimalType():AnimalType{
            return this._current_type;
        }

        /**
         * 更新uidata
         * @param data : ui中recorddata
         * @return : 计算后的数据结果, 拼音:data
         */
        public _getNeedUpdateUIData(data:Object):Object{
            if(!this.validateUserData(data)) return {};
            var result = this.calulateUIData(data);
            return result;
        }

        /**
         * 新手行为分析保护，如是新手玩家则将其表现从弱鸡改为变色龙
         * @param 参与手数
         */
        public _protectNewPlayer(joinHand:number =0):void{
            if((joinHand<30 || win.getProxy().hand ==0) && 
				this.getCurrentAnimalType() == AnimalType._ANIMAL_RUOJI){ 
				// 如果是新手玩家且为弱鸡则显示表色龙
				this.setAnimalType(AnimalType._ANIMAL_BIANSELONG);
			}
        }
        
    }
}