const initialState = {};

function reducer(state = initialState, action) {
  switch(action.type) {
    case "dummy":
      return state;
    default:
      return state;
  }
}

 export default reducer;