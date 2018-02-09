<template>
	<div style="height: 100%" >
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="消息推送">

				<mu-icon-button 
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>

			    <mu-raised-button
			    label="发布" 
			    class="demo-raised-button"
			    slot="right" 
			    secondary
			    @click="suggestDialog.show = true"/>
			</mu-appbar>
		</div>
		<div class="content" ref="sysMsg">
		
			<mu-list>
				<div
				style="border-bottom: 1px solid #f1f1f1"
				v-for="(msg, index) in sysMsgList"
				:key="index"
				@click="$router.push({
					name: 'SysMessageDetail',
					query: { msg: msg}
				})">
					<mu-list-item 
					:title="msg.title" 
					:afterText="msg.date">
					</mu-list-item>
					<!-- <mu-divider/> -->
				</div>
			</mu-list>
		
		</div>
		<!-- 建议弹出框 -->
	
		<div id="dialog" v-show="suggestDialog.show" @close="suggestCancel">
			<mu-text-field
			v-model="suggestDialog.title" 
			hintText="请输入标题"
			type="text" 
			fullWidth
			/>
			<mu-text-field 
			hintText="推送建议:" 
			multiLine :rows="3" 
			:rowsMax="6"
			v-model="suggestDialog.model"
			fullWidth/>
			<div class="footer">
				<mu-raised-button 
				secondary 
				@click="suggestSubmit"
				label="确定"/>
				<mu-raised-button 
				@click="suggestCancel" 
				primary 
				label="取消"/>
			</div>
		</div>
		<!--遮罩层-->
		<div class="layout"
			:style="{height:height}"
			v-show="suggestDialog.show"
			@click="close"
			></div>  
	</div>
</template>

<script type="text/javascript">
	export {default} from './sysMessageListController'
</script>
<style>
   .mu-card-header-title{
	   padding: 0;
   }
   .mu-item-title{
	   overflow: hidden;
	   text-overflow:ellipsis;
	   white-space: nowrap;
   }
</style>
<style type="text/css" scoped>
	.content{
		overflow: hidden;
		height: -webkit-calc(100% - 56px);
		height: -moz-calc(100% - 56px);
		height: calc(100% - 56px);
	}
	.layout{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background-color: rgba(0,0,0,.1);
	}
	#dialog{
		position: fixed;
		width: 75%;
		margin: 0 auto;
		background: #fff;
		z-index: 999;
		left: 12.5%;
		top: 50%;
		transform: translateY(-50%);
		padding: 24px;
	}
	.footer{
		display: flex;
		justify-content: space-between;
	}
</style>