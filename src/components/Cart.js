import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const GET_CART = gql`
  query GetCart($cartId: ID!) {
    getCart(cartId: $cartId) {
      _id
      items {
        _id
        name
        price
      }
    }
  }
`;

const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantity($cartId: ID! ,$itemId: ID!, $quantity: Int!) {
    updateItemQuantity(cartId:$cartId, itemId: $itemId, quantity: $quantity) {
      _id
      name
      price
      quantity
    }
  }
`;

export default function Cart() {
  const cartId = useHistory().location.pathname.split('/')[2];

  console.log(cartId,"this is the cartid")

  const { loading, error, data } = useQuery(GET_CART, {
    variables: { cartId },
    skip: !cartId
  });

  console.log(data,"this is the data here")


  const [updateItemQuantity] = useMutation(UPDATE_ITEM_QUANTITY);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>Error fetching cart: {error.message}</p>;
  }

  const { getCart:{items = []} = {} } = data;
  // const { items = [] } = cart;

  const handleQuantityChange = (itemId, newQuantity) => {
    updateItemQuantity({
      variables: { itemId, quantity: newQuantity },
      // Optional: Update cache to reflect the changed quantity immediately
      // refetchQueries: [{ query: GET_CART, variables: { cartId } }],
    });
  };

  const calculateTotalBill = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * (item.quantity  || 1);
    });
    return total + (total * 18/100) || '0';
  };

  return (
    <div>
      {console.log(data,"this is the data here")}
      {(Boolean(items.length))
      ?
      <>
      <h2>Cart</h2>
      {items.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
            Decrease Quantity
          </button>
          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
            Increase Quantity
          </button>
        </div>
      ))}
      <p>Total Bill: {calculateTotalBill()}</p>
      <button>Checkout</button>
      </>
      :
      <div>There is nothing in your cart</div>
      }
    </div>
  );
}
