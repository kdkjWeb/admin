//import services from './sysMessageListServices'
import Axios from '@/server/index'
import scroll from 'better-scroll'
export default {
	data() {
		return {
			height: 0,
			
			sysMsgList: []
		}
	},
	methods:{
		goBack() {
			//断开socket链接
			this.$router.goBack()
		},
	
		
		//获取后台已经有的消息列表数据
		_initMessageList(){
			Axios.get('message/getAdvice').then(res=>{
				if(res.data.data.length>0){
					this.sysMsgList = res.data.data.reverse()
				}
			})
		},
	},
	mounted(){
		this._initMessageList()
		this.height = window.innerHeight + 'px'
		this.$nextTick(()=>{
			if(!this.Scroll){
				this.Scroll = new scroll(this.$refs['sysMsg'],{
					click: true
				})
			}else{
				this.Scroll.refresh();
			}
		})
	}
}