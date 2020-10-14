// MAIN REACT LIBRARY and component important stuff
import React from 'react'
import classes from './Toolbar.module.css'

// Importing logo
import Logo from '../../Logo/Logo'

// Importing navigation items
import NavigationItems from '../NavigatiopnItems/NavigationItems'

// Importing drawerToggle component
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes['Desktop-only']}>
        <NavigationItems />
      </nav>
    </header>
  )
}

export default Toolbar