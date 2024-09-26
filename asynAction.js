const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const { thunk } = require("redux-thunk");
const axios = require("axios");
console.log("thunkMiddleware", thunk);
const initialState = {
  users: [],
  error: "",
  loading: true,
};

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_ERROR = "FETCH_USER_ERROR";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

const fecthUserError = (error) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: error,
  };
};

const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const posts = response.data.map((post) => post.id);
        dispatch(fetchUsersSuccess(posts));
      })
      .catch((error) => {
        dispatch(fecthUserError(error.message));
      });
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_USER_SUCCESS: {
      return {
        // ...state,
        users: action.payload,
        loading: false,
      };
    }

    case FETCH_USER_ERROR: {
      return {
        // ...state,
        error: action.payload || "something went wrong",
        loading: false,
        users: [],
      };
    }
  }
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUser());
