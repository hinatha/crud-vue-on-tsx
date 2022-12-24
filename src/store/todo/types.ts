import { DeepReadonly } from 'vue'

// "|" means any types
// FYI: https://typescriptbook.jp/reference/values-types-variables/union
export type Status = 'waiting' | 'working' | 'completed' | 'pending'

export interface Todo {
  id: number
  title: string
  description: string
  status: Status
  createdAt: Date
  updatedAt: Date
}

export interface TodoState {
  todos: Todo[]
}

// Params is like below
// export type Params = {
//   title: string
//   description: string
//   status: Status
// };
// FYI: https://typescriptbook.jp/reference/type-reuse/utility-types/pick
export type Params = Pick<Todo, 'title' | 'description' | 'status'>

export interface TodoStore {
  // DeepReadonly is interface, when readonly method (in composition api) used
  state: DeepReadonly<TodoState>
  fetchTodos: () => void // Get all Todos
  fetchTodo: (id: number) => void
  getTodo: (id: number) => Todo
  addTodo: (todo: Params) => void
  updateTodo: (id: number, todo: Todo) => void
  deleteTodo: (id: number) => void
}
