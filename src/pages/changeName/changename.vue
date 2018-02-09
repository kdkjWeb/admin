<template>
	<div class="mine">
		<div class="header">
			<mu-appbar 
			title="修改昵称" 
			class="header_title"
			style="text-align:center">
			    <mu-icon-button
			    style="position:absolute;left: 0;top:4px"
			    icon="chevron_left" 
			    slot="left"
			    @click="backFriends"/>
			</mu-appbar>
		</div>
		<div class="mine_wrapper">
			<mu-text-field
			hintText="请输入新昵称"
			type="text" 
			fullWidth
			v-model="userName"
			class="demo-divider-form"
			/>
		</div>
		<div class="passBtn">
			<mu-raised-button 
			label="保存" 
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

	export {default} from './changenameController';

</script>

<style type="text/css" scoped>
.mine{
	background: #f2f2f2;
	width: 100%;
	height: 100%;
}
.mine_wrapper{
	background-color: #fff;
	padding: 0 5% 10px;
	margin-top: 5%;
}
.demo-divider-form{
	font-size: 12px;
}
.passBtn{
	margin: 30px auto;
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