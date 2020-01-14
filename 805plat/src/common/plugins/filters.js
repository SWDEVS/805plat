import moment from 'moment'
import { Toast } from 'cube-ui'
export function fmoney(num) {
  num = num * 1;
  let numstr = num.toFixed(2);
  return numstr;
}
//设置cookie
export function setCookie(c_name, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
};
//获取cookie
export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      let c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
};
/*删除cookie*/
export function delCookie(c_name) {
  setCookie(c_name, "", -1)
};

//数字加千分号
export function formatNumberRgx(num) {
  if (num) {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  else {
    return 0.00;
  }
}

//时间戳转日期
export function timestampToDate(timestamp) {
  let datestr = ""
  if (timestamp) {
    timestamp = timestamp.toString();
    if (timestamp.length === 10) {
      timestamp += "000"
    }
    let dateobj = new Date(parseInt(timestamp));
    datestr = timeFormat(dateobj, "YYYY-MM-DD");
  }
  return datestr;
}

//时间格式转换
export function timeFormat(value, format, src = 'YYYY-MM-DD') {

  return moment(value, src).format(format)
}

export function formatmoney(money) {
  money = (money / 100).toFixed(2)
  return money;
}
//充值状态转换
export function formatstatus(status) {
  let statusenum = {
    "1": "充值中",
    "2": "成功",
    "3": "失败",
    "4": "关闭"
  }
  return statusenum[status];
}
// local操作
/*
* 参数说明：
* method：get获取，set存入或覆盖，clean清除
* name:localStorage的名称
* obj:存入的内容，可以是任意类型
* localStorage.getItem(key):获取指定key本地存储的值
* localStorage.setItem(key,value)：将value存储到key字段
* localStorage.removeItem(key):删除指定key本地存储的值
* */
export function localData(method, name, obj) {
  switch (method) {
    case 'get':
      if (localStorage.getItem(name + '_obj')) {
        return JSON.parse(localStorage.getItem(name + '_obj'));
      } else if (localStorage.getItem(name + '_str')) {
        return localStorage.getItem(name + '_str');
      } else {
        return null
      }
    case 'set':
      localData('clean', name);
      if (typeof obj == 'object') {
        localStorage.setItem(name + '_obj', JSON.stringify(obj));
      } else {
        localStorage.setItem(name + '_str', obj);
      }
      return true;
    case 'clean':
      localStorage.removeItem(name + '_obj');
      localStorage.removeItem(name + '_str');
      return true;
  }
}
// session操作
/*
 * 参数说明：
 * method：get获取，set存入或覆盖，clean清除
 * name:session的名称
 * obj:存入的内容，可以是任意类型
 * */
export function sessionData(method, name, obj) {
  switch (method) {
    case 'get':
      if (sessionStorage.getItem(name + '_obj')) {
        return JSON.parse(sessionStorage.getItem(name + '_obj'));
      } else if (sessionStorage.getItem(name + '_str')) {
        return sessionStorage.getItem(name + '_str');
      } else {
        return null
      }
    case 'set':
      sessionData('clean', name);
      if (typeof obj == 'object') {
        sessionStorage.setItem(name + '_obj', JSON.stringify(obj));
      } else {
        sessionStorage.setItem(name + '_str', obj);
      }
      return true;
    case 'clean':
      sessionStorage.removeItem(name + '_obj');
      sessionStorage.removeItem(name + '_str');
      return true;
  }
}
export function showToastTxtOnly(txt,type,time,func){
  const toast = Toast.$create({
    txt: txt,
    type: type ? type : 'txt',
    time: time,
    $events: {
      timeout: () => {
        func()
      }
    }
  })
  toast.show();
}