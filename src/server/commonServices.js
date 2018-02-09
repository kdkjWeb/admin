import Axios from './index'

/**
 * 公用的server 方法
 */

export default {
//拿数据
	fetch: ({url, model, Vue, hidenLoading})=>{
//		if(!hidenLoading) 
//			Vue.$Loading.process()
		return new Promise((resolve, reject)=>{
			Axios.get(url, {
				params: model
			})
			.then(res=>{
				
				if(!hidenLoading)  Vue.$Loading.done()
				if(res.data.code === 0){
					resolve(res.data.data || res.data)
				}else{
					Vue.$toast(res?res.data.msg:"网络好像出问题了 = v =")
					reject(res)
					console.log(res)
				}
			}, errRes=>{
				console.log()
				if(!hidenLoading)  Vue.$Loading.done()
				Vue.$toast(errRes && errRes.data?errRes.data.msg : "网络好像出问题了 = v =")
				console.log(errRes)
				reject(errRes)
			})
			.catch(err=>{
				if(!hidenLoading)  Vue.$Loading.done()
				Vue.$toast("网络好像出问题了 = v =")
				console.log(err)
				reject(err)
			})
		})
	},
	//post数据	
	transport:({url, model, Vue, hidenLoading})=>{
		return new Promise((resolve, reject)=>{
			
			Axios.post(url, model)
			.then(res=>{
			
				if(!hidenLoading)  Vue.$Loading.done()
				if(res.data.code === 0){
					resolve(res.data.data || res.data)
				}else{
					Vue.$toast(res?res.data.msg:"网络好像出问题了 = v =")
					reject(res)
					console.log(res)
				}
			},errRes=>{
				if(!hidenLoading)  Vue.$Loading.done()
				Vue.$toast(errRes && errRes.data?errRes.data.msg : "网络好像出问题了 = v =")
				console.log(errRes)
				reject(errRes)
			})
			.catch(err=>{
				if(!hidenLoading)  Vue.$Loading.done()
				Vue.$toast("网络好像出问题了 = v =")
				console.log(err)
				reject(err)
			})
		})
	}
}