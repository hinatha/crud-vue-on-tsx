import '@/css/TodoItem.css'
import { Todo } from '@/store/todo/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  // props: parent component -> child component
  // Data from parent component is readonly
  // Parent component(todo.vue): <todo-item :todo="todo" />
  props: {
    todo: {
      // Set props' type as Todo
      type: Object as PropType<Todo>,
      // Warn when don't pass data as props
      required: true,
    },
    onClickTitle: {
      type: Function as PropType<(id: number) => void>,
      required: true,
    },
    onClickDelete: {
      type: Function as PropType<(id: number) => void>,
      required: true,
    },
  },

  setup (props) {
    const clickDelete = (id: number) => {
      // Set emit as clickDelete
      props.onClickDelete(id)
    }

    const clickTitle = (id: number) => {
      // Set emit as clickTitle
      props.onClickTitle(id)
    }

    // Format date when update props.todo
    const formatDate = `${props.todo.createdAt.getFullYear()}/${props.todo.createdAt.getMonth() + 1}/${props.todo.createdAt.getDate()}`

    return () => (
      <div class="card">
        <div>
          <span class="title" onClick={() => clickTitle(props.todo.id)}>{ props.todo.title }</span>
          <span class={'status' + ' ' + `${props.todo.status}`}>{ props.todo.status }</span>
        </div>
        <hr />
        <div class="body">作成日：{ formatDate }</div>
        <div class="action">
          <button onClick={() => clickDelete(props.todo.id)}>削除</button>
        </div>
      </div>
    )
  },
})
