import { useState } from 'react';
import { Table, Pagination, useToast } from '../../components/common';

// Dữ liệu sản phẩm bán lẻ mẫu (12 sản phẩm chia thành các trang để test Pagination)
const MOCK_PRODUCTS = [
  {
    id: 1,
    sku: 'SP-00101',
    name: 'Cà phê Rang Xay Arabica Cầu Đất 500g',
    category: 'Đồ uống & Pha chế',
    stock: 48,
    price: 165000,
    status: 'IN_STOCK',
  },
  {
    id: 2,
    sku: 'SP-00102',
    name: 'Sữa tươi Tiệt trùng Nguyên kem 1L',
    category: 'Sữa & Chế phẩm sữa',
    stock: 6,
    price: 38000,
    status: 'LOW_STOCK',
  },
  {
    id: 3,
    sku: 'SP-00103',
    name: 'Trà Ô Long Thượng Hạng Hộp Thiếc 250g',
    category: 'Đồ uống & Pha chế',
    stock: 0,
    price: 120000,
    status: 'OUT_OF_STOCK',
  },
  {
    id: 4,
    sku: 'SP-00104',
    name: 'Bánh Quy Bơ Đan Mạch Hộp 454g',
    category: 'Bánh kẹo & Đồ ăn vặt',
    stock: 32,
    price: 145000,
    status: 'IN_STOCK',
  },
  {
    id: 5,
    sku: 'SP-00105',
    name: 'Mật Ong Hoa Nhãn Nguyên Chất 1L',
    category: 'Thực phẩm khô',
    stock: 4,
    price: 210000,
    status: 'LOW_STOCK',
  },
  {
    id: 6,
    sku: 'SP-00106',
    name: 'Hạt Điều Rang Muối Bình Phước 500g',
    category: 'Bánh kẹo & Đồ ăn vặt',
    stock: 25,
    price: 175000,
    status: 'IN_STOCK',
  },
  {
    id: 7,
    sku: 'SP-00107',
    name: 'Dầu Ô Liu Nguyên Chất Extra Virgin 500ml',
    category: 'Gia vị & Dầu ăn',
    stock: 0,
    price: 195000,
    status: 'OUT_OF_STOCK',
  },
  {
    id: 8,
    sku: 'SP-00108',
    name: 'Nước Khoáng Thiên Nhiên Đóng Chai 500ml (Thùng 24)',
    category: 'Đồ uống & Pha chế',
    stock: 60,
    price: 98000,
    status: 'IN_STOCK',
  },
  {
    id: 9,
    sku: 'SP-00109',
    name: 'Yến Mạch Cán Dẹt Nhập Khẩu Úc 800g',
    category: 'Thực phẩm khô',
    stock: 5,
    price: 89000,
    status: 'LOW_STOCK',
  },
  {
    id: 10,
    sku: 'SP-00110',
    name: 'Sô Cô La Đen 72% Cacao Thanh 100g',
    category: 'Bánh kẹo & Đồ ăn vặt',
    stock: 19,
    price: 65000,
    status: 'IN_STOCK',
  },
];

// Hàm định dạng tiền tệ VND
const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

// Component hiển thị Badge trạng thái tồn kho chuẩn màu Design System
function StatusBadge({ status }) {
  const badgeConfig = {
    IN_STOCK: {
      label: 'Đang bán',
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
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 600,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 5;
  const totalPages = Math.ceil(MOCK_PRODUCTS.length / pageSize);

  // Cắt dữ liệu sản phẩm theo trang hiện tại
  const currentData = MOCK_PRODUCTS.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Cấu hình các cột cho component <Table />
  const columns = [
    {
      key: 'sku',
      title: 'MÃ SKU',
      width: '120px',
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
      key: 'stock',
      title: 'TỒN KHẢ DỤNG',
      align: 'center',
      width: '130px',
      render: (row) => (
        <span style={{ fontWeight: 600 }}>
          {row.stock} <span style={{ color: 'var(--color-secondary)', fontWeight: 400 }}>đv</span>
        </span>
      ),
    },
    {
      key: 'price',
      title: 'GIÁ BÁN',
      align: 'right',
      width: '140px',
      render: (row) => (
        <span style={{ fontWeight: 600 }}>{formatVND(row.price)}</span>
      ),
    },
    {
      key: 'status',
      title: 'TRẠNG THÁI',
      align: 'center',
      width: '130px',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      title: 'THAO TÁC',
      align: 'right',
      width: '150px',
      render: (row) => (
        <div style={{ display: 'inline-flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() =>
              toast.info(`Đang xem chi tiết mã ${row.sku}: ${row.name}`)
            }
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-neutral)',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Xem
          </button>
          <button
            type="button"
            onClick={() => {
              if (row.status === 'OUT_OF_STOCK') {
                toast.error(`Sản phẩm "${row.name}" hiện đã hết hàng!`);
              } else {
                toast.success(`Đã sao chép mã SKU ${row.sku}`);
              }
            }}
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid var(--color-primary)',
              backgroundColor: 'var(--color-tertiary)',
              color: 'var(--color-primary)',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Chọn
          </button>
        </div>
      ),
    },
  ];

  // Hàm giả lập hiệu ứng tải trang khi bấm nút Làm mới
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Đã làm mới danh sách sản phẩm!');
    }, 500);
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
            Danh mục Sản phẩm Bán lẻ
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-secondary)' }}>
            Ví dụ mẫu kết hợp bộ 3 component dùng chung: <strong>Table</strong>,{' '}
            <strong>Pagination</strong> và <strong>Toast</strong>.
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
    </div>
  );
}

