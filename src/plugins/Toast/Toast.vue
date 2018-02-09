<template>

  <transition name="toast_fade" >
    <div 
    class="toast"
    :class="position" 
    v-if="show">
      <div class="dialog_shadow"></div>
      <div class="toast_main">
        <i v-text="message?message:'这是主要的toast内容'"></i>
      </div>
    </div>
  </transition>
  
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        message: "",
        position: ""
      }
    },
  }
</script>

<style scoped="">
  .top{
    top:  10%;
  }
  .middle{
    top:  45%;
  }
  .bottom{
    top:  90%;
  }

  .toast{
    position: fixed;
    width:  100%;
    z-index: 102;
    text-align: center;
  }
  .dialog_shadow{
    position: fixed;
    width:100%;
    height:100%;
    left:0; 
    top:0; 
    z-index: 101;
  }
  .toast_main{
    display: inline-block;
    width: 60%;
    border-radius: 15px;
    padding:  3% ;
    color:  #fff;
    background-color: #000;
    opacity: 0.7;
    overflow: hidden;
  }

  .toast_fade-enter-active, .toast_fade-leave-active{
    transition:  all .5s;
    -webkit-transition:  all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
  }
  .toast_fade-enter, .toast_fade-leave-to{
    transform:  scale(0, 0);
    -ms-transform: scale(0, 0);   /* IE 9 */
    -moz-transform: scale(0, 0);  /* Firefox */
    -webkit-transform: scale(0, 0); /* Safari 和 Chrome */
    -o-transform: scale(0, 0);  /* Opera */
    opacity: 0;
  }
</style>