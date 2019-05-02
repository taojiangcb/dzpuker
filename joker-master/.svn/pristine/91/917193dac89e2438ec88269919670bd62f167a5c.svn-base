module treasure {
    export function getProxy(): TreasureProxy {
        return __GET_PROXY(TreasureProxy);
    }
    export class TreasureProxy extends app.mvc.AbsractProxy {
        static NAME:string = "TreasureProxy";
        rate: number = 1.1;
        silver: number;
        progressiveData: any[] = [
            ["5000", "icon_shop_box4_png", mc2sdk.EVENT_TYPE.TREASURE_5K],//标题 图标
            ["2万", "icon_shop_box5_png", mc2sdk.EVENT_TYPE.TREASURE_2W],
            ["5万", "icon_shop_box6_png", mc2sdk.EVENT_TYPE.TREASURE_5W],
            ["10万", "icon_shop_box1_png", mc2sdk.EVENT_TYPE.TREASURE_10W],
            ["50万", "icon_shop_box2_png", mc2sdk.EVENT_TYPE.TREASURE_50W],
            ["100万", "icon_shop_box3_png", mc2sdk.EVENT_TYPE.TREASURE_100W]
        ];

        constructor(name?: string, data?: any) {
            super(TreasureProxy.NAME, data);
        }

        testData1(): any {
            var data: any[] = [{
                id: 0,
                userId: 714,
                userName: "714",
                faceid: "",
                buyNum: 1000,
                totalNum: 5000,
                openTime: 0,
                count: 714,
                state: 1,
                createTime: 0,
                iconId: 0,
                roomType: 0,
                treasrueDBId: 0,
                title: "",
            }];
            return data;
        }
    }
}