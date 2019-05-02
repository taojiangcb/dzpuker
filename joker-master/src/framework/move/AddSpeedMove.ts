module gameabc {
	export class AddSpeedMove extends egret.EventDispatcher implements IMove {
        private _v0: number = NaN;
        private _a: number = NaN;
        private _x: number = NaN;
        private _y: number = NaN;
        private _isComplete: boolean = false;
        private _fromX: number = 0;
        private _fromY: number = 0;
        private _toX: number = 0;
        private _toY: number = 0;
        private cx: number = NaN;
        private cy: number = NaN;
        private t: number = NaN;
        public alltime: number = NaN;
        private _delay: number = 0;
        private _recallfun: Function;

        public constructor(v0: number = 500,t: number = 2) {
            super();
            this._v0 = v0;
            this.alltime = t;
        }

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
            this.t = 0;
            this._isComplete = false;
            var dx: number = toX - fromX;
            var dy: number = toY - fromY;
            var s: number = Math.sqrt(dx * dx + dy * dy);
            this.cx = dx / s;
            this.cy = dy / s;
            this._a = 2 * (s - this._v0 * this.alltime) / (this.alltime * this.alltime);
        }

        private onComplete() {
            this._isComplete = true;
            this._x = this.toX;
            this._y = this.toY;
            if(this._recallfun)
                this._recallfun(this);
            this._recallfun = null;
        }

        public get toY(): number {
            return this._toY;
        }

        //					public set toY(value:number)
        //		{
        //                        this._toY = value;
        //		}
	
        public get toX(): number {
            return this._toX;
        }

        //					public set toX(value:number)
        //		{
        //                        this._toX =  value;
        //		}
	
        public get fromY(): number {
            return this._fromY;
        }

        //					public set fromY(value:number)
        //		{
        //                        this._fromY = value;
        //		}
	
        public get fromX(): number {
            return this._fromX;
        }

        //					public set fromX(value:number)
        //		{
        //                        this._fromX = value;
        //		}
	
        public get x(): number {
            return this._x;
        }

        //					public set x(value:number)
        //		{
        //                        this._x = value;
        //		}
	
        public get y(): number {
            return this._y;
        }

        //					public set y(value:number)
        //		{
        //                        this._y = value;
        //		}
	
        public get rotation(): number {
            return 0;
        }

        //					public set rotation(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.AddSpeedMove, this, "rotation", value);
        //		}
	
        public get isComplete(): boolean {
            return this._isComplete;
        }

        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.AddSpeedMove, this, "isComplete", value);
        //		}
	
        public get delay(): number {
            return this._delay;
        }

        public set delay(value: number) {
            this._delay = value;
        }

        public advanceTime(time: number) {
            if(this._isComplete)
                return;
            if(this._delay > 0) {
                this._delay -= time;
                return;
            }
            this.t += time;
            if(this.t > this.alltime) {
                this.onComplete();
            }
            else {
                var S: number = this._v0 * this.t + this._a * this.t * this.t * .5;
                this._x = this._fromX + S * this.cx;
                this._y = this._fromY + S * this.cy;
                if(this._recallfun)
                    this._recallfun(this);
            }
        }
	}
}

