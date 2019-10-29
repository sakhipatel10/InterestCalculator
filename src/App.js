import { createStore } from 'redux';

/*/************************
     PART 1: SETTING UP
/**************************/

const reducer = (state =0 , action) => {
  if(!action.payload){
    action.payload = {principal:0, rate:0, years: 0}
  }
  
  return action.payload.principal * (1 + ((action.payload.rate/100) * action.payload.years));

};

const store = createStore(reducer);
console.log(store.getState());
/*/************************
  PART 2: UTILITY METHODS
/**************************/

/**
 * Gets the value of the input field
 *
 * @return {Number} Value of the input field
 */
const getValue = (str) => {
  let value = parseFloat(document.getElementById(str).value);
  return isNaN(value) ? 0 : value;
};

/**
 * Sets the total value as returned by the store
 */
const setTotal = value => {
  document.getElementById('grand-total').innerHTML = value;
};

/*/************************
  PART 3: ACTION CREATORS
/**************************/

/**
 * Action Creator. Returns an action of the type 'SET'
 */
const setValue = () => ({
  type: 'SET',
  payload: { 
            principal: getValue('principal'),
             rate: getValue('rate'),
             years: getValue('years'),
            },
});


/*/************************
  PART 4: HOOK BEHAVIOR
/**************************/

// Subscribe to updates
store.subscribe(() => {
  setTotal(store.getState());
});

// Handle button click
document.getElementById('submit').addEventListener('click', () => {
  store.dispatch(setValue());
});

