import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from '@/views/App'
import AddTodo from '@/views/AddTodo'
import EditTodo from '@/views/EditTodo'

const routes: Array<RouteRecordRaw> = [
  // Route of top page
  {
    path: '/',
    name: 'App',
    component: App,
  },
  // Route of AddTodo page
  {
    path: '/new',
    name: 'AddTodo',
    component: AddTodo,
  },
  // Route of EditTodo page
  {
    // We can set parameter to do like ":id"
    path: '/edit/:id',
    name: 'EditTodo',
    component: EditTodo,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
