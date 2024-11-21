import axios from 'axios';
import React, { useState } from 'react';


const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            // const response = await fetch('http://localhost:3333/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ email, username, password })
            // });
            const response = await axios.post('http://localhost:3333/auth/register', { email, username, password });

            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                console.log('accessToken = ' + response.data.accessToken);
                // navigate('/auth/login');
                window.location.reload()
            } else {
                setError('Đăng ký tài khoản không thành công');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Có lỗi xảy ra khi đăng ký tài khoản');
        }
    };

    return (
        <>
            <h2>Register Form</h2>
            <div className='d-flex justify-content-between align-content-center flex-column'>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleRegistration}>Đăng ký</button>
                {error && <p>{error}</p>}
            </div>
        </>
    );
};

export default RegistrationForm; // dùng để sau này có thể push vào history