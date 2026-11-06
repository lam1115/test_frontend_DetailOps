import { createContext, useContext, useState } from 'react';
import { useToast } from '../components/common';

// 1. Tạo Context lưu trữ thông tin xác thực
const AuthContext = createContext(null);

// 2 Tài khoản mẫu cố định (Seed Accounts) của hệ thống RetailOps v1.0
const INITIAL_USERS = [
  {
    id: 'usr_admin_01',
    name: 'Nguyễn Minh Hiếu',
    email: 'minhhieu19692016@gmail.com',
    password: 'admin123',
    role: 'ADMIN',
  },
  {
    id: 'usr_staff_01',
    name: 'Cao Nguyễn Anh Dương',
    email: 'caoanhnguyenduong@gmail.com',
    password: 'staff123',
    role: 'STAFF',
  },
];

// 2. Tạo Provider bọc ngoài ứng dụng
export function AuthProvider({ children }) {
  const toast = useToast();

  // Danh sách tài khoản tạm thời trong bộ nhớ
  const [usersList, setUsersList] = useState(INITIAL_USERS);

  // Mặc định user = null để bắt đầu từ màn hình /login (hoặc lưu phiên hiện tại)
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Hàm đăng nhập: kiểm tra email & password trong usersList
  const login = (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const foundUser = usersList.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!foundUser) {
      throw new Error('Thông tin đăng nhập không hợp lệ');
    }

    const sessionUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    // Tạo giả một accessToken lưu trong bộ nhớ
    const mockToken = `rops_token_${foundUser.role.toLowerCase()}_${Date.now()}`;

    setUser(sessionUser);
    setAccessToken(mockToken);
    toast.success(`Đăng nhập thành công! Xin chào ${sessionUser.name}`);

    return sessionUser;
  };

  // Hàm đăng ký tài khoản mới từ Register.jsx -> đẩy vào usersList với role: 'STAFF'
  const register = (userData) => {
    const normalizedEmail = (userData.email || '').trim().toLowerCase();

    const newUser = {
      id: `usr_staff_${Date.now()}`,
      name: (userData.fullName || 'Nhân viên mới').trim(),
      email: normalizedEmail,
      password: userData.password,
      role: 'STAFF',
    };

    setUsersList((prev) => {
      // Nếu email đã tồn tại thì cập nhật, chưa có thì thêm mới
      const exists = prev.some((u) => u.email.toLowerCase() === normalizedEmail);
      if (exists) {
        return prev.map((u) =>
          u.email.toLowerCase() === normalizedEmail ? newUser : u
        );
      }
      return [...prev, newUser];
    });

    return newUser;
  };

  // Hàm đăng xuất: xóa user, xóa token và thông báo Toast
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    toast.info('Đã đăng xuất khỏi hệ thống');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        usersList,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook giúp lấy nhanh dữ liệu từ AuthContext ở bất kỳ component nào
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong <AuthProvider>');
  }
  return context;
}
