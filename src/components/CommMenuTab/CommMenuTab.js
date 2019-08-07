import React from 'react'
import { Icon } from 'antd'

import './CommMenuTab.css'

export default function CommMenuTab(props) {
  const { list, delTab, tabIndex } = props
  return (
    <ul className="commNavTab">
      {list.map((item, index) => (
        <li key={item} className={index === tabIndex ? 'active' : ''}>
          <span>{item}-{index}-{tabIndex}:</span>
          <Icon onClick={()=> delTab(item)} type="close" />
        </li>
      ))}
    </ul>
  )
}
