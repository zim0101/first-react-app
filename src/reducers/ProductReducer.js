const initialState = {
  products: [],
  product: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
        return {
          ...state,
          products: action.payload
        };
    default:
        return state;
  }
}