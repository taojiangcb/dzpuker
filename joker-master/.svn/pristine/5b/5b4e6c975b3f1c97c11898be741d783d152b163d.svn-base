module gameabc {
	export class JumpMove extends ParabolaMove {
        private _tbak: number = NaN;
        private _spaceTime: number = NaN;
        private _isRandomDelay: boolean = false;
        private temp: number = 0;

        public constructor(t: number = 35,g: number = 0.3) {
            super(t,g);
            this._tbak = t;
            this.temp = Math.round(t / 4 + 1);
            this._spaceTime = 0;
        }

        public get isRandomDelay(): boolean {
            return this._isRandomDelay;
        }

        public set isRandomDelay(value: boolean) {
            this._isRandomDelay = value;
        }

        public get spaceTime(): number {
            return this._spaceTime;
        }

        public set spaceTime(value: number) {
            this._spaceTime = value;
        }

//        protected onComplete() {
//            this._isComplete = true;
//            this._x = this.toX;
//            this._y = this.toY;
//            if(this._recallfun != null)
//                this._recallfun(this);
//        }

        public advanceTime(time: number) {
            super.advanceTime(time);
            if(this.delay > 0)
                return;
            if(this.isComplete) {
                this.alltime -= this.temp;
                if(this.alltime <= 0) {
                    this.alltime = this._tbak;
                    if(this.isRandomDelay)
                        this.delay = Math.random() * this._spaceTime;
                    else
                        this.delay = this._spaceTime;
                }
                else
                    this.delay = 0;
                this.go(this.fromX,this.fromY,this.toX,this.toY,this._recallfun);
            }
        }
	}
}

