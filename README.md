# 🥗 Food Rescue System - Kết nối & Chia sẻ Thực phẩm

Hệ thống quản lý và phân phối thực phẩm cứu trợ toàn diện, kết nối giữa người tặng và người cần thông qua nền tảng đa phương thức.

## 📌 Tổng quan dự án
Dự án được xây dựng với mục tiêu giảm thiểu lãng phí thực phẩm và hỗ trợ cộng đồng. Hệ thống bao gồm 3 thành phần chính:
* **Backend:** API trung tâm xử lý dữ liệu và logic nghiệp vụ.
* **Admin Dashboard:** Giao diện quản trị luxury dành cho điều hành viên.
* **Android App:** Ứng dụng di động dành cho người dùng cuối để gửi báo cáo cứu trợ.

---

## 🏗 Cấu trúc hệ thống (Monorepo)

```text
Food-Rescue-System/
├── food-rescue-backend/   # Node.js, Express, Sequelize, PostgreSQL
├── food-rescue-admin/     # React.js, Tailwind CSS, Vite
└── food-rescue-android/   # Android Studio, Kotlin, Jetpack Compose, MVVM
🛠 Công nghệ sử dụng
🔹 Backend
Runtime: Node.js & Express

Database: PostgreSQL (Lưu trữ quan hệ)

ORM: Sequelize

Authentication: Firebase Admin SDK & JWT

🔹 Admin Dashboard (Web)
Framework: React.js (Vite)

Styling: Tailwind CSS (Luxury UI)

Charts: Recharts (Theo dõi số liệu cứu trợ)

🔹 Mobile App (Android)
Language: Kotlin

UI Toolkit: Jetpack Compose (Modern UI)

Architecture: MVVM (Model-View-ViewModel)

Networking: Retrofit & Coroutines

Auth: Firebase Authentication

🔌 API Endpoints chínhMethodEndpointDescriptionPOST/api/admin/sync-user
Đồng bộ User từ Firebase sang PostgreSQLGET/api/admin/users
Lấy danh sách người dùng (Admin)GET/api/admin/reports
Lấy danh sách đơn cứu trợPATCH/api/admin/reports/:id/approve
Duyệt đơn cứu trợGET/api/admin/analytics
Lấy dữ liệu thống kê Dashboard

🌟 Tính năng Cao cấp (Advanced Features)

#### 📍 1. Hệ thống Map & Định vị (Google Maps Platform)
- **Real-time Tracking:** Hiển thị vị trí người tặng và người nhận thực tế trên bản đồ Android.
- **Geocoding API:** Tự động chuyển đổi tọa độ GPS thành địa chỉ cụ thể (Số nhà, Tên đường).
- **Distance Matrix API:** Tính toán khoảng cách và thời gian di chuyển dự kiến giữa điểm cứu trợ và người cần hỗ trợ.
- **Heatmap (Admin):** Bản đồ nhiệt hiển thị các khu vực đang có nhu cầu cứu trợ cao để Admin điều phối nguồn lực hiệu quả.

#### 🤖 2. Tích hợp Trí tuệ nhân tạo (AI Integration)
- **Gemini API / OpenAI:** - **Phân loại báo cáo:** Tự động phân tích nội dung text từ người dùng để phân loại đơn hàng (Thực phẩm tươi sống, Đồ khô, Nhu yếu phẩm).
    - **Kiểm duyệt nội dung:** Tự động phát hiện và chặn các đơn hàng có nội dung rác hoặc hình ảnh không phù hợp.
- **Image Recognition (Vision API):** Phân tích hình ảnh thực phẩm tải lên để xác nhận độ tươi ngon hoặc số lượng ước tính.
- **AI Chatbot Support:** Hỗ trợ người dùng Android giải đáp các thắc mắc về quy trình cứu trợ 24/7.

Google Maps SDK (Android) & Google Maps Javascript API (Web).

Gemini AI SDK (Backend) để xử lý ngôn ngữ tự nhiên.

Google Cloud Vision (AI nhận diện hình ảnh).

Method	Endpoint	Description
GET	/api/map/nearby	Tìm kiếm các điểm cứu trợ trong bán kính 5km
POST	/api/ai/analyze-report	AI phân tích mức độ khẩn cấp của đơn cứu trợ
POST	/api/ai/image-check	AI kiểm tra chất lượng thực phẩm qua ảnh
GET	/api/map/route	Chỉ đường từ vị trí hiện tại đến điểm nhận

Luồng xử lý AI & Map:

Người dùng gửi đơn cứu trợ kèm ảnh và tọa độ GPS từ App Android.

AI Engine sẽ phân tích ảnh để đảm bảo thực phẩm hợp lệ và tóm tắt nội dung đơn hàng.

Hệ thống tính toán khoảng cách qua Google Maps API và thông báo đến các tình nguyện viên gần nhất trong khu vực.

Admin theo dõi toàn bộ diễn biến thông qua Real-time Map Dashboard.
