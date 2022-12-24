<template>
  <h2>TODOを編集する</h2>
  <!-- If we can't find the id, we call error -->
  <div v-if="error">
    ID:{{ $route.params.id }}のTODOが見つかりませんでした。
  </div>
  <!-- @submit.prevent is for validation -->
  <form v-else @submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <!-- Input todo title -->
      <input type="text" id="title" v-model="data.title" />
    </div>
    <div>
      <label for="description">説明</label>
      <!-- Input todo description -->
      <textarea id="description" v-model="data.description" />
    </div>
    <div>
      <label for="status">ステータス</label>
      <!-- Input todo status -->
      <select id="status" v-model="data.status">
        <option value="waiting">waiting</option>
        <option value="working">working</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
      </select>
    </div>
    <!-- Call onSubmit function -->
    <button @click="onSubmit">更新する</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Params } from '@/store/todo/types'
import { todoKey } from '@/store/todo'

export default defineComponent({
  setup () {
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

    // Router() can make access $route
    const route = useRoute()

    // We can get id(route.params.id) by using useRoute()
    const id = Number(route.params.id)
    try {
      // Get todo by id from todoStore
      const todo = todoStore.getTodo(id)

      // Set Params as first form value
      // If React, like below
      // const [data, setData] = useState<Params>({
      //   title: todo.title,
      //   description: todo.description,
      //   status: todo.status,
      // })
      const data = reactive<Params>({
        title: todo.title,
        description: todo.description,
        status: todo.status,
      })

      const onSubmit = () => {
        // Form values
        const { title, description, status } = data
        todoStore.updateTodo(id, {
          // Original todo before update
          ...todo,
          // Form values after changing todo
          // type Params = {
          //   title: string
          //   description: string
          //   status: Status
          // };
          title,
          description,
          status,
        })
        router.push('/')
      }

      return {
        error: false,
        data,
        onSubmit,
      }
    } catch (e) {
      console.error(e)
      return {
        error: true,
      }
    }
  },
})
</script>
