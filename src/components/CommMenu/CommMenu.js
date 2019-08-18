import React from 'react'
import styles from './CommMenu.css'

function madeTree(list, fn, parent = [], openMenu = []) {
  const pLen = parent.length
  if (Array.isArray(list) && list.length > 0) {
    return list.map((item, index) => {
      const { children = [], resourceName, id } = item
      const nextParent = [...parent, index]
      const childrenLen = children.length
      const isOpen = openMenu.join(',').startsWith(nextParent.join(','))
      const menuClass = styles[`Menu${pLen + 1}`]
      const itemClass = styles[`Item${pLen}`]

      const subEl =
        childrenLen > 0 ? (
          <ul className={menuClass}>
            {madeTree(children, fn, nextParent, openMenu)}
          </ul>
        ) : null
      return (
        <li
          key={id}
          className={isOpen ? `${itemClass} ${styles['open']}` : itemClass}
          onClick={event => {
            fn(nextParent, resourceName, childrenLen)
            event.stopPropagation()
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
  const { chooseMenu, list, openMenu } = props
  return (
    <ul className={styles.Menu0}>{madeTree(list, chooseMenu, [], openMenu)}</ul>
  )
}
