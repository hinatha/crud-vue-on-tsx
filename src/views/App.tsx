import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  setup () {
    const AsyncTodos = defineAsyncComponent(() => import('@/components/AsyncTodos'))
    return () => (
      <div>
        <h2>TODO一覧</h2>
        <AsyncTodos />
        <router-link to="/new">新規作成</router-link>
      </div>
    )
  },
})
