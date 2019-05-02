module app.mvc {
	/**
	 * @author 
	 */
    export class AbstractMediator extends puremvc.Mediator implements gameabc.IDisposer {
		public constructor(name:string,uicomponent:any = null) {
            super(name,uicomponent);
        }

        public dispose(): void {
        }
	}
}
