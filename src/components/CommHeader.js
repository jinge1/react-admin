import React from 'react'
import { Avatar, Icon } from 'antd'
import './CommHeader.css'

export default function PageHeader(props) {
  const {collapsed, handleClick} = props
  return (
    <div className="PageHeader">
      <p className="PageHeaderLeft">
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={handleClick}
        />
      </p>
      <ul className="PageHeaderRight">
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
