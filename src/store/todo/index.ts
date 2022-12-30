import { InjectionKey, reactive, readonly } from 'vue'
import { Todo, Params, TodoState, TodoStore } from '@/store/todo/types'
import Repository, { TODOS } from '@/clients/RepositoryFactory'

// TODOS stored in localstorage
const TodoRepository = Repository[TODOS]

// We can change state only inside this store
const state = reactive<TodoState>({
  todos: [],
})

const fetchTodos = async () => {
  // getAll() is Promise
  state.todos = await TodoRepository.getAll()
}

// Get Todo by id
const getTodo = (id: number) => {
  const todo = state.todos.find((todo) => todo.id === id)
  // In case of not existing todo
  if (!todo) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  return todo
}

// Add Todo
const addTodo = async (todo: Params) => {
  // Create todo from params
  const result = await TodoRepository.create(todo)
  // Push this todo to state
  state.todos.push(result)
}

// Update Todo by id
const updateTodo = async (id: number, todo: Todo) => {
  // Update Todo of localstorage
  await TodoRepository.update(id, todo)
  // findIndex method returns the position of id
  // If todo.id didn't match id, findIndex returns -1
  const index = state.todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  // Update state of Todo by index of list
  state.todos[index] = todo
}

// Delete by id
const deleteTodo = (id: number) => {
  // Delete Todo of localstorage
  TodoRepository.delete(id)
  // state.todos = todos other than this id
  state.todos = state.todos.filter((todo) => todo.id !== id)
}

// Wrapper methods in the store
const todoStore: TodoStore = {
  state: readonly(state),
  fetchTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
}

export default todoStore

// Set key to need to provide/inject store
export const todoKey: InjectionKey<TodoStore> = Symbol('todo')
