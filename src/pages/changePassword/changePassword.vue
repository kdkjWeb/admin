<template>
	<div class="changePassword">
		<div class="header">
			<mu-appbar 
			title="修改密码" 
			class="header_title"
			style="text-align:center">
			    <mu-icon-button
			    style="position:absolute;left: 0;top:4px"
			    icon="chevron_left" 
			    slot="left"
			    @click="backFriends"/>
			</mu-appbar>
		</div>
		<mu-paper class="changePassword_model">
		  <mu-text-field hintText="请输入原始密码"
		  class="demo-divider-form"
		  v-model="oldPassword"
		  type="password"
		  fullWidth
		  />

		  <mu-text-field hintText="请输入新密码" 
		  class="demo-divider-form" 
		  v-model="newPassword"
		  type="password" 
		  fullWidth
		  />

		  <mu-text-field hintText="请再次输入新密码" 
		  class="demo-divider-form" 
		  v-model="lastPassword"
          type="password" 
          fullWidth
		  />

		</mu-paper>
		<div class="passBtn">
			<mu-raised-button label="确定" 
			class="demo-raised-button" 
			secondary
			@click="save"/>
		</div>
		
		<!-- 修改成功dialog -->
		<mu-dialog :open="successDialog.show">
			修改成功!!
		    <mu-raised-button 
			label="确定" 
			secondary
			fullWidth
			slot="actions" 
			@click="comfirmDialog"/>
	    </mu-dialog>
	</div>
</template>

<script type="text/javascript">

	export {default} from './changePasswordController';

</script>

<style type="text/css" scoped>
.changePassword{
	background: #f2f2f2;
	width: 100%;
	height: 100%;
	
}
.changePassword_model{
	box-shadow: none;
	padding: 5px 10% 25px 0;
	margin-top: 5%;
}
.demo-divider-form {
    margin-bottom: -15px;
    margin-left: 20px;
    font-size: 12px;
    margin-top: 5px;

  }
.passBtn{
	margin: 50px auto;
	width: 40%;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	color: #fff;	
}
.passBtn .demo-raised-button{
	width: 100%;
	height: 100%;
	background: #429fe2;
	border-radius: 6px;
}
</style>




























