import { defineComponent } from 'vue'
import AsyncTodos from '@/components/AsyncTodos'

export default defineComponent({
  components: {
    AsyncTodos,
  },
  setup () {
    return () => (
      <div>
        <h2>TODO一覧</h2>
        <AsyncTodos />
        <router-link to="/new">新規作成</router-link>
      </div>
    )
  },
})
