module mammon {
	/**
	 * mammon proxy
	 * 用于存储奖池相关数据和功能方法
	 */
	export function getProxy():MammonProxy{
		return __GET_PROXY(MammonProxy);
	}

	export enum _Enum_RoomType {
		_ROOM_4W = 1,
		_ROOM_40W = 2,
		_ROOM_2000 = 3,
		_ROOM_1W = 4
	}

	export class MammonProxy extends app.mvc.AbsractProxy {
		static NAME:string = "__MAMMON_PROXY__";
		public constructor() {
			super(MammonProxy.NAME);
		}

		/**财神福利获奖记录，近20场 */
		_poolRecords:Array<string[]> = [];

		/**奖池总金额 */
		_totalPoolNum :number = 0;
		/**距离开奖局数 */
		_farToWinning :number = 999;

		/**当前所处房间，获奖公告只获取当前所在房间的公告 */
		_roomType : _Enum_RoomType; 

		/**test用 -@ch 自动弃牌*/
		_zidongqipai:boolean = false;


		/**根据时间戳获取中奖时间的字符串
		 * @param timeSpan时间戳
		 */
		getRecordTime(timeSpan:number=0):string{
			return timeSpan>0?DateUtils.dateFormat(timeSpan*1000,"MM-dd hh:mm"):
							  DateUtils.dateFormat(new Date().getTime()/1000,"MM-dd hh:mm");
		}

		/**
		 * 设置奖池记录
		 * @param timSpan 时间戳
		 * @param name 玩家名
		 * @param recordNum 奖额
		 */
		_setPoolRecords(timeSpan:number, name:string, recordNum:number):void{
			if(!timeSpan || timeSpan < 0 || !name || !recordNum || recordNum < 0 ) return;
			var pool :Array<string[]> = getProxy()._poolRecords;
			if(pool.length >= 20){ // 移除第一个记录
				pool.shift();
			}
			pool.push( [timeSpan+"",name,recordNum+""] );
			this._sortPoolData();
		}
		
		/**
		 * 设置数据
		 * @param totalPoolNum 奖池总额
		 * @param farToWinning 距离开奖局数
		 */
		_setData(totalPoolNum:number, farToWinning:number):void{
			this._totalPoolNum = totalPoolNum>0?totalPoolNum:0;
			this._farToWinning = farToWinning>0?farToWinning:0;

		}

		/**
		 * 获取奖池金额字符串
		 */
		_getTotalPoolString():string{
			return this._totalPoolNum && this._totalPoolNum >= 0? 
					this._formatNum2String(this._totalPoolNum) :
					"0";
		}

		/**
		 * 将数字转化成带,的格式 - 1,999,999,999
		 * @param input 要转化的数字 
		 */
		 _formatNum2String(input:number):string{
			var flag = 1;
			var res = "";
			var str = input +"";
			for(var i = str.length - 1;i >= 0; i--){
				res = str[i] + res;
				if(flag%3 ==0 && i!=0){
					res = ","+res;
				}
				flag++;
			}
			return res;
		}

		/**
		 * 获取获奖描述的信息，用于全屏滚动公告
		 * @param name 玩家名
		 * @param num 奖金额度
		 */
		_getWinningStr(name:string,num:number):string{
			var roomStr = this._getRoomString();
			return gameabc.getMessage("MAMMON_AWARD_1",
										name,	  // 玩家名
										roomStr?roomStr:"4w", // 房间类型
										num+"");  // 奖金额度
		}
		
		/**
		 * 根据room中的currentType设置当前房间类型，并反回房间类型的枚举
		 * 当前房间类型（目前支持4w，40w 其余不支持）
		 */
		_setRoomType():_Enum_RoomType{
			switch(user.getProxy().currentRoom.maxBank){
				case 40000:
					this._roomType = _Enum_RoomType._ROOM_4W;
					break;
				case 400000:
					this._roomType = _Enum_RoomType._ROOM_40W;
					break;
				case 2000:
					this._roomType = _Enum_RoomType._ROOM_2000;
					break;
				case 10000:
					this._roomType = _Enum_RoomType._ROOM_1W;
					break;
			}
			return this._roomType;
		}

		/**
		 * 获取玩家当前所处的room类型
		 */
		_getRoomString():string{
			switch(this._roomType){
				case _Enum_RoomType._ROOM_4W:
					return "4W";
				case _Enum_RoomType._ROOM_40W:
					return "40W";
				case _Enum_RoomType._ROOM_2000:
					return "2000";
				case _Enum_RoomType._ROOM_1W:
					return "10000";
			}
		}

		/**
		 * 按时间大小逆序排放获奖记录
		 */
		_sortPoolData(){
			var array = this._poolRecords;
			if(array.length >0 ){
				var temp;
				for (var i = 0; i < array.length; i++)
				{
					for (var j = 0; j < array.length - i - 1; j++)
					{
						if ( parseInt(array[j][0]) > parseInt(array[j + 1][0]) )
						{
							temp = array[j + 1];
							array[j + 1] = array[j];
							array[j] = temp;
						}
					}
				}
				array.reverse();
			}
		}

		/**清除当前的财神获奖记录 */
		_clearRecordList():void{
			this._poolRecords = [];
		}
		
		/**发送财神请求 */
		_sendMammonAction():void{
			if(room.getProxy().currentType != room.TYPE.NORMAL 
			|| !user.getProxy().currentRoom 
			|| !user.getProxy().currentRoom.maxBank) {
				return;
			}
			 __SEND_NOTIFICATION(app.NetAction.PROCESS_XYID_REQ_CAISHEN_LIST,this._setRoomType());
		}
	}
}