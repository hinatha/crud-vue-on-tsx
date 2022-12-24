import { TodoClientInterface } from './TodoClient/types'
import { TodoClient } from '@/clients/TodoClient'
import { MockTodoClient } from '@/clients/TodoClient/mock'

export const TODOS = 'todos'

export interface Repositories {
  [TODOS]: TodoClientInterface
}

export default {
  // If NODE_ENV is mock, work on mock ver
  // Else work on localstrage ver
  [TODOS]: process.env.NODE_ENV === 'mock' ? new MockTodoClient() : new TodoClient(),
} as Repositories
