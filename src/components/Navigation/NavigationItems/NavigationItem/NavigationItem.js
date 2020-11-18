// MAIN REACT LIBRARY and component important stuff
import React from 'react'
import classes from './NavigationItem.module.css'

// Importing links to change the content.
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavigationItem