import React from 'react'
import styles from './CommMenu.css'

function madeTree(list, fn, parent = [], currMenu = []) {
  const pLen = parent.length
  if (Array.isArray(list) && list.length > 0) {
    return list.map((item, index) => {
      const { children = [], resourceName, id } = item
      const childrenLen = children.length
      // const isMenuCurr = typeof currMenu[pLen] !== 'undefined' && currMenu[pLen] === index
      const isMenuCurr = currMenu.every((curItem, curIndex)=> curItem === parent[curIndex])
      const menuClass = styles[`Menu${pLen + 1}`]
      const itemClass = styles[`Item${pLen}`]

      const subEl =
        childrenLen > 0 ? (
          <ul className={menuClass}>
            {madeTree(children, fn, [...parent, index], currMenu)}
          </ul>
        ) : null
      return (
        <li
          key={id}
          className={
            isMenuCurr ? `${itemClass} ${styles['active']}` : itemClass
          }
          onClick={event => {
            fn([...parent, index], resourceName, childrenLen)
            event.stopPropagation()
          }}
        >
          <span>
            {resourceName}
          </span>
          {subEl}
        </li>
      )
    })
  }
  return null
}

export default function CommMenu(props) {
  const { chooseMenu, list, currMenu } = props
  return (
    <ul className={styles.Menu0}>{madeTree(list, chooseMenu, [], currMenu)}</ul>
  )
}
