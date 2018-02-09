<template>
	<div id="login"> 
		<div class="loginContainer">
			<h2 class="text_center">登录</h2>
			<mu-text-field
			v-model="userName" 
			hintText="请输入用户名"
			type="text" 
			label="用户名" 
			fullWidth
			labelFloat
			:underlineShow="false"/>
			
			<mu-text-field 
			v-model="password"
			hintText="请输入密码"
			type="password" 
			label="密码"
			fullWidth
			labelFloat
			:underlineShow="false"/>
	
			<mu-raised-button 
			label="登录"
			secondary 
			fullWidth
			@click="login"/>
		</div>
	</div>
</template>

<script type="text/javascript">
	export {default} from './loginController'
</script>
<style>
	.mu-text-field-label{
		color: #fff;
	}
	.mu-text-field-hint{
		color: #ddd;
		font-size: 12px;
	}

</style>
<style type="text/css" scoped>
	#login{
		width: 100%;
		height: 100%;
		background-size: cover;
	}
    .loginContainer{
    	position: relative;
    	top: 20%;
    	padding: 5%;
    }
    
	.other_link_div{
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
	}
</style>