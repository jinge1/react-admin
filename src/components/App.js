import React, { useState } from 'react'
import { Layout } from 'antd'
import CommMenu from './CommMenu'
import CommHeader from './CommHeader'
import CommRouter from './CommRouter'
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
            zIndex: 999,
          }}
        >
          <div
            className="contentBlock"
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
            <CommHeader
              collapsed={collapsed}
              handleClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </Header>
        <Content>
          <div className="contentBlock">
            <div
              className="block"
              style={{
                width: collapsed ? '80px' : '200px'
              }}
            />
            <CommRouter />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
