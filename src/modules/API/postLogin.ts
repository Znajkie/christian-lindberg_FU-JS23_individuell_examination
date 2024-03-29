export const postLogin = async (username: string, password: string) => {

  try {
    const response = await fetch(
      'https://airbean-9pcyw.ondigitalocean.app/api/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    const jwt: string = data.token;

    return jwt;
  
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
