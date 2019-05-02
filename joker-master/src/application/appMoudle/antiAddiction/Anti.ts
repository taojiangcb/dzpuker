/**
 * Created by JiangTao on 2016/6/24.
 */
module anti {

    /**
     * 是否已经实名登记了
     * @returns {boolean}
     */
    export function isRNV():boolean {
        return user.getProxy().propertURL == "";
    };

    export function isOpenAnti():boolean {
        return gameabc.getConfig("ANTI_POWER") == "true";
    }

    export class Anti {
        constructor(){}
    }

}