<template>
  <ul>
    <!-- :todo pass data to child component -->
    <!-- emit need to change camel case to kebab case (clickTitle -> click-title) -->
    <todo-item
      v-for="todo in todoStore.state.todos"
      :key="todo.id"
      :todo="todo"
      @click-title="clickTitle"
      @click-delete="clickDelete"
    >
    </todo-item>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import TodoItem from '@/components/TodoItem.vue'
import { todoKey } from '@/store/todo'

export default defineComponent({
  components: {
    TodoItem,
  },
  async setup () { // Change to async
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
    const clickDelete = (id: number) => {
      todoStore.deleteTodo(id)
    }

    // Parent component can receive props.todo.item as the event argument
    // Set todo id as argument of this method
    const clickTitle = (id: number) => {
      // Move to edit page
      router.push(`/edit/${id}`)
    }

    // Call fetchTodos() with await
    // In case of await, we need to call after inject and useRouter
    await todoStore.fetchTodos()

    return {
      todoStore,
      clickDelete,
      clickTitle,
    }
  },
})
</script>
