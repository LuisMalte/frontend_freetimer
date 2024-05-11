import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const User = React.lazy(()=> import('./views/management/users/user/User'))
const UserForm = React.lazy(()=> import('./views/management/users/user/UserForm'))
const UserEditForm = React.lazy(()=> import('./views/management/users/user/UserEditForm'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', exact: true },
  { path: '/users/user', name: 'user', element: User},
  { path: '/users/userform', name: 'userForm', element: UserForm },
  { path: '/users/usereditform/:userId', name: 'userEditForm', element: UserEditForm }
]

export default routes
