<template>
  <h2>TODO一覧</h2>
  <!-- Show error message -->
  <div v-if="error">
    {{ error.message }}
  </div>
  <Suspense v-else>
    <!-- Wrapper for the Async method -->
    <template #default>
      <AsyncTodos />
    </template>
    <!-- Show the loading screen when the Async method is called-->
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
  <router-link to="/new">新規作成</router-link>
</template>

<script lang="ts">
import { defineComponent, ref, onErrorCaptured } from 'vue'
import AsyncTodos from '@/components/AsyncTodos.vue'

export default defineComponent({
  components: {
    AsyncTodos,
  },
  setup () {
    // Set error
    const error = ref<unknown>(null)

    // Catch error
    onErrorCaptured((e) => {
      // Set error value as e
      error.value = e
      return true
    })

    return {
      error,
    }
  },
})
</script>
