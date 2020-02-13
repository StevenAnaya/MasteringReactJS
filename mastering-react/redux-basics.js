const redux = require('redux');

const createStore = redux.createStore;

const initialState = {
  counter: 0
};

//Reducers
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC_COUNTER':
      return {...state, counter: state.counter + 1};
    case 'ADD_COUNTER':
      return {...state, counter: state.counter + action.value}
    default:
      return state;
  }
};

//Store
const store = createStore(rootReducer);

//Subscriptions
store.subscription(() => {
  console.log('[Subscription]' + store.getState());
});

//Dispatching
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', value: 10 });