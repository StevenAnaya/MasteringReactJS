import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';

const INGREDIENT_PIECES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.7 
}

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
      },
      totalPrice: 4
    };
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PIECES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = priceAddition + oldPrice;
    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    };

    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceDeduction = INGREDIENT_PIECES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice =  oldPrice - priceDeduction;
    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    });
  };

  render () {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    };

    return (
      <Fragment>
        <Burger 
          ingredients={this.state.ingredients}
        />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disableInfo={disableInfo}
          price={this.state.totalPrice}
        />
      </Fragment>
    );  
  };
};

export default BurgerBuilder;