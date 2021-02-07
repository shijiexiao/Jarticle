<template>
  <div class="jg-wrapper">
    <div
      v-for="(item, index) in boxList"
      :style="{top:item.top }"
      :key="index"
      :ref="`pullBox${index}`"
      class="pullBox"
      @mouseenter.prevent="MouseEnter(`pullBox${index}`)"
      @mouseleave.prevent="MouseLeave(`pullBox${index}`)"
    >
      <span>拉开</span>
    </div>
  </div>
</template>

<script>
var speed = null;
export default {
    components: {},
    data () {
        return {
            isHeight: '350px',
            boxList: [
                { top: '200px' },
                { top: '400px' },
                { top: '600px' },
                { top: '800px' },
                { top: '1000px' },
            ]
        }
    },
    methods: {
        // 0~200
        // 缓动动画公式： 加速度=（结束值-起始值 ）/缓动系数 加速度由快到慢

        MouseEnter (e) {
            // 处理边界问题  定时器的管理
            let pullBox = this.$refs[e];
            this.startAnimation(pullBox, 'width', 4)
        },
        MouseLeave (e) {
            let pullBox = this.$refs[e];
            this.startAnimation(pullBox, 'width', -200)
        },
        startAnimation (obj, attr, end) {
            // 获取样式属性
            var cur = parseInt(this.getStyle(obj, 'width'))
            //先关闭定时器
            clearInterval(obj.timer)
            // 针对多物体运动，定时器的返回值要绑定当前对象中
            obj.timer = setInterval(() => {
                speed = (end - obj.offsetLeft) / 20
                // 如果速度大于0 证明物体往右走 速度小于0 证明物体往左走
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
                if (obj.offsetLeft === end) {
                    clearInterval(obj.timer)
                    return;
                }
                //  obj.offsetLeft === end 有可能不相等 -8.5 因为速度问题
                obj.style.left = obj.offsetLeft + speed + 'px'
            }, 30);
        },
        // 获取元素属性的函数
        getStyle (obj, attr) {
            if (obj.currrentStyle) {
                return obj.currrentStyle[attr]
            } else {
                return getComputedStyle(obj, null)[attr];
            }
        }

    }
}
</script>

<style scoped>
.pullBox {
  width: 200px;
  height: 200px;
  background-color: blue;
  position: absolute;
  left: -200px;
  z-index: 100;
}
.pullBox span {
  position: absolute;
  width: 40px;
  height: 60px;
  color: #fff;
  background-color: #000000;
  right: -40px;
  top: 50%;
  margin-top: -30px;
  line-height: 60px;
  text-align: center;
}
</style>