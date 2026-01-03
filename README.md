# 🥗 Food Rescue System - Kết nối & Chia sẻ Thực phẩm

Hệ thống quản lý và phân phối thực phẩm cứu trợ toàn diện, kết nối giữa người tặng và người cần thông qua nền tảng đa phương thức.

## 📌 Tổng quan dự án
Dự án được xây dựng với mục tiêu giảm thiểu lãng phí thực phẩm và hỗ trợ cộng đồng. Hệ thống bao gồm 3 thành phần chính:
* **Backend:** API trung tâm xử lý dữ liệu và logic nghiệp vụ.
* **Admin Dashboard:** Giao diện quản trị luxury dành cho điều hành viên.
* **Multi-platform App (Flutter):** Ứng dụng di động (Android & iOS) dành cho người dùng cuối để gửi báo cáo cứu trợ.

---

## 🏗 Cấu trúc hệ thống (Monorepo)

```text
Food-Rescue-System/
├── food-rescue-backend/   # Node.js, Express, Sequelize, PostgreSQL
├── food-rescue-admin/     # React.js, Tailwind CSS, Vite
└── food-rescue-app/       # Flutter, Dart, Clean Architecture, BLoC/Provider
🛠 Công nghệ sử dụng🔹 BackendRuntime: Node.js & ExpressDatabase: PostgreSQL (Lưu trữ quan hệ)ORM: SequelizeAuthentication: Firebase Admin SDK & JWT🔹 Admin Dashboard (Web)Framework: React.js (Vite)Styling: Tailwind CSS (Luxury UI)Charts: Recharts (Theo dõi số liệu cứu trợ)🔹 Mobile App (Flutter)Language: DartFramework: Flutter (Multi-platform)Architecture: Clean Architecture (Data, Domain, Presentation)State Management: BLoC hoặc ProviderNetworking: Dio (Thay thế Retrofit)Auth: Firebase Authentication🌟 Tính năng Cao cấp (Advanced Features)📍 1. Hệ thống Map & Định vị (Google Maps Platform)Real-time Tracking: Hiển thị vị trí thực tế của người dùng trên bản đồ Google Maps (Flutter SDK).Geocoding API: Tự động chuyển tọa độ GPS thành địa chỉ cụ thể.Distance Matrix API: Tính toán khoảng cách và thời gian di chuyển dự kiến.Heatmap (Admin): Bản đồ nhiệt khu vực có nhu cầu cứu trợ cao.🤖 2. Tích hợp Trí tuệ nhân tạo (AI Integration)Gemini API / OpenAI: - Phân loại báo cáo: Tự động phân tích text để phân loại (Thực phẩm tươi, Đồ khô, Nhu yếu phẩm).Kiểm duyệt nội dung: Chặn nội dung rác hoặc hình ảnh không phù hợp.Image Recognition (Vision API): Phân tích ảnh thực phẩm để xác định độ tươi ngon.AI Chatbot Support: Hỗ trợ người dùng giải đáp thắc mắc 24/7.🔌 API Endpoints chínhMethodEndpointDescriptionPOST/api/auth/sync-userĐồng bộ User từ Firebase sang PostgreSQLGET/api/map/nearbyTìm kiếm các điểm cứu trợ trong bán kính 5kmPOST/api/ai/analyze-reportAI phân tích mức độ khẩn cấp của đơn hàngPOST/api/ai/image-checkAI kiểm tra chất lượng thực phẩm qua ảnhGET/api/admin/analyticsLấy dữ liệu thống kê cho Dashboard🚀 Luồng xử lý AI & MapGửi dữ liệu: Người dùng gửi đơn cứu trợ kèm ảnh và GPS từ Flutter App.AI Engine: Phân tích ảnh và tóm tắt nội dung đơn hàng tại Backend.Location Services: Hệ thống tính khoảng cách và thông báo cho tình nguyện viên gần nhất.Monitoring: Admin theo dõi toàn bộ diễn biến qua Real-time Dashboard.
