import React from 'react';
import BuildControl from './BuildControl';
import classes from './index.module.css';

const buttonList = [
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {
        buttonList.map((btn) => {
          return <BuildControl
              key={btn.label}
              label={btn.label}
              added={() => props.ingredientAdded(btn.type)}
              removed={() => props.ingredientRemoved(btn.type)}
              disable={props.disableInfo[btn.type]}
            />
        })
      }
    </div>
  );
};

export default BuildControls;