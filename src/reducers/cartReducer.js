// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Initial state
const initialState = {
  items: [],
};

// Reducer
const cartReducer = (state = initialState, action) => {
    let index,items;
  switch (action.type) {
    case 'SET_CART_ID':
        return {
            ...state,
            cartId: action.payload
        }
    case ADD_TO_CART:
       index = state.items.map(p=>p.menuItemId).indexOf(action.payload.menuItemId)
       items = state.items      
      if(~index){
          if(action.payload.quantity) items[index].quantity = action.payload.quantity
          else items[index].quantity += 1
        }else{
        items = [...state.items, {...action.payload, quantity: 1}]
      }

      return {
        ...state,
        items,
      };
    case REMOVE_FROM_CART:
        index = state.items.map(p=>p.menuItemId).indexOf(action.payload.menuItemId)
        items = state.items
        if(~index){
          if(action.payload.quantity) items[index].quantity = action.payload.quantity
          else items[index].quantity -= 1
        }
  
        return {
          ...state,
          items,
        };
    default:
      return state;
  }
};

export default cartReducer;
