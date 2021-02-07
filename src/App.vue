<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <ColumnList :list="list" />
    <!-- <Poll v-bind="options" @addvote="addVote" /> -->
    <!-- <img src="./assets/多项投票及暗黑标注.jpg" alt=""> -->
    <!-- <Donghuakuangjia />
    
    <Spr></Spr>
    <div class="wifiTipContainer">正在非WIFI环境下观看</div>
    <Cebianlan />
    <Toumingdu />
    <Lianshidiaoyong /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColumnList, { ColumnProps } from './components/ColumnList.vue';
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue';
import ValidateInput, { RulesProp } from './components/ValidateInput.vue';
import Poll from './components/Poll.vue';
import Spr from './components/Spr.vue';
import Donghuakuangjia from './components/Donghuakuangjia.vue';
import Cebianlan from './components/Donghua/cebianlan.vue';
import Toumingdu from './components/Donghua/toumingdu.vue';
import Lianshidiaoyong from './components/Donghua/lianshidiaoyong.vue';
// const param={type: "tc", tcUrl: "http://m.baidu.com/from=0/bd_page_type=1/ssid=0/ui…O6KwbGy58q5WTPIXqnZCfsr5%2FsK89Xwu2sF7HMfWTBVI%3D", originUrl: "https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_aladin_top1&city=北京-北京", log: "{"e":"IlPT2AEptyoA_yixCFOxCHd8gBDMKq_nWBSULCpFLDm6…sTKV1pyutwoOa","c":"","extra":"","group_id":5755}", hrsf: 1}
const currentUser: UserProps = {
  isLogin: true,
  name: 'jackniubi'
};
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'niubi',
    description: 'djfksdjkfsjd',
    avatar:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605958843584&di=3a65072518d4912575af78a2bb40ecee&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D890b874e0bb30f24359aec03f894d192%2F8718367adab44aeddcf192cbb71c8701a18bfb66.jpg'
  },
  {
    id: 2,
    title: 'niubi',
    description: 'djfksdjkfsjd',
    avatar:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605958843584&di=3a65072518d4912575af78a2bb40ecee&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D890b874e0bb30f24359aec03f894d192%2F8718367adab44aeddcf192cbb71c8701a18bfb66.jpg'
  },
  {
    id: 3,
    title: 'niubi',
    description: 'djfksdjkfsjd',
    avatar:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605958843584&di=3a65072518d4912575af78a2bb40ecee&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D890b874e0bb30f24359aec03f894d192%2F8718367adab44aeddcf192cbb71c8701a18bfb66.jpg'
  },
  {
    id: 4,
    title: 'niubi',
    description: 'djfksdjkfsjd'
  }
];
export default defineComponent({
  name: 'App',
  data: function () {
    return {
      options: {
        question: '你喜欢什么样的 <strong>JS</strong> ?', //头部标题
        answers: [
          //问题列表，直接渲染
          { value: 1, text: '放学后', votes: 53 },
          { value: 2, text: '白夜心', votes: 35 },
          { value: 3, text: '虚无的十字架', votes: 30 },
          { value: 4, text: '嫌疑人x的献身', votes: 11 }
        ],
        finalResults: false, //显示最终结果 停止投票
        showResults: false, //显示投票结果
        multiple: false, // 是否可以进行多选
        customId: 1 // 投票id自定义投票id号
      }
    };
  },
  methods: {
    addVote: function (obj: any) {
      //子组件通知父组件
      console.log('You voted ' + obj.value + '!');
      console.log(obj);
    }
  },
  setup() {
    const emailRules: RulesProp = [
      { type: 'requierd', message: '电子邮箱不为空' }, //bixu
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ];
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    });
    const validateEmail = () => {};
    return {
      list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules
    };
  },
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    Poll,
    Spr,
    Donghuakuangjia,
    Cebianlan,
    Toumingdu,
    Lianshidiaoyong
  }
});
</script>

<style>
.wifiTipContainer {
  position: absolute;
  bottom: 1.41rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.03rem;
  left: 50%;
  width: 1.72rem;
  height: 0.38rem;
  line-height: 0.38rem;
  margin-left: -0.86rem;
  opacity: 0.8;
  text-align: center;
  z-index: 100;
}
</style>
