module gameabc {

    export class GraphicsUtils extends egret.HashObject {

        /**
		 * 画斑马线
		 * 
		 * @param graphics <b> Graphics</b> 
		 * @param beginPoint <b> Point </b> 
		 * @param endPoint <b> Point </b> 
		 * @param width  <b> Number </b> 斑马线的宽度
		 * @param grap  <b> Number </b> 
		 */
        public static drawZebraStripes(graphics: egret.Graphics, beginPoint: egret.Point, endPoint: egret.Point, width: number, grap: number) {
            if (<any>!graphics || <any>!beginPoint || <any>!endPoint || width <= 0 || grap <= 0)
                return;
            var Ox: number = beginPoint.x;
            var Oy: number = beginPoint.y;
            var totalLen: number = egret.Point.distance(beginPoint, endPoint);
            var currLen: number = <any>0;
            var halfWidth: number = width * .5;
            var radian: number = Math.atan2(endPoint.y - Oy, endPoint.x - Ox);
            var radian1: number = (radian / Math.PI * 180 + 90) / 180 * Math.PI;
            var radian2: number = (radian / Math.PI * 180 - 90) / 180 * Math.PI;
            var currX: number = 0, currY: number = 0;
            var p1x: number = 0, p1y: number = 0;
            var p2x: number = 0, p2y: number = 0;
            while (currLen <= totalLen) {
                currX = Ox + Math.cos(radian) * currLen;
                currY = Oy + Math.sin(radian) * currLen;
                p1x = currX + Math.cos(radian1) * halfWidth;
                p1y = currY + Math.sin(radian1) * halfWidth;
                p2x = currX + Math.cos(radian2) * halfWidth;
                p2y = currY + Math.sin(radian2) * halfWidth;
                graphics.moveTo(p1x, p1y);
                graphics.lineTo(p2x, p2y);
                currLen += grap;
            }
        }

        
		/**
		 * 画虚线
		 * 
		 * @param graphics <b> Graphics</b> 
		 * @param beginPoint <b> Point </b> 
		 * @param endPoint <b> Point </b> 
		 * @param width  <b> Number </b> 虚线的长度
		 * @param grap  <b> Number </b> 
		 */
        public static drawDashed(graphics: egret.Graphics, beginPoint: egret.Point, endPoint: egret.Point, width: number, grap: number) {
            if (<any>!graphics || <any>!beginPoint || <any>!endPoint || width <= 0 || grap <= 0)
                return;
            var Ox: number = beginPoint.x;
            var Oy: number = beginPoint.y;
            var radian: number = Math.atan2(endPoint.y - Oy, endPoint.x - Ox);
            var totalLen: number = egret.Point.distance(beginPoint, endPoint);
            var currLen: number = <any>0;
            var x: number = 0, y: number = 0;
            while (currLen <= totalLen) {
                x = Ox + Math.cos(radian) * currLen;
                y = Oy + Math.sin(radian) * currLen;
                graphics.moveTo(x, y);
                currLen += width;
                if (currLen > totalLen)
                    currLen = totalLen;
                x = Ox + Math.cos(radian) * currLen;
                y = Oy + Math.sin(radian) * currLen;
                graphics.lineTo(x, y);
                currLen += grap;
            }
        }
    }
}

