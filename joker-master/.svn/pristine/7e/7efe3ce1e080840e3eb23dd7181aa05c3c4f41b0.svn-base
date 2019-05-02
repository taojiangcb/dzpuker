module room {
	export class DealerList extends eui.List{
		public constructor() {
			super();
		}
		commitProperties(): void{
			var change = this.$dataProviderChanged;
			super.commitProperties();
			if (change) {
				this.layout["ischange"] = false;
				this.scrollH = 150;
				// this.$Group[2] = 150;
			}
		}
	}
}