import Axios from '@/server/index'
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
export default {
	data() {
		return {
			userName: '',
			password: '',
		}
	},
	created(){
		if(getItem('token')){
			Axios.get('tokenLogin',{
				token: getItem('token')
			})
			.then(res=>{
				console.log(res)
				//存入vuex
				this.$store.commit('setUser', res.data.data)
				this.$router.push({
				path: '/index'
			})
			})
		}
	},
	methods: {
		//登录
		login() {
			if(!this.userName || !this.password){
				this.$toast('请输入用户名以及密码')
				return
			}			
			Axios.post('login',{
				phone: this.userName,
				password: this.password
			}).then(res=>{
				//console.log(res)
				//console.log(res.data.data.type)
				if(res.data.code == 500){
					this.$toast('用户名或密码错误，请重新登录!')
				}
				if(res.data.data.type == 2){
					//存入localStorage
					setItem({
						key: 'token',
						value: res.data.data.token
					})
					//存入vuex
					this.$store.commit('setUser', res.data.data)
					this.$router.push({
						path: '/index'
					})
				
				}else{
					this.$toast('你没有登录权限!')
				}
					
			},err=>{
				this.$toast('网络异常！')
			})
		}				
	}

}