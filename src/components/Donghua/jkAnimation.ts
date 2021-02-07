var speed = 0;

export function startAnimation(obj, attr, end, fn) {
  // 获取样式属性
  var cur = parseInt(getStyle(obj, 'width'))
  //先关闭定时器
  clearInterval(obj.timer)
  // 针对多物体运动，定时器的返回值要绑定当前对象中
  obj.timer = setInterval(() => {
    var cur = 0;
    // 透明度变化处理
    if (attr === 'opacity') {
      cur = Math.round(parseFloat(getStyle(obj, attr)) * 100)
    } else {  
      cur = parseInt(getStyle(obj, attr))
    }

    speed = (end - cur) / 20
    // 如果速度大于0 证明物体往右走 速度小于0 证明物体往左走
    speed = end > cur ? Math.ceil(speed) : Math.floor(speed)
    if (cur === end) {
      clearInterval(obj.timer)
      // 判断一下
      if(fn){
        fn();
      }
      return;
    }
    // 3.运动起来
    if (attr === 'opacity') {
      // obj.style[attr] = `alpah(opacity: ${cur+speed})`;
      obj.style[attr] = (cur + speed) / 100 ;
    } else {
      //  cur === end 有可能不相等 -8.5 因为速度问题
      obj.style[attr] = cur + speed + 'px'
    }
  }, 30);
}
// 获取元素属性的函数
export function getStyle(obj, attr) {
  if (obj.currrentStyle) {
    return obj.currrentStyle[attr]
  } else {
    return getComputedStyle(obj, null)[attr];
  }
}
