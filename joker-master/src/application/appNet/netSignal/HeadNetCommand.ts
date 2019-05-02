module app {

    export class HeadNetCommand extends MoudleCommand {


        sendHandler(data: any,action: string,paramVO: appvos.ParamVO): void {
            switch(action) {
                case app.NetAction.GET_HEAD_INFO:
                    if(data)
                    {
                        paramVO.longValues[0] = data[0];
                        if (data[0] == user.getProxy().svrRoleId) {
                            paramVO.strValues[0] = user.getProxy().svrName;
                        }
                    }else{
                        paramVO.longValues[0] = user.getProxy().svrRoleId;
                        paramVO.strValues[0] = user.getProxy().svrName;
                    }

                    // console.log("longValues[0]",paramVO.longValues[0],user.getProxy().svrRoleId);
                    break;

                case app.NetAction.SET_HEAD_INFO:
                    paramVO.longValues[0] = user.getProxy().svrRoleId;
                    
                    paramVO.strValues= data;
                    break;

                case app.NetAction.PROCESS_XYID_REQ_GET_USER_LIST: //只能查询在线玩家
                    if(data)
                    {
                        paramVO.longValues = data;
                    }else{
                        paramVO.longValues[0] = user.getProxy().svrRoleId;
                    }
                break;
            }
            
        }

        resultHandler(action: string,paramVO: appvos.ParamVO): void {
            switch(action)
                {
                case app.NetAction.RE_SET_HEAD_INFO:
                    if(paramVO) {
                        user.getProxy().svrHeadId = Number(paramVO.strValues[0]);
                    }
                break;
                
                case app.NetAction.RE_GET_HEAD_INFO:
                    if(paramVO)
                    {
                        var labelvo:appvos.UserLabelVO;
                        if(paramVO.longValues[0] == user.getProxy().svrRoleId) {
                            user.getProxy().svrHeadId = Number(paramVO.strValues[0]);
                           
                        }else{
                            if(paramVO.data.length > 0){
                                labelvo = new appvos.UserLabelVO(paramVO.data[0]);
                                // labelvo.setData(paramVO.data[0]);
                            }
                        }
                        var tablevo = playcards.getTableVO();
                        if (tablevo) {
                            var id = paramVO.longValues[0];                       
                            for (var i: number = 0, len: number = tablevo.seatPlayerVO.length; i < len;i++){
                                if (tablevo.seatPlayerVO[i].roleId == id) {
                                    tablevo.seatPlayerVO[i].avatarID = paramVO.strValues[0];
                                     if (labelvo==null){
                                        labelvo = new appvos.UserLabelVO();
                                        labelvo.userId = id;
                                    }
                                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.INFO_TIP_UPDATE,labelvo);
                                    break;
                                }
                            }  
                        }
                    }
                    break;

                case app.NetAction.PROCESS_XYID_RESP_GET_USER_LIST:
                    if(paramVO) {
                        var len = paramVO.data.length
                        if(len) {
                            var allArr:any[] =[]
                            for(var i:number=0;i<len;i++)
                            {
                                var vo = new appvos.UserInfoVO(paramVO.data[i])
                                allArr.push(vo);
                            }
                            __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_PLAY_INFO_DATA,allArr);
                        }
                    }
                break;
                }
        }
     

    }
}