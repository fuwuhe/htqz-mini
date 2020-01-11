const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const Baseurl = 'https://htqz.0791jr.com/api'

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//手机号码加密
const PhonenumEncrypt = num => {
  return num.substr(0, 3) + '****' + num.substr(7, 11);
}
//
const BankcardEncrypt = num => {
  console.log(1)
}
const TimeDown =(start,end)=> {
  var endDate = new Date(end*1000);
  var nowDate = new Date();
  //相差的总秒数
  var totalSeconds = parseInt((endDate - nowDate) / 1000);
  //天数
  var days = Math.floor(totalSeconds / (60 * 60 * 24));
  //取模（余数）
  var modulo = totalSeconds % (60 * 60 * 24);
  //小时数
  var hours = Math.floor(modulo / (60 * 60));
  hours = (days) * 24 + hours < 10 ? '0' + (days) * 24 + hours : (days) * 24 + hours;
  modulo = modulo % (60 * 60);
  //分钟
  var minutes = Math.floor(modulo / 60) < 10 ? '0' + Math.floor(modulo / 60) : Math.floor(modulo / 60);
  var seconds = modulo % 60 < 10 ? '0' + modulo % 60 : modulo % 60;
  var times;
  if ((hours == '000' || hours == '00' ) && minutes == '00' && seconds == '00'){
    times = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      now:'yes'
    }
  }else{
    times = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      now:'no'
    }
  }
  
  return times;
  setTimeout(function () {
    TimeDown(id, endDateStr);
  }, 1000)
}

const Num2date=(num) =>{
  var date = new Date(num*1000); 
  var y = date.getFullYear()+'.'; 
  var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'; 
  var d = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()); 
  return y+m+d
}
const Num2time = (num) => {
  var date = new Date(num * 1000);
  var y = date.getFullYear() + '-';
  var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var d = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate())+' ';
  var h = (date.getHours() + 1 < 10 ? '0' + date.getHours() : date.getHours())+':';
  var mi = (date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes()); 
  return y + m + d + h + mi
}
const Num2daytime = (num) => {
  var date = new Date(num * 1000);
  var h = (date.getHours() + 1 < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mi = (date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes())+ ':';
  var s = (date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return h + mi + s
}

module.exports = {
  formatTime,
  TimeDown,
  PhonenumEncrypt,
  Baseurl,
  Num2date,
  Num2time
}
