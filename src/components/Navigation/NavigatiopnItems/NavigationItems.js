// MAIN REACT LIBRARY and component important stuff
import React from 'react'
import classes from './NavigationItems.module.css'

// Importing single navigation item
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
  return (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">
      BurgerBuilder
    </NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
    {!props.isAuthenticated
    ? <NavigationItem link="/auth">Sign Up</NavigationItem>
    : <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
  )

}

export default NavigationItems