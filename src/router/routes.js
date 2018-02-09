/* 管理项目整个路由的加载 */

const Login = ()=>import('@/pages/login/login'), // 登录
	  Index = ()=>import('@/pages/index/index'), //主要一级页面
	  ProxyUsers = ()=>import('@/pages/proxy/proxy') //代理


const Mine = ()=>import('@/pages/mine/mine'),   //我的 
	  ChangeName =()=>import('@/pages/changeName/changename'),   //修改用户名
 	  ChangePassword =()=>import('@/pages/changePassword/changepassword'),    //修改密码
 	  SysMessageList = ()=>import('@/pages/sysMessageList/sysMessageList'), //推送消息列表
 	  SysMessageDetail = ()=>import('@/pages/sysMessageDetail/sysMessageDetail'), //系统消息
	  UserList =()=>import('@/pages/userList/userlist'),   //用户列表
	  SysAdviceList =()=>import('@/pages/sysAdviceList/sysAdviceList')
 	 
export default {
	routes: [
		{
			path: '/',
		    name: 'Login',
		    component: Login
		},
		{
			path: '/index',
			name: 'Index',
			component: Index,
			redirect: '/index/proxy',
			children: [
				{
					path: 'proxy',
					name: 'ProxyUsers',
					component: ProxyUsers
				},
				{
					path: 'mine',
					name: 'Mine',
					component: Mine
				},
				{
					path: 'userlist',
					name: 'UserList',
					component: UserList
				}
			]
		},
		
		{
			path: '/changename',
			name: '/ChangeName',
			component: ChangeName
		},
		{
			path: '/changePassword',
			name: '/ChangePassword',
			component: ChangePassword
		},
		{
			path: '/sysMessageList',
			name: 'SysMessageList',
			component: SysMessageList
		},
		{
			path: '/sysMessageDetail',
			name: 'SysMessageDetail',
			component: SysMessageDetail
		},{
			path: '/sysAdviceList',
			name: 'SysAdviceList',
			component: SysAdviceList
		}
	]
}