/**
 */

module item {
    export class PropVO {
        template:localDB.PropTemplateVO;
        num:number = 0;             //拥有的数量
        timeEnd:number = 0;         //过期时间
        svrId:number = 0;
    }
}