import React from 'react'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu

function madeTree(list, parent = []) {
  if (Array.isArray(list) && list.length > 0) {
    parent.push(1)
    return list.map(item => {
      const { children, resourceName, id } = item
      if (Array.isArray(children) && children.length > 0) {
        return (
          <SubMenu
            key={id}
            // mode={parent.length > 1 ? 'horizontal' : 'inline'}
            title={
              <span>
                <Icon type="user" />
                <span>
                  {resourceName}
                </span>
              </span>
            }
          >
            {madeTree(children, [...parent])}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={id}>
          <Icon type="desktop" />
          <span>{resourceName}</span>
        </Menu.Item>
      )
    })
  }
  return null
}

export default function CommMenu(props) {
  const { openKeys, changeOpenKeys, chooseMenu } = props
  return (
    <Menu
      theme="dark"
      openKeys={openKeys}
      onOpenChange={changeOpenKeys}
      onClick={chooseMenu}
      mode="inline"
    >
      {madeTree(props.list)}
    </Menu>
  )
}
