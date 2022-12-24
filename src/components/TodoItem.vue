<template>
  <div class="card">
    <div>
      <!-- Call clickTitle function -->
      <span class="title" @click="clickTitle">{{ todo.title }}</span>
      <!-- If todo.status = waiting, like below -->
      <!-- <div class="status waiting"> -->
      <span class="status" :class="todo.status">{{ todo.status }}</span>
    </div>
    <div class="body">作成日：{{ formatDate }}</div>
    <hr />
    <div class="action">
      <!-- Call clickDelete function -->
      <button @click="clickDelete">削除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Todo } from '@/store/todo/types'
import { defineComponent, PropType } from 'vue'
import { useFormatDate } from '@/composables/use-formate-date'

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
  },
  // emit: child component -> parent component
  // Parent component(todo.vue): <todo-item @clickDelete="clickDelete" />
  emits: ['clickDelete', 'clickTitle'],
  setup (props, { emit }) {
    const clickDelete = () => {
      // Set emit as clickDelete
      emit('clickDelete', props.todo.id)
    }

    const clickTitle = () => {
      // Set emit as clickTitle
      emit('clickTitle', props.todo.id)
    }

    // Format date when update props.todo
    const formatDate = useFormatDate(props.todo.createdAt)

    return {
      clickDelete,
      clickTitle,
      formatDate,
    }
  },
})
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  border: 1px solid;
  box-shadow: 2px 2px 4px gray;
  width: 250px;
}

.title {
  font-weight: 400;
  font-size: 25px;
  padding: 5px;
}

.status {
  padding: 3px;
}

.waiting {
  background-color: #e53935;
}

.working {
  background-color: #80cbc4;
}

.completed {
  background-color: #42a5f5;
}

.pending {
  background-color: #ffee58;
}

.body {
  margin: 5px;
}

.action {
  margin: 5px;
}
</style>
