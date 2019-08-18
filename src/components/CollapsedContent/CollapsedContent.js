import React from 'react'
import { CollapsedSection, CollapsedMain } from './CollapsedContent.css'
import { MenuShow, MenuHide } from '../App/App.css'

export default function CollapsedContent(props) {
  const { collapsed, children, left = null } = props
  return (
    <div className={CollapsedSection}>
      <div className={collapsed ? MenuHide : MenuShow}>{left}</div>
      <div className={CollapsedMain}>{children}</div>
    </div>
  )
}
