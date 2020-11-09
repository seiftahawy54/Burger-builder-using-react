// MAIN REACT LIBRARY and component important stuff.
import React, { Component } from 'react'
import classes from './Layout.module.css'

// Puxillary files.
import Pux from '../Pux/Pux'

// Importing toolbar component => for rendering the toolbar anywhere.
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

// Importing SideDrawer
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    isVisibleSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      isVisibleSideDrawer: false
    })
  }

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { isVisibleSideDrawer: !prevState.isVisibleSideDrawer }
    })
  }

  render = () => {
    return (
      <Pux>
        <Toolbar
          drawerToggleClicked={this.drawerToggleHandler}
        />
        <SideDrawer
          open={this.state.isVisibleSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          { this.props.children }
        </main>
      </Pux>
    )
  }
}

export default Layout