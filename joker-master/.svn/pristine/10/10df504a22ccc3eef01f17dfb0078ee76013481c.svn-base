module gameabc {
	export class LineMove extends egret.EventDispatcher implements IMove {
        private _x: number = NaN;
        private _y: number = NaN;
        private _isComplete: boolean = false;
        private _fromX: number = 0;
        private _fromY: number = 0;
        private _toX: number = 0;
        private _toY: number = 0;
        private _speed: number = NaN;//运行速度
        private newSpeedX: number = NaN;
        private newSpeedY: number = NaN;
        private maxt: number = NaN;
        private _recallfun: Function;
        private _delay: number = 0;
        public alltime: number = NaN;//运行时间
        public constructor(speed: number = 900) {
            super();
            this._speed = speed;
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
            this._isComplete = false;
            var dx: number = toX - fromX;
            var dy: number = toY - fromY;
            var r: number = Math.atan2(dy,dx);
            var speed:number
            if(isNaN(this.alltime) ){ //定速度计算
                this.maxt = Math.sqrt(dx * dx + dy * dy) / this._speed;
                speed = this._speed;
            } else {//定时间计算
                speed = Math.sqrt(dx * dx + dy * dy) / this.alltime;
                this.maxt = this.alltime;
            }
            this.newSpeedX = speed * Math.cos(r);
            this.newSpeedY = speed * Math.sin(r);
        }

        public get toY(): number {
            return this._toY;
        }

        //					public set toY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "toY", value);
        //		}
	
        public get toX(): number {
            return this._toX;
        }

        //					public set toX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "toX", value);
        //		}
	
        public get fromY(): number {
            return this._fromY;
        }

        //					public set fromY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "fromY", value);
        //		}
	
        public get fromX(): number {
            return this._fromX;
        }

        //					public set fromX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "fromX", value);
        //		}
	
        public get x(): number {
            return this._x;
        }
        //
        //					public set x(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "x", value);
        //		}
	
        public get y(): number {
            return this._y;
        }

        //					public set y(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "y", value);
        //		}
	
        public get rotation(): number {
            return 0;
        }
        //
        //					public set rotation(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "rotation", value);
        //		}
	
        public get isComplete(): boolean {
            return this._isComplete;
        }

        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "isComplete", value);
        //		}
	
        public get delay(): number {
            return this._delay;
        }

        public set delay(value: number) {
            this._delay = value;
        }

        private onComplete() {
            this._isComplete = true;
            this._x = this.toX;
            this._y = this.toY;
            if(this._recallfun != null)
                this._recallfun(this);
                
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        }

        public advanceTime(time: number) {
            if(this._isComplete)
                return;
            if(this._delay > 0) {
                this._delay -= time;
                return;
            }
            this.maxt -= time;
            if(this.maxt < 0) {
                this.onComplete();
            }
            else {
                this._x = this._x + this.newSpeedX * time;
                this._y = this._y + this.newSpeedY * time;
                if(this._recallfun)
                    this._recallfun(this);
            }
        }
	}
}
