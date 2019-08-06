import React, { useState } from 'react'
import { Layout } from 'antd'
import CommMenu from './CommMenu'
import CommHeader from './CommHeader'
import CommRouter from './CommRouter'
import './reset.css'
import './App.css'

const { Header, Sider, Content } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)
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
        <CommMenu />
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
            </div>
          </div>
        </Header>
        <Content>
          <div className="headerBlock"></div>
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
