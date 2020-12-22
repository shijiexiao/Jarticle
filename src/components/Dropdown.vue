<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      @click.prevent="toggleOpen"
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      >hello {{ title }}
    </a>
    <ul class="dropdown-menu" style="display: block" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import useClickOutside from '../hooks/useClickOutside';

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      requierd: true
    }
  },
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const isClickOutside = useClickOutside(dropdownRef);
    // 更新的时候不会执行的，所以你得检测他的变化
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        console.log(isOpen.value, isClickOutside.value);
        isOpen.value = false;
      }
    });

    return { isOpen, toggleOpen, dropdownRef };
  }
});
</script>

<style scoped>
</style>
