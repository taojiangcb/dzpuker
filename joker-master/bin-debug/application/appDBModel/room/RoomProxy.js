var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    function getProxy() {
        return __GET_PROXY(RoomProxy);
    }
    room.getProxy = getProxy;
    function setServer(cfgId) {
        if (cfgId === void 0) { cfgId = 1; }
        switch (cfgId) {
            case 1 /* PUBLIC */:
                getProxy().room1 = getProxy().pRoom1;
                getProxy().room2 = getProxy().pRoom2;
                getProxy().room3 = getProxy().pRoom3;
                getProxy().room4 = getProxy().pRoom4;
                getProxy().room5 = getProxy().pRoom5;
                getProxy().room6 = getProxy().pRoom6;
                getProxy().anteList = getProxy().pAnteList;
                break;
            case 2 /* AUTO_SRS */:
                getProxy().room1 = getProxy().zRoom1;
                getProxy().room2 = getProxy().zRoom2;
                getProxy().room3 = getProxy().zRoom3;
                getProxy().room4 = getProxy().zRoom4;
                getProxy().room5 = getProxy().zRoom5;
                getProxy().room6 = getProxy().zRoom6;
                getProxy().anteList = getProxy().zAnteList;
                break;
            case 3 /* MINE_57 */:
                getProxy().room1 = getProxy().mRoom1;
                getProxy().room2 = getProxy().mRoom2;
                getProxy().room3 = getProxy().mRoom3;
                getProxy().room4 = getProxy().mRoom4;
                getProxy().room5 = getProxy().mRoom5;
                getProxy().room6 = getProxy().mRoom6;
                getProxy().room7 = getProxy().mRoom7;
                getProxy().anteList = getProxy().mAnteList;
                break;
            case 4 /* BF_TEST */:
                getProxy().room1 = getProxy().bRoom1;
                getProxy().room2 = getProxy().bRoom1;
                getProxy().room3 = getProxy().bRoom3;
                getProxy().anteList = getProxy().mAnteList;
                break;
            default:
                getProxy().room1 = getProxy().iRoom1;
                getProxy().room2 = getProxy().iRoom2;
                getProxy().room3 = getProxy().iRoom3;
                getProxy().room4 = getProxy().iRoom4;
                getProxy().room5 = getProxy().iRoom5;
                getProxy().room6 = getProxy().iRoom6;
                getProxy().room7 = getProxy().iRoom7;
                getProxy().anteList = getProxy().iAnteList;
                break;
        }
    }
    room.setServer = setServer;
    /**
     *
     * @author
     *
     */
    var RoomProxy = (function (_super) {
        __extends(RoomProxy, _super);
        function RoomProxy(proxyName, data) {
            var _this = _super.call(this, room.RoomProxy.NAME) || this;
            /**道具配置
             *
             * charmObj[价格 魅力值 魅力积分，对方魅力值，对方魅力积分]
             *
             */
            _this.magiclistdata = [
                { label: 'magic_bomb_1', char: 301, charmList: [200, 0, 1, -1, 0] },
                { label: 'magic_flower_2', char: 302, price: 100, charmList: [200, 0, 0, 1, 1] },
                { label: 'magic_chicken_2', char: 303, price: 100, charmList: [200, 0, 1, -1, 0] },
                { label: 'magic_egg_1', char: 304, price: 100, charmList: [200, 0, 1, -1, 0] }
            ];
            //打赏配置
            _this.rewardData = [200, 1, 1, 0, 0];
            //内网配置 90
            _this.iRoom1 = [
                _this.createNormalRoom(101, 100, 200, 1000, 40000, 214, 15028, 4, false, 0, [1, 1, 1, 1, 1]),
                _this.createNormalRoom(102, 200, 400, 10000, 80000, 215, 15028, 201, false, 0, [2, 2, 2, 2, 2]),
                _this.createNormalRoom(103, 500, 1000, 20000, 400000, 223, 15129, 201, false, 0, [5, 5, 5, 5, 5]),
                _this.createNormalRoom(104, 3000, 6000, 360000, 1200000, 224, 15130, 201, false, 20000, [30, 30, 30, 30, 30]),
            ];
            _this.iRoom2 = [
                _this.createFreeRoom(201, 50, 100, 600, 2000, 302, 15155)
            ];
            _this.iRoom3 = [
                _this.copyRoomToFast(301, _this.iRoom1[0]),
                _this.copyRoomToFast(302, _this.iRoom1[1]),
                _this.copyRoomToFast(303, _this.iRoom1[2]),
                _this.copyRoomToFast(304, _this.iRoom1[3])
            ];
            _this.iRoom4 = [
                _this.createNormalRoom(401, 5000, 10000, 200000, 1000000, 216, 15140, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(402, 10000, 20000, 400000, 2000000, 266, 15141, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(403, 20000, 40000, 800000, 4000000, 267, 15142, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(404, 50000, 100000, 2000000, 10000000, 268, 15143, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(405, 100000, 200000, 4000000, 20000000, 269, 15144, 6, true, 0, [100, 100, 100, 100, 100])
            ];
            _this.iRoom5 = [
                _this.createHappyRoom(501, 100, [100, 1000, 10000], 20000, 1000, 100000, 188, 301, 15050, 4, [2, 2, 2, 2, 2]),
                _this.createHappyRoom(502, 100, [100, 1000, 10000], 20000, 1000, 100000, 188, 301, 15050, 4, [2, 2, 2, 2, 2]),
                _this.createHappyRoom(503, 1000, [1000, 1000, 10000], 100000, 10000, 1000000, 1888, 309, 15049, 4, [2, 2, 2, 2, 2])
            ];
            _this.iRoom6 = [
                _this.createPKRoom(601, 10, 20, 200, 1000000, 272, 15151),
                _this.createPKRoom(602, 1000, 2000, 100000, 5000000, 273, 15152),
                _this.createPKRoom(603, 2000, 4000, 1000000, 20000000, 274, 15153)
            ];
            _this.iRoom7 = [
                _this.createGirlRoom(701, 100, 200, 1000, 40000, 225, 15131)
            ];
            _this.iDealers = [];
            _this.iAnteList = [
                [0, 20000, 40000],
                [0, 50000, 100000],
                [0, 200000, 400000],
                [0, 400000, 800000],
                [0, 1000000, 2000000]
            ];
            //边锋平台的配置
            _this.bRoom1 = [
                _this.createNormalRoom(101, 100, 200, 1000, 40000, 4808, 705574, 4, false, 0, [1, 1, 1, 1, 1])
            ];
            _this.bRoom3 = [
                _this.copyRoomToFast(301, _this.bRoom1[0])
            ];
            //内网配置57 
            _this.mRoom1 = [
                _this.createNormalRoom(101, 10, 20, 500, 2000, 5001, 101, 6, false, 0, [1, 1, 1, 1, 1]),
            ];
            _this.mRoom2 = [
                _this.createFreeRoom(201, 50, 100, 600, 2000, 6000, 2)
            ];
            _this.mRoom3 = [
                _this.copyRoomToFast(301, _this.mRoom1[0]),
            ];
            _this.mRoom4 = [
                _this.createNormalRoom(401, 5000, 10000, 200000, 1000000, 216, 15140, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(402, 10000, 20000, 400000, 2000000, 266, 15141, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(403, 20000, 40000, 800000, 4000000, 267, 15142, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(404, 50000, 100000, 2000000, 10000000, 268, 15143, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(405, 100000, 200000, 4000000, 20000000, 269, 15144, 6, true, 0, [100, 100, 100, 100, 100])
            ];
            _this.mRoom5 = [
                _this.createHappyRoom(501, 100, [100, 1000, 10000], 20000, 1000, 100000, 188, 7000, 3, 4, [2, 2, 2, 2, 2]),
                _this.createHappyRoom(502, 100, [100, 1000, 10000], 20000, 1000, 100000, 188, 7000, 3, 4, [2, 2, 2, 2, 2]),
                _this.createHappyRoom(503, 1000, [1000, 1000, 10000], 100000, 10000, 1000000, 1888, 309, 15049, 4, [2, 2, 2, 2, 2])
            ];
            _this.mRoom6 = [
                _this.createPKRoom(601, 10, 20, 200, 1000000, 266, 15141),
                _this.createPKRoom(602, 1000, 2000, 100000, 5000000, 266, 15141),
                _this.createPKRoom(603, 2000, 4000, 1000000, 20000000, 266, 15141)
            ];
            _this.mRoom7 = [
                _this.createGirlRoom(701, 100, 200, 1000, 40000, 225, 15131)
            ];
            _this.mDealers = [];
            _this.mAnteList = [
                [0, 20000, 40000],
                [0, 50000, 100000],
                [0, 200000, 400000],
                [0, 400000, 800000],
                [0, 1000000, 2000000]
            ];
            //外网配置 71
            _this.pRoom1 = [
                _this.createNormalRoom(101, 10, 20, 500, 2000, 3953, 427, 6, false, 0, [1, 1, 1, 1, 1]),
            ];
            _this.pRoom2 = [
                _this.createFreeRoom(201, 50, 100, 600, 2000, 3900, 4118)
            ];
            _this.pRoom3 = [
                _this.copyRoomToFast(301, _this.pRoom1[0]),
            ];
            _this.pRoom4 = [
                _this.createNormalRoom(401, 5000, 10000, 200000, 1000000, 3752, 4051, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(402, 10000, 20000, 400000, 2000000, 3753, 4052, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(403, 20000, 40000, 800000, 4000000, 3754, 4053, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(404, 50000, 100000, 2000000, 10000000, 3755, 4054, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(405, 100000, 200000, 4000000, 20000000, 3756, 4055, 6, true, 0, [100, 100, 100, 100, 100])
            ];
            _this.pRoom5 = [
                _this.createHappyRoom(501, 100, [100, 1000, 10000], 20000, 1000, 100, 188, 3835, 4096, 4, [2, 2, 2, 2, 2]),
                _this.createHappyRoom(502, 100, [100, 1000, 10000], 20000, 1000, 100, 188, 3835, 4096, 4, [2, 2, 2, 2, 2]),
                //this.createHappyRoom(  100, [ 100, 1000, 10000],  20000,   1000,   100,   188,  3836, 4097, 4,[2,2,2,2,2]),
                _this.createHappyRoom(503, 1000, [1000, 10000, 50000], 100000, 10000, 1000, 1888, 3837, 4098, 4)
            ];
            _this.pRoom6 = [
                _this.createPKRoom(601, 10, 20, 200, 1000000, 3892, 4111),
                _this.createPKRoom(602, 1000, 2000, 100000, 5000000, 3893, 4112),
                _this.createPKRoom(603, 2000, 4000, 1000000, 20000000, 3894, 4113)
            ];
            _this.pAnteList = [
                [0, 20000, 40000],
                [0, 50000, 100000],
                [0, 200000, 400000],
                [0, 400000, 800000],
                [0, 1000000, 2000000]
            ];
            //正式配置
            _this.zRoom1 = [
                // id="4011" roomid="4154"
                _this.createNormalRoom(101, 10, 20, 500, 2000, 4011, 4154, 6, false, 0, [1, 1, 1, 1, 1]),
            ];
            _this.zRoom2 = [
                _this.createFreeRoom(201, 50, 100, 600, 2000, 3902, 4119)
            ];
            _this.zRoom3 = [
                _this.copyRoomToFast(301, _this.zRoom1[0]),
            ];
            _this.zRoom4 = [
                _this.createNormalRoom(401, 5000, 10000, 1000000, 2000000, 3808, 4088, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(402, 10000, 20000, 1000000, 4000000, 3808, 4088, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(403, 20000, 40000, 2000000, 10000000, 3808, 4088, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(404, 50000, 100000, 5000000, 20000000, 3808, 4088, 6, true, 0, [100, 100, 100, 100, 100]),
                _this.createNormalRoom(405, 100000, 200000, 10000000, 60000000, 3808, 4088, 6, true, 0, [100, 100, 100, 100, 100])
            ];
            _this.zRoom5 = [
                _this.createHappyRoom(501, 100, [100, 1000, 10000], 20000, 1000, 100, 188, 3846, 4102, 4, [2, 2, 2, 2, 2]),
                _this.createHappyRoom(502, 100, [100, 1000, 10000], 20000, 1000, 100, 188, 3847, 4103, 4, [2, 2, 2, 2, 2]),
                _this.createHappyRoom(503, 1000, [1000, 10000, 50000], 100000, 10000, 1000, 1888, 3848, 4104, 4)
            ];
            _this.zRoom6 = [
                _this.createPKRoom(601, 10, 20, 200, 1000000, 3895, 4114),
                _this.createPKRoom(602, 1000, 2000, 100000, 5000000, 3896, 4115),
                _this.createPKRoom(603, 2000, 4000, 1000000, 20000000, 3897, 4116)
            ];
            _this.zAnteList = [
                [0, 20000, 40000],
                [0, 50000, 100000],
                [0, 200000, 400000],
                [0, 400000, 800000],
                [0, 1000000, 2000000]
            ];
            _this.MIN_SILVER_LIMITED = 2000;
            _this.MIN_GOLD_LIMITED = 600;
            return _this;
        }
        /** 进入房间成功后，要刷新房间列表，并更新当前房间状态 */
        RoomProxy.prototype.resetRoom = function () {
            this.tableList = [];
            this.standupPlayers = [];
        };
        Object.defineProperty(RoomProxy.prototype, "displayTableList", {
            /** 房间里的桌子一直存在，这个函数用于返回要显示的列表 */
            get: function () {
                var displayList = [];
                var len = this.tableList.length;
                this.hasNoPassTable = false;
                for (var i = 1; i < len; ++i) {
                    var tableVO = this.tableList[i];
                    if (tableVO != null && tableVO.svrTableInfo.havePwd) {
                        continue; //跳过密码桌
                    }
                    // 有几张显示几张的逻辑 =========================================
                    if (!this.isEmptyTable(i)) {
                        this.hasNoPassTable = true;
                        displayList.push(tableVO);
                    }
                }
                return displayList;
            },
            enumerable: true,
            configurable: true
        });
        RoomProxy.prototype.getNumPlayers = function (table) {
            var numPlayers = 0;
            var len = table.sit.length;
            for (var i = 0; i < len; ++i) {
                if (table.sit[i] != null)
                    numPlayers++;
            }
            return numPlayers;
        };
        RoomProxy.prototype.searchPlayer = function (roleId, add) {
            if (add === void 0) { add = false; }
            var len = this.standupPlayers.length;
            for (var i = 0; i < len; ++i) {
                var player = this.standupPlayers[i];
                if (roleId == player.roleId) {
                    return player;
                }
            }
            len = this.tableList.length;
            for (i = 1; i < len; ++i) {
                var table = this.tableList[i];
                if (table == null)
                    continue;
                var sitArr = table.sit;
                var len2 = sitArr.length;
                for (var j = 0; j < len2; ++j) {
                    var player = sitArr[j];
                    if (player != null && player.roleId == roleId) {
                        return player;
                    }
                }
            }
            if (add) {
                var player = new room.PlayerVO();
                player.roleId = roleId;
            }
            return player;
        };
        /** 根据tableId(序号)找到tableInfo对象 */
        RoomProxy.prototype.updateTableInfo = function (tableInfo) {
            var tableId = tableInfo.svrId;
            var tableVO = this.tableList[tableId];
            if (tableVO == null) {
                tableVO = new room.TableVO();
                tableVO.sit = [];
                this.tableList[tableId] = tableVO;
            }
            tableVO.svrTableInfo = tableInfo;
        };
        RoomProxy.prototype.updatePlayerInfo = function (data) {
            if (!getProxy().isNormal)
                return;
            if (this.tableList == null || this.tableList.length == 0)
                return;
            if (data instanceof cyvos.PlayerStateInfo) {
                var stateInfo = data;
                var player = this.searchPlayer(stateInfo.roleId, true);
                if (player.tableId > 0) {
                    this.tableList[player.tableId].sit[player.sitId] = null;
                }
                player.state = stateInfo.state;
                player.tableId = stateInfo.tableId;
                player.sitId = stateInfo.sitorder;
            }
            else if (data instanceof cyvos.PlayerInfo) {
                var playerInfo = data;
                var player = this.searchPlayer(playerInfo.roleId, true);
                if (player.tableId > 0) {
                    this.tableList[player.tableId].sit[player.sitId] = null;
                }
                player.state = playerInfo.state;
                player.tableId = playerInfo.tableId;
                player.sitId = playerInfo.sitorder;
            }
            if (player.tableId > 0) {
                this.tableList[player.tableId].sit[player.sitId] = player;
            }
            else {
                this.standupPlayers.push(player);
            }
            // console.log("玩家["+player.roleId+"] 桌号:"+player.tableId+" 座位号:"+player.sitId+" 状态:"+player.state);
        };
        /** 随机找一个空位，全满返回-1 */
        RoomProxy.prototype.searchEmptySit = function (tableId) {
            var sitArr = this.tableList[tableId].sit;
            var len = this.tableList[tableId].svrTableInfo.chairs;
            if (this.currentType == 9 /* GRIL */)
                len -= 1; //荷官房最后一个位置不能坐
            //随机找个位置
            var i = Math.floor(Math.random() * len);
            //往后找看看有没有空位
            for (var j = i; j < len; ++j) {
                if (sitArr[j] == null)
                    return j;
            }
            //往前找看看有没有空位
            while (--i > -1) {
                if (sitArr[i] == null)
                    break;
            }
            return i;
        };
        /** 验证是否为空桌 */
        RoomProxy.prototype.isEmptyTable = function (tableId) {
            if (this.tableList[tableId] == null)
                return false;
            var sitArr = this.tableList[tableId].sit;
            var i = sitArr.length;
            while (--i > -1) {
                if (sitArr[i] != null)
                    return false;
            }
            return true;
        };
        /** 找一张空桌子，找不到返回-1 */
        RoomProxy.prototype.searchEmptyTable = function () {
            var times = 5;
            while (--times > -1) {
                var tableId = Math.floor(Math.random() * 98) + 1;
                if (this.isEmptyTable(tableId))
                    return tableId;
            }
            for (var j = tableId; j < 100; ++j) {
                if (this.isEmptyTable(j))
                    return j;
            }
            while (--tableId > -1) {
                if (this.isEmptyTable(tableId))
                    break;
            }
            return tableId;
        };
        RoomProxy.prototype.createJoinId = function (tableId) {
            var psd = Math.floor(Math.random() * 89) + 10;
            var index = 0, i = 0, ri = 0;
            var len4 = this.room4.length;
            var len6 = this.room6.length;
            for (i = 0; i < len4 || i < len6; ++i) {
                if (i < len6 && this.room6[i] == user.getProxy().currentRoom) {
                    index = i;
                    ri = 6;
                    break;
                }
                if (i < len4 && this.room4[i] == user.getProxy().currentRoom) {
                    index = i;
                    ri = 4;
                    break;
                }
            }
            // 两位密码 两位房号 两位桌号
            return psd * 10000 + ri * 1000 + index * 100 + tableId + "";
        };
        RoomProxy.prototype.parseTableId = function (joinNumber) {
            return parseInt(joinNumber) % 100;
        };
        RoomProxy.prototype.parseTablePsd = function (joinNumber) {
            return "VIP" + joinNumber; //自定义一个有规律的密码格式
        };
        /** 根据银两返回满足最小带入的房间 */
        RoomProxy.prototype.getRoomVOFromMinSilver = function (silver, roomList) {
            var i = roomList.length; //最后一个房间不参与匹配
            while (--i > -1) {
                if (silver > roomList[i].tuijianMinBank) {
                    return roomList[i];
                }
            }
            return null;
        };
        RoomProxy.prototype.getRoomVOByRoomId = function (roomId, isFast) {
            if (isFast === void 0) { isFast = false; }
            if (isFast) {
                var len = this.room3.length;
                for (var i = 0; i < len; ++i) {
                    if (this.room3[i].svrRoomId == roomId) {
                        return this.room3[i];
                    }
                }
            }
            else {
                var len = this.room1.length;
                for (var i = 0; i < len; ++i) {
                    if (this.room1[i].svrRoomId == roomId) {
                        return this.room1[i];
                    }
                }
                var len = this.room2.length;
                for (var i = 0; i < len; ++i) {
                    if (this.room2[i].svrRoomId == roomId) {
                        return this.room2[i];
                    }
                }
                var len = this.room5.length;
                for (i = 0; i < len; ++i) {
                    if (this.room5[i].svrRoomId == roomId) {
                        return this.room5[i];
                    }
                }
                var len = this.room7.length;
                for (i = 0; i < len; ++i) {
                    if (this.room7[i].svrRoomId == roomId) {
                        return this.room7[i];
                    }
                }
            }
            return null;
        };
        RoomProxy.prototype.getRoomVOByOfsId = function (ofsId, isFast) {
            if (isFast === void 0) { isFast = false; }
            if (isFast) {
                var len = this.room3.length;
                for (var i = 0; i < len; ++i) {
                    if (this.room3[i].svrOfsId == ofsId) {
                        return this.room3[i];
                    }
                }
            }
            else {
                var len = this.room1.length;
                for (var i = 0; i < len; ++i) {
                    if (this.room1[i].svrOfsId == ofsId) {
                        return this.room1[i];
                    }
                }
                // var len = this.room2.length;
                // for(var i = 0;i < len;++i) {
                //     if(this.room2[i].svrOfsId == ofsId) {
                //         return this.room2[i];
                //     }
                // }
                len = this.room5.length;
                for (i = 0; i < len; ++i) {
                    if (this.room5[i].svrOfsId == ofsId) {
                        return this.room5[i];
                    }
                }
            }
            return null;
        };
        RoomProxy.prototype.getRoomVOByJoinNumber = function (joinNumber) {
            if (!/^\d{6}$/.test(joinNumber))
                return null;
            var index = parseInt(joinNumber.charAt(3));
            var ri = parseInt(joinNumber.charAt(2));
            return ri == 4 ? this.room4[index] : this.room6[index];
        };
        RoomProxy.prototype.getRoomVOByCtId = function (ctId) {
            var roomList = [this.room1, this.room2, this.room3, this.room4, this.room5, this.room6, this.room7];
            var roomLength = roomList.length;
            for (var i = 0; i < roomLength; ++i) {
                var subRooms = roomList[i];
                var subRoomsLength = subRooms.length;
                for (var j = 0; j < subRoomsLength; ++j) {
                    if (subRooms[j].ctId == ctId)
                        return subRooms[j];
                }
            }
            return null;
        };
        RoomProxy.prototype.updateRoomVOFromSvr = function (xmlStr) {
            var xml = egret.XML.parse(xmlStr);
            var xmlNodes = xml.children;
            var len = xmlNodes.length;
            for (var i = 0; i < len; ++i) {
                var xmlNode = xmlNodes[0];
                if (xmlNode.name == "room") {
                    var ctId;
                    var roomVO = room.getProxy().getRoomVOByCtId(ctId);
                    roomVO.svrOfsId;
                    roomVO.svrRoomId;
                }
            }
        };
        RoomProxy.prototype.createPKRoom = function (ctId, smallBlinds, bigBlinds, minBank, maxBank, ofsId, roomId, svrMode, isVip, anti, charmList) {
            if (svrMode === void 0) { svrMode = 6; }
            if (isVip === void 0) { isVip = false; }
            if (anti === void 0) { anti = 0; }
            if (charmList === void 0) { charmList = []; }
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.maxBank = maxBank;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.svrMode = svrMode;
            roomVo.isVip = isVip;
            roomVo.anti = anti;
            roomVo.charmList = charmList;
            roomVo.type = 7 /* PK */;
            return roomVo;
        };
        RoomProxy.prototype.createFreeRoom = function (ctId, smallBlinds, bigBlinds, minBank, maxBank, ofsId, roomId) {
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.maxBank = maxBank;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.type = 8 /* FREE */;
            roomVo.svrMode = 4;
            roomVo.isVip = false;
            return roomVo;
        };
        RoomProxy.prototype.createGirlRoom = function (ctId, smallBlinds, bigBlinds, minBank, maxBank, ofsId, roomId) {
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.maxBank = maxBank;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.type = 9 /* GRIL */;
            roomVo.svrMode = 6;
            roomVo.isVip = false;
            return roomVo;
        };
        RoomProxy.prototype.createGirlTable = function (ctId, tableId, photo) {
            if (tableId === void 0) { tableId = 0; }
            if (photo === void 0) { photo = ""; }
            var table = new appvos.DealerTableVO();
            table.roomVO = this.getRoomVOByCtId(ctId);
            table.photo = "";
            return table;
        };
        RoomProxy.prototype.createNormalRoom = function (ctId, smallBlinds, bigBlinds, minBank, maxBank, ofsId, roomId, svrMode, isVip, anti, charmList, tuijianMinBank, isInsurance) {
            if (svrMode === void 0) { svrMode = 4; }
            if (isVip === void 0) { isVip = false; }
            if (anti === void 0) { anti = 0; }
            if (charmList === void 0) { charmList = []; }
            if (tuijianMinBank === void 0) { tuijianMinBank = 0; }
            if (isInsurance === void 0) { isInsurance = false; }
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.maxBank = maxBank;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.svrMode = svrMode;
            roomVo.isVip = isVip;
            roomVo.anti = anti;
            roomVo.charmList = charmList;
            roomVo.type = isVip ? 3 /* VIP */ : 1 /* NORMAL */;
            roomVo.tuijianMinBank = tuijianMinBank == 0 ? roomVo.minBank : tuijianMinBank;
            roomVo.isInsurance = isInsurance;
            return roomVo;
        };
        /** 最小投注、可以投注筹码量、最大投注、最小带入、普通座位带入、服务费、普通投注、投注上限
         * charmList[价格，魅力，魅力积分，对方魅力，对方魅力积分]
         */
        RoomProxy.prototype.createHappyRoom = function (ctId, smallBlinds, addBlinds, bigBlinds, minBank, normalBank, service, ofsId, roomId, svrMode, charmList) {
            if (svrMode === void 0) { svrMode = 4; }
            if (charmList === void 0) { charmList = []; }
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.addBlinds = addBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.normalBank = normalBank;
            roomVo.service = service;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.svrMode = svrMode;
            roomVo.charmList = charmList;
            roomVo.type = 6 /* HAPPY */;
            return roomVo;
        };
        RoomProxy.prototype.copyRoomToFast = function (ctId, roomVO) {
            var fastRoomVo = new appvos.RoomVO();
            fastRoomVo.ctId = ctId;
            fastRoomVo.smallBlinds = roomVO.smallBlinds;
            fastRoomVo.bigBlinds = roomVO.bigBlinds;
            fastRoomVo.minBank = roomVO.minBank;
            fastRoomVo.maxBank = roomVO.maxBank;
            fastRoomVo.svrOfsId = roomVO.svrOfsId;
            fastRoomVo.svrRoomId = roomVO.svrRoomId;
            fastRoomVo.svrMode = roomVO.svrMode;
            fastRoomVo.anti = roomVO.anti;
            fastRoomVo.isFast = true;
            fastRoomVo.type = 2 /* FAST */;
            fastRoomVo.charmList = roomVO.charmList;
            fastRoomVo.tuijianMinBank = roomVO.tuijianMinBank;
            fastRoomVo.isInsurance = roomVO.isInsurance;
            return fastRoomVo;
        };
        /** 是否允许进入(判断筹码是否足够) */
        RoomProxy.prototype.permit = function (roomVO) {
            if (roomVO == null || user.getProxy().svrGameData == null)
                return false;
            if (roomVO.type == 4 /* SNG */)
                return true;
            var silver = user.getProxy().svrGameData.silver;
            var limit = roomVO.minBank;
            return silver >= limit;
        };
        /**
         * 进入极带游戏房
         */
        RoomProxy.prototype.fastRoom = function () {
            console.log("极速游戏");
            var silver = user.getProxy().svrGameData.silver;
            var roomVO = room.getProxy().getRoomVOFromMinSilver(silver, room.getProxy().room3);
            if (roomVO == null) {
                var gold = user.getProxy().freeGold;
                var goldMis = mission.getProxy().getclvMissionInfos(mission.MissionType.godTree, mission.MissionSubType.god_tree);
                if ((goldMis.length > 0 && goldMis[0].status != mission.MissionState.obtaining) || gold >= this.MIN_GOLD_LIMITED) {
                    this.goldRoom();
                }
                else {
                    user.getProxy().openMoney();
                }
            }
            else {
                user.gotoRoom(roomVO);
            }
        };
        /**
         * 进入金币房游戏
         */
        RoomProxy.prototype.goldRoom = function () {
            // if (DEBUG) {
            //     user.gotoRoom(getProxy().room2[0]);
            //    return;
            //}
            var silver = user.getProxy().svrGameData
                ? user.getProxy().svrGameData.silver
                : 0;
            var gold = user.getProxy().freeGold;
            if (silver > this.MIN_SILVER_LIMITED) {
                tip.popSysCenterTip("您的彩豆财富大于2000，请前往其他场次进行游戏");
            }
            else if (gold < this.MIN_GOLD_LIMITED) {
                var m = mission.getProxy().getclvMissionInfos(mission.MissionType.free_broke, mission.MissionSubType.free_broke);
                if (user.getProxy().freeFlagCancel == true && m.length > 0 && m[0].status == 1) {
                    __OPEN_PRE_MOUDLE(AppReg.APP_FREEBROKE, m[0]);
                }
                else
                    __OPEN_PRE_MOUDLE(AppReg.APP_GOLD_TREE);
            }
            else {
                console.log("进入金币房");
                user.gotoRoom(getProxy().room2[0]);
            }
        };
        Object.defineProperty(RoomProxy.prototype, "current", {
            /** 当前房间对象 */
            get: function () {
                if (user.getProxy().currentRoom)
                    return user.getProxy().currentRoom;
                else {
                    var noRoom = new appvos.RoomVO();
                    noRoom.type = -1 /* NULL */;
                    return noRoom;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomProxy.prototype, "currentType", {
            /** 当前房间类型 */
            get: function () {
                return this.current == null ? -1 : this.current.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomProxy.prototype, "isAntiCheating", {
            /**是防作弊房间 无旁观*/
            get: function () {
                return this.current && this.current.svrMode == 201 /* ANTI_CHEATING */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomProxy.prototype, "isNormal", {
            /**是手动房，有旁观*/
            get: function () {
                return this.current && this.current.svrMode == 6 /* NORMAL */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomProxy.prototype, "isWaitingQueue", {
            /** 是否排队机制 */
            get: function () {
                return this.current && this.current.svrMode == 201 /* ANTI_CHEATING */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomProxy.prototype, "isHappyCity", {
            get: function () {
                return this.current && this.current.type == 6 /* HAPPY */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomProxy.prototype, "isMatch", {
            get: function () {
                return this.current && this.current.svrMode == 303 /* MATCH */;
            },
            enumerable: true,
            configurable: true
        });
        RoomProxy.prototype.getFakeDealerTableVO = function () {
            var dealerTableVO = new appvos.DealerTableVO();
            dealerTableVO.roomVO = this.getFakeRoomVO();
            dealerTableVO.dealerInfoVO = this.getFakeDealerInfoVO();
            dealerTableVO.numPlayers = 0;
            return dealerTableVO;
        };
        RoomProxy.prototype.getFakeDealerInfoVO = function () {
            var dealerInfoVO = new appvos.DealerInfoVO();
            dealerInfoVO.name = "大明哥";
            dealerInfoVO.online = 0;
            return dealerInfoVO;
        };
        RoomProxy.prototype.getFakeRoomVO = function () {
            // var roomVO = new appvos.RoomVO();
            // roomVO.maxBank = 40000;
            // roomVO.smallBlinds = 100;
            // roomVO.bigBlinds = 200;
            // roomVO.online = Math.floor(Math.random() * 10);
            var roomVO = this.room7[0];
            return roomVO;
        };
        RoomProxy.prototype.findNormalRoomByMaxBank = function (maxBank) {
            for (var i = 0; i < this.room1.length; i++) {
                if (this.room1[i].maxBank == maxBank)
                    return this.room1[i];
            }
            return null;
        };
        return RoomProxy;
    }(app.mvc.AbsractProxy));
    RoomProxy.NAME = "room_proxy";
    room.RoomProxy = RoomProxy;
    __reflect(RoomProxy.prototype, "room.RoomProxy");
})(room || (room = {}));
//# sourceMappingURL=RoomProxy.js.map