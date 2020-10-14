// MAIN REACT LIBRARY and component important stuff
import React from 'react'
import classes from './SideDrawer.module.css'

// Importing Logo
import Logo from '../../Logo/Logo'
// Importing Navigation items
import NavItems from '../NavigatiopnItems/NavigationItems'
// Importing Backdrop
import Backdrop from '../../UI/Backdrop/Backdrop'
// Importing Aux Container
import Aux from '../../../hoc/Aux/Aux'

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  )
}

export default SideDrawer