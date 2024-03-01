import React, { useState, useEffect } from 'react';
import './datafetcher.css';
interface MenuItem {
  id: string;
  title: string;
  desc: string;
  price: number;
}

interface ApiResponse {
  success: boolean;
  menu: MenuItem[];
}

const API_URL = 'https://airbean-api-xjlcn.ondigitalocean.app/api/beans';

const DataFetcher: React.FC = (key) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;
  // console.log(data);

  return (
    <div className="coffee-wrapper">
      <h1 className="coffee__header">Meny</h1>
      {data && (
        <ul className="coffee__ul">
          {data.menu.map(({ id, title, desc, price }) => (
            <li className="coffee__li" key={id}>
              <div className="coffee__menu">
                <h3 className="title-with-dots">{title}</h3>
                <span className="coffee__price">{price} SEK</span>
              </div>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataFetcher;
