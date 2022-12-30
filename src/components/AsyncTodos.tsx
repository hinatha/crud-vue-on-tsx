import { defineComponent, onMounted, inject, reactive } from 'vue'
import { Todo } from '@/store/todo/types'
import { useRouter } from 'vue-router'
import TodoItem from '@/components/TodoItem'
import { todoKey } from '@/store/todo'

export default defineComponent({
  components: {
    TodoItem,
  },
  setup () { // Change to async
    // Inject todoStore
    const todoStore = inject(todoKey)
    // todoStore: Store | undefined
    // We need to check if the type is correct (Store)
    if (!todoStore) {
      throw new Error('todoStore is not provided')
    }

    // Call useRouter() to get the routes
    // Former vue.js can access the routes by this.$router
    // In case of composition api can't access to "this"
    const router = useRouter()

    // Parent component can receive props.todo.item as the event argument
    // Set todo id as argument of this method
    const onClickDelete = (id: number) => {
      todoStore.deleteTodo(id)
    }

    // Parent component can receive props.todo.item as the event argument
    // Set todo id as argument of this method
    const onClickTitle = (id: number) => {
      // Move to edit page
      router.push(`/edit/${id}`)
    }

    // Define loading state
    const loading = reactive({
      show: false,
    })

    // Call fetchTodos() with await
    // In case of await, we need to call after inject and useRouter
    onMounted(async () => {
      // Turn on loading
      loading.show = true
      await todoStore.fetchTodos()
      // Turn off loading
      loading.show = false
    })

    return () => (
      <div>
        {loading.show
          ? (<div>Loading ...</div>)
          : (<ul>
              {todoStore.state.todos?.map((todo: Todo) => (
                <TodoItem todo={todo} key={todo.id} onClickTitle={onClickTitle} onClickDelete={onClickDelete} />
              ))}
            </ul>)
        }
      </div>
    )
  },
})
