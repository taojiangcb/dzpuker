/**
 * Created by JiangTao on 2016/6/22.
 */
module mission {

    export function getProxy():MissionProxy {
        return __GET_PROXY(MissionProxy);
    }

    export function getMissionsByType(type:number):mission.MissionVO[] {
        return getProxy().getMissionsByType(type);
    }

    export function getMissionTemplate(type:number,subType:number,level:number):localDB.MissionTemplateVO {
        return getProxy().getMissionTemplate(type,subType,level);
    }

    export class MissionProxy extends app.mvc.AbsractProxy {

        static NAME:string = "__MISSION_PROXY__";
        //任务本地模板数据信息
        templates:localDB.MissionTemplateVO[] = [];
        //任务实列数据列表
        missionDatas:mission.MissionVO[] = [];

        constructor(){
            super(MissionProxy.NAME);
            localDB.InitMissionTemps(this.templates);
        }

        /**
         * 根据任务类型获取任务相关的数据
         * @param type
         * @param subType
         * @param level
         * @returns {any}
         */
        getMissionTemplate(type:number,subType:number,level:number):localDB.MissionTemplateVO {
            var len:number = this.templates.length;
            while(--len > -1) {
                var tempData = this.templates[len];
                if(tempData.type == type && tempData.subType == subType && tempData.level == level) {
                    return tempData;
                }
            }
            return null;
        }

        /**
         * 获取任务列表模板
         * @param type
         * @param subType
         * @returns {localDB.MissionTemplateVO[]}
         */
        getMissionTemplates(type:number,subType:number):localDB.MissionTemplateVO[] {
            var res:localDB.MissionTemplateVO[] = [];
            var len:number = this.templates.length;
            while(--len > -1) {
                var tempData = this.templates[len];
                if(tempData.type == type && tempData.subType == subType) {
                    res.push(tempData);
                }
            }
            return res;
        }

        getServerList(gameId:number = AppConst.GAME_ID):void {
            __SEND_NOTIFICATION(app.NetAction.REQ_DI_BAO, [3000,gameId]);
        }

        /**
         * @param day           今天签到第几天
         * @returns {any}
         */
        //getMissionTemplateByDay(day:number):localDB.MissionTemplateVO {
        //    var len:number = this.templates.length;
        //    while(--len > -1) {
        //        if(this.templates[len].level == day) return this.templates[len];
        //    }
        //    return null;
        //}

        /**
         * 获取任务实例数据
         * @param type
         * @param subType
         * @param level
         * @returns {MissionVO}
         */
        getMissionInfo(type:number,subType:number,level:number):mission.MissionVO {
            var len:number = this.missionDatas.length;
            while(--len > -1) {
                var info:MissionVO = this.missionDatas[len];
                if(info.type == type && info.subtype == subType && info.level == level) {
                    return info;
                }
            }
        }

        /**
         *
         * @param info
         * @returns {localDB.MissionTemplateVO}
         */
        getMissionTemplateByInfo(info:MissionVO):localDB.MissionTemplateVO {
            return this.getMissionTemplate(info.type,info.subtype,info.level);
        }

        /**
         *
         * @param type
         * @param subType
         * @returns {mission.MissionVO[]}
         */
        getclvMissionInfos(type:number,subType:number):mission.MissionVO[] {
            var s:mission.MissionVO[] = [];
            var len:number = this.missionDatas.length;
            while(--len > -1) {
                var info:MissionVO = this.missionDatas[len];
                if(info.type == type && info.subtype == subType) {
                    s.push(info);
                }
            }
            return s.sort(this.stateSort);
        }

        /**是否没有签到 */
        isNotSign():boolean {
            var signDatas:mission.MissionVO[] = this.getMissionsByType(mission.MissionType.day);
            var len:number = signDatas.length;
            while(--len > -1) {
                if(signDatas[len].status == mission.MissionState.done) return true;
            }
            return false;
        }

        /**
         * 更新或者升级或者添加一条任务数据信息
         * 升级是指当前阶段已完成进入下个阶段。
         * @param missionInfo
         */
        updateOrPutMission(missionInfo:mission.MissionVO):void {
            var oldInfo:mission.MissionVO = null;
            var clvInfos:mission.MissionVO[] = this.getclvMissionInfos(missionInfo.type,missionInfo.subtype);
            if(clvInfos.length > 0) {
                oldInfo = clvInfos[0];
            }
            var updateFalg:boolean = false;
            //某条任务更新
            if(oldInfo) {
                if(oldInfo.status != missionInfo.status) updateFalg = true;
                if(oldInfo.progress != missionInfo.progress) updateFalg = true;

                oldInfo.status = missionInfo.status;
                oldInfo.progress = missionInfo.progress;

                oldInfo.silver = missionInfo.silver;
                oldInfo.itemId = missionInfo.itemId;
                oldInfo.itemNum = missionInfo.itemNum;
                oldInfo.time = missionInfo.time;

                var updateChange:boolean = false;

                //更新任务状态
                if(updateFalg) {
                    __SEND_NOTIFICATION(MissionMediator.UPDATE_MISSION,oldInfo);
                    updateChange = true;
                }

                //显示领奖
                if(missionInfo.silver > 0 || missionInfo.itemId > 0) {
                    if (__GET_MOUDLE(AppReg.GREEN_HANDLER) == null) __SEND_NOTIFICATION(award.AwardMediator.REWARD_MISSION,oldInfo);
                    updateChange = true;

                    if(missionInfo.itemId > 0) {
                        item.getProxy().getItemDate();
                    }
                }

                 //某条任务进入下阶段
                if(oldInfo.level != missionInfo.level) {
                    oldInfo.level = missionInfo.level;
                    oldInfo.itemId = missionInfo.itemId;
                    __SEND_NOTIFICATION(MissionMediator.MISSION_LEVEL_UP,oldInfo);
                    updateChange = true;
                }

                /**
                 * 如果什么都没有那就刷新界面
                 */
                if(!updateChange) {
                    __SEND_NOTIFICATION(MissionMediator.UPDATE_MISSION_DAY_UI);
                }
            }
            else {
                //添加某条新任务
                if(clvInfos.length == 0) {
                    this.missionDatas.push(missionInfo);
                    __SEND_NOTIFICATION(MissionMediator.ADD_MISSION,missionInfo);
                }
            }
        }

        /**
         * 根据类型获取任务列表并且会按任务当前的状态进行排序
         * @param type
         * @returns {MissionVO[]}
         */
        getMissionsByType(type:number):MissionVO[] {
            var list:MissionVO[] = [];
            var len:number = this.missionDatas.length;
            for(var i:number = 0; i != len; i++) {
                if(this.missionDatas[i].type == type) {
                    list.push(this.missionDatas[i]);
                }
            }
            return list.sort(this.stateSort);
        }

        /**
         * 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
         * 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
         * 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
         */
        stateSort(a:MissionVO,b:MissionVO):number {
            if(a.status == MissionState.done) return -1;
            else if(b.status == MissionState.done) return 1;
            if(a.status == MissionState.obtaining && b.status !=  MissionState.obtaining) return 1;
            else if(a.status != MissionState.obtaining && b.status == MissionState.obtaining) return -1;
            return 0;
        }

        /**
         * 请求领取奖励
         * @param val
         */
        getAward(val:MissionVO,gameId:number = AppConst.GAME_ID):void {
            var cmd_str:string = gameabc.StringUtils.formatString("3{0}{1}",val.type,val.subtype < 10 ? "0" + val.subtype : val.subtype );
            __SEND_NOTIFICATION(app.NetAction.REQ_DI_BAO,[Number(cmd_str),gameId]);
        }

        /**
         * 获取当前已经完成的任务数量
         * @param type
         * @returns {number}
         */
        getDoneCount(type?:number):number{
            var datas:mission.MissionVO[] = type > 0 ? this.getMissionsByType(type) : this.missionDatas;
            var count:number = 0;
            var len:number = datas.length;
            while(--len > -1) {
                if(datas[len].status == mission.MissionState.done) {
                    count += 1;
                }
            }
            return count;
        }

        /**
         * type = 1的任务类型是否已完全部完成
         */
        allCompleteMission():boolean {
            var list:mission.MissionVO[] = this.getMissionsByType(mission.MissionType.mission);
            if(list.length == 0) {
                return true;
            }

            var res = true;
            var len:number = list.length;
            var flag:boolean = false;
            while(--len > -1) {
                flag = list[len].status == mission.MissionState.obtaining;
                if(flag == false) {
                    res = false;
                    break;
                }
            }
            return res;
        }

        /**
         * 任务数据解析
         */
        analysizeStrData(str:string):void {
            var properties:string[] = str.split(";");
            var i:number = properties.length;
            var missionInfo:mission.MissionVO = new mission.MissionVO();
            while (--i > -1) {
                var hv:string[] = properties[i].split("=");
                var key = hv[0];
                var value = hv[1];
                if(typeof(missionInfo[key] == "number")) {
                    missionInfo[key] = parseInt(value);
                } 
                else {
                    missionInfo[key] = value;
                }
            }
            this.updateOrPutMission(missionInfo);
        }

        dispose():void {
            this.missionDatas = [];
        }
    }
}