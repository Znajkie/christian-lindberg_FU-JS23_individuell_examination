import TokenStore from '../../Store/TokenStore'; //

const postLogin = async (username: string, password: string) => {
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
    const jwt: string = data.token;
    TokenStore.setState({ token: jwt });
    localStorage.setItem('jwt', jwt);

    window.location.href = '/orderstatus';
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default postLogin;
