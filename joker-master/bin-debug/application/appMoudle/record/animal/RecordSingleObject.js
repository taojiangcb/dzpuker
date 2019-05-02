var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var record;
(function (record) {
    /*** record单例
    * @author
    *
    */
    var AnimalType;
    (function (AnimalType) {
        AnimalType[AnimalType["_ANIMAL_BIANSELONG"] = 0] = "_ANIMAL_BIANSELONG";
        AnimalType[AnimalType["_ANIMAL_MIANYANG"] = 1] = "_ANIMAL_MIANYANG";
        AnimalType[AnimalType["_ANIMAL_FENGNIU"] = 2] = "_ANIMAL_FENGNIU";
        AnimalType[AnimalType["_ANIMAL_SHAYU"] = 3] = "_ANIMAL_SHAYU";
        AnimalType[AnimalType["_ANIMAL_RUOJI"] = 4] = "_ANIMAL_RUOJI";
        AnimalType[AnimalType["_ANIMAL_SHUTA"] = 5] = "_ANIMAL_SHUTA";
        AnimalType[AnimalType["_ANIMAL_HONGYANYU"] = 6] = "_ANIMAL_HONGYANYU";
        AnimalType[AnimalType["_ANIMAL_XIAOCHOUYU"] = 7] = "_ANIMAL_XIAOCHOUYU"; // 小丑鱼
    })(AnimalType = record.AnimalType || (record.AnimalType = {}));
    ;
    var RecordSingleObject = (function () {
        function RecordSingleObject() {
            this._type_dic = [
                ["变色龙", "打牌风格飘忽不定，无法判断玩家类型", "数据匹配类型未知"],
                ["绵羊", "只会被动的跟注", "入局率>75%", "激进度<=1.2", "摊牌率>45%"],
                ["疯牛", "疯狂的玩家，热衷于诈唬，非常激进", "入局率>75%", "激进度>1.42", "翻牌前加注率>45%"],
                ["鲨鱼", "玩的很紧且具有一定的攻击性", "入局率<=65%", "激进度>1.42", "翻牌前加注率>35%"],
                ["弱鸡", "玩的很紧，较胆小，容易被诈唬吓跑的玩家", "入局率<=65%", "激进度<=1.42", "翻牌前加注率<=35%"],
                ["树濑", "非常紧且被动。你不会在这种对手身上得到太多行动", "入局率<=65%", "激进度<=1.42", "翻牌前加注率>35%"],
                ["红眼兔", "玩太多牌，而且容易高估自己的牌力", "入局率>65%", "激进度>1.42", "翻牌前加注率<=35%"],
                ["小丑鱼", "玩太多牌，而翻牌后打法又很被动", "入局率>75%", "激进度<=1.42", "翻牌前加注率<=35%"]
            ];
            /**
             * 当前animaltype
             */
            this._current_type = 0;
        }
        /**
         * 获取一个单例对象
         * return:单例对象
         */
        RecordSingleObject._getSingle = function () {
            if (this._single_instance == null) {
                this._single_instance = new this();
            }
            return this._single_instance;
        };
        /**
         * 数字转化成百分比（精确）
         * 计算激进度
         */
        RecordSingleObject.prototype.numberToPercentage = function (_molecule, fenm) {
            if (_molecule == 0)
                return 0;
            if (fenm == 0)
                return 4;
            var retrunA = 0;
            var s = "";
            retrunA = _molecule / fenm + 1;
            s = retrunA.toFixed(2);
            if (s == "NaN" || s == "") {
                s = "0";
            }
            return Number(s);
        };
        /**
         * 数字转化成小数
         */
        RecordSingleObject.prototype.numberToEvent = function (_a, _b) {
            var re = Math.ceil(_a / _b * 100);
            var s = re + "";
            if (s == "NaN" || s == "") {
                re = 0;
            }
            return re ? re : 0;
        };
        /**
         * 获取需计算的数据
         */
        RecordSingleObject.prototype.calulateUIData = function (data) {
            var result = {};
            result["rjl"] = this.numberToEvent(data["joinHand"], data["totalHand"]); // 入局率
            result["pfr"] = this.numberToEvent(data["raiseWhenPreflop"], data["totalHand"]); // 翻牌前加注
            result["af"] = (this.numberToPercentage(data["betOrRaiseTime"], data["callTime"]))
                .toFixed(2); // 激进度
            result["zjz"] = this.numberToEvent(data["raiseTime"], data["totalHand"]); // 再加注
            result["tml"] = this.numberToEvent(data["tmHand"], data["totalHand"]); // 偷盲率
            result["cxxz"] = this.numberToEvent(data["continueBetTime"], data["betOrRaiseHand"]); // 持续下注率
            result["wtsd"] = this.numberToEvent(data["spreadHand"], data["totalHand"]); // 摊牌率
            var msyl = Math.ceil(data["winDivBB"] / data["totalHand"]);
            result["msyl"] = (msyl + "") == "NaN" || (msyl + "") == "" ? 0 : msyl; // 每手盈利
            return result;
        };
        /**
         * 为数据中每条记录添加某个特定字符，加在结尾
         * @return : 新的data数组
         */
        RecordSingleObject.prototype.addStringOnLast = function (data, shortStr) {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                result.push(data[i] + shortStr);
            }
            return result;
        };
        /**
         * 验证玩家数据是否异常
         * @return : 异常为false
         */
        RecordSingleObject.prototype.validateUserData = function (data) {
            var result = (data["raiseWhenPreflop"] != undefined && data["totalHand"] != undefined && data["betOrRaiseTime"] != undefined &&
                data["callTime"] != undefined && data["raiseTime"] != undefined && data["tmHand"] != undefined && data["continueBetTime"] != undefined &&
                data["betOrRaiseHand"] != undefined && data["spreadHand"] != undefined && data["winDivBB"] != undefined);
            return result;
        };
        /**
         * 获取风格相关描述
         * @param : 风格index
         */
        RecordSingleObject.prototype.getTypeDc = function (index) {
            if (index >= this._type_dic.length)
                index = 0; // 如index范围异常则调整index值
            return this._type_dic[index];
        };
        /**
         * 获取打牌风格
         * @return : animaltype +'-' +description
         */
        RecordSingleObject.prototype.getTypeDesc = function (index) {
            if (index >= this._type_dic.length)
                index = 0;
            return this._type_dic[index][0] + "-" + this._type_dic[index][1];
        };
        /**
         * 玩家记录计算规则
         * @param : vpip 入局率
         * @param : af 激进度
         * @param : wtsd 翻牌前加注
         * @param : pfr 摊牌率
         */
        RecordSingleObject.prototype.setAnimalTypeIndexByUserdata = function (vpip, af, wtsd, pfr) {
            try {
                if (vpip > 75 && af <= 1.2 && wtsd > 45) {
                    this._current_type = AnimalType._ANIMAL_MIANYANG; // 绵羊
                }
                else if (vpip > 75 && af > 1.42 && pfr > 45) {
                    this._current_type = AnimalType._ANIMAL_FENGNIU; // 疯牛
                }
                else if (vpip <= 65 && af > 1.42 && pfr > 35) {
                    this._current_type = AnimalType._ANIMAL_SHAYU; // 鲨鱼
                }
                else if (vpip <= 65 && af <= 1.42 && pfr <= 35) {
                    this._current_type = AnimalType._ANIMAL_RUOJI; // 弱鸡
                }
                else if (vpip <= 65 && af <= 1.42 && pfr > 35) {
                    this._current_type = AnimalType._ANIMAL_SHUTA; // 树濑
                }
                else if (vpip > 65 && af > 1.42 && pfr <= 35) {
                    this._current_type = AnimalType._ANIMAL_HONGYANYU; // 红眼兔
                }
                else if (vpip > 75 && af <= 1.42 && pfr <= 35) {
                    this._current_type = AnimalType._ANIMAL_XIAOCHOUYU; // 小丑鱼
                }
                else {
                    this._current_type = AnimalType._ANIMAL_BIANSELONG; // 变色龙
                }
            }
            catch (e) {
                this._current_type = AnimalType._ANIMAL_BIANSELONG;
            }
            // this._current_type = 2;
        };
        /**
         * 设置用户的风格-动物形象
         * @param : 风格
         */
        RecordSingleObject.prototype.setAnimalType = function (type) {
            this._current_type = type;
        };
        /**
         * 获取当前user打牌风格类型
         */
        RecordSingleObject.prototype.getCurrentAnimalType = function () {
            return this._current_type;
        };
        /**
         * 更新uidata
         * @param data : ui中recorddata
         * @return : 计算后的数据结果, 拼音:data
         */
        RecordSingleObject.prototype._getNeedUpdateUIData = function (data) {
            if (!this.validateUserData(data))
                return {};
            var result = this.calulateUIData(data);
            return result;
        };
        /**
         * 新手行为分析保护，如是新手玩家则将其表现从弱鸡改为变色龙
         * @param 参与手数
         */
        RecordSingleObject.prototype._protectNewPlayer = function (joinHand) {
            if (joinHand === void 0) { joinHand = 0; }
            if ((joinHand < 30 || win.getProxy().hand == 0) &&
                this.getCurrentAnimalType() == AnimalType._ANIMAL_RUOJI) {
                // 如果是新手玩家且为弱鸡则显示表色龙
                this.setAnimalType(AnimalType._ANIMAL_BIANSELONG);
            }
        };
        return RecordSingleObject;
    }());
    RecordSingleObject._single_instance = null;
    record.RecordSingleObject = RecordSingleObject;
    __reflect(RecordSingleObject.prototype, "record.RecordSingleObject");
})(record || (record = {}));
//# sourceMappingURL=RecordSingleObject.js.map