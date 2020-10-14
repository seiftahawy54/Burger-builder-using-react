// MAIN REACT LIBRARY and component important stuff
import React from 'react'
import classes from './Logo.module.css'

// Importing burger logo image dynamically, and thats make webpack aware of the image.
import burgerLogo from '../../assets/images/burger-logo.png'

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Burger Logo" />
    </div>
  )
}

export default Logo