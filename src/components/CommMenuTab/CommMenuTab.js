import React from 'react'
import { Icon } from 'antd'

import './CommMenuTab.css'

export default function CommMenuTab(props) {
  const { list, delTab } = props
  return (
    <ul className="commNavTab">
      {list.map(item => (
        <li key={item}>
          <span>{item}</span>
          {/* <Icon onClick={delTab(item)} type="close" /> */}
        </li>
      ))}
    </ul>
  )
}
