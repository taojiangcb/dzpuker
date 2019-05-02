module charmWheel {
    export enum WHEEL_STATUS {
        STOP,
        ADD,
        CONSTANT,
        REDUCE
    }
    export function getProxy(): CharmWheelProxy {
        return __GET_PROXY(CharmWheelProxy);
    }
    export class CharmWheelProxy extends app.mvc.AbsractProxy {
        static NAME:string = "CharmWheelProxy";
        timeInterval: number = 30;//10;
        //加速时间 匀速时间 减速时间 加速度
        addTime: number = 1000;
        constantTime: number = 1000;
        reduceTime: number = 3000;
        addAc: number = 600;
        rewardList: any[] = [["门票", "icon_prop_type_2_png", "1000赛事门票*1"],//0
                              ["门票", "icon_prop_type_1_png", "5000赛事门票*1"],
                              ["500", "icon_sign_box1_png", "500彩豆"],
                              ["1000", "icon_sign_box1_png", "1000彩豆"],
                              ["2000", "icon_sign_box3_png", "2000彩豆"],
                              ["5000", "icon_sign_box2_png", "5000彩豆"],//5
                              ["1万", "icon_shop_box1_png", "1万彩豆"],
                              ["10万", "icon_shop_box2_png", "10万彩豆"],
                              ["50万", "icon_shop_box3_png", "50万彩豆"],
                              ["500万", "icon_sign_ticket__box1_png", "500万彩豆"]];
        rewardSort: number[] = [4, 8, 1, 7, 5, 2, 9, 0, 3, 6];//[7, 2, 5, 8, 0, 4, 9, 3, 1, 6];
        view: CharmWheelUIMoudle;
        isRun: boolean = false;
        runTime: number = 0;
        rewardId: number;
        status: WHEEL_STATUS = WHEEL_STATUS.STOP;
        startRotation: number;
        myRecordList: any[] = [];
        allRecordList: any[] = [];
        isAdjust: boolean;
        adjustRotation: number;
        adjustTime: number;
        constructor(name?: string, data?: any) {
            super(CharmWheelProxy.NAME, data);
        }
        /**计算减速度 */
        get reduceAc(): number {
            return - Math.floor(this.addAc * this.addTime / this.reduceTime);
        }
        get beforeReduceTime(): number {
            return this.addTime + this.constantTime + this.adjustTime;
        }
        initData(reward: number, startRotation: number) {
            this.isRun = true;
            this.runTime = 0;
            this.rewardId = reward;
            this.isAdjust = true;
            this.startRotation = startRotation;
            this.adjustTime = 0;
            this.adjustRotation = this.getRewardRotation();
        }
        finishData() {
            this.status = WHEEL_STATUS.STOP;
            egret.setTimeout(()=>{
                this.isRun = false;
            }, this, 1000, true);
        }
        /**每个timeInterval获取运动的角度 */
        getRotation(): number {
            var rotation: number = 0;
            var t = this.timeInterval / 1000;
            var v: number;
            var a: number;
            if (this.runTime < this.addTime) {
                if (this.status != WHEEL_STATUS.ADD) this.status = WHEEL_STATUS.ADD;
                a = this.addAc;
                v = this.runTime / 1000 * this.addAc;
            } else if (this.runTime < this.addTime + this.constantTime) {
                if (this.status != WHEEL_STATUS.CONSTANT) this.status = WHEEL_STATUS.CONSTANT;
                a = 0;
                v = this.getMaxSpeed();
            } else if (this.runTime >= this.addTime + this.constantTime && this.isAdjust) {
                var maxRotation = this.calcRotation(this.getMaxSpeed(), t, 0);
                this.runTime += this.timeInterval;
                this.adjustTime += this.timeInterval;
                return this.getAdjustRotation(maxRotation);
            } else {
                if (this.status != WHEEL_STATUS.REDUCE) {
                    this.status = WHEEL_STATUS.REDUCE;
                }
                a = this.reduceAc;
                v = this.getMaxSpeed() + (this.runTime - this.beforeReduceTime) / 1000 * this.reduceAc;
            } 
            this.runTime += this.timeInterval;
            rotation += this.calcRotation(v, t, a);
            return rotation;
        }
        getMaxSpeed(): number{
            return this.addAc * this.addTime / 1000;
        }
        /**根据抽到的奖品调整转盘角度 */
        getRewardRotation() {
            var rotationA = this.calcRotation(0, this.addTime, this.addAc);
            var rotationC = this.calcRotation(this.getMaxSpeed(), this.constantTime, 0);
            var rotationR = this.calcRotation(this.getMaxSpeed(), this.reduceTime, this.reduceAc);
            var rotation = (rotationA + rotationC + rotationR) % 360;
            return (360 * 3 - rotation - this.view.items[this.rewardId].rotation - this.startRotation) % 360;
        }
        getAdjustRotation(r: number): number {
            if (this.adjustRotation > r) {
                this.adjustRotation -= r;
                return r;
            } else {
                this.isAdjust = false;
                return this.adjustRotation;
            }
        }
        calcRotation(v: number, t: number, a: number): number {
            return v * t + 0.5 * a * t * t;
        }
    }
}