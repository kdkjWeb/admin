//import services from './sysMessageListServices'
import Axios from '@/server/index'
import scroll from 'better-scroll'
export default {
	data() {
		return {
			height: 0,
			suggestDialog: {
				show: false,
				model: '', //建议的model
				title: '', //建议的标题
			},
			sysMsgList: []
		}
	},
	methods:{
		goBack() {
			//断开socket链接
			this.$router.goBack()
		},
		//点击遮罩层关闭遮罩层和弹框
		close(){
			this.suggestDialog.show = false
		},
		
		/* 发布 */
		suggestSubmit() {
			
			//提交建议信息
			
			if(!this.suggestDialog.model||!this.suggestDialog.title){
				this.suggestDialog.show = true
				return
			}

			Axios.post('admin/addBroadCast',{
				msg: this.suggestDialog.model,
				date: (new Date).getTime(),
				title: this.suggestDialog.title
			}).then(res=>{
				if(res.data.code == 0){
					this.$toast('发布成功')
					 this.suggestDialog.model = ''
					 this.suggestDialog.title = ''
					 this._initMessageList()
					 this.Scroll.scrollTo(0, 0)
					 this.suggestDialog.show = false
				}
			},err=>{
				console.log(err)
			})
		},
		//点击弹出框的取消按钮
		suggestCancel() {
			this.suggestDialog.show = false
			this.suggestDialog.model = ''
			this.suggestDialog.title = ''
		},	
		//获取后台已经有的消息列表数据
		_initMessageList(){
			Axios.get('message/broadcast').then(res=>{
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