import { onMounted, onUnmounted, Ref, ref } from 'vue';


const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
    // 响应式对象
    // 告诉用户是否点击到了外面
    const isClickOutside = ref(false)
    const handler = (e: MouseEvent) => {
        if (elementRef.value) {
            if (!elementRef.value.contains(e.target as HTMLElement)) {
                isClickOutside.value = false
            } else {
                isClickOutside.value = true
            }
        }
    }
    onMounted(() => {
        document.addEventListener('click', handler);
    });
    onUnmounted(() => {
        document.removeEventListener('click', handler);
    });
    return isClickOutside
}
export default useClickOutside