/* import Todo from '../views/todo/Todo'
import Hi from '../views/Hi'
import Count from '../views/Count' */

const routes = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: () => import(/* webpackChunkName:'todo' */'../views/todo/Todo')
    // component: Todo
  },
  {
    path: '/hi',
    component: () => import(/* webpackChunkName:'hi' */'../views/Hi')
    // component: Hi
  },
  {
    path: '/count',
    component: () => import(/* webpackChunkName:'count' */'../views/Count')
    // component: Count
  }
]

export default routes
