<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
.is-disabled{
    color: #6c757d;
    pointer-events: none;
    background-color: transparent;
}
</style>
