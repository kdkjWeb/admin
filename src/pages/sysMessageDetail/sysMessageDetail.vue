<template>
	<div class="systemnews">
		<div class="header">
			<mu-appbar 
			title="消息详情" 
			class="header_title"
			style="text-align:center">
			    <mu-icon-button
			    style="position:absolute;left: 0;top:4px"
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>
			</mu-appbar>
		</div>
		<div class="content" :style="{height: height}" ref="content">
			<div>
				<div class="systemnews_title">
					<mu-card-header 
					:title="title" 
					:subTitle="subTitle"
					:titleClass="['titleSize']">
					</mu-card-header>
				</div>
				<div class="systemnews_comtent">{{comtent}}</div>
			</div>
		</div>
		
	</div>
</template>

<script type="text/javascript">

	export {default} from './sysMessageDetailController';
	
</script>

<style type="text/css">
.titleSize{
	font-size: 20px !important;
}
</style>

<style type="text/css" scoped>

.systemnews_title{
	border-bottom: 1px solid #ddd;
}
.systemnews_comtent{
	padding: 15px 20px;
	font-size: 14px;
	word-break: break-all;
}
.content{
	overflow: hidden;
}
</style>




























