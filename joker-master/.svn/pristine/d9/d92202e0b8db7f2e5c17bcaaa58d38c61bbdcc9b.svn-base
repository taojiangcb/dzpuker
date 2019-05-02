module gameabc {
    //工具转的as3的类
    export class ArrayUtils extends egret.HashObject {
        public constructor() {
            super();
        }

        public static compbineToArray(ary1: Array<any>,ary2: Array<any>): Array<any> {
            var ary: Array<any> = <any>ary1 ? ary1.concat() : [];
            var i: number = 0;
            var len: number = ary2 ? ary2.length : 0;
            for(i = 0;i != len;i++) {
                ary.push(ary2[i]);
            }
            return ary;
        }

        public static compBineTo_1_Vector(ary1: any,ary2: any): any {
            if(ary1 == null)
                return ary2;
            var i: number = 0;
            var len: number = ary2 ? ary2["length"] : 0;
            for(i = 0;i != len;i++) {
                ary1["push"](ary2[i]);
            }
            return ary1;
        }
        
        /**
         * 获取两个数组中相同的值，并且返回他们
         */ 
        public static getSameCellWithTwoArray(ary1: Array<any>, ary2: Array<any>): Array<any> {
            var arr: any[] = [];
            
            var len: number = ary1.length;
            var len2: number = ary2.length;
            for(var i = 0; i < len; i++) {
                for(var j = 0; j < len2; j++) {
                    if(ary1[i] === ary2[j]){
                        arr.push(ary1[i]);
                        continue;
                    }
                }
            }
            
            return arr;
        }

        public static mergerArray(ary1: Array<any>,ary2: Array<any>): Array<any> {
            if(ary1 == null)
                return ary2;
            var i: number = 0;
            var len: number = ary2 ? ary2.length : 0;
            for(i = 0;i != len;i++) {
                ary1.push(ary2[i]);
            }
            return ary1;
        }

        public static convertToVectory(old: Array<any>,to: Array<Object>) {
            if(old == null)
                return;
            var i: number = 0;
            var len: number = old.length;
            for(i = 0;i != len;i++) {
                to.push(old[i]);
            }
        }

        public static convertToArray(old: Array<Object>,to: Array<any>) {
            if(old == null)
                return;
            var i: number = 0;
            var len: number = old.length;
            for(i = 0;i != len;i++) {
                to.push(old[i]);
            }
        }

        public static randomArr(arr: Array<any>): Array<any> {
            var outputArr: Array<any> = arr.slice();
            var i: number = outputArr.length;
            var temp: any;
            var indexA: number = 0;
            var indexB: number = 0;
            while(i) {
                indexA = i - 1;
                indexB = Math.floor(Math.random() * i);
                i--;
                if(indexA == indexB)
                    continue;
                temp = outputArr[indexA];
                outputArr[indexA] = outputArr[indexB];
                outputArr[indexB] = temp;
            }
            return outputArr;
        }

        public static getItemByFilterPropNameAndValue(data: Array<any>,propName: string,value: any): any {
            if(<any>!data || <any>!propName || <any>!value)
                return null;
            var len: number = (</*Array*/any>data,Array).length;
            for(var i: number = 0;i < len;i++) {
                var obj: any = <any>data[i];
                if(obj && obj[propName]) {
                    if(obj[propName],null,"Int64") {
                        if(obj[propName].toNumber() == value) {
                            return obj;
                        }
                    }
                    else {
                        if(obj[propName] == value) {
                            return obj;
                        }
                    }
                }
            }
            return null;
        }
    }
}

