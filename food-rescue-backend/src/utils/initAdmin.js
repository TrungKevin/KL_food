const bcrypt = require('bcrypt');
const User = require('../models/User');
const sequelize = require('../config/db');

const initAdmin = async () => {
    try {
        // Đảm bảo kết nối database ổn định
        await sequelize.authenticate();
        
        const adminEmail = 'adminfood@gmail.com';
        const adminPassword = 'abc12345';

        // Kiểm tra xem tài khoản này đã tồn tại chưa
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            console.log('⚠️ Tài khoản Admin đã tồn tại!');
            return;
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Tạo tài khoản Admin
        await User.create({
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            status: 'active',
            fullName: 'System Admin' // Đúng với trường trong model User
        });

        console.log('✅ Đã khởi tạo tài khoản Admin thành công!');
        console.log('📧 Email: adminfood@gmail.com');
        console.log('🔑 Pass: abc12345');

    } catch (error) {
        console.error('❌ Lỗi khởi tạo Admin:', error.message);
    } finally {
        // Sau khi chạy xong thì dừng script
        process.exit();
    }
};

initAdmin();
