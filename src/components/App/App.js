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
  AppMain,
  Collapsed,
  MenuInner,
  PartSlide,
  SmallBlock,
  ContentBlock,
  ContentMain
} from './App.css'
// console.log(styles)

// const { Header, Sider, Content } = Layout

// function App() {
//   const [collapsed, setCollapsed] = useState(false)
//   const [list, setList] = useState([])
//   const [checkedTabs, setCheckedTabs] = useState([])
//   useEffect(() => {
//     fetchData('userMenu').then(res => {
//       setList(res.data.list)
//     })
//   }, [])

//   function chooseMenu(indexs, name, len) {
//     const findIndex = checkedTabs.findIndex(
//       item => item[0].join('') === indexs.join('')
//     )
//     if(findIndex > -1){
//       setCheckedTabs([
//         ...checkedTabs.reduce((pre, curr, index) => {
//           const flg = index === findIndex
//           pre.push([curr[0], curr[1], curr[2], flg])
//           return pre
//         }, [])
//       ])
//     }else{
//       setCheckedTabs([
//         ...checkedTabs.reduce((pre, curr) => {
//           pre.push([curr[0], curr[1], curr[2], false])
//           return pre
//         }, []),
//         [indexs, name, len, true]
//       ])
//     }
//   }

//   function delTab(indexs, name, len) {
//     const findIndex = checkedTabs.findIndex(
//       item => item[0].join('') === indexs.join('')
//     )
//     const tabsLen = checkedTabs.length
//     let nextIndex = -1
//     if(findIndex === 0 && tabsLen  > 1){
//       nextIndex = findIndex + 1
//     }
//     if(findIndex > 0 ){
//       nextIndex = findIndex - 1
//     }

//     setCheckedTabs([
//       ...checkedTabs.reduce((pre, curr, index) => {
//         const flg = index === nextIndex
//         // console.log(`findIndex: ${findIndex}`)
//         // console.log(`index: ${index}`)
//         if(index !== findIndex){
//           pre.push([curr[0], curr[1], curr[2], flg])
//         }
//         return pre
//       }, [])
//     ])
//   }

//   return (
//     <Layout>
//       <div
//         // trigger={null}
//         // collapsible
//         // collapsed={collapsed}
//         style={{
//           position: 'fixed',
//           overflow: 'auto',
//           left: 0,
//           zIndex: 1000,
//           height: '100vh',
//         }}
//       >
//         <h1 className="sysName">react-admin</h1>
//         <CommMenu list={list} chooseMenu={chooseMenu} />
//       </div>
//       <Layout>
//         <Header
//           style={{
//             position: 'fixed',
//             width: '100%',
//             top: 0,
//             padding: 0,
//             zIndex: 999
//           }}
//         >
//           <div
//             className="contentSection"
//             style={{
//               background: '#fff'
//             }}
//           >
//             <div
//               className="block"
//               style={{
//                 width: collapsed ? '80px' : '200px'
//               }}
//             />
//             <div className="contentBlock">
//               <CommHeader
//                 collapsed={collapsed}
//                 handleClick={() => setCollapsed(!collapsed)}
//               />
//               <CommMenuTab
//                 list={checkedTabs}
//                 chooseMenu={chooseMenu}
//                 delTab={delTab}
//               />
//             </div>
//           </div>
//         </Header>
//         <Content>
//           <div className="headerBlock" />
//           <div className="contentSection">
//             <div
//               className="block"
//               style={{
//                 width: collapsed ? '80px' : '200px'
//               }}
//             />
//             <div className="contentBlock">
//               <CommRouter />
//             </div>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   )
// }

// export default App

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [list, setList] = useState([])
  const [currMenu, setCurrMenu] = useState([0, 0])
  const [checkedTabs, setCheckedTabs] = useState([])

  useEffect(() => {
    fetchData('userMenu').then(res => {
      const list = res.data.list
      setList(list)
    })
  }, [])

  const chooseMenu = useCallback((indexs, name, childrenLen) => {
    console.log('-----------------------')
    console.log(indexs)
    
    // console.log(name)
    // console.log(childrenLen)
    if(childrenLen === 0){
      // link
    }else{
      // console.log(indexs)
      // setCurrMenu(indexs)
    }
    setCurrMenu(indexs)

    // const findIndex = checkedTabs.findIndex(
    //   item => item[0].join('') === indexs.join('')
    // )
    // if(indexs.length === 1){
    //   if(childrenLen === 0){

    //   }else{

    //   }
    // }
    // if(findIndex > -1){
    //   setCheckedTabs([
    //     ...checkedTabs.reduce((pre, curr, index) => {
    //       const flg = index === findIndex
    //       pre.push([curr[0], curr[1], curr[2], flg])
    //       return pre
    //     }, [])
    //   ])
    // }else{
    //   setCheckedTabs([
    //     ...checkedTabs.reduce((pre, curr) => {
    //       pre.push([curr[0], curr[1], curr[2], false])
    //       return pre
    //     }, []),
    //     [indexs, name, len, true]
    //   ])
    // }
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
