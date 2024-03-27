const getDetails = (cartItems, menuItems) => {
  const items:any[] = [];

  cartItems.forEach(item => {

    const itemDetail = menuItems.find(
      (menuItem) => menuItem.id === item.id
    );

    for (let i = 0; i < item.quantity; i++) {
      items.push({
        name: itemDetail.title,
        price: itemDetail.price,
      });
    }
  });
  return items;
}

const postOrder = async (
  token,
  cartItems,
  menuItems,
  onSuccessfulCheckout,
  onFailedCheckout
) => {
  const API_URL = 'https://airbean-9pcyw.ondigitalocean.app/api/beans/order';

  try {
    const orderDetails = getDetails(cartItems, menuItems);
    
    let headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
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
