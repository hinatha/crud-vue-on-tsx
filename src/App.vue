<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import TodoStore, { todoKey } from '@/store/todo'

export default defineComponent({
  name: 'App',
  // Provide store for global use
  setup () {
    // provide(store's key, store's value)
    provide(todoKey, TodoStore)
  },
})
</script>
