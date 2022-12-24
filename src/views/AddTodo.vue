<template>
  <h2>TODOを作成する</h2>
  <!-- @submit.prevent is for validation -->
  <form @submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <!-- Input todo title -->
      <!-- "data.title" in v-model is synchronized with the form input value -->
      <input type="text" id="title" v-model="data.title" />
    </div>
    <div>
      <label for="description">説明</label>
      <!-- Input todo description -->
      <!-- "data.description" in v-model is synchronized with the form input value -->
      <textarea id="description" v-model="data.description" />
    </div>
    <div>
      <label for="status">ステータス</label>
      <!-- Input todo status -->
      <!-- "data.status" in v-model is synchronized with the form input value -->
      <select id="status" v-model="data.status">
        <option value="waiting">waiting</option>
        <option value="working">working</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
      </select>
    </div>
    <!-- Call onSubmit function -->
    <button @click="onSubmit">作成する</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
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
    // Former Vue.js can access the routes by this.$router
    // In case of composition api can't access to "this"
    const router = useRouter()

    // Set form data as reactive
    // If React, like below
    // const [data, setData] = useState<Params>({
    //   title: '',
    //   description: '',
    //   status: 'waiting',
    // })
    const data = reactive<Params>({
      title: '',
      description: '',
      status: 'waiting',
    })

    const onSubmit = () => {
      // Fetch each todo data from form data
      const { title, description, status } = data
      // type Params = {
      //   title: string
      //   description: string
      //   status: Status
      // };
      todoStore.addTodo({
        title,
        description,
        status,
      })
      // Move to top page
      router.push('/')
    }

    return {
      data,
      onSubmit,
    }
  },
})
</script>
