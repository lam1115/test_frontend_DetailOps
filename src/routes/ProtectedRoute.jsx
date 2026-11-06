import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Component bảo vệ Route theo trạng thái đăng nhập và phân quyền (allowedRoles)
 * - Nếu chưa đăng nhập (user === null) -> Chuyển hướng về trang /login
 * - Nếu đã đăng nhập nhưng role không nằm trong allowedRoles -> Chuyển hướng về /pos (trang mặc định mọi nhân viên đều vào được)
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  // 1. Chưa đăng nhập -> điều hướng về trang đăng nhập
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Có yêu cầu phân quyền nhưng vai trò của user không hợp lệ -> đưa về /pos
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/pos" replace />;
  }

  // 3. Hợp lệ -> hiển thị nội dung trang
  return children;
}

