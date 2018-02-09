/**
 *  axios config manage
 */
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
import Vue from 'Vue'
import axios from 'axios'

const axios_conf = axios.create({
	//baseURL: 'http://192.168.20.50:8081', //ph
	//baseURL: 'http://192.168.20.3:8080/chatroom',  // zxc
	baseURL: 'http://192.168.20.136:8088/chatroom', //fwq
	timeout: 30000, //所有请求30s后过期
	withCredentials: true, //跨域凭证
	headers: {'token':getItem('token')}
})

Object.defineProperty(Vue.prototype, '$axios', { value: axios_conf})

export default axios_conf