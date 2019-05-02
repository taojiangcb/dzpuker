module room {
	export class DealerLayout extends eui.HorizontalLayout{
		public constructor() {
			super();
			 this.gap = 0;
			 this.verticalAlign = "middle";
		}
		public dealerlist: DealerList;
		public ischange: boolean = false;
		public setList(list:DealerList): void{
			list.layout = this;
			this.dealerlist = list;
			list.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.listchange, this);
		}
		updateDisplayListVirtual(width: number, height: number): void{
			super.updateDisplayListVirtual(width, height);
			if (!this.ischange) {
				this.resize();
			}
			this.ischange = true;
			
		}
		public listchange(evt:eui.PropertyEvent): void{
			if (evt.property == "scrollH") {
				this.resize();
			}
		}
		public resize(): void{
			var allsortChild:DealerListItem[] = [];
				for (var i: number = 0, len: number = this.dealerlist.numChildren; i < len; i++){
					var item = this.dealerlist.getChildAt(i);
					if (item instanceof DealerListItem) {
						var scale = item.changeScale(this.dealerlist.scrollH);
						for (var j: number = 0, jlen: number = allsortChild.length; j < jlen; j++){
						if (allsortChild[j].scale >= scale) {
							allsortChild.splice(j, 0, item);
							break;
						}
					}
					if (j == jlen) {
						allsortChild.push(item);
					}
					}
					
				}
				for (var j: number = 0, jlen: number = allsortChild.length; j < jlen; j++){						
					this.dealerlist.setChildIndex(allsortChild[j],j)
				}
				
		}
	}
}