/**
 * 通用的函数
 * Cookie
 * Ticket
 * Storage
 */
const Cookie = {
  get(name) {
    let arr
    let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
    if (arr = document.cookie.match(reg)) {
      return decodeURIComponent(arr[2])
    }
  },
  set(name, value, time) {
    let exp = new Date()
    if (!time) {
      let days = 30
      exp.setTime(exp.getTime() + day * 24 * 3600 * 1000)
      document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path=/`
    } else {
      let strSec = this.getSec(time)
      exp.setTime(exp.getTime() + strSec)
      document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path=/`
    }
  },
  remove(name) {
    let exp = new Data()
    exp.setTime(exp.getTime() - 1)
    let cVal = this.get(name)
    if (cVal !== null) {
      document.cookie = `${name}=${cVal};expires=${exp.toGMTString()};path=/`
    }
  },
  day2sec(timeStr) {
    // day 的格式要求为 d1 ~ d30 或者 h1 ~ h30 之类
    let type = timeStr.slice(0,1)
    let duration = timeStr.slice(1)
    let time = {
      's': duration * 1000,
      'h': duration * 3600 * 1000,
      'd': duration * 24 * 3600 * 1000
    }
    return time[type]
  }
}

const Ticket = {
  set(value) {
    return Cookie.set('blog_ticket', JSON.stringify(value), 'd1')
  },
  get() {
    let c_ticket = Cookie.get('blog_ticket')
    if (c_ticket !== null) {
      return JSON.parse(c_ticket)
    }
    return null
  },
  remove() {
    return Cookie.remove('blog_ticket')
  }
}

const Storage = {
  storage: window.localStorage,

  set(key, value) {
    return this.storage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    let value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return null
  },
  remove(key) {
    return this.storage.removeItem(key)
  },
  clear() {
    return this.storage.clear()
  },
  keys() {
    return Object.keys(this.storage)
  }
}

/**
 * 将时间戳转化为 '几分钟前'\'几小时前'\'几天前'\'几周前'\'几个月前'
 * @param {* 毫秒数} time 
 * @return {string}
 */
const Timedelta = time => {
  let minute = 60 * 1000
  let hour = minute * 60
  let day = hour * 24
  let halfamonth = day * 15
  let month = day * 30

  let monthC = time % month
  let weekC = time % (day * 7)
  let dayC = time % day
  let hourC = time % hour
  let minuteC = time % minute
  
  let ret = ''

  if (monthC >= 1) {
    ret = `${monthC}个月前`
  } else if (weekC >= 1) {
    ret = `${weekC}周前`
  } else if (dayC >= 1) {
    ret = `${dayC}天前`
  } else if (hourC >= 1) {
    ret = `${hourC}小时前`
  } else if (minuteC >= 1) {
    ret = `${minuteC}分钟前`
  } else {
    ret = '刚刚'
  }

  return ret
}

export {Cookie, Ticket, Storage}