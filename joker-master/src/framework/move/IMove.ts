module gameabc {
	export interface IMove {
        go(fromX: number,fromY: number,toX?: number,toY?: number,recallfun?: Function);
        advanceTime(time: number)
        x: number;
        y: number;
        toY: number;
        toX: number;
        fromY: number;
        fromX: number;
        delay: number;
        rotation: number;
        isComplete: boolean;
        alltime: number;
	}
}

