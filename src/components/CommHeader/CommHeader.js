import React from 'react'
import { Avatar, Icon } from 'antd'
import {
  CommHeader,
  PageHeaderLeft,
  PageHeaderRight
} from './CommHeader.css'

export default function PageHeader(props) {
  const { collapsed, toggleCollapsed } = props
  return (
    <div className={CommHeader}>
      <p className={PageHeaderLeft}>
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggleCollapsed}
        />
      </p>
      <ul className={PageHeaderRight}>
        <li>
          <Icon type="logout" />
        </li>
        <li>
          <Avatar size={32} icon="user" />
        </li>
        <li>admin</li>
      </ul>
    </div>
  )
}
