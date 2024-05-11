import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilFastfood
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
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User',
        to:'/users/user'
      }
    ]
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
