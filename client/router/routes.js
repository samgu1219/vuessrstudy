import Todo from '../views/todo/Todo'
import Hi from '../views/Hi'
import Count from '../views/Count'

const routes = [
  {
    path: '/',
    component: Todo
  },
  {
    path: '/hi',
    component: Hi
  },
  {
    path: '/count',
    component: Count
  }
]

export default routes
