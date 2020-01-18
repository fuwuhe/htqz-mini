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
const PhonenumEncrypt = num => {
  if (num.length == 11){
    return num.substr(0, 3) + '****' + num.substr(7, 11);
  }else{
    return ''
  }  
}
const TimeDown = (start, end) => {
  var endDate = new Date(end * 1000);
  var nowDate = new Date();
  var totalSeconds = parseInt((endDate - nowDate) / 1000);
  var days = Math.floor(totalSeconds / (60 * 60 * 24));
  var modulo = totalSeconds % (60 * 60 * 24);
  var hours = Math.floor(modulo / (60 * 60));
  hours = (days) * 24 + hours;
  hours = hours < 10 ? '0' + hours : hours;
  modulo = modulo % (60 * 60);
  var minutes = Math.floor(modulo / 60) < 10 ? '0' + Math.floor(modulo / 60) : Math.floor(modulo / 60);
  var seconds = modulo % 60 < 10 ? '0' + modulo % 60 : modulo % 60;
  var times;
  if (hours == '00' && minutes == '00' && seconds == '00') {
    times = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      now: 'yes'
    }
  } else {
    times = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      now: 'no'
    }
  }
  return times;
}
const Num2date = (num) => {
  var date = new Date(num * 1000);
  var y = date.getFullYear() + '.';
  var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var d = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate());
  return y + m + d
}
const Num2time = (num) => {
  var date = new Date(num * 1000);
  var y = date.getFullYear() + '-';
  var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var d = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() + 1 < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mi = (date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes())+ ':';
  var s = (date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return y + m + d + h + mi + s
}
const Num2daytime = (num) => {
  var date = new Date(num * 1000);
  var h = (date.getHours() + 1 < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mi = (date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return h + mi + s
}
 
const getQueryObject =(search) => {
  var search = search.substring(1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

const FontFam = () => {
  wx.loadFontFace({
    family: 'PingFangSC-medium',
    source: 'url("https://htqz.0791jr.com/uploads/20200109/1.ttf")',
    success: function (res) {
      
    }
  })
}

module.exports = {
  formatTime,
  TimeDown,
  PhonenumEncrypt,
  Baseurl,
  Num2date,
  Num2time,
  getQueryObject,
  Num2daytime,
  FontFam
}