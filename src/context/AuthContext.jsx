import { createContext, useContext, useState } from 'react';

// 1. Tạo Context lưu trữ thông tin xác thực
const AuthContext = createContext(null);

// Dữ liệu mẫu cho 2 vai trò để dễ dàng chuyển đổi và kiểm thử giao diện
const MOCK_USERS = {
  ADMIN: {
    id: 'usr_admin_01',
    name: 'Nguyễn Minh Hiếu',
    email: 'admin@retailops.vn',
    role: 'ADMIN',
  },
  STAFF: {
    id: 'usr_staff_01',
    name: 'Cao Nguyễn Anh Dương',
    email: 'caoanhnguyenduong@gmail.com',
    role: 'STAFF',
  },
};

// 2. Tạo Provider bọc ngoài ứng dụng
export function AuthProvider({ children }) {
  // Mặc định đăng nhập sẵn với quyền ADMIN để xem toàn bộ 10 mục menu
  const [user, setUser] = useState(MOCK_USERS.ADMIN);

  // Hàm đăng nhập theo vai trò ('ADMIN' hoặc 'STAFF')
  const login = (role = 'ADMIN') => {
    setUser(MOCK_USERS[role] || MOCK_USERS.ADMIN);
  };

  // Hàm đăng xuất nhanh (xóa thông tin user)
  const logout = () => {
    setUser(null);
  };

  // Hàm chuyển đổi nhanh giữa ADMIN <-> STAFF trên thanh Header để test phân quyền
  const toggleRole = () => {
    setUser((prevUser) => {
      if (!prevUser) return MOCK_USERS.ADMIN;
      return prevUser.role === 'ADMIN' ? MOCK_USERS.STAFF : MOCK_USERS.ADMIN;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleRole }}>
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

