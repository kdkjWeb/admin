<template>
	<div class="mine">
		<div class="header">
			<mu-appbar title="我的" class="header_title">
			   
			</mu-appbar>
		</div>
		<div id="user">
			<div class="userImg">
				<img width="75" height="75" :src="'static/6.jpg'">
			</div>
			<div class="userName">
				<h3>昵称</h3>
				<span  v-text="user.nickname"></span>
			</div>
		</div>
		<div class="mineContent">
			<ul>
				<li v-for="(item,index) in mineLsit" @click="mineList(index)">
					<i class="iconfont icon_right" 
					:class="item.icon" 
					:style="{color: item.color}"></i>
					<span class="mineContent_text">{{item.text}}</span>
					<i class="iconfont icon-arrowright"></i>
				</li>
			</ul>
		</div>

		<footer>
			<mu-raised-button 
			label="注销"
			secondary
			fullWidth
			@click="logout"/>
		</footer>
	</div>
</template>

<script type="text/javascript">

	export {default} from './mineController';

</script>

<style type="text/css" scoped>
footer{
	margin-top: 10px;
	padding: 0 20%;
}

.mine{
	background: #f2f2f2;
	width: 100%;
	height: 100%;
}
.header_title{
	text-align: center;
}
#user{
	padding: 10px 0 10px 10px;
	overflow: hidden;
	background-color: #fff;
}
.userImg{
	width: 75px;
	height: 75px;
	border-radius: 50%;
	float: left;
}
.userImg img{
	border-radius: 50%;
}
.userName{
	float: left;
	margin: 20px 0 0 20px;
}
.mineContent{
	background-color: #fff;
	margin-top: 20px;
}
.icon_right{
	font-size: 20px;
	font-weight: bold;
}
.mineContent_text{
	padding-left: 10px;
	font-size: 16px;
}
.mineContent ul li{
	padding: 15px;
	border-bottom: 1px solid #ddd;
}
.icon-arrowright{
	float: right;
	margin-right: 10px;
	font-weight: bold;
	font-size: 20px;
}
</style>




























