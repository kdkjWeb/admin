import {getDeviceRatio} from './util.js'
export const api="http://192.168.20.3:8080/chatroom/admin/selectUsersList";
export var DEVICE_RATIO=getDeviceRatio();

export var DOWN_CONFIG={
	threshold:80*DEVICE_RATIO,
	stop:40*DEVICE_RATIO
}
/*上拉配置*/
export var UP_CONFIG={
	threshold:-80*DEVICE_RATIO,
}

 