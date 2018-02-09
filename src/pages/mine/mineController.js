import {has, getItem , setItem, removeItem} from '@/utils/localStorage'
export default {
	data() {
		return {
			mineLsit: [{
				icon: 'icon-wode',
				color: '#dc8450',
				text: '修改昵称'
			},{
				icon: 'icon-mima',
				color: '#56b048',
				text: '修改密码'
			},{
				icon: 'icon-news',
				color: '#d4a426',
				text: '系统消息'
			},{
				icon: 'icon-news',
				color: '#d4a426',
				text: '用户建议'
			}]
		}
	},
	methods: {
		mineList(index){
			switch(index){
				case 0:
				this.$router.push('/changeName')
				break;
				case 1:
				this.$router.push('/changePassword')
				break;
				case 2:
				this.$router.push('/sysMessageList')
				break;
				case 3:
				this.$router.push('/sysAdviceList')
				break;
			}
		},
		logout() {
			//消除socket 以及保存的user信息
			removeItem('token')
			this.$router.push({
				name: 'Login'
			})
		}
	},
	computed: {
		user() {
			return this.$store.getters.getUser
		}
	},
	mounted() {
		//console.log(this.user)
	}
}