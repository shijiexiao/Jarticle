<template>
  <div class="vue-poll">
    <h3 class="qst" v-html="question"></h3>
    <div class="ans-cnt">
      <div
        v-for="(a, index) in calcAnswers"
        :key="index"
        :class="{ ans: true, [a.custom_class]: a.custom_class }"
      >
        <!-- 正常情况下没投票情况下展示 -->
        <template v-if="!finalResults">
          <div
            v-if="!visibleResults"
            :class="{ 'ans-no-vote noselect': true, active: a.selected }"
            @click.prevent="handleVote(a)"
          >
            <span class="txt" v-html="a.text"></span>
          </div>
          <div v-else :class="{ 'ans-voted': true, selected: a.selected }">
            <span class="txt">
              {{a.text}}
              <img
                width="21"
                height="18"
                src="https://search-operate.cdn.bcebos.com/700580fdb772af2fdf30cfcbcadd7c5e.png"
                class="duigou2"
              />
            </span>
            <span v-if="a.percent" class="percent" v-text="a.percent"></span>
          </div>

          <span
            class="bg"
            :class="{ bgselected: a.selected }"
            :style="{ width: visibleResults ? a.percent : '0%' }"
          ></span>
        </template>

        <!-- finalResults为true时投票最终结果 -->
        <template v-else>
          <div class="ans-voted final">
            <span class="txt" v-html="a.text"></span>
            <span v-if="a.percent" class="percent" v-text="a.percent"></span>
          </div>
          <span :class="{ bg: true, selected: mostVotes == a.votes }" :style="{ width: a.percent }"></span>
        </template>
      </div>
    </div>
    <div
      class="votes"
      v-if="showTotalVotes && (visibleResults || finalResults)"
      v-text="totalVotesFormatted + ' votes'"
    ></div>

    <!-- 多选投票提交按钮 multiple-->
    <template v-if="!finalResults && !visibleResults && multiple && totalSelections > 0">
      <a href="#" @click.prevent="handleMultiple" class="submit" v-text="submitButtonText"></a>
    </template>
  </div>
</template>

<script>
import { defineComponent, PropType, reactive } from 'vue';
import settingVue from '../../../../Vue3Admin/vue3-jd-h5/src/views/mine/setting.vue';
export default defineComponent({
    name: 'Poll',
    props: {
        question: {
            type: String,
            required: true
        },
        answers: {
            type: Array,
            required: true
        },
        showResults: {
            type: Boolean,
            default: false
        },
        showTotalVotes: {
            type: Boolean,
            default: true
        },
        finalResults: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        submitButtonText: {
            type: String,
            default: 'Submit'
        },
        customId: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            visibleResults: this.showResults
        }
    },
    computed: {
        totalVotes () {
            let totalVotes = 0
            this.answers.filter(a => {
                if (!isNaN(a.votes) && a.votes > 0)
                    totalVotes += parseInt(a.votes)
            })
            return totalVotes
        },//总票数
        totalVotesFormatted () { // 所有投票的票数和
            return this.totalVotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        mostVotes () {
            let max = 0
            this.answers.filter(a => {
                if (!isNaN(a.votes) && a.votes > 0 && a.votes >= max)
                    max = a.votes
            })

            return max
        },//最大票数
        calcAnswers () {

            setTimeout(() => {



            }, 1200);
            if (this.totalVotes === 0)
                return this.answers.map(a => {
                    a.percent = '0%'
                    return a
                })

            //Calculate percent
            return this.answers.filter(a => {
                if (!isNaN(a.votes) && a.votes > 0)
                    a.percent = (Math.round((parseInt(a.votes) / this.totalVotes) * 100)) + '%'
                else
                    a.percent = '0%'

                return a
            })
        },
        totalSelections () {
            return this.calcAnswers.filter(a => a.selected).length
        }
    },
    methods: {
        handleMultiple () {

            let arSelected = []
            this.calcAnswers.filter(a => {
                if (a.selected) {
                    a.votes++
                    arSelected.push({ value: a.value, votes: a.votes })
                }
            })

            this.visibleResults = true

            let obj = { arSelected: arSelected, totalVotes: this.totalVotes }

            if (this.customId)
                obj.customId = this.customId

            this.$emit('addvote', obj)
        },
        handleVote (a) { //Callback

            if (this.multiple) {
                // 如果是多选项时候就走此逻辑
                if (a.selected === undefined)
                    console.log("Please add 'selected: false' on the answer object")

                a.selected = !a.selected
                return
            }

            a.votes++
            a.selected = true
            this.visibleResults = true

            let obj = { value: a.value, votes: a.votes, totalVotes: this.totalVotes }

            if (this.customId)
                obj.customId = this.customId

            console.log('niubic', this.visibleResults)
            this.$emit('addvote', obj)
        }
    }
})

</script>

<style>
.duigou {
  background: url('https://search-operate.cdn.bcebos.com/700580fdb772af2fdf30cfcbcadd7c5e.png');
}
.duigou2 {
}
.vue-poll {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.vue-poll .noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.vue-poll .qst {
  font-weight: normal;
  text-align: center;
}
.vue-poll .ans-cnt {
  margin: 20px 0;
}
.vue-poll .ans-cnt .ans {
  position: relative;
  margin-top: 10px;
  border-radius: 14px;
  background: #f5f5f5;
}
.vue-poll .ans-cnt .ans:first-child {
  margin-top: 0;
}

.vue-poll .ans-cnt .ans-no-vote {
  color: #4367b4;
  background-color: #f5f5f5;
  text-align: center;
  box-sizing: border-box;
  border-radius: 14px;
  cursor: pointer;
  padding: 5px 0;
  transition: background 0.2s ease-in-out;
  -webkit-transition: background 0.2s ease-in-out;
  -moz-transition: background 0.2s ease-in-out;
}

.vue-poll .ans-cnt .ans-no-vote .txt {
  margin: 0.11rem 0 0.11rem 0.2rem;
  font-size: 0.14rem;
  line-height: 0.14rem;
  max-width: 2.38667rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.vue-poll .ans-cnt .ans-no-vote.active {
  background: #77c7f7;
}

.vue-poll .ans-cnt .ans-no-vote.active .txt {
  color: #fff;
}

.vue-poll .ans-cnt .ans-voted {
  padding: 5px 0;
}

.vue-poll .ans-cnt .ans-voted .percent,
.vue-poll .ans-cnt .ans-voted .txt {
  position: relative;
  z-index: 1;
  margin: 0 20px;
  font-size: 0.14rem;
}
.vue-poll .ans-cnt .ans-voted .percent {
  font-weight: bold;
  min-width: 51px;
  display: inline-block;
  margin: 0 7px;
  float: right;
  line-height: 2;
}

.vue-poll .ans-cnt .ans-voted.selected {
  border-radius: 14px;
  background-color: #edf1fc;
  color: #6683ec;
}
.vue-poll .ans-cnt .ans-voted.selected .txt:after {
  content: '✔';
  margin-left: 10px;
}

.vue-poll .ans-cnt .ans .bg {
  position: absolute;
  width: 0%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  background-color: #eeeeee;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
  -webkit-transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
  -moz-transition: all 0.3s cubic-bezier(0.5, 1.2, 0.5, 1.2);
}

.vue-poll .ans-cnt .ans .bg.selected {
  background-color: #77c7f7;
}
.bgselected {
  background-color: #dde2f9 !important;
}
.vue-poll .votes {
  font-size: 14px;
  color: #8899a6;
}

.vue-poll .submit {
  display: block;
  text-align: center;
  margin: 0 auto;
  max-width: 80px;
  text-decoration: none;
  background-color: #41b882;
  color: #fff;
  padding: 10px 25px;
  border-radius: 5px;
}
</style>