import React from 'react'
import { Icon } from 'antd'

import './CommMenuTab.css'

export default function CommMenuTab(props) {
  const { list, delTab, currTab, setCurrTab } = props
  return (

    <ul className="commNavTab">
      {list.map((item, index) => (
        <li key={index}>
          <span>{item.key}</span>
        </li>
      ))}
    </ul>


    // <ul className="commNavTab">
    //   {list.map((item, index) => (
    //     <li key={item.key} className={item.key === currTab.key ? 'active' : ''}>
    //       <span onClick={()=> setCurrTab(item)}>{item}</span>
    //       <Icon onClick={()=> delTab(item)} type="close" />
    //     </li>
    //   ))}
    // </ul>
  )
}
