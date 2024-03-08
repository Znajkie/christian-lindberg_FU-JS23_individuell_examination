import React, { useState, useEffect } from 'react';
import { useShopStore } from '../../Store/counter';
import { useCountStore } from '../../Store/counter';
import header from '../../assets/header.svg';
import footer from '../../assets/footer.svg';
import addButton from '../../assets/add.svg'
import NavMenu from '../../pages/NavMenu';
import './datafetcher.css';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

interface MenuItem {
  id: string;
  title: string;
  desc: string;
  price: number;
  count?: number;
  increment?: number;
}

interface ApiResponse {
  success: boolean;
  menu: MenuItem[];
}

const API_URL = 'https://airbean-api-xjlcn.ondigitalocean.app/api/beans';

const DataFetcher: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Move the useShopStore hook call inside the component
  const addToShoppingList = useShopStore((state) => state.addToShoppingList);

  const { increment } = useCountStore();


  const handleAddClick = (id) => {
    addToShoppingList(id);
    increment();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

const setMenuItems = useShopStore((state) => state.setMenuItems);

useEffect(() => {
  if (data) {
    // Assuming `data.menu` is the array of MenuItem you fetched
    setMenuItems(data.menu);
  }
}, [data, setMenuItems]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="coffee-wrapper">
      <NavMenu />
      <img src={header} alt="Header" />
        <ShoppingCart />
      <h1 className="coffee__header">Meny</h1>
      {data && (
        <ul className="coffee__ul">
          {data.menu.map(({ id, title, desc, price }) => (
            <li className="coffee__li" key={id}>
              <div className="coffee__menu">
                <button
                  className="add-button"onClick={() => handleAddClick(id)}>
                  <img src={addButton} alt="Add" />
                </button>
                <div className="title-wrapper">
                  <span className="title-with-dots">{title}</span>
                  <span className="coffee__price">{price} SEK</span>
                </div>
              </div>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      )}
      <img src={footer} alt="Footer" />
    </div>
  );
};

export default DataFetcher;
