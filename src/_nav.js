import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilPeople,
  cilUser, 
  cilBriefcase,
  cilGem,
  cilTask
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Management'
  },
  {
    component: CNavGroup,
    name: 'Users',
    to:'/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User',
        to:'/users/user',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,

      },
      {
        component: CNavItem,
        name: 'FreeTimer',
        to:'/users/freetimer',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,

      },
      {
        component: CNavItem,
        name: 'FullTimer',
        to:'/users/fulltimer',
        icon: <CIcon icon={cilGem} customClassName="nav-icon" />,

      }
    ]
  },
  {
    component: CNavItem,
    name: 'Task',
    to: '/tasks/task',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  
]

export default _nav
