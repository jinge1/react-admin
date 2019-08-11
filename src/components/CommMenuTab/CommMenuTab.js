import React from 'react'
import { Icon } from 'antd'

import './CommMenuTab.css'

export default function CommMenuTab(props) {
  const { list, delTab, chooseMenu } = props
  return (
    <ul className="commNavTab">
      {list.map((item, index) => (
        <li key={index} className={item[3] ? 'active' : ''}>
          <span className="blue" onClick={() => chooseMenu(...item)}>{item[1]}</span>
          <Icon onClick={() => delTab(...item)} type="close" />
        </li>
      ))}
    </ul>
  )
}
