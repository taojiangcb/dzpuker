/**
 * Created by JiangTao on 2016/6/22.
 */

module mission {
    export class MissionVO {
        type:number = 0;                    //任务类型
        subtype:number = 0;                 //任务id
        level:number = 0;                   //当前任务的阶段id
        progress:number = 0;                //已完成的进度
        status:number = 0;                  //0进行中,1已完,2已岭取

        silver:number = 0;                  //银子
        itemId:number = 0;                  //奖励的道具id
        itemNum:number = 0;                 //道具数量

        time:number = 0;                    //任务领取生效时间
    }

    export enum MissionState {
        progress = 0,                       //进行中
        done = 1,                           //完成
        obtaining = 2                       //已领取
    }

    export enum MissionType {
        mission = 1,                        //任务
        achievement = 2,                    //成就
        day = 3,                            //签到
        godTree,                             //摇钱树
        free_broke                          //新手破产任务
    }


    export enum MissionSubType {
        day = 1,                            //签到
        day_accumulate = 2,                 //签到累积
        free_broke = 7,                     //金币房破产
        god_tree = 25                       //摇钱树唯一任务
    }
}