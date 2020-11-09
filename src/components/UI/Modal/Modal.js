// MAIN REACT LIBRARY and component important stuff
import React, { Component } from 'react'
import classes from './Modal.module.css'

// Importing Pux conatainer
import Pux from '../../../hoc/Pux/Pux'

// Importing backdrop => To make the backdrop effect
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentDidUpdate () {
  }

  render = () => {
    return (
      <Pux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Pux>
    )
  }
}

export default Modal