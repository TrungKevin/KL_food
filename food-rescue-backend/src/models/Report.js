const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Report = sequelize.define('Report', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false }, // Người báo cáo
    productId: { type: DataTypes.UUID, allowNull: true }, // Sản phẩm bị báo cáo
    storeId: { type: DataTypes.UUID, allowNull: true }, // Cửa hàng bị báo cáo
    reason: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'resolved'), defaultValue: 'pending' }
});

module.exports = Report;
