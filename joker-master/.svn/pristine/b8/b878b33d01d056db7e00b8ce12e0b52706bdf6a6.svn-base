module localDB {
    export function InitPropTemps(argList:any[]):void {
            argList.push(new PropTemplateVO(1,[3003,2026,2026],1,"1千场门票","可用于参加SNG1千场比赛，1次消耗一张","icon_prop_type_2",0,0,0,0,true,true,0x49c9ff));
            argList.push(new PropTemplateVO(2,[3004,2027,2027],1,"5千场门票","可用于参加SNG5千场比赛，1次消耗一张","icon_prop_type_1",0,0,0,0,true,true,0x49c9ff));//0x96ff00
            argList.push(new PropTemplateVO(3,[3006,2030,2030],1,"6千奖金门票","用来作为参与6千奖金MTT赛事的资格凭证","icon_prop_type_5",0,0,0,0,true,false,0x49c9ff));
            argList.push(new PropTemplateVO(4,[3007,2031,2031],1,"兑换点券","可前往赛事兑换中心兑换话费等物品奖励","icon_prop_type_7",0,0,0,0,true,false,0x49c9ff));
            argList.push(new PropTemplateVO(5,[3008,2032,2032],1,"BPT决赛门票","用来作为参与浙牌汇线下决赛专场的资格凭证","icon_prop_type_6",0,0,0,0,false,false,0x49c9ff));
            argList.push(new PropTemplateVO(6,[2033,2033,2033],1,"浙牌汇门票","用来作为参与浙牌汇线上专场的资格凭证","icon_prop_type_4",0,0,0,0,true,false,0x49c9ff));
    };

    export class PropTemplateVO {
        id:number = 1;                  //本地序列
        svrId:number[] = [];            //服务器道具id [90,71,外网]
        type:number = 0;                //道具的类型   1:门票类型
        // idN:number = 1;
        num:number = 0;                 //拥有的数量
        name:string = "";               //道具名称
        descript:string = "";           //描述
        icon:string = "";               //图标
        year:number = 1;                //过期年
        month:number = 1;               //过期月
        day:number = 1;                 //过期日;
        timeEnd:number =0;              //过期时间（秒）
        nameColor:number = 0;
        btnShow: boolean;
        btnEnable: boolean;
        constructor(id:number,svrId:number[],type:number, name:string, desc:string,icon:string,year:number,month:number,day:number,timeEnd:number,btnShow:boolean=false,btnEnable:boolean=false,color:number=0x49c9ff) {
            this.id = id;
            this.svrId = svrId;
            this.type = type;
            this.name = name;
            this.descript = desc;
            this.icon = icon;
            this.year = year;
            this.month = month;
            this.day = day;
            this.timeEnd = timeEnd;
            this.nameColor = color;
            this.btnShow = btnShow;
            this.btnEnable = btnEnable;
        }
    }
} 