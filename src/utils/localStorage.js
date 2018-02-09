/**
 * 对localStorage 的操作方法
 */

const KEY = 'textRecognize_app',
      localStorage = window.localStorage
let myStorage

let init = ()=>{
	try {
	    if (!myStorage) {
	      myStorage = JSON.parse(localStorage.getItem(KEY) || '{}')
	    } else {
	      localStorage.setItem(KEY, JSON.stringify(myStorage))
	    }
	}catch (e) {
	    console.log(e)
	}
}

init()

export function has(key) {
  return Object.hasOwnProperty.call(myStorage, key)
}

export function getItem(key) {
  if (!has(key)) {
    return false
  }

  const { value, duration, time } = myStorage[key] || {}

  if (Date.now() - time <= duration) {
    return value
  }

  removeItem(key)
  return false
}

export function setItem({key, value }) {
  const duration = Number.MAX_SAFE_INTEGER
  myStorage[key] = {
    value,
    duration,
    time: Date.now()
  }
  init()
}

export function removeItem(key) {
  if (has(key)) {
    delete myStorage[key]
    init()
  }
}

export function clear() {
  myStorage = {}
  init()
}