import React from 'react'
import { Icon } from 'antd'

// import './CommMenuTab.css'
import { commNavTab, Active } from './CommMenuTab.css'

export default function CommMenuTab(props) {
  const { list, changeTab } = props
  return (
    <ul className={commNavTab}>
      {list.map((item, index) => (
        <li key={index} className={item.isActive ? Active : ''}>
          <span className="blue" onClick={() => changeTab(item, 1)}>
            {item.name}
          </span>
          <Icon onClick={() => changeTab(item, 2)} type="close" />
        </li>
      ))}
    </ul>
  )
}
