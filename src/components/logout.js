import axios from 'axios';
import React from 'react';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            // Gửi yêu cầu logout đến server
            const response = await axios.post('http://localhost:3333/auth/logout');

            if (response.data) {
                // Xóa accessToken khỏi localStorage hoặc nơi lưu trữ khác
                localStorage.removeItem('accessToken');
                
                // Chuyển hướng người dùng đến trang đăng nhập
                window.location.href = '/login';
                console.log('Đã response.ok');
            }
            console.log('Đã try response.ok');
            console.log(response);
        } catch (error) {
            console.error('Đã xảy ra lỗi khi đăng xuất:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;