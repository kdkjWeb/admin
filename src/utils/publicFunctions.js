/**
 *  公用方法
 */

/**
 * 手机正则验证
 * @str  需要验证的string
 * @return Boolean 
 */
export function phoneRegExp(str){
	const pRegExp = /^[1][3,4,5,7,8][0-9]{9}$/
	if(pRegExp.test(str))
		return true
	return false
}