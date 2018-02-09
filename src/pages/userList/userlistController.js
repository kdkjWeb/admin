//import services from './userlistServices'
import Axios from '@/server/index'
//import scroll from 'better-scroll'
import{
	DEVICE_RATIO,
	DOWN_CONFIG,
	UP_CONFIG
} from './userApi.js'

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
			isdisabled: false,
			//loadHeight: 0,
			height: 0,
			//current: 1,  //当前页码
			pageSize: 20,   //每次请求的数据条数
			//loadingMore:'加载更多',
			searchModel: '',   //收索框内容
			//所查询到的用户列表
			userList: [],
			proxyUser: {
				nickName: '',
				phone: ''
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
					pictureAddress: ''
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
		this.height = (window.innerHeight-142) + 'px';
	},
	methods:{
		
		//按时间排序
		timeSort(){
			//从高到底
			if(!this.ActShow.show){
				Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: this.pageSize*this.page,
						orderBy: 'regist_time',
						sort: 'desc'
				}).then(res=>{
					console.log(res.data.data)
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
						type: 0,
						current: this.current,
						pageSize: 10,
						orderBy: 'regist_time',
				}).then(res=>{
					console.log(res.data.data)
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
				console.log(11)
				Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: this.pageSize*this.page,
						orderBy: 'level',
						sort: 'desc'
				}).then(res=>{
					console.log(res.data.data)
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show1 = !this.ActShow.show1
			}else{
				console.log(22)
				//从低到高
				Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: 10,
						orderBy: 'level',
				}).then(res=>{
					console.log(res.data.data)
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
				type: 0,
				current: this.current,
				pageSize: this.pageSize*this.page,
				orderBy: 'nickname',
				keyWord: this.searchModel
			}).then(res=>{
				if(res.data.code == 500){
					this.userList = []
					this.$toast('找不到此用户')
					setTimeout(function(){
						var that = this;
						that.fetchData();
					},1000)
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
				type: 0,
				current: 1,
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
		
		//点击弹出框的确认按钮
		editSubmit() {
			this.editDialog.show = false
			if(this.editDialog.value == 1){
				
				Axios.post('admin/upToProxy',{
					id: this.editDialog.model.id
				}).then(res=>{
					this.searchModel = ''
					
					if(res.data.code == 0){
						this.$toast('操作成功')
						Axios.post('admin/selectUsersList',{
							type: 0,
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
		
		//点击弹出框的取消按钮
		editCancel() {
			
			Axios.post('admin/selectUsersList',{
						type: 0,
						current: 1,
						pageSize: this.pageSize*this.page,
						orderBy: 'nickname'
					}).then(res=>{
						this.editDialog.show = false
						this.searchModel = ''
						this.userList = JSON.parse(res.data.data);
					})
		},
		
		// 点击操作弹出框显示
		openDialog(user){
			
			if(user.type == 3){
				this.$toast('该用户机器人，不能操作')
			}else{
				Axios.post('admin/getProxyMsg',{
					id: user.id,
				}).then(res=>{
					if(res.data.code == 0){
						Object.assign(this.proxyUser,{
						nickName: JSON.parse(res.data.msg).nickname,
						phone: JSON.parse(res.data.msg).phone,
						
					})
					}
				})
				this.editDialog.show = true
				Object.assign(this.editDialog.model,{
					id: user.id,
					nickName: user.nickname,
					phone: user.phone,
					level: user.level,
					pictureAddress: user.pictureAddress
				})
			}
			
			
		},
		

		pullUpHandle(val){  
			this.page++;    
			this.fetchData((res)=>{
				this.scrollElement.PullingUpWord="加载完成";
				setTimeout(()=>{                        
					this.scrollElement.finish("PullUp");
					this.userList=JSON.parse(res.data.data); 
					if(this.pageSize*this.page-JSON.parse(res.data.data).length>=20&&this.page>1){
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
			 console.log(this.page)
			Axios.post('admin/selectUsersList',{
				type: 0,
				current: 1,
				pageSize: this.pageSize*this.page,
				orderBy: 'nickname'
			}).then(res=>{
				if(res.data.code == 0&&this.page==1){
					console.log(this.page)
					let userMore = JSON.parse(res.data.data);
					this.userList.push.apply(this.userList,userMore)		
					console.log(1)	
					return;
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
        }
		
	},
	mounted() {
		
		// 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-142) + 'px';
		})
		

		this.fetchData()
	},
	 

	computed:{
        scrollElement(){
            return this.$refs.scroll
        }
    },
}