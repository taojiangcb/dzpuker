module gameabc {
	export class ParabolaMove extends egret.EventDispatcher implements IMove {
        protected _x: number = NaN;
        protected _y: number = NaN;
        protected _isComplete: boolean = false;
        private _fromX: number = 0;
        private _fromY: number = 0;
        private _toX: number = 0;
        private _toY: number = 0;
        private newSpeedX: number = NaN;
        private newSpeedY: number = NaN;
        private _t0: number = 0;
        private _t1: number = NaN; //80 =1秒
        private _g: number = NaN;
        private _rotation: number = 0;
        private _delay: number = 0;
        protected _recallfun: Function;

        public constructor(t: number = 60,g: number = 0.3) {
            super();
            this._t1 = t;
            this._g = g;
        }

        public get delay(): number {
            return this._delay;
        }

        public set delay(value: number) {
            this._delay = value;
        }

        public get alltime(): number {
            return this._t1;
        }

        public set alltime(value: number) {
            this._t1 = value;
        }

        public get toY(): number {
            return this._toY;
        }

        //					public set toY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "toY", value);
        //		}
	
        public get toX(): number {
            return this._toX;
        }

        //					public set toX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "toX", value);
        //		}
	
        public get fromY(): number {
            return this._fromY;
        }

        //					public set fromY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "fromY", value);
        //		}
	
        public get fromX(): number {
            return this._fromX;
        }

        //					public set fromX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "fromX", value);
        //		}
	
        public go(fromX: number,fromY: number,toX: number = 0,toY: number = 0,recallfun: Function = null) {
            this._recallfun = recallfun;
            this._fromX = this._x = fromX;
            this._fromY = this._y = fromY;
            this._toX = toX;
            this._toY = toY;
            if(Math.abs(fromX - toX) < 1 && Math.abs(fromY - toY) < 1) {
                this.onComplete();
                return;
            }
            this.newSpeedX = (toX - fromX) / this._t1;
            this.newSpeedY = ((toY - fromY) - (this._g * this._t1) * (this._t1 / 2)) / this._t1;
            this._t0 = 0;
            this._isComplete = false;
        }

        public get x(): number {
            return this._x;
        }

        //					public set x(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "x", value);
        //		}
	
        public get y(): number {
            return this._y;
        }

        //					public set y(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "y", value);
        //		}
	
        public get rotation(): number {
            return this._rotation;
        }

        //					public set rotation(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "rotation", value);
        //		}
	
        public get isComplete(): boolean {
            return this._isComplete;
        }

        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "isComplete", value);
        //		}
	
        public onComplete() {
            this._isComplete = true;
            this._x = this.toX;
            this._y = this.toY;
            if(this._recallfun != null)
                this._recallfun(this);
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        }

        public advanceTime(time: number) {
            if(!this._isComplete) {
                if(this._delay > 0) {
                    this._delay -= time;
                    if(this._delay < 0)
                        this._delay = 0;
                    return;
                }
                this._t0 += time * 80;
                var Sx: number = this._fromX + (this._t0 * this.newSpeedX);
                var Sy: number = this._fromY + (this._t0 * this.newSpeedY) + this._g * this._t0 * this._t0 * .5;
                var dx: number = Sx - this._x;
                var dy: number = Sy - this._y;
                this._rotation = Math.atan2(dy,dx)/Math.PI*180;
                if(((this._x - this._toX) * (Sx - this._toX) < 1 && (this._y - this._toY) * (Sy - this._toY) < 1) || this._t0 > this._t1) {
                    this.onComplete();
                }
                else {
                    this._x = Sx;
                    this._y = Sy;
                    if(this._recallfun != null)
                        this._recallfun(this);
                }
            }
        }
	}
}