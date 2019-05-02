module appvos {

	export class UserLabelVO {
		public id: number;//数据库id

		public userId: number;//被标记的uid

		public labelName: string;//标签自定义

		public labelType:number;// 标签类型

		public modifyTime: number;// 修改时间

        public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("UserLabelVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.id = vo.id == null ? 0 : vo.id.toNumber();

			this.userId = vo.userId == null ? 0 : vo.userId.toNumber();

            this.labelName = vo.labelName;

            this.labelType = vo.labelType;

            this.modifyTime = vo.modifyTime == null ? 0 : vo.modifyTime.toNumber();
			console.log('this.modifyTime',this.modifyTime);
			
            // if (vo.modifyTime !== null && vo.modifyTime !== undefined) this.modifyTime = vo.modifyTime.toNumber();
            vo = null;
        }
    }
}