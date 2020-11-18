// MAIN REACT LIBRARY and component important stuff
import React from 'react'
import classes from './SideDrawer.module.css'

// Importing Logo
import Logo from '../../Logo/Logo'
// Importing Navigation items
import NavItems from '../NavigationItems/NavigationItems'
// Importing Backdrop
import Backdrop from '../../UI/Backdrop/Backdrop'
// Importing Pux Container
import Pux from '../../../hoc/Pux/Pux'

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <Pux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Pux>
  )
}

export default SideDrawer