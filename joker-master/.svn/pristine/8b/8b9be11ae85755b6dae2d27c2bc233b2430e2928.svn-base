module gameabc {
	export class ShakeMove extends egret.EventDispatcher implements IMove {
        private _x: number = NaN;
        private _y: number = NaN;
        private _isComplete: boolean = false;
        private _toX: number = NaN;
        private _toY: number = NaN;
        private shock_TimeSpan: number = NaN;
        public alltime: number = NaN;
        private _shock: number = 0;
        private _step: number;
        private _delay: number = 0;
        private _recallfun: Function;

        public constructor() {
            super();
        }

        public get delay(): number {
            return this._delay;
        }

        public set delay(value: number) {
            this._delay = value;
        }

        public go(fromX: number,fromY: number,shock_RepeatTime: number = 200,step: number = 3,recallfun: Function = null) {
            this._recallfun = recallfun;
            this._isComplete = false;
            this._x = fromX;
            this._y = fromY;
            this.alltime = shock_RepeatTime / 1000;
            this._shock = 0;
            this._step = step
            this._toX = 0;
            this._toY = 0;
            this.shock_TimeSpan = 0;
        }

        public onComplete() {
            this._isComplete = true;
            this._toX = 0;
            this._toY = 0;
            if(this._recallfun != null)
                this._recallfun(this);
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        }

        public get toY(): number {
            return this._toY;
        }
        //
        //					public set toY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "toY", value);
        //		}
	
        public get toX(): number {
            return this._toX;
        }

        //					public set toX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "toX", value);
        //		}
	
        public get fromY(): number {
            return this._y;
        }

        //					public set fromY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "fromY", value);
        //		}
	
        public get fromX(): number {
            return this._x;
        }

        //					public set fromX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "fromX", value);
        //		}
	
        public get x(): number {
            return this._x + this._toX;
        }

        //					public set x(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "x", value);
        //		}
	
        public get y(): number {
            return this._y + this._toY;
        }

        //					public set y(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "y", value);
        //		}
	
        public get rotation(): number {
            return 0;
        }

        //					public set rotation(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "rotation", value);
        //		}
	
        public get isComplete(): boolean {
            return this._isComplete;
        }

        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "isComplete", value);
        //		}
	
        public advanceTime(time: number) {
            if(<any>!this._isComplete) {
                if(this._delay > 0) {
                    this._delay -= time;
                    return;
                }
                this.shock_TimeSpan += time;
                if (this.shock_TimeSpan < this.alltime) {
                    this._shock+=0.5;
                    // if(this._shock-- > 0) {
                        // var dy: number = 3;
                    //     if(this._shock > 10) {
                    //         dy = Math.round(this._shock / 2);
                    //     }
                    //     if(this._shock == 0) {
                    //         this._toY = 0;
                    //         this._toX = 0;
                    //     }
                    //     else
                        if (this._shock % 4 == 0) {
                            this._toY = - this._step;
                        }
                        else if(this._shock % 4 == 2) {
                            this._toY =  this._step;
                        }
                        else if(this._shock % 4 == 1) {
                            this._toX = - this._step;
                        }
                        else if(this._shock % 4 == 3) {
                            this._toX =  this._step;
                        }
                    // }
                    if(this._recallfun)
                        this._recallfun(this);
                }
                else {
                    this.onComplete();
                }
            }
        }
	}
}
