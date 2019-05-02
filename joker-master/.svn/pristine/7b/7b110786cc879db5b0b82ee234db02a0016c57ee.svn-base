module app {
    
    export class SrsPackWriter {
        
       to(action:string):void {
           var srspack = new cyvos.SrsPackage();
           srspack.sProcessID = 1;
           srspack.nAppID = user.getProxy().currentRoom==null?
               0:user.getProxy().currentRoom.svrOfsId;
           srspack.sXYID = parseInt(action);
           cy.srsServer.send(srspack);
           
           if(action=='11073') {
               cy.log("leave" +
                      " name:"+user.getProxy().loginName + 
                   " ofsid:" + (user.getProxy().currentRoom ? user.getProxy().currentRoom.svrOfsId : "")+
                      " time:"+DateUtils.nowTime,cy.LOG_TYPE.ROOM);
           }
       }
    }
}