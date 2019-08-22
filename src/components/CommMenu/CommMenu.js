import React, { useState, useRef, useLayoutEffect } from 'react'
import styles from './CommMenu.css'

function madeTree(
  list,
  tabMenu,
  fn,
  parent = [],
  openMenu = [],
  onMouseOver,
  onMouseLeave,
  overParent,
  top = 0
) {
  const pLen = parent.length
  if (Array.isArray(list) && list.length > 0) {
    return list.map((item, index) => {
      const { children = [], resourceName, id } = item
      const nextParent = [...parent, index]
      const childrenLen = children.length
      // const isOpen = openMenu.join(',').startsWith(nextParent.join(','))
      const menuClass = styles[`Menu${pLen + 1}`]
      // const itemClass = styles[`Item${pLen}`]

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
                  : 'block',
              top: `${top}px`
            }}
          >
            {madeTree(
              children,
              tabMenu,
              fn,
              nextParent,
              openMenu,
              onMouseOver,
              onMouseLeave,
              overParent,
              top
            )}
          </ul>
        ) : null
      return (
        <li
          key={id}
          className={getClassName(openMenu, nextParent, tabMenu, styles)}
          onClick={event => {
            fn(nextParent, resourceName, childrenLen)
            event.stopPropagation()
          }}
          onMouseOver={async event => {
            event.persist()
            onMouseOver(event, nextParent, resourceName, childrenLen)
          }}
          onMouseLeave={async event => {
            event.persist()
            onMouseLeave(event, nextParent, resourceName, childrenLen)
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

const getClassName = (openMenu, nextParent, tabMenu, styles) => {
  const isOpen = openMenu.join(',').startsWith(nextParent.join(','))
  let className = styles[`Item${nextParent.length - 1}`]
  if (isOpen) {
    className = `${className} ${styles['open']}`
  }
  if(tabMenu.some(({ids})=> ids.join(',') === nextParent.join(','))){
    className = `${className} ${styles['tabItem']}`
  }
  return className
}

const findLi = ele => {
  if (!ele) {
    return null
  }
  const tagName = ele.tagName.toLowerCase()
  if (tagName === 'ul') {
    return null
  }
  if (tagName === 'li') {
    return ele
  }
  return findLi(ele.parentNode)
}

export default function CommMenu(props) {
  const [overParent, setOverParent] = useState([])
  const [top, setTop] = useState([])
  const ulRef = useRef(null)
  const [currLi, setCurrLi] = useState(null)
  const { chooseMenu, list, openMenu, tabMenu } = props

  const onMouseOver = (event, nextParent, resourceName, childrenLen) => {
    if (nextParent.join(',') === overParent.join(',')) {
      return false
    }
    if (nextParent.length > 1 && childrenLen > 0) {
      const li = findLi(event.target)
      setOverParent(nextParent)
      if (li) {
        setCurrLi(li)
      }
    }
  }

  useLayoutEffect(() => {
    if (currLi) {
      let offsetTop = currLi.offsetTop
      const childUl = currLi.getElementsByTagName('ul')[0]
      const clientHeight = document.documentElement.clientHeight
      const ulOffsetHeight = childUl.offsetHeight
      const maxTop = clientHeight - ulOffsetHeight
      if (ulRef) {
        offsetTop = offsetTop - ulRef.current.parentNode.scrollTop
      }
      setTop(Math.min(offsetTop, maxTop))
    }
  }, [overParent, currLi])

  const onMouseLeave = (event, nextParent, resourceName, childrenLen) => {
    if (nextParent.length > 1 && childrenLen > 0) {
      setOverParent([])
    }
  }
  return (
    <ul className={styles.Menu0} ref={ulRef}>
      {madeTree(
        list,
        tabMenu,
        chooseMenu,
        [],
        openMenu,
        onMouseOver,
        onMouseLeave,
        overParent,
        top
      )}
    </ul>
  )
}
