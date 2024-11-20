import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Profile from './components/profile';

// const Profile = ({ user }) => {
//   return (
//     <div>
//       <h2>Welcome, {user.email}</h2>
//       <p>User ID: {user._id}</p>
//     </div>
//   );
// };

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => { // load đầu tiên để ktra có accessToken jwt không?
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axios.get(`http://localhost:3333/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Có lỗi khi tải trang cá nhân!');
      });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/auth/login', { email: username, password });

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        window.location.reload(); // reload để lấy thông tin người dùng
      } else {
        setErrorMessage('Sai tài khoản hoặc mật khẩu');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Có lỗi trong quá trình đăng nhập.');
    }
  };

  return (
    <div>
      {user ? (
        <Profile user={user} />
      ) : (
        <div>
          <h2>Login Form</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginForm;