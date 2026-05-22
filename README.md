# Todo App - Frontend Documentation

Đây là tài liệu và mã nguồn giao diện (Frontend) của hệ thống Todo App, được xây dựng dựa trên React, Vite, TypeScript và Tailwind CSS, tích hợp hoàn hảo với Spring Boot Todo API.

## ✨ Điểm Nổi Bật Của Hệ Thống Frontend

- ⚡ **Hiệu năng cao**: Được build bằng Vite mang lại tốc độ khởi động cực nhanh và HMR mượt mà.
- 🎨 **Giao diện hiện đại**: Sử dụng Tailwind CSS kết hợp với các hiệu ứng micro-interactions (hover, chuyển đổi trạng thái) tạo cảm giác cao cấp.
- 🔒 **Bảo mật & Authentication**: Luồng đăng nhập, lưu trữ token bằng `localStorage`, tự động gán Bearer Token vào các API request thông qua Axios Interceptors.
- 🧭 **Bảo vệ Route (Protected Routes)**: Yêu cầu người dùng phải đăng nhập mới có thể truy cập trang quản lý công việc.
- 🧩 **Form Validation Tối Ưu**: Sử dụng React Hook Form kết hợp với Zod cho khả năng validation dữ liệu từ client-side nhanh chóng, đáng tin cậy.

## 🛠️ Công Nghệ Sử Dụng

| Công Nghệ | Vai trò |
| :--- | :--- |
| **React 18** | Thư viện UI cốt lõi |
| **Vite** | Build tool siêu tốc |
| **TypeScript** | Định kiểu tĩnh (Static typing) |
| **Tailwind CSS v4** | Styling UI dạng Utility-first |
| **React Router v6** | Định tuyến SPA |
| **Axios** | HTTP Client giao tiếp API |
| **React Hook Form + Zod** | Quản lý Form state và Validate |
| **Lucide React** | Bộ icon SVG hiện đại |

## 📁 Cấu Trúc Mã Nguồn

Dự án được tổ chức gọn gàng để dễ dàng mở rộng và bảo trì:

```txt
to-do-frontend/
├── src/
│   ├── api/             # File cấu hình Axios và các hàm gọi API (authApi.ts, todoApi.ts)
│   ├── assets/          # Hình ảnh, font chữ tĩnh
│   ├── components/
│   │   ├── common/      # Components dùng chung (Button, Input, Card, Modal, Loader)
│   │   └── layout/      # Các layout component (MainLayout)
│   ├── context/         # React Context (AuthContext quản lý trạng thái User)
│   ├── hooks/           # Custom Hooks (useAuth)
│   ├── pages/
│   │   ├── auth/        # Giao diện Đăng nhập / Đăng ký
│   │   ├── home/        # Dashboard chính hiển thị danh sách Todo
│   │   └── todo/        # Form thêm/sửa Todo, Item hiển thị
│   ├── routes/          # Cấu hình AppRoutes và ProtectedRoute
│   ├── types/           # Định nghĩa Type/Interface cho API Payload và Model
│   ├── utils/           # Các hàm tiện ích (cn.ts gom nhóm class)
│   ├── App.tsx          # Wrapper chính cho Routing & Context
│   ├── index.css        # Cấu hình Tailwind gốc
│   └── main.tsx         # File khởi chạy ứng dụng React
```

---

## 🚀 Hướng Dẫn Khởi Chạy Môi Trường Phát Triển

### Yêu cầu cài đặt
- **Node.js**: Phiên bản 18+ hoặc 20+ (Khuyến nghị bản LTS)
- **NPM**: Đi kèm với Node.js
- Backend API (`Spring Boot`) phải đang chạy tại địa chỉ `http://localhost:8080` (Mặc định).

### Bước 1: Clone hoặc trỏ vào thư mục dự án
Mở Terminal/Command Prompt và di chuyển vào thư mục dự án frontend:
```bash
cd to-do-frontend
```

### Bước 2: Cài đặt thư viện (Dependencies)
Cài đặt tất cả các dependencies cần thiết bằng NPM:
```bash
npm install
```

### Bước 3: Khởi chạy dự án
Khởi động ứng dụng React trên môi trường phát triển (Development server):
```bash
npm run dev
```

### Bước 4: Trải nghiệm ứng dụng
- Mở trình duyệt web và truy cập địa chỉ: [http://localhost:5173](http://localhost:5173) (Tuỳ thuộc vào cấu hình của Vite nếu cổng này bị trùng).
- Bạn sẽ được chuyển hướng đến trang Login. Từ đây bạn có thể tạo tài khoản mới (Register), đăng nhập và trải nghiệm toàn bộ các tính năng Quản lý công việc!

---

## 🔗 Cấu hình thay đổi Base URL (Nếu cần)

Nếu Backend của bạn không chạy ở `http://localhost:8080/api`, bạn có thể sửa lại cấu hình kết nối ở file:
**`src/api/axiosClient.ts`**
```typescript
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Thay thế dòng này bằng URL thực tế
  headers: {
    'Content-Type': 'application/json',
  },
});
```
