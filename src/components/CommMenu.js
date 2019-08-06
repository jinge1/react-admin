import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'antd'
import fetchData from './../utils/fetchData'
const { SubMenu } = Menu

function madeTree(list) {
  if (Array.isArray(list) && list.length > 0) {
    return list.map(item => {
      const { children, resourceName, id } = item
      if (Array.isArray(children) && children.length > 0) {
        return (
          <SubMenu
            key={id}
            title={
              <span>
                <Icon type="user" />
                <span>{resourceName}</span>
              </span>
            }
          >
            {madeTree(children)}
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
  const [list, setList] = useState([])
  useEffect(() => {
    fetchData('userMenu').then(res => {
      setList(res.data.list)
    })
  }, [])
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {madeTree(list)}
    </Menu>
  )
}
