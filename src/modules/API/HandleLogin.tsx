const handleLogin = async (username : string, password : string) => {
  try {
    const response = await fetch(
      'https://airbean-api-xjlcn.ondigitalocean.app/api/user/login',
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
    const jwt : string= data.token;

    // You would typically store the JWT in localStorage or sessionStorage
    localStorage.setItem('jwt', jwt);

    // Do something after successful login
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
