import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const User = React.lazy(()=> import('./views/management/users/user/User'))
const UserForm = React.lazy(()=> import('./views/management/users/user/UserForm'))
const UserEditForm = React.lazy(()=> import('./views/management/users/user/UserEditForm'))
const FreeTimer=React.lazy(()=> import('./views/management/users/freetimer/Freetimer'))
const FreeTimerForm = React.lazy(()=> import('./views/management/users/freetimer/FreetimerForm'))
const FreeTimerEditForm = React.lazy(()=> import('./views/management/users/freetimer/FreetimerEditForm'))
const FullTimer=React.lazy(()=> import('./views/management/users/fulltimer/Fulltimer'))
const FulltimerForm = React.lazy(()=> import('./views/management/users/fulltimer/FulltimerForm'))
const Task = React.lazy(()=> import('./views/management/tasks/task/Task'))
const TaskForm = React.lazy(()=> import('./views/management/tasks/task/TaskForm'))
const TaskEditForm = React.lazy(()=> import('./views/management/tasks/task/TaskEditForm'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', exact: true },
  { path: '/users/user', name: 'user', element: User},
  { path: '/users/userform', name: 'userForm', element: UserForm },
  { path: '/users/usereditform/:userId', name: 'userEditForm', element: UserEditForm },
  { path: '/users/freetimer', name: 'freetimer', element: FreeTimer},
  { path: '/users/freetimerform/:userId', name: 'freetimerForm', element: FreeTimerForm },
  { path: '/users/freetimereditform/:freetimerId', name: 'freetimereditform', element: FreeTimerEditForm },
  { path: '/users/fulltimer', name: 'fulltimer', element: FullTimer },
  { path: '/users/fulltimerform/:userId', name: 'fulltimerForm', element: FulltimerForm },
  { path: '/tasks/task', name: 'task', element: Task},
  { path: '/tasks/taskform', name: 'taskform', element: TaskForm},
  { path: '/tasks/taskeditform/:taskId', name: 'taskeditform', element: TaskEditForm},

]

export default routes
