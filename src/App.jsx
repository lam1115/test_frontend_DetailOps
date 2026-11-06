import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import MainLayout from './layouts/MainLayout/MainLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import ProductListDemo from './pages/Products/ProductListDemo';
import styles from './layouts/MainLayout/MainLayout.module.css';

// Component hiển thị nội dung mẫu cho từng trang trong 10 mục menu
function MockPage({ title, description, allowedRolesText }) {
  return (
    <div className={styles.demoCard}>
      <div className={styles.demoHeader}>
        <h1 className={styles.demoTitle}>{title}</h1>
        <span className={styles.demoRoleTag}>Quyền truy cập: {allowedRolesText}</span>
      </div>
      <p className={styles.demoDesc}>{description}</p>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Nhóm Route Xác thực (/login và /register) bọc trong <AuthLayout /> */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* 2. Nhóm Route Không gian làm việc sử dụng chung <MainLayout /> */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              {/* Mặc định truy cập "/" sẽ chuyển về "/dashboard" (nếu là STAFF sẽ tự chuyển tiếp về "/pos") */}
              <Route index element={<Navigate to="/dashboard" replace />} />

              {/* 1. Tổng quan (/dashboard) - Chỉ ['ADMIN'] */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <MockPage
                      title="1. Tổng quan (Dashboard)"
                      allowedRolesText="ADMIN"
                      description="Trang thống kê doanh thu, lợi nhuận, biểu đồ tăng trưởng và chỉ số vận hành cửa hàng."
                    />
                  </ProtectedRoute>
                }
              />

              {/* 2. Bán hàng (POS) (/pos) - Cả ['ADMIN', 'STAFF'] */}
              <Route
                path="pos"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                    <MockPage
                      title="2. Bán hàng tại quầy (POS)"
                      allowedRolesText="ADMIN, STAFF"
                      description="Màn hình tạo hóa đơn bán lẻ, quét mã vạch sản phẩm và thanh toán nhanh cho khách hàng."
                    />
                  </ProtectedRoute>
                }
              />

              {/* 3. Sản phẩm (/products) - Cả ['ADMIN', 'STAFF'] */}
              <Route
                path="products"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                    <ProductListDemo />
                  </ProtectedRoute>
                }
              />

              {/* 4. Danh mục (/categories) - Chỉ ['ADMIN'] */}
              <Route
                path="categories"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <MockPage
                      title="4. Quản lý Danh mục"
                      allowedRolesText="ADMIN"
                      description="Phân nhóm ngành hàng và cấu trúc danh mục sản phẩm trong chuỗi cửa hàng."
                    />
                  </ProtectedRoute>
                }
              />

              {/* 5. Nhà cung cấp (/suppliers) - Chỉ ['ADMIN'] */}
              <Route
                path="suppliers"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <MockPage
                      title="5. Quản lý Nhà cung cấp"
                      allowedRolesText="ADMIN"
                      description="Quản lý thông tin đối tác, công nợ và lịch sử cung ứng hàng hóa."
                    />
                  </ProtectedRoute>
                }
              />

              {/* 6. Nhập hàng (/purchases) - Chỉ ['ADMIN'] */}
              <Route
                path="purchases"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <MockPage
                      title="6. Quản lý Nhập hàng"
                      allowedRolesText="ADMIN"
                      description="Tạo phiếu nhập kho, kiểm duyệt lô hàng mới và cập nhật giá vốn."
                    />
                  </ProtectedRoute>
                }
              />

              {/* 7. Tồn kho (/inventory) - Cả ['ADMIN', 'STAFF'] */}
              <Route
                path="inventory"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                    <MockPage
                      title="7. Quản lý Tồn kho"
                      allowedRolesText="ADMIN, STAFF"
                      description="Theo dõi số lượng tồn kho thực tế, cảnh báo sắp hết hàng và kiểm kê định kỳ."
                    />
                  </ProtectedRoute>
                }
              />

              {/* 8. Đơn hàng (/orders) - Cả ['ADMIN', 'STAFF'] */}
              <Route
                path="orders"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                    <MockPage
                      title="8. Quản lý Đơn hàng"
                      allowedRolesText="ADMIN, STAFF"
                      description="Tra cứu lịch sử hóa đơn, trạng thái thanh toán và hỗ trợ đổi trả hàng."
                    />
                  </ProtectedRoute>
                }
              />

              {/* 9. Nhân viên (/staff) - Chỉ ['ADMIN'] */}
              <Route
                path="staff"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <MockPage
                      title="9. Quản lý Nhân viên"
                      allowedRolesText="ADMIN"
                      description="Quản lý tài khoản nhân sự, phân ca làm việc và phân quyền hệ thống."
                    />
                  </ProtectedRoute>
                }
              />

              {/* 10. Trợ lý AI (/ai-assistant) - Chỉ ['ADMIN'] */}
              <Route
                path="ai-assistant"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <MockPage
                      title="10. Trợ lý AI (RetailOps AI)"
                      allowedRolesText="ADMIN"
                      description="Phân tích xu hướng bán hàng thông minh và gợi ý nhập hàng tự động bằng AI."
                    />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Đường dẫn không tồn tại sẽ quay về trang chủ */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}
