import React, { Fragment } from 'react'
import { Outlet } from 'react-router'

const Sidebar = () => {
  return (
    <Fragment>
      <div>Sidebar</div>
      <Outlet/>
    </Fragment>
  )
}

export default Sidebar