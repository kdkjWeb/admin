import Axios from '@/server/index'
import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
export default {
	data() {
		return {
			userName: '',
			successDialog: {
				show: false,
			}
		}
	},
	created() {
		this.userName = this.$store.state.user.nickname
	},
	methods: {
		save(){
			Axios.post('user/update',{
				nickname: this.userName,
				id: this.$store.state.user.id	
			}).then(res=>{
				if(res.data.code === 0){
					this.successDialog.show = true
					this.$store.commit('setNickname',this.userName)
				}
			})
			
		},
		
		backFriends(){
			this.$router.back(-1)
		},
		
		comfirmDialog() {
			this.successDialog.show = false
			this.$router.push({
				name: "Mine"
			})
		},
	}
}