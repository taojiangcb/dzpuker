module gameabc {
	/**
	 *
	 * @author 
	 *
	 */
	export class PointUtils {
		public constructor() {
		}
		
		/**
		 * 获取两点的弧度 
		 * @param pt1
		 * @param pt2
		 */
        public static calcRadian(pt1:egret.Point,pt2:egret.Point):number {
            return Math.atan2(pt2.y - pt1.y,pt2.x - pt1.x);
        }
		
		/**
		 * 根据一个弧度和一个半径来获取个一个节点的向量 
		 * @param radian
		 * @param radius
		 * @return 
		 */
        public static calcVector(radian: number,radius: number,resPoint: egret.Point = null): egret.Point{
            var vectorPoint: egret.Point = resPoint ? resPoint : new egret.Point();
            vectorPoint.x = Math.cos(radian) * radius;
            vectorPoint.y = Math.sin(radian) * radius;
            return vectorPoint;
        }
	}
}
