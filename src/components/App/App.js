import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import CommMenu from '../CommMenu/CommMenu'
import CommMenuTab from '../CommMenuTab/CommMenuTab'
import CommHeader from '../CommHeader/CommHeader'
import CommRouter from '../CommRouter'
import fetchData from '../../utils/fetchData'
import './reset.css'
import './App.css'

const { Header, Sider, Content } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [list, setList] = useState([])
  const [checkedTabs, setCheckedTabs] = useState([])
  // const [tabs, setTabs] = useState([])
  // const [currTab, setCurrTab] = useState({})
  useEffect(() => {
    fetchData('userMenu').then(res => {
      setList(res.data.list)
    })
  }, [])

  function chooseMenu(indexs, name, len) {
    const findIndex = checkedTabs.findIndex(
      item => item[0].join('') === indexs.join('')
    )
    if(findIndex > -1){
      setCheckedTabs([
        ...checkedTabs.reduce((pre, curr, index) => {
          const flg = index === findIndex
          pre.push([curr[0], curr[1], curr[2], flg])
          return pre
        }, [])
      ])
    }else{
      setCheckedTabs([
        ...checkedTabs.reduce((pre, curr) => {
          pre.push([curr[0], curr[1], curr[2], false])
          return pre
        }, []),
        [indexs, name, len, true]
      ])
    }
  }

  function delTab(indexs, name, len) {
    const findIndex = checkedTabs.findIndex(
      item => item[0].join('') === indexs.join('')
    )
    const nextIndex = findIndex > 0 ? findIndex - 1 : 0
    setCheckedTabs([
      ...checkedTabs.reduce((pre, curr, index) => {
        const flg = index === nextIndex
        // console.log(`findIndex: ${findIndex}`)
        // console.log(`index: ${index}`)
        if(index !== findIndex){
          pre.push([curr[0], curr[1], curr[2], flg])
        }
        return pre
      }, [])
    ])
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: 'fixed',
          overflow: 'auto',
          left: 0,
          zIndex: 1000,
          height: '100vh'
        }}
      >
        <h1 className="sysName">react-admin</h1>
        <CommMenu list={list} chooseMenu={chooseMenu} />
      </Sider>
      <Layout>
        <Header
          style={{
            position: 'fixed',
            width: '100%',
            top: 0,
            padding: 0,
            zIndex: 999
          }}
        >
          <div
            className="contentSection"
            style={{
              background: '#fff'
            }}
          >
            <div
              className="block"
              style={{
                width: collapsed ? '80px' : '200px'
              }}
            />
            <div className="contentBlock">
              <CommHeader
                collapsed={collapsed}
                handleClick={() => setCollapsed(!collapsed)}
              />
              <CommMenuTab
                list={checkedTabs}
                chooseMenu={chooseMenu}
                delTab={delTab}
              />
            </div>
          </div>
        </Header>
        <Content>
          <div className="headerBlock" />
          <div className="contentSection">
            <div
              className="block"
              style={{
                width: collapsed ? '80px' : '200px'
              }}
            />
            <div className="contentBlock">
              <CommRouter />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
