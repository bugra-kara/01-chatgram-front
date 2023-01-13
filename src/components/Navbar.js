import React, { Fragment } from 'react'
import { Outlet } from 'react-router'

const Navbar = () => {
  return (
    <Fragment>
      <div>Navbar</div>
      <Outlet/>
    </Fragment>
  )
}

export default Navbar