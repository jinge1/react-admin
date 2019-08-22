import React, { useState, useEffect, useCallback } from 'react'
import CommMenu from '../CommMenu/CommMenu'
import CommMenuTab from '../CommMenuTab/CommMenuTab'
import CommHeader from '../CommHeader/CommHeader'
import CollapsedContent from '../CollapsedContent/CollapsedContent'
import CommRouter from '../CommRouter'
import fetchData from '../../utils/fetchData'
import './reset.css'
import {
  WebName,
  MenuShow,
  MenuHide,
  LeftMenu,
  HeaderInner,
  PageHeader
} from './App.css'

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [list, setList] = useState([])
  const [tabMenu, setTabMenu] = useState([])
  const [openMenu, setOpenMenu] = useState([])

  useEffect(() => {
    fetchData('userMenu').then(res => {
      const list = res.data.list
      setList(list)
    })
  }, [])

  const chooseMenu = useCallback(
    (indexs, name, childrenLen) => {
      const indexsLen = indexs.length
      const openLen = openMenu.length
      const indexsStr = indexs.join(',')
      const openMenuStr = openMenu.join(',')

      if (childrenLen === 0) {
        // link
        let arr = tabMenu.reduce((pre, curr) => {
          const currIdsStr = curr.ids.join(',')
          let isActive = false
          if (currIdsStr === indexsStr) {
            isActive = true
          }
          pre.push({
            ...curr,
            isActive
          })
          return pre
        }, [])
        if (!arr.some(({ ids }) => ids.join(',') === indexsStr)) {
          arr = [...arr, { ids: [...indexs], name, isActive: true }]
        }
        setTabMenu(arr)
      } else {
        if (indexsLen > openLen) {
          setOpenMenu(indexs)
        } else if (indexsLen === openLen) {
          if (indexsStr === openMenuStr) {
            setOpenMenu(indexs.filter((item, i) => i < indexsLen - 1))
          } else {
            setOpenMenu(indexs)
          }
        } else {
          if (openMenuStr.startsWith(indexsStr)) {
            setOpenMenu(indexs.filter((item, i) => i < indexsLen - 1))
          } else {
            setOpenMenu(indexs)
          }
        }
      }
    },
    [openMenu, tabMenu]
  )

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  const changeTab = useCallback(
    (item, flg) => {
      const indexsStr = item.ids.join(',')
      if (flg === 1) {
        // change
        let arr = tabMenu.reduce((pre, curr) => {
          const currIdsStr = curr.ids.join(',')
          let isActive = false
          if (currIdsStr === indexsStr) {
            isActive = true
          }
          pre.push({
            ...curr,
            isActive
          })
          return pre
        }, [])
        setTabMenu(arr)
      } else {
        // del
        if (tabMenu.length === 1) {
          setTabMenu([])
        } else {
          const currIndex = tabMenu.findIndex(({ isActive }) => isActive)
          const itemIndex = tabMenu.findIndex(
            ({ ids }) => ids.join(',') === indexsStr
          )
          let arr = []
          if (currIndex === itemIndex) {
            const i = itemIndex - 1 >= 0 ? itemIndex - 1 : 0
            arr = tabMenu.filter((item, index) => index !== i)
          } else {
            arr = tabMenu.filter((item, index) => index !== itemIndex)
          }
          setTabMenu(arr)
        }
      }
    },
    [tabMenu]
  )

  const PageLeft = (
    <div
      className={
        collapsed ? `${LeftMenu} ${MenuHide}` : `${LeftMenu} ${MenuShow}`
      }
    >
      <h1 className={WebName}>react-admin</h1>
      <CommMenu
        list={list}
        chooseMenu={chooseMenu}
        openMenu={openMenu}
        tabMenu={tabMenu}
      />
    </div>
  )

  return (
    <CollapsedContent collapsed={collapsed} left={PageLeft}>
      <div className={PageHeader}>
        <div className={HeaderInner}>
          <CollapsedContent collapsed={collapsed}>
            <CommHeader
              collapsed={collapsed}
              toggleCollapsed={toggleCollapsed}
            />
          </CollapsedContent>
        </div>
      </div>
      <CommMenuTab list={tabMenu} changeTab={changeTab} />
      <CommRouter />
    </CollapsedContent>
  )
}
