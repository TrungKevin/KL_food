const User = require('../models/User');
const Report = require('../models/Report');
const Order = require('../models/Order');
const Product = require('../models/Product');

// 1. Đồng bộ User từ Firebase Android sang PostgreSQL
exports.syncFirebaseUser = async (req, res) => {
    try {
        const { firebaseUid, email, fullname } = req.body;
        let user = await User.findOne({ where: { firebaseUid } });
        if (!user) {
            user = await User.create({
                firebaseUid,
                email,
                fullname,
                status: 'active',
                role: 'user'
            });
            return res.status(201).json(user);
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. API Analytics cho Dashboard Luxury
exports.getAnalytics = async (req, res) => {
    try {
        const totalSaved = await Order.sum('totalPrice') || 0;
        const totalOrders = await Order.count({ where: { status: 'completed' } });

        res.json({
            status: "success",
            totalSaved,
            totalOrders,
            chartData: [
                { name: 'Thứ 2', orders: 12 },
                { name: 'Thứ 3', orders: 19 },
                { name: 'Thứ 4', orders: 15 },
                { name: 'Thứ 5', orders: 22 },
                { name: 'Thứ 6', orders: 30 },
            ]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Lấy danh sách tất cả người dùng (Sequelize)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi PostgreSQL", error: error.message });
    }
};

// 4. Lấy danh sách đơn cứu trợ (Sequelize)
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Lỗi PostgreSQL", error: error.message });
    }
};

// 5. Duyệt đơn cứu trợ (Sequelize)
exports.approveReport = async (req, res) => {
    try {
        const [updated] = await Report.update(
            { status: 'approved' },
            { where: { id: req.params.id } }
        );
        res.status(200).json({ message: "Đã duyệt đơn thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. Xử lý báo cáo (Resolved)
exports.resolveReport = async (req, res) => {
    try {
        await Report.update({ status: 'resolved' }, { where: { id: req.params.reportId } });
        res.json({ message: "Báo cáo đã được xử lý." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 7. Xóa đơn
exports.deleteReport = async (req, res) => {
    try {
        await Report.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Đã xóa đơn thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 8. Cập nhật trạng thái User (Khóa/Mở)
exports.updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        await User.update({ status }, { where: { id } });
        res.json({ message: `Đã cập nhật trạng thái thành ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
