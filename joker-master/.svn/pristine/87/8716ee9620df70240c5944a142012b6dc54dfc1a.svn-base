module gameabc {

    export class Juggler {

        private mObjects: Array<any>;
        private mElapsedTime: number;
        public constructor() {

            this.mElapsedTime = 0;
            this.mObjects = [];
        }

        public add(object: any) {
            if(object && this.mObjects.indexOf(object) == -1) {
                this.mObjects[this.mObjects.length] = object;
            }
        }

        public contains(object: any): boolean {
            return this.mObjects.indexOf(object) != -1;
        }

        public remove(object: any) {
            if(object == null)
                return;
            var index: number = this.mObjects.indexOf(object);
            if(index != -1)
                this.mObjects[index] = null;
        }
        public purge() {
            for(var i: number = this.mObjects.length - 1;i >= 0;--i) {

                this.mObjects[i] = null;
            }
        }
        public advanceTime(time: number) {
            var numObjects: number = this.mObjects.length;
            var currentIndex: number = 0;
            var i: number = 0;
            this.mElapsedTime += time;
            if(numObjects == 0)
                return;
            for(i = 0;i < numObjects;++i) {
                var object = this.mObjects[i];
                if(object) {
                    if(currentIndex != i) {
                        this.mObjects[currentIndex] = object;
                        this.mObjects[i] = null;
                    }
                    object.advanceTime(time);
                    ++currentIndex;
                }
            }
            if(currentIndex != i) {
                numObjects = this.mObjects.length;
                while(i < numObjects)
                    this.mObjects[(currentIndex++)] = this.mObjects[(i++)];
                this.mObjects.length = currentIndex;
            }
        }
        public get elapsedTime(): number {
            return this.mElapsedTime;
        }
        protected get objects(): Array<any> {
            return this.mObjects;
        }
    }
}