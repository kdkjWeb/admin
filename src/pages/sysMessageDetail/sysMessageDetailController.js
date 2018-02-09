import services from './sysMessageDetailServices'
import Axios from '@/server/index'
import scroll from 'better-scroll'
export default {
	data() {
		return {
			height: 0,
			title: '',
			subTitle: '',
			comtent: ''
		}
	},
	methods: {	
		//返回上一页
		goBack(){
			this.$router.goBack()
			//返回重新请求数据
			Axios.get('message/broadcast').then(res=>{
				this.sysMsgList = res.data.data.reverse()
			})
		
		},
		
	},
	mounted() {
		this.title = this.$route.query.msg.title
		this.subTitle = this.$route.query.msg.date
		this.comtent =this.$route.query.msg.msg

		this.height = window.innerHeight - 57 + 'px'
		//给显示内容超过以后添加滚动效果
		this.$nextTick(()=>{
			if(!this.Scroll){
				this.Scroll = new scroll(this.$refs['content'],{
					click: true
				})
			}else{
				this.Scroll.refresh();
			}
		})
	}
}