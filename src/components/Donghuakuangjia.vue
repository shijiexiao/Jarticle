<template>
  <div class="jg-wrapper">
    <button id="btn" @click="clickButton">move</button>
    <div id="PinBox"></div>
  </div>
</template>

<script>
var timer = null;
export default {
    components: {},
    data () {
        return {
            isHeight: '350px'
        }
    },
    methods: {
        clickButton () {
            // 处理边界问题  定时器的管理
            var PinBox = document.getElementById('PinBox')

            // 运动起来 定时器
            clearInterval(timer);
            timer = setInterval(() => {
                if (PinBox.offsetLeft == 500) {
                    clearInterval(timer)
                }
                PinBox.style.left = 10 + PinBox.offsetLeft + 'px'
            }, 30);
        }
    }
}
</script>

<style scoped>
.jg-wrapper {
  width: 100px;
  position: relative;
}
#btn {
  width: 80px;
  height: 40px;
}
#PinBox {
  width: 200px;
  height: 200px;
  background-color: red;
  position: absolute;
  top: 50px;
}
</style>