import React from 'react'
import './CommMenu.css'

function madeTree(list, fn, parent = []) {
  if (Array.isArray(list) && list.length > 0) {
    return list.map((item, index) => {
      const { children = [], resourceName, id } = item
      const len = children.length
      const subEl =
        len > 0 ? (
          <ul className={`Sub${parent.length}`}>
            {madeTree(children, fn, [...parent, index])}
          </ul>
        ) : null
      return (
        <li
          key={id}
          onClick={e => {
            fn([...parent, index], resourceName, len)
            e.stopPropagation()
          }}
        >
          <span>{resourceName}</span>
          {subEl}
        </li>
      )
    })
  }
  return null
}

export default function CommMenu(props) {
  const { chooseMenu, list } = props
  return <ul className="CommMenu">{madeTree(list, chooseMenu)}</ul>
}
