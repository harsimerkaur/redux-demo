const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}

// Reducers
// (previousState, action) => newState

const initialState = {
  numOfCakes: 10,
};
const initialCakestate = {
  numOfCakes: 10,
};

const initialIcecreamtate = {
  numOfIcecreams: 10,
};
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         numOfCakes: state.numOfCakes - 1,
//       };
//     default:
//       return state;
//   }
// };

const cakeReducer = (state = initialCakestate, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIcecreamtate, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        numOfIcecreams: state.numOfIcecreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
});

const store = createStore(rootReducer);
// console.log("reducer", reducer);
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
