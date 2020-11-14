// MAIN REACT LIBRARY and component important stuff
import React from 'react'
import classes from './BuildControls.module.css'

// Importing Build Control
import BuildControl from './BuildControl/BuildControl'

const controlls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const BuildControls = (props) => {
  return(
    <div className={classes.BuildControls}>
      <p>Current price: <b>{props.price.toFixed(2)}</b></p>
      {
        controlls.map(ctrl =>
          <BuildControl
            key={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            type={ctrl.type}
            label={ctrl.label}
            disabled={props.disabled[ctrl.type]}
          />
        )
      }
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.isOrdered}>{props.isAuth ? "ORDER NOW" : "Please Login To Order"}</button>
    </div>
  )
}

export default BuildControls