var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var localDB;
(function (localDB) {
    function InitMissionTemps(argList) {
        argList.push(new MissionTemplateVO(1, "", "2000房对局", "20", 1, 7, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(2, "", "2000房对局", "25", 1, 7, 2, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(3, "", "2000房对局", "40", 1, 7, 3, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(4, "", "1万房对局", "150", 1, 8, 1, 3, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(5, "", "1万房对局", "300", 1, 8, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(6, "", "1万房对局", "400", 1, 8, 3, 20, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(7, "", "4万房对局", "200", 1, 1, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(8, "", "4万房对局", "400", 1, 1, 2, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(9, "", "4万房对局", "500", 1, 1, 3, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(10, "", "40万房对局", "1000", 1, 2, 1, 3, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(11, "", "40万房对局", "3000", 1, 2, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(12, "", "40万房对局", "4000", 1, 2, 3, 20, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(13, "", "2000房打赏次数", "25", 1, 9, 1, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(14, "", "2000房打赏次数", "30", 1, 9, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(15, "", "2000房打赏次数", "60", 1, 9, 3, 15, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(16, "", "1万房打赏次数", "100", 1, 10, 1, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(17, "", "1万房打赏次数", "150", 1, 10, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(18, "", "1万房打赏次数", "300", 1, 10, 3, 15, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(19, "", "4万房打赏次数", "250", 1, 3, 1, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(20, "", "4万房打赏次数", "300", 1, 3, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(21, "", "4万房打赏次数", "600", 1, 3, 3, 15, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(22, "", "40万房打赏次数", "1250", 1, 4, 1, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(23, "", "40万房打赏次数", "1500", 1, 4, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(24, "", "40万房打赏次数", "3000", 1, 4, 3, 15, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(25, "", "2000房使用魔法表情", "25", 1, 11, 1, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(26, "", "2000房使用魔法表情", "30", 1, 11, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(27, "", "2000房使用魔法表情", "60", 1, 11, 3, 15, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(28, "", "1万房使用魔法表情", "100", 1, 12, 1, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(29, "", "1万房使用魔法表情", "150", 1, 12, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(30, "", "1万房使用魔法表情", "300", 1, 12, 3, 15, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(31, "", "4万房使用魔法表情", "250", 1, 5, 1, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(32, "", "4万房使用魔法表情", "300", 1, 5, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(33, "", "4万房使用魔法表情", "600", 1, 5, 3, 15, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(34, "", "40万房使用魔法表情", "1250", 1, 6, 1, 5, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(35, "", "40万房使用魔法表情", "1500", 1, 6, 2, 10, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(36, "", "40万房使用魔法表情", "3000", 1, 6, 3, 15, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(37, "", "sng一千房参赛2次", "200", 2, 7, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(38, "小试牛刀", "2连胜", "500", 2, 1, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(39, "初露锋芒", "5连胜", "500", 2, 1, 2, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(40, "攻无不克", "10连胜", "500", 2, 1, 3, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(41, "战无不胜", "20连胜", "500", 2, 1, 4, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(42, "allin首胜", "allin取得1次胜利", "500", 2, 2, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(43, "allin连胜", "allin取得10次胜利", "500", 2, 2, 2, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(44, "allin至尊", "allin取得20次胜利", "500", 2, 2, 3, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(45, "allin王者", "allin取得30次胜利", "500", 2, 2, 4, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(46, "白手起家", "资产达到10k", "500", 2, 3, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(47, "生财有道", "资产达到100k", "500", 2, 3, 2, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(48, "衣食无忧", "资产达到400k", "500", 2, 3, 3, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(49, "丰衣足食", "资产达到1M", "500", 2, 3, 4, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(50, "锦衣玉食", "资产达到10M", "500", 2, 3, 5, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(51, "家财万贯", "资产达到100M", "500", 2, 3, 6, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(52, "富可敌国", "资产达到1000M", "500", 2, 3, 7, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(53, "小露锋芒", "单局赢得10k", "500", 2, 4, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(54, "一展身手", "单局赢得100k", "500", 2, 4, 2, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(55, "英姿飒爽", "单局赢得300k", "500", 2, 4, 3, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(56, "所向披靡", "单局赢得1M", "500", 2, 4, 4, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(57, "过关斩将", "累计赢得5k", "500", 2, 5, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(58, "脱颖而出", "累计赢得10k", "500", 2, 5, 2, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(59, "屡战屡胜", "累计赢得100k", "500", 2, 5, 3, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(60, "名列前茅", "累计赢得1M", "500", 2, 5, 4, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(61, "技压群雄", "累计赢得10M", "500", 2, 5, 5, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(62, "遥遥领先", "累计赢得100M", "500", 2, 5, 6, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(63, "勇冠三军", "累计赢得1000M", "500", 2, 5, 7, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(64, "专心致志", "累计登陆7天", "500", 2, 6, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(65, "持之以恒", "累计登陆15天", "500", 2, 6, 2, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(66, "坚持不懈", "累计登陆30天", "500", 2, 6, 3, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(67, "始终如一", "累计登陆60天", "500", 2, 6, 4, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(68, "三条胜利", "三条初次胜利", "500", 2, 7, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(69, "顺子胜利", "顺子初次胜利", "500", 2, 8, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(70, "同花胜利", "同花初次胜利", "500", 2, 9, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(71, "葫芦胜利", "葫芦初次胜利", "500", 2, 10, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(72, "四条胜利", "四条初次胜利", "500", 2, 11, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(73, "同花顺胜", "同花顺初次胜利", "500", 2, 12, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(74, "皇家胜利", "皇家同花顺初次胜利", "500", 2, 13, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(75, "AA获胜", "AA获得胜利", "500", 2, 14, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(76, "AK获胜", "AK获得胜利", "500", 2, 15, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(77, "KK获胜", "KK获得胜利", "500", 2, 16, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(78, "QQ获胜", "QQ获得胜利", "500", 2, 17, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(79, "绝处逢生", "27获得胜利", "500", 2, 18, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(80, "AA输牌", "AA输牌", "500", 2, 19, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(81, "KK输牌", "KK输牌", "500", 2, 20, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(82, "QQ输牌", "QQ输牌", "500", 2, 21, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(83, "出手大方", "赠送荷官小费5次", "500", 2, 23, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(84, "时运不济", "连续输牌5次", "500", 2, 24, 1, 2, "icon_sign_box3", [], 0));
        argList.push(new MissionTemplateVO(85, "1", "1千房赛事门票", "0", 3, 1, 1, 1, "icon_sign_type_1", [3003, 2083, 2026], 0));
        argList.push(new MissionTemplateVO(86, "2", "6千奖金门票", "0", 3, 1, 2, 1, "icon_sign_type_5", [3006, 2030, 2030], 0));
        argList.push(new MissionTemplateVO(87, "3", "6千奖金门票", "0", 3, 1, 3, 1, "icon_sign_type_5", [3006, 2030, 2030], 0));
        argList.push(new MissionTemplateVO(88, "4", "1千房赛事门票", "0", 3, 1, 4, 1, "icon_sign_type_1", [3003, 2083, 2026], 0));
        argList.push(new MissionTemplateVO(89, "5", "6千奖金门票", "0", 3, 1, 5, 1, "icon_sign_type_5", [3006, 2030, 2030], 0));
        argList.push(new MissionTemplateVO(90, "6", "6千奖金门票", "0", 3, 1, 6, 1, "icon_sign_type_5", [3006, 2030, 2030], 0));
        argList.push(new MissionTemplateVO(91, "7", "6千奖金门票", "0", 3, 1, 7, 1, "icon_sign_type_5", [3006, 2030, 2030], 0));
        argList.push(new MissionTemplateVO(92, "3", "6千奖金门票", "0", 3, 2, 3, 1, "icon_sign_type_5", [3006, 2030, 2030], 0));
        argList.push(new MissionTemplateVO(93, "5", "6千奖金门票", "0", 3, 2, 5, 1, "icon_sign_type_5", [3006, 2030, 2030], 0));
        argList.push(new MissionTemplateVO(94, "7", "1千房赛事门票", "0", 3, 2, 7, 1, "icon_sign_type_1", [3003, 2083, 2026], 0));
        argList.push(new MissionTemplateVO(95, "", "摇钱树唯一任务", "5000", 4, 25, 1, 1, "icon_sign_box6", [], 0));
        argList.push(new MissionTemplateVO(96, "", "摇钱树每日任务1", "800", 4, 25, 2, 1, "icon_sign_box6", [], 0));
        argList.push(new MissionTemplateVO(97, "", "摇钱树每日任务2", "800", 4, 25, 3, 1, "icon_sign_box6", [], 0));
        argList.push(new MissionTemplateVO(98, "摇钱树任务3", "摇钱树每日任务3", "1000", 4, 25, 4, 1, "icon_sign_box6", [], 0));
        argList.push(new MissionTemplateVO(99, "", "免费房新手扶持基金", "1200", 5, 7, 1, 1, "icon_sign_box6", [], 0));
    }
    localDB.InitMissionTemps = InitMissionTemps;
    ;
    var MissionTemplateVO = (function () {
        function MissionTemplateVO(id, missionName, desc, reward, type, subType, level, total, imgName, itemId, weekDay) {
            this.id = 1; //序列
            this.missionName = ""; //任务名称
            this.descript = ""; //描述
            this.reward = ""; //显示的奖励
            this.type = 1; //任务类型
            this.subType = 1; //任务组id
            this.level = 1; //任务组子级id
            this.total = 1; //任务需要完成的次数
            this.imgName = ""; //显示的图片
            this.itemId = []; //奖励的道具id
            this.weekDay = 0; //周几
            this.id = id;
            this.missionName = missionName;
            this.descript = desc;
            this.reward = reward;
            this.type = type;
            this.subType = subType;
            this.level = level;
            this.total = total;
            this.imgName = imgName;
            this.itemId = itemId;
            this.weekDay = this.weekDay;
        }
        return MissionTemplateVO;
    }());
    localDB.MissionTemplateVO = MissionTemplateVO;
    __reflect(MissionTemplateVO.prototype, "localDB.MissionTemplateVO");
})(localDB || (localDB = {}));
//# sourceMappingURL=InitMissionLDB.js.map