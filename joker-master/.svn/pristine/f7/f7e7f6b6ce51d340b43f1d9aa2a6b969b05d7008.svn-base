module gameabc {
	export class LineAttackMove extends egret.EventDispatcher implements IMove {
        private _linespeed: number = NaN;
        private _t: number = 60;
        private _g: number = 0.3;
        private _index: number = 0;
        private _iMove: IMove;
        private _fromX: number = 0;
        private _fromY: number = 0;
        private _toX: number = 0;
        private _toY: number = 0;
        private _delay: number = 0;
        private _recallfun: Function;
        public alltime: number;
        public constructor(linespeed: number = 900) {
            super();
            this._linespeed = linespeed;
        }

        public go(fromX: number,fromY: number,toX: number = 0,toY: number = 0,recallfun: Function = null) {
            this._recallfun = recallfun;
            this._index = 0;
            this._fromX = fromX;
            this._fromY = fromY;
            this._toX = toX;
            this._toY = toY;
            this._iMove = new LineMove(this._linespeed);
            this._iMove.go(this._fromX,this._fromY,toX,toY);
        }

        public get toY(): number {
            return this._toY;
        }

        //					public set toY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "toY", value);
        //		}
	
        public get toX(): number {
            return this._toX;
        }

        //					public set toX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "toX", value);
        //		}
	
        public get fromY(): number {
            return this._fromY;
        }

        //					public set fromY(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "fromY", value);
        //		}
	
        public get fromX(): number {
            return this._fromX;
        }

        //					public set fromX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "fromX", value);
        //		}
	
        public get x(): number {
            return this._iMove.x;
        }

        //					public set x(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "x", value);
        //		}
	
        public get y(): number {
            return this._iMove.y;
        }

        //					public set y(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "y", value);
        //		}
	
        public get delay(): number {
            return this._delay;
        }

        public set delay(value: number) {
            this._delay = value;
        }

        public get rotation(): number {
            return this._iMove.rotation;
        }

        //					public set rotation(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "rotation", value);
        //		}
	
        public get isComplete(): boolean {
            return this._index > 0 && this._iMove && this._iMove.isComplete;
        }

        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "isComplete", value);
        //		}
        //	
        private onComplete() {
            if(this._recallfun)
                this._recallfun(this);
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        }

        public advanceTime(time: number) {
            if(this._delay > 0) {
                this._delay -= time;
                return;
            }
            if(this._iMove.isComplete) {
                if(this._index > 0) {
                    this.onComplete();
                    return;
                }
                else {
                    this._index = 1;
                    this._iMove = new LineMove(this._linespeed * 1.5);
                    this._iMove.go(this._toX,this._toY,this._fromX,this._fromY);
                }
            }
            else {
                this._iMove.advanceTime(time);
                if(this._recallfun)
                    this._recallfun(this);
            }
        }
	}
}

