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
  const [openKeys, setOpenKeys] = useState([])
  const [tabs, setTabs] = useState([])
  const [currTab, setCurrTab] = useState({})
  useEffect(() => {
    fetchData('userMenu').then(res => {
      setList(res.data.list)
    })
  }, [])

  function changeOpenKeys(item) {
    setOpenKeys(item)
  }

  function chooseMenu(item) {
    const { key } = item
    if (!tabs.includes(key)) {
      setTabs([...tabs, item])
    }
    // setCurrTab(item)
  }

  function delTab(item) {
    const nextArr = tabs.filter(tab => tab.key !== item.key)
    setTabs(nextArr)
    // setCurrTab(nextArr.length > 0 ? nextArr[nextArr.length - 1] : 0)
  }

  console.log(tabs)

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
        <h1 className="sysName">react-admin-{tabs.length}-</h1>
        <CommMenu
          list={list}
          openKeys={openKeys}
          chooseMenu={chooseMenu}
          changeOpenKeys={changeOpenKeys}
        />
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
                list={tabs}
                currTab={currTab}
                setCurrTab={setCurrTab}
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
          {openKeys}
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
