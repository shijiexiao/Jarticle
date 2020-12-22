<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      class="form-control"
      v-model="inputRef.val"
      @blur="validateInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp {
  type: 'requierd' | 'email';
  message: string;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>
  },
  setup(props) {
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    });
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case 'requierd':
              passed = inputRef.val.trim() !== '';
              break;
            case 'email':
              passed = emailReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
      }
    };
    return { inputRef, validateInput };
  }
});
</script>

<style scoped>
</style>