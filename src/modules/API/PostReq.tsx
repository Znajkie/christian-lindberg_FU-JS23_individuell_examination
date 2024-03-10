
const getCartDetails = (cartItems, menuItems) => {
  return cartItems.map((cartItem) => {
    const itemDetail = menuItems.find(
      (menuItem) => menuItem.id === cartItem.id
    );
    if (!itemDetail) {
      throw new Error(
        `Item detail not found for cart item with id: ${cartItem.id}`
      );
    }
    return {
      name: itemDetail.title,
      price: itemDetail.price,
    };
  });
};

const postOrder = async (
  cartItems,
  menuItems,
  onSuccessfulCheckout,
  onFailedCheckout
) => {
  const API_URL =
    'https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order';

  try {
    const orderDetails = getCartDetails(cartItems, menuItems);
    const localStorageToken = localStorage.getItem('jwt');

    let headers = {
      'Content-Type': 'application/json',
    };

    if (localStorageToken && localStorageToken !== '') {
      headers['Authorization'] = `Bearer ${localStorageToken}`;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        details: {
          order: orderDetails,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Response not OK:', errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    onSuccessfulCheckout(data);
  } catch (error) {
    console.error('There was a problem with the operation:', error);
    onFailedCheckout(error);
  }
};

export default postOrder;
