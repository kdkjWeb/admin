<template>
	<div style="height:100%">
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="代理">
				<mu-icon-button 
			    icon="" 
			    slot="left"/>
			    <mu-icon-menu
			     icon="unfold_more" 
			     slot="right"
			     :anchorOrigin="{vertical: 'top',horizontal: 'left'}"
		         :targetOrigin="{vertical: 'bottom',horizontal: 'left'}">
			    	<mu-menu-item class="time" 
			    	:class="{timeAct:ActShow.show}" 
			    	title="按时间"
			    	@click="timeSort"/>
				<mu-menu-item class="leavel" 
				:class="{leavelAct:ActShow.show1}" 
				title="按等级" 
				@click="leavelSort"/>
			    </mu-icon-menu>
			</mu-appbar>
		</div>
		<!--{{user}}-->
		<div class="content">
			<div class="middle">
				<div class="search">
					<input type="text" 
					placeholder="根据电话号码搜索" 
					v-model="searchModel"
					 @keyup="selectUp">
					<div class="verLine"></div>
					<mu-icon 
					value="search"
					@click="search"/>
				</div>
			</div>
			<Loading id="saerchingLoading" v-show="inSearching"></Loading>				
				<Scroller 
					id="scroll"
					ref="scroll" 
					:dataList="userList"
					:pullDownRefresh="DOWN_CONFIG"
					:pullUpLoad="UP_CONFIG"
					@onPullUp="pullUpHandle"
					@onPullDown="pullDownHandle">
					<mu-list style="padding: 0">
						<mu-list-item
						v-if="userList.length>0"
						v-for="(user, index) in userList"
						:key="index"
						style="border-bottom:1px solid #fafafa"
						:title="user.nickname +' ('+ user.phone +')'"
						:disabled="true">
						<mu-avatar 
						:src="user.pictureAddress?'static/headImg/'+user.pictureAddress+'.jpg':'static/headImg/6.jpg'" 
						slot="leftAvatar"/>
						<mu-icon 
						value="border_color"
						:size="16" 
						slot="right"
						color="#2196f3"
						@click.stop="openDialog(user)"/>
						</mu-list-item>
						<mu-content-block
						v-if="userList.length <= 0">
							您暂无用户哟，赶紧去加一个吧
						</mu-content-block>	    
					</mu-list>
    			</Scroller>		
						
		</div>

		<!-- 代理用户信息修改dialog -->
		<mu-dialog 
		:open="editDialog.show" 
		@close="editCancel"
		style="padding: 0"
		:dialogClass="['dialogClass']">
			<header>
				<div class="header">
					<mu-avatar
					:size="70" 
					slot="left" 
					:src="editDialog.model.pictureAddress?'static/headImg/'+editDialog.model.pictureAddress+'.jpg':'static/headImg/6.jpg'"/>
				</div>
				<div class="info">
					<p>
						<span>昵称:</span>
						<span v-text="editDialog.model.nickName"></span>
					</p>
					<p>
						<span>账号:</span>
						<span v-text="editDialog.model.phone"></span>
					</p>
					<p>
						<span>等级:</span>
						<span v-text="editDialog.model.level"></span>
					</p>
					<p>
						<span>到期:</span>
						<span v-text="editDialog.model.expireDate.startsWith('N')?'暂未设置时间':editDialog.model.expireDate"></span>
					</p>
				</div>
			</header>
			<div>
				<div class="options">
					<div class="up_Low">
						
						<mu-select-field 
						v-model="editDialog.model.grade"
						label="升降级" 
						fullWidth>
						    <mu-menu-item value="1" title="1"/>
						    <mu-menu-item value="2" title="2"/>
						    <mu-menu-item value="3" title="3"/>
					    </mu-select-field>
					</div>
					<div class="date">
						<span style="font-size:13px">代理时间:</span><mu-date-picker v-model="editDialog.model.date" :minDate="editDialog.model.minDate" hintText="请选择"/>
					</div>
					<div class="choose">
						<span>撤销代理商:</span>
						<mu-radio label="是" 
						name="group" 
						nativeValue="1" 
						v-model="editDialog.value" 
						class="demo-radio"
						:labelClass="['labelClass']"
						/>
						<mu-radio label="否" 
						name="group" 
						nativeValue="0" 
						v-model="editDialog.value" 
						class="demo-radio"
						:labelClass="['labelClass']"
						/>	
					</div>
				</div>
			</div>
			<footer>
				<mu-raised-button 
				label="确定" 
				secondary
				@click="editSubmit"/>

				<mu-raised-button
				label="取消" 
				primary
				@click="editCancel"/>
			</footer>
		</mu-dialog>
	</div>
</template>

<script type="text/javascript">
	export {default} from './proxyController'
</script>
<style type="text/css">
	.mu-dialog-body{padding: 0 !important;}
	.dialogClass{
		width: 81%;
	}
	.time::after{
		position: absolute;
		right: 10px;
		top: 23px;
		display: block;
		content: "\25BC";
		width: 10px;
		height: 10px;
		
	}
	.timeAct::after{
		position: absolute;
		right: 10px;
		top: 23px;
		display: block;
		content: "\25B2";
		width: 10px;
		height: 10px;
		
	}
	.leavel::after{
		position: absolute;
		right: 10px;
		top: 72px;
		display: block;
		content: "\25BC";
		width: 10px;
		height: 10px;
	}
	.leavelAct::after{
		position: absolute;
		right: 10px;
		top: 72px;
		display: block;
		content: "\25B2";
		width: 10px;
		height: 10px;
	}
</style>

<style type="text/css" scoped>
	.content{
		height: -webkit-calc(100% - 56px);
		height: -moz-calc(100% - 56px);
		height: calc(100% - 56px)
	}
	.middle{
		padding: 4% 0;
		background-color: #fafafa;
	}
	.search{
		width: 80%;
		margin: 0 auto;
		border: 1px solid #2196f3;
		display: flex;
		background-color: #fff;
		padding: 2% 5%;
		border-radius: 20px;
	}
	.search input{
		border: none;
		width: 100%;
	}
	.verLine{
		width: 1px;
		height: 24px;
		background: #2196f3;
		margin: 0 9px;
	}
	.userList{
		background-color: #fff;
		height: -webkit-calc(100% - 71px);
		height: -moz-calc(100% - 71px);
		height: calc(100% - 71px);
		overflow: hidden;
	}


	/**
	 * dialog
	 */
	
	header{
		display: flex;
		background-color: #039be5;
		padding: 5% 10%;
	}
	header .header{
		margin: 18px 20px 0 0;
	}
	header p{
		margin-bottom: 10px;
		font-size: 13px;
		color: #fff;
	}
	.options{
		padding: 0 5%;
	}
	footer{
		padding: 5% 10%;
		display: flex;

		justify-content: space-between;
		width: 100%;
	}
	.loadingMore{
		
		display: block;
		width: 100%;
		height:35px;
		line-height: 35px;
		background: rgba(0,0,0,.1);
		/*background: red;*/
		text-align: center;
		color: #fff;
	}


	.choose{
		display: flex;
  		align-items: center;
  		justify-content: center;
  		margin: 7% 0;
  		color: #000;
	}
	.choose span{
		margin-right: 10px;
	}
	.demo-radio{
		padding-right: 3%;
	}

	#scroll{
		top:112px;
	}
</style>