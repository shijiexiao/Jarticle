<template>
  <div>
    <div ref="box" class="LianBox" @mouseover="MouseOver" @mouseout="MouseOut">LianBox</div>
  </div>
</template>
<script>
import { startAnimation } from './jkAnimation2.ts'
export default {
    methods: {
        MouseOver () {
            const box = this.$refs.box;
            // 链式调用动画
            // startAnimation(box, 'width', 500, function () {
            //     startAnimation(box, 'height', 500, function () {
            //         startAnimation(box, 'opacity', 100)
            //     })
            // })
            // 同时运动
            startAnimation(box, { width: 500, opacity: 100 }, function () {

            })
        },
        MouseOut () {
            const box = this.$refs.box;
            startAnimation(box, { width: 100, opacity: 50 }, function () {

            })
        },
    },

}
</script>
<style  scoped>
.LianBox {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: yellow;
  top: 200px;
  opacity: 0.3;
}
</style>