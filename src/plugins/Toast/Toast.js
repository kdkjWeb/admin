import toastVue from './Toast.vue'
let Toast = {};

Toast.install = (Vue, options) =>{
    let opt = {
        position:'middle',   // 默认显示位置
        duration:'2000'         // 持续时间
    }
    

    Vue.prototype.$toast = (options) => {
        if(document.getElementsByClassName('toast').length){
            // 如果toast还在，则不再执行
            return;
        }
        let toastConstructor = Vue.extend(toastVue);
        let tpl = new toastConstructor().$mount();

        tpl.show = true;
        tpl.message  = typeof options === 'string' ? options : options.message;
        tpl.position = options.position || opt.position;

        
        Vue.nextTick(()=>{
            document.body.appendChild(tpl.$el);

            setTimeout(function () {
             let _index = true;
             tpl.show = false;
             tpl.$el.addEventListener('transitionend',(e)=>{
              if(e.target === tpl.$el && _index){
                document.body.removeChild(tpl.$el);
                _index = false;
              }
             })
           }, options.duration || opt.duration)
        })
    }
}
export default  Toast