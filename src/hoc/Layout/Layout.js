// MAIN REACT LIBRARY and component important stuff.
import React, { useState } from 'react'
import classes from './Layout.module.css'
// Importing connect functionality to connect to main redux
import { connect } from 'react-redux';

// Puxillary files. [Aux file name is not allowed in windows]
import Pux from '../Pux/Pux'

// Importing toolbar component => for rendering the toolbar anywhere.
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

// Importing SideDrawer
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = (props) => {
  const [isVisibleSideDrawer, setVisibleSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setVisibleSideDrawer( false );
  }

  const drawerToggleHandler = () => {
    setVisibleSideDrawer(isVisibleSideDrawer);
  }
  return (
    <Pux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={drawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={isVisibleSideDrawer}
        closed={sideDrawerClosedHandler}/>
      <main className={classes.Content}>
        { props.children }
      </main>
    </Pux>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};


export default connect(mapStateToProps)(Layout);