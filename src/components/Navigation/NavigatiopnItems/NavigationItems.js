// MAIN REACT LIBRARY and component important stuff
import React from 'react'
import classes from './NavigationItems.module.css'

// Importing single navigation item
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">
      BurgerBuilder
    </NavigationItem>
    <NavigationItem link="/orders">
      Orders
    </NavigationItem>
  </ul>
)

export default NavigationItems