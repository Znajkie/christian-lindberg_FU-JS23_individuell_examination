const postOrder = async (
  cartItems,
  menuItems,
  onSuccessfulCheckout,
  onFailedCheckout
) => {
  const API_URL =
    'https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order';

try {
  const localStorageToken = localStorage.getItem('jwt');

  let headers = {
    'Content-Type': 'application/json',
  };

  // Conditionally add the Authorization header only if the token exists
  if (localStorageToken) {
    headers['Authorization'] = `Bearer ${localStorageToken}`;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      details: {
        order: cartItems.map((cartItem) => {
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
        }),
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
  console.error('There was a problem with the fetch operation:', error);
  onFailedCheckout(error);
}


}

export default postOrder;
