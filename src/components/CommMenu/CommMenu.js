import React, { useState } from 'react'
import styles from './CommMenu.css'

function madeTree(
  list,
  fn,
  parent = [],
  openMenu = [],
  onMouseEnter,
  overParent
) {
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
          <ul
            className={menuClass}
            style={{
              display:
                nextParent.length > 1
                  ? nextParent.join(',') === overParent.join(',')
                    ? 'block'
                    : 'none'
                  : 'block'
            }}
          >
            {madeTree(
              children,
              fn,
              nextParent,
              openMenu,
              onMouseEnter,
              overParent
            )}
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
          onMouseOver={async event => {
            event.persist()
            onMouseEnter(event, nextParent, resourceName, childrenLen)
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
  const [overParent, setOverParent] = useState([])
  const { chooseMenu, list, openMenu } = props

  const onMouseEnter = (event, nextParent, resourceName, childrenLen) => {
    if (nextParent.length > 1 && childrenLen > 0) {
      // console.log(event, nextParent, resourceName, childrenLen)
      // console.log(event.relatedTarget)
      setOverParent(nextParent)
    }
  }
  return (
    <ul className={styles.Menu0}>
      {madeTree(list, chooseMenu, [], openMenu, onMouseEnter, overParent)}
    </ul>
  )
}
