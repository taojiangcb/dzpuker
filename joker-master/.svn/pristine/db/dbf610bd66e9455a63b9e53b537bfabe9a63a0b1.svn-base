module gameabc {
	export class TreeMove extends egret.EventDispatcher implements IMove {
        private _speed: number = NaN;
        private _t: number = NaN;
        private nowmove: IMove;
        private _isComplete: boolean = false;
        private movelist: Array<IMove>;
        private _recallfun: Function;
        private _delay: number = 0;
        public alltime: number;
        public constructor(speed: number,t: number) {
            super();
            this._speed = speed;
            this._t = t;
            this.movelist = new Array<IMove>();
        }

        public go(fromX: number,fromY: number,toX: number = 0,toY: number = 0,recallfun: Function = null) {
            this._recallfun = recallfun;
            var mov: IMove = new AddSpeedMove(this._speed,this._t);
            mov.go(fromX,fromY,toX,toY);
            this.nowmove = mov;
            var lmov: LineMove = new LineMove(this._speed * .5);
            lmov.go(toX,toY,fromX,fromY);
            this.movelist.push(lmov);
            this._isComplete = false;
        }

        public get x(): number {
            return this.nowmove.x;
        }

        //					public set x(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "x", value);
        //		}
	
        public get y(): number {
            return this.nowmove.y;
        }

        //					public set y(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "y", value);
        //		}
	
        public get toY(): number {
            return this.nowmove.toY;
        }

        //					public set toY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "toY", value);
        //		}
	
        public get toX(): number {
            return this.nowmove.toX;
        }

        //					public set toX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "toX", value);
        //		}
	
        public get fromY(): number {
            return this.nowmove.fromY;
        }

        //					public set fromY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "fromY", value);
        //		}
	
        public get fromX(): number {
            return this.nowmove.fromX;
        }

        //					public set fromX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "fromX", value);
        //		}
	
        public get delay(): number {
            return this.nowmove.delay;
        }

        public set delay(value: number) {
            this._delay = value;
        }

        public get rotation(): number {
            return this.nowmove.rotation;
        }

        //					public set rotation(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "rotation", value);
        //		}
	
        public get isComplete(): boolean {
            return this._isComplete;
        }

        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "isComplete", value);
        //		}
	
        private onComplete() {
            this._isComplete = true;
            if(this._recallfun)
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
            if(this.nowmove) {
                this.nowmove.advanceTime(time);
                if(this.nowmove.isComplete) {
                    if(this.movelist.length > 0) {
                        this.nowmove = this.movelist.shift();
                    }
                    else
                        this.onComplete();
                }
                else if(this._recallfun)
                    this._recallfun(this);
            }
            else
                this.onComplete();
        }

	}
}
