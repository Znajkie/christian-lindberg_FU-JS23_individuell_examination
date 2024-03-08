const postOrder = async (
  cartItems,
  menuItems,
  onSuccessfulCheckout,
  onFailedCheckout
) => {
  const API_POST_URL =
    'https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order';

  const orderPayload = {
    details: {
      order: cartItems.map((cartItem) => {
        const itemDetail = menuItems.find(
          (menuItem) => menuItem.id === cartItem.id
        );
        return {
          name: itemDetail?.title,
          price: itemDetail?.price,
        };
      }),
    },
  };

  try {
    const response = await fetch(API_POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
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
};

export default postOrder;
