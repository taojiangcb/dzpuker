

	/**
	 * 
	 * 捷克高手的数字选择组件
	 * [dispatchEvent Event.CHANGE data:this.chrooseValue] 派发change选择事情，参数是当前选中的值
	 * 
	 */

module joker {

	export class JokerNumberInput extends gameabc.UICustomComponent {
		public btnAdd:eui.Component;
		public txtNumber:eui.BitmapLabel;
		public btnReduce:eui.Component;

		/**
		 * 选译的步值
		 */
		private $stepValues:number[] = [];

		/**
		 * 当前选择的步值
		 */
		private chrooseIndex:number = -1;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/joker/JokerNumberInput.exml"
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);

			this.bindButton(this.btnAdd);
			this.bindButton(this.btnReduce);

			if(this.$stepValues.length > 0) {
				this.setDefault();
			} 
			else {
				this.chrooseIndex = -1;
				this.updateRenders();
			}
		}

		private setDefault():void {
			this.chrooseIndex = 0;
			this.updateRenders();
		}

		/**
		 * 刷新当前显示的值
		 */
		private updateRenders():void {
			if(this.initialized) {
				if(this.chrooseIndex == -1) {
					this.txtNumber.text = "...";
				}
				else {
					this.txtNumber.text = this.chrooseValue.toString();
				}

				this.dispatchEvent(new egret.Event(egret.Event.CHANGE,false,false,this.chrooseValue));
			}
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			var btn:egret.DisplayObject = tag;
			var step:number = this.$stepValues.length;
			
			if(step == 0) {
				this.updateRenders();
				return;
			}

			var next:number = 0;
			switch(btn) {
				case this.btnAdd:
					next = this.chrooseIndex + 1;
					if(next < step)			this.chrooseIndex = next;
					else 					this.chrooseIndex = 0;
					break;
				case this.btnReduce:
					next = this.chrooseIndex - 1;
					if(next == -1) 			this.chrooseIndex = step - 1;
					else 					this.chrooseIndex = next;
					break;
			}
			this.updateRenders();
		}

		/**
		 * 设置当前可选的步值
		 */
		set stepValues(val:number[]) {
			if(this.$stepValues != val && val.length > 0) {
				this.$stepValues = val;
				this.setDefault();
			} 
			else {
				this.chrooseIndex = -1;
				this.updateRenders();
			}
		}

		get stepValues():number[]{
			return this.$stepValues;
		}

		/**
		 * 当前可选中的值
		 */
		get chrooseValue():number {
			return this.chrooseIndex < this.$stepValues.length && this.chrooseIndex > -1 ? this.stepValues[this.chrooseIndex] : 0;
		}

		$setEnabled(val:boolean):boolean {
			if(val) {
				this.btnReduce.currentState = "normal";
				this.btnAdd.currentState = "normal";
			} 
			else {
				this.btnReduce.currentState = "disable";
				this.btnAdd.currentState = "disable";
			}
			return super.$setEnabled(val);
		}
	}
}