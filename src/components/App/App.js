import React, { useState, useEffect, useCallback } from 'react'
// import { Layout } from 'antd'
import CommMenu from '../CommMenu/CommMenu'
// import CommMenuTab from '../CommMenuTab/CommMenuTab'
// import CommHeader from '../CommHeader/CommHeader'
// import CommRouter from '../CommRouter'
import fetchData from '../../utils/fetchData'
import './reset.css'
import {
  Page,
  AppMenu,
  AppContent,
  MenuInner,
  PartSlide,
  SmallBlock,
  ContentBlock,
  ContentMain
} from './App.css'

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [list, setList] = useState([])
  const [currMenu, setCurrMenu] = useState('')
  // const [checkedTabs, setCheckedTabs] = useState([])

  useEffect(() => {
    fetchData('userMenu').then(res => {
      const list = res.data.list
      setList(list)
    })
  }, [])

  const chooseMenu = useCallback((indexs, name, childrenLen) => {
    console.log('-----------------------')
    // console.log(indexs)
    if (childrenLen === 0) {
      // console.log('link')
      setCurrMenu(indexs.join(','))
    } else {
      console.log('currMenu', currMenu)
      console.log('indexs', indexs.join(','))
      if (currMenu.startsWith(indexs.join(','))) {
        // close menu
        const currMenuArr = currMenu.split(',')
        if (indexs.length === currMenuArr.length) {
          if (indexs.length === 1) {
            // setCurrMenu([])
          } else {
            // setCurrMenu(indexs.slice(0, indexs.length - 2))
          }
        } else if (indexs.length < currMenu.length) {
          // setCurrMenu(indexs)
        } else {
        }
      } else {
        // open new menu
        // setCurrMenu(indexs)
      }
      setCurrMenu(indexs.join(','))
    }
  }, [])

  return (
    <div className={Page}>
      <div className={`${AppMenu} ${collapsed ? PartSlide : ''}`}>
        <div className={MenuInner}>
          <h1>react-admin</h1>
          <CommMenu list={list} chooseMenu={chooseMenu} currMenu={currMenu} />
        </div>
      </div>
      <div className={AppContent}>
        <div className={`${ContentBlock} ${collapsed ? SmallBlock : ''}`} />
        <div className={ContentMain} onClick={() => setCollapsed(!collapsed)}>
          3
        </div>
      </div>
    </div>
    // <div className={styles.App}>
    //   <div className={`${styles.Sider} ${collapsed ? styles.Collapsed : ''}`}>
    //     {/* <CommSider></CommSider> */}
    //   </div>
    //   <div className={styles.Main} onClick={()=> setCollapsed(!collapsed)}>
    //     <div className={styles.Header}></div>
    //     {/* <PageRouter></PageRouter> */}
    //     2
    //   </div>
    // </div>
  )
}
