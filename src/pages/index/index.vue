<template>
	<div class="indexContainer">
		<div class="main">
			<router-view/>
		</div>
		<div class="footer">
			<mu-paper>
			  <mu-bottom-nav 
			  :value="bottomNav" 
			  @change="handleChange">
			    <mu-bottom-nav-item 
			    value="proxy" 
			    title="代理"
			    :to="{
			    	name: 'ProxyUsers'
			    }"
			    icon="assignment_ind"/>

			    <mu-bottom-nav-item 
			    value="people_outline" 
			    title="用户"
			    :to="{
			    	name: 'UserList'
			    }"
			    icon="people_outline"/>

			    <mu-bottom-nav-item 
			    value="person" 
			    title="我的"
			    :to="{
			    	name: 'Mine'
			    }" 
			    icon="person"/>
			  </mu-bottom-nav>
			</mu-paper>
		</div>
		
	</div>
</template>

<script type="text/javascript">
	export {default} from './indexController'
</script>

<style type="text/css" scoped>
    .indexContainer{
    	height: 100%;
    }
    .main{
    	position: relative;
    	height: calc(100% - 56px);
    	overflow: hidden;
    }
	.footer{
		position: fixed;
		bottom: 0;
		right:  0;
		left:  0;
	}
</style>