module app.mvc{
	/**
	 *
	 * @author 
	 *
	 */
    export class AbsractProxy extends puremvc.Proxy implements gameabc.IDisposer {

        parent: AbsractProxy;
        childs: any[];

        constructor(proxyName?: string, data?: any) {
            super(proxyName, data);
        }

        onRegister(): void {
            super.onRegister();
            if (this.childs != null) {
                for (var i: number = 0; i < this.childs.length; ++i) {
                    var proxyType: any = this.childs[i];
                    var proxy: any = new proxyType(proxyType.NAME, this.getData());
                    proxy.parent = this;
                    app.mvc.AppFacade.getInstance().registerProxy(proxy);
                }
            }
        }

        onRemove(): void {
            super.onRemove();
            if (this.parent != null) this.parent = null;
            if (this.childs != null) {
                for (var i: number = 0; i < this.childs.length; ++i) {
                    app.mvc.AppFacade.getInstance().removeProxy(this.childs[i].NAME);
                }
                this.childs = null;
            }
        }

        getData(): any {
            return this.parent == null ? super.getData() : this.parent.getData();
        }

        dispose(): void {
        }
	}
}
