<template>
  <div class="jg-wrapper">
    <div class="detail-content" :style="{height: isHeight}">
      <template v-for="(item,index) in list" :key="index">
        <p class="item-wrapper">
          <img :src="item.imgSrc" width="24" height="24" />
        </p>
        <p class="item-wrapper">{{item.text}}</p>
      </template>
    </div>
    <div v-if="list.length>4" class="hide-articel-box" @click="spread">
      <img :class="{ xiangxia: !isHeight , xiangshang : isHeight }" src="./sprImg/jiantouxia.svg" />
    </div>
  </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            isHeight: '350px',
            list: [
                {
                    imgSrc: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1572729468,995764072&fm=58',
                    text: '春晚分会场'
                }, {
                    imgSrc: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1572729468,995764072&fm=58',
                    text: '春晚分会场'
                },
                {
                    imgSrc: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1572729468,995764072&fm=58',
                    text: '春晚分会场'
                }, {
                    imgSrc: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1572729468,995764072&fm=58',
                    text: '春晚分会场'
                },
                {
                    imgSrc: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1572729468,995764072&fm=58',
                    text: '春晚分会场'
                },
            ]
        }
    },
    methods: {
        spread () {
            if (this.isHeight.length > 0) {
                this.isHeight = ''
            }
            else {
                this.isHeight = '350px'
            }
        }

    }
}
</script>

<style>
.jg-wrapper {
  width: 100px;
}
.detail-content {
  font-size: 16px;
  color: #545c63;
  line-height: 36px;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  transition: height 1s ease-in-out;
}
.item-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
}
.hide-articel-box {
  cursor: pointer;
  display: block;
  text-align: center;
  width: 100%;
}
.xiangxia {
  transform: rotate(-180deg);
  transition: 0.3s ease-in-out;
}
.xiangshang {
  transform: rotate(0);
  transition: 0.3s ease-in;
}
</style>