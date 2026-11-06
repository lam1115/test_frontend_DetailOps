import { useState } from 'react';
import { Table, Pagination, Modal, useToast } from '../../components/common';
import modalStyles from '../../components/common/Modal/Modal.module.css';

// Giữ nguyên dữ liệu sản phẩm bán lẻ mẫu (bổ sung trường activeStatus cho cột Trạng thái hoạt động)
const INITIAL_PRODUCTS = [
  {
    id: 1,
    sku: 'SP-00101',
    name: 'Cà phê Rang Xay Arabica Cầu Đất 500g',
    category: 'Đồ uống & Pha chế',
    stock: 48,
    price: 165000,
    status: 'IN_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 2,
    sku: 'SP-00102',
    name: 'Sữa tươi Tiệt trùng Nguyên kem 1L',
    category: 'Sữa & Chế phẩm sữa',
    stock: 6,
    price: 38000,
    status: 'LOW_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 3,
    sku: 'SP-00103',
    name: 'Trà Ô Long Thượng Hạng Hộp Thiếc 250g',
    category: 'Đồ uống & Pha chế',
    stock: 0,
    price: 120000,
    status: 'OUT_OF_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 4,
    sku: 'SP-00104',
    name: 'Bánh Quy Bơ Đan Mạch Hộp 454g',
    category: 'Bánh kẹo & Đồ ăn vặt',
    stock: 32,
    price: 145000,
    status: 'IN_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 5,
    sku: 'SP-00105',
    name: 'Mật Ong Hoa Nhãn Nguyên Chất 1L',
    category: 'Thực phẩm khô',
    stock: 4,
    price: 210000,
    status: 'LOW_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 6,
    sku: 'SP-00106',
    name: 'Hạt Điều Rang Muối Bình Phước 500g',
    category: 'Bánh kẹo & Đồ ăn vặt',
    stock: 25,
    price: 175000,
    status: 'IN_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 7,
    sku: 'SP-00107',
    name: 'Dầu Ô Liu Nguyên Chất Extra Virgin 500ml',
    category: 'Gia vị & Dầu ăn',
    stock: 0,
    price: 195000,
    status: 'OUT_OF_STOCK',
    activeStatus: 'INACTIVE',
  },
  {
    id: 8,
    sku: 'SP-00108',
    name: 'Nước Khoáng Thiên Nhiên Đóng Chai 500ml (Thùng 24)',
    category: 'Đồ uống & Pha chế',
    stock: 60,
    price: 98000,
    status: 'IN_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 9,
    sku: 'SP-00109',
    name: 'Yến Mạch Cán Dẹt Nhập Khẩu Úc 800g',
    category: 'Thực phẩm khô',
    stock: 5,
    price: 89000,
    status: 'LOW_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 10,
    sku: 'SP-00110',
    name: 'Sô Cô La Đen 72% Cacao Thanh 100g',
    category: 'Bánh kẹo & Đồ ăn vặt',
    stock: 19,
    price: 65000,
    status: 'IN_STOCK',
    activeStatus: 'INACTIVE',
  },
  {
    id: 11,
    sku: 'SP-00111',
    name: 'Nước Giải Khát Coca-Cola Lon 330ml (Lốc 6)',
    category: 'Đồ uống & Pha chế',
    stock: 85,
    price: 58000,
    status: 'IN_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 12,
    sku: 'SP-00112',
    name: 'Mì Hảo Hảo Tôm Chua Cay Thùng 30 Gói',
    category: 'Thực phẩm khô',
    stock: 7,
    price: 118000,
    status: 'LOW_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 13,
    sku: 'SP-00113',
    name: 'Nước Tương Tam Thái Tử Nhất Ca 500ml',
    category: 'Gia vị & Dầu ăn',
    stock: 0,
    price: 18000,
    status: 'OUT_OF_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 14,
    sku: 'SP-00114',
    name: 'Dầu Ăn Thượng Hạng Tường An 1L',
    category: 'Gia vị & Dầu ăn',
    stock: 42,
    price: 54000,
    status: 'IN_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 15,
    sku: 'SP-00115',
    name: 'Trà Xanh Không Độ Chai 455ml',
    category: 'Đồ uống & Pha chế',
    stock: 30,
    price: 12000,
    status: 'IN_STOCK',
    activeStatus: 'INACTIVE',
  },
  {
    id: 16,
    sku: 'SP-00116',
    name: 'Sữa Đặc Có Đường Ông Thọ Trắng Hộp 380g',
    category: 'Sữa & Chế phẩm sữa',
    stock: 5,
    price: 29000,
    status: 'LOW_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 17,
    sku: 'SP-00117',
    name: 'Gạo ST25 Đặc Sản Sóc Trăng Túi 5kg',
    category: 'Thực phẩm khô',
    stock: 22,
    price: 185000,
    status: 'IN_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 18,
    sku: 'SP-00118',
    name: 'Bơ Thực Vật Meizan Cao Cấp Hộp 200g',
    category: 'Gia vị & Dầu ăn',
    stock: 0,
    price: 24000,
    status: 'OUT_OF_STOCK',
    activeStatus: 'INACTIVE',
  },
  {
    id: 19,
    sku: 'SP-00119',
    name: 'Khoai Tây Chiên Lay’s Vị Tự Nhiên Gói 95g',
    category: 'Bánh kẹo & Đồ ăn vặt',
    stock: 54,
    price: 22000,
    status: 'IN_STOCK',
    activeStatus: 'ACTIVE',
  },
  {
    id: 20,
    sku: 'SP-00120',
    name: 'Nước Mắm Nam Ngư Phú Quốc Chai 750ml',
    category: 'Gia vị & Dầu ăn',
    stock: 8,
    price: 46000,
    status: 'LOW_STOCK',
    activeStatus: 'ACTIVE',
  },
];

// Hàm định dạng tiền tệ VND
const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

// Style dùng chung cho cả Badge Trạng thái tồn kho và Badge Trạng thái hoạt động
const pillBadgeBaseStyle = {
  display: 'inline-block',
  padding: '4px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 600,
};

// 1. Badge cho cột TRẠNG THÁI TỒN KHO
function StockStatusBadge({ status }) {
  const badgeConfig = {
    IN_STOCK: {
      label: 'Còn hàng',
      bg: 'var(--color-tertiary, #E7F4ED)',
      color: 'var(--color-primary, #087F5B)',
    },
    LOW_STOCK: {
      label: 'Tồn thấp',
      bg: '#FEF3C7',
      color: '#B45309',
    },
    OUT_OF_STOCK: {
      label: 'Hết hàng',
      bg: '#FEE2E2',
      color: 'var(--color-danger, #B91C1C)',
    },
  };

  const current = badgeConfig[status] || badgeConfig.IN_STOCK;

  return (
    <span
      style={{
        ...pillBadgeBaseStyle,
        backgroundColor: current.bg,
        color: current.color,
      }}
    >
      {current.label}
    </span>
  );
}

// 2. Badge cho cột TRẠNG THÁI HOẠT ĐỘNG (CSS giống hệt cột Trạng thái tồn kho)
function ActiveStatusBadge({ activeStatus }) {
  const badgeConfig = {
    ACTIVE: {
      label: 'Đang bán',
      bg: 'var(--color-tertiary, #E7F4ED)',
      color: 'var(--color-primary, #087F5B)',
    },
    INACTIVE: {
      label: 'Ngừng bán',
      bg: '#F1F5F9',
      color: 'var(--color-secondary, #586574)',
    },
  };

  const current = badgeConfig[activeStatus] || badgeConfig.ACTIVE;

  return (
    <span
      style={{
        ...pillBadgeBaseStyle,
        backgroundColor: current.bg,
        color: current.color,
      }}
    >
      {current.label}
    </span>
  );
}

export default function ProductListDemo() {
  const toast = useToast();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // State lưu sản phẩm đang được chọn để xóa (phục vụ mở Modal xác nhận xóa)
  const [productToDelete, setProductToDelete] = useState(null);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

  // Cắt dữ liệu sản phẩm theo trang hiện tại
  const currentData = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Hàm xử lý khi bấm xác nhận "Xóa" trong Modal
  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    const updatedList = products.filter((item) => item.id !== productToDelete.id);
    setProducts(updatedList);

    // Nếu trang hiện tại bị trống sau khi xóa thì lùi về trang trước đó
    const newTotalPages = Math.max(1, Math.ceil(updatedList.length / pageSize));
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }

    toast.success(`Đã xóa sản phẩm "${productToDelete.name}"`);
    setProductToDelete(null);
  };

  // Cấu hình các cột cho component <Table />
  const columns = [
    {
      key: 'sku',
      title: 'MÃ SKU',
      width: '110px',
      render: (row) => (
        <span style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>
          {row.sku}
        </span>
      ),
    },
    {
      key: 'name',
      title: 'TÊN SẢN PHẨM',
      render: (row) => (
        <span style={{ fontWeight: 600, color: 'var(--color-neutral)' }}>
          {row.name}
        </span>
      ),
    },
    {
      key: 'category',
      title: 'DANH MỤC',
    },
    {
      key: 'price',
      title: 'GIÁ BÁN (VND)',
      align: 'right',
      width: '140px',
      render: (row) => (
        <span style={{ fontWeight: 600 }}>{formatVND(row.price)}</span>
      ),
    },
    {
      key: 'stock',
      title: 'TỒN KHO',
      align: 'center',
      width: '110px',
      render: (row) => (
        <span
          style={{
            display: 'inline-block',
            minWidth: '36px',
            padding: '2px 8px',
            borderRadius: '6px',
            backgroundColor: '#F8FAFC',
            border: '1px solid var(--color-border)',
            fontWeight: 600,
          }}
        >
          {row.stock}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'TRẠNG THÁI TỒN KHO',
      align: 'center',
      width: '160px',
      render: (row) => <StockStatusBadge status={row.status} />,
    },
    {
      key: 'activeStatus',
      title: 'TRẠNG THÁI HOẠT ĐỘNG',
      align: 'center',
      width: '170px',
      render: (row) => <ActiveStatusBadge activeStatus={row.activeStatus} />,
    },
    {
      key: 'actions',
      title: 'THAO TÁC',
      align: 'center',
      width: '110px',
      render: (row) => (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {/* 1. Nút Icon Bút chì (Chỉnh sửa - chưa cần mở Modal) */}
          <button
            type="button"
            onClick={() =>
              toast.info(`Chỉnh sửa sản phẩm: ${row.name}`)
            }
            title="Chỉnh sửa sản phẩm"
            aria-label="Chỉnh sửa sản phẩm"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--color-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.color = 'var(--color-neutral)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-secondary)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>

          {/* 2. Nút Icon Thùng rác (Xóa -> Bật Modal xác nhận xóa) */}
          <button
            type="button"
            onClick={() => setProductToDelete(row)}
            title="Xóa sản phẩm"
            aria-label="Xóa sản phẩm"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--color-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FEE2E2';
              e.currentTarget.style.color = 'var(--color-danger)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-secondary)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  // Hàm giả lập hiệu ứng tải trang & khôi phục dữ liệu mẫu khi bấm nút Làm mới
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts(INITIAL_PRODUCTS);
      setCurrentPage(1);
      setIsLoading(false);
      toast.success('Đã làm mới danh sách sản phẩm!');
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Thanh tiêu đề trang và nút thao tác mẫu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--color-neutral)',
              marginBottom: '4px',
            }}
          >
            Quản lý sản phẩm
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-secondary)' }}>
            Danh mục sản phẩm kinh doanh tại cửa hàng
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={handleRefresh}
            style={{
              padding: '9px 14px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-neutral)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Làm mới dữ liệu
          </button>
          <button
            type="button"
            onClick={() =>
              toast.success('Đã mở biểu mẫu thêm sản phẩm mới!')
            }
            style={{
              padding: '9px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* 1. Bảng dữ liệu động <Table /> */}
      <Table
        columns={columns}
        data={currentData}
        rowKey="id"
        isLoading={isLoading}
        emptyText="Không tìm thấy sản phẩm nào phù hợp"
      />

      {/* 2. Thanh phân trang <Pagination /> căn phải ở dưới đáy bảng */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* 3. Modal xác nhận xóa sản phẩm (giống bố cục Modal xác nhận đăng xuất) */}
      <Modal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        title="Xác nhận xóa sản phẩm"
        maxWidth="420px"
        footer={
          <>
            <button
              type="button"
              className={modalStyles.cancelBtn}
              onClick={() => setProductToDelete(null)}
            >
              Hủy
            </button>
            <button
              type="button"
              className={modalStyles.dangerBtn}
              onClick={handleConfirmDelete}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Xóa sản phẩm</span>
            </button>
          </>
        }
      >
        Bạn muốn xóa sản phẩm này?
      </Modal>
    </div>
  );
}
