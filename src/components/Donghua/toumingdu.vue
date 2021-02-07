<template>
  <div>
    <div ref="box" class="TouBox" @mouseover="MouseOver" @mouseout="MouseOut">TouBox</div>
  </div>
</template>
<script>
let timer = null, alpha = 30, speed = 0;
export default {
    methods: {
        MouseOver () {
            const box = this.$refs.box;
            this.opacityAnimation(box, 100)
        },
        MouseOut () {
            const box = this.$refs.box;
            this.opacityAnimation(box, 30);
        },
        opacityAnimation (obj, endAlpha) {
            clearInterval(timer)
            timer = setInterval(() => {
                //求透明度变化的速度
                speed = endAlpha > alpha ? 10 : -10;
                //边界的处理
                if (alpha === endAlpha) {
                    clearInterval(timer)
                    return;
                }
                alpha += speed;
                obj.style.opacity = alpha / 100;
                obj.style.filter = `alpha(opacity: ${alpha})`;
            }, 30);
        }
    },

}
</script>
<style  scoped>
.TouBox {
  width: 200px;
  height: 200px;
  background-color: green;
  opacity: 0.3;
  position: relative;
  top: 200px;
  /* filter: alpha(opacity: 30); */
}
</style>