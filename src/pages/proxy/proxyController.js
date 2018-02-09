import Axios from '@/server/index'
//import services from './proxyServices'
//import scroll from 'better-scroll'
//import {mapGetters} from 'vuex'

import{
	DEVICE_RATIO,
	DOWN_CONFIG,
	UP_CONFIG
} from './proxyApi.js'

import Scroller from '@/components/scroller.vue'
import Loading from '@/components/loading.vue'


export default {
	data() {
		return {
			inSearching:false,
            page:1,
	    	DEVICE_RATIO,
			DOWN_CONFIG,
			UP_CONFIG,

			//改变箭头的状态
			ActShow:{
				show: false,
				show1:false
			},
			height: 0,
			//current: 1,  //当前页码
			pageSize: 10,   //每次请求的数据条数
			//loadingMore:'加载更多',
			searchModel: '',   //收索框内容
			//isLoading: true,
			//所查询到的用户列表
			userList: [],
			user:{
				nickname:'',
				phone: '',
				grade: ''
			},
			editDialog: {
				show: false,
				value: '0',
				model: {
					id: '',
					nickName: '',
					level: '',
					date: '',
					phone: '',
					grade: '',
					pictureAddress: '',
					expireDate: '',
					minDate: ''
				}, 
			},

			levelList: [
				{
					key: 1,
					label: '1'
				},
				{
					key: 2,
					label: '2'
				},
				{
					key: 3,
					label: '3'
				},
			] 
		}
	},
	components:{
		Scroller,
		Loading
	},
	created() {
		this.height = (window.innerHeight -142) + 'px';
		this.editDialog.model.minDate = new Date()
	},
	methods:{
		//按时间排序
		timeSort(){
			//从高到底
			if(!this.ActShow.show){
				Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: this.pageSize*this.page,
						orderBy: 'expire_date',
						sort: 'desc'
				}).then(res=>{
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show = !this.ActShow.show
			}else{
				//从低到高
				Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: 10,
						orderBy: 'expire_date',
				}).then(res=>{
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show = !this.ActShow.show
			}
		},
		
		//按等级排序
		leavelSort(){
				//从高到底
			if(!this.ActShow.show1){
				Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: this.pageSize*this.page,
						orderBy: 'proxy_level',  
						sort: 'desc'
				}).then(res=>{
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show1 = !this.ActShow.show1
			}else{
				//从低到高
				Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: this.pageSize*this.page,
						orderBy: 'proxy_level',   // 以等级排序
				}).then(res=>{
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show1 = !this.ActShow.show1
			}
		},
		
		//点击搜索按钮查询
		search() {
			if(!this.searchModel){
				this.$toast('输入内容不能为空')
			}else{
			Axios.post('admin/selectUsersList',{
				type: 1,
				current: this.current,
				pageSize: this.pageSize*this.page,
				orderBy: 'nickname',
				keyWord: this.searchModel
			}).then(res=>{
				
				if(res.data.code == 500){
					this.userList = []
					this.$toast('找不到此用户')
				}
				this.userList = JSON.parse(res.data.data);
			}).catch(err=>{
				console.log(err)
			})
			}
		},
		
		//实时搜索
		selectUp(){
			Axios.post('admin/selectUsersList',{
				type: 1,
				current: this.current,
				pageSize: this.pageSize*this.page,
				orderBy: 'nickname',
				keyWord: this.searchModel
			}).then(res=>{
				if(res.data.code == 0){
					this.isLoading = false
					this.userList = JSON.parse(res.data.data);
				}
			})
		},
		
		//打开弹出选择框
		openDialog(user){
			this.editDialog.show = true
			Object.assign(this.editDialog.model,{
				id: user.id,
				nickName: user.nickname,
				phone: user.phone,
				level: user.proxyLevel,
				pictureAddress: user.pictureAddress,
				expireDate: this.transTime(user.expireDate)
			})
		},
		
		//点击弹出框确认按钮
		editSubmit() {
			this.editDialog.show = false
			if(this.editDialog.value == 1){
				Axios.post('admin/proxyToUser',{
					id: this.editDialog.model.id
				}).then(res=>{
					console.log(res.data.code)
					this.searchModel = ''
				
					if(res.data.code == 0){
						this.$toast('操作成功')
						Axios.post('admin/selectUsersList',{
							type: 1,
							current: 1,
							pageSize: this.pageSize*this.page,
							orderBy: 'nickname'
						}).then(res=>{
							this.userList = JSON.parse(res.data.data);
						})
					}
				})
			}


			if(this.editDialog.model.grade||this.editDialog.model.date){
				console.log(11)
				Axios.post('user/update',{
					id: this.editDialog.model.id,
					proxyLevel: this.editDialog.model.grade,
					expireDate: (new Date(this.editDialog.model.date)).getTime()
				}).then(res=>{
					if(res.data.code == 0){
			
						this.editDialog.model.grade = ''
						this.editDialog.model.date = ''
						this.$toast('操作成功')
						Axios.post('admin/selectUsersList',{
							type: 1,
							current: 1,
							pageSize: this.pageSize*this.page,
							orderBy: 'nickname'
						}).then(res=>{
							this.userList = JSON.parse(res.data.data);
						})
					}
				})
			}
			
		
		},
		
		// 点击弹出框取消按钮
		editCancel() {
			this.editDialog.show = false
			this.editDialog.model.grade = ''
			this.editDialog.model.date = ''
			this.searchModel = ''
			Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: this.pageSize*this.page,
						orderBy: 'nickname'
					}).then(res=>{
						this.userList = JSON.parse(res.data.data);
					})
		},

		pullUpHandle(val){      
			this.page++;
			this.fetchData((res)=>{
				this.scrollElement.PullingUpWord="加载完成";
				setTimeout(()=>{                        
					this.scrollElement.finish("PullUp");
					this.userList=JSON.parse(res.data.data); 
					if(this.pageSize*this.page-JSON.parse(res.data.data).length>=10&&this.page>1){
						this.$toast('没有更多数据')
					}
				},1000)       
			 })   	
		 },
		 pullDownHandle(val){         
			setTimeout(()=>{
				this.scrollElement.finish("PullDown");
				var l=this.userList.length;
				var random=Math.floor(Math.random()*l);
				this.userList.unshift(this.userList[random]);
			},2000)   		
		},
		filterDirectors(arr){
			var name="";         
			arr.forEach((item,i)=>{
				if(i==arr.length-1){
				   name+=item.name
				}else{
				   name+=item.name+" / "
				}               
			})
			return name                         
		},
		fetchData(callback){
			Axios.post('admin/selectUsersList',{
				type: 1,
				current: 1,
				pageSize: this.pageSize*this.page,
				orderBy: 'nickname'
			}).then(res=>{
				if(res.data.code == 0&&this.page==1){
					let userMore = JSON.parse(res.data.data);
					this.userList.push.apply(this.userList,userMore)			
				}
				if(res.data.data.length>0&&this.page>1){
					callback&&callback(res);
				}
				this.inSearching=false;
                
			}).catch(()=>{
				this.inSearching=false; 
				//alert("error");
				this.$toast('网络异常')
		   })
        },

		//转换时间戳成年月日
		transTime(val){
			var time = new Date(val);
			var year = time.getFullYear();
			var month = time.getMonth() > 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1);
			var day = time.getDate() > 10 ? time.getDate() : '0' + time.getDate();
			return (year + "-" + month + "-" + day);
		  },
	
	},
	mounted() {
		this.editDialog.model.minDate = new Date()

		// 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-142) + 'px';
        })
        
        //调用滚动插件初始化数据
	  // this._initScroll();
	  this.fetchData()
	},

	computed:{
        scrollElement(){
            return this.$refs.scroll
        }
    },
}