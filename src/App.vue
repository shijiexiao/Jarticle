<template>
  <div class="container">
    <ColumnList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
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
  }
]
export default defineComponent({
  name: 'App',
  setup() {
    return {
      list: testData
    }
  },
  components: { ColumnList }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
