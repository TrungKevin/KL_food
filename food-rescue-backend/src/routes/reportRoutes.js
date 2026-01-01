const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Product = require('../models/Product');
const Store = require('../models/Store');
const { authenticateToken } = require('../middleware/auth');

// Khách hàng gửi báo cáo sản phẩm hoặc cửa hàng
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { productId, storeId, reason } = req.body;
        const userId = req.user.id;

        const newReport = await Report.create({
            userId,
            productId,
            storeId,
            reason,
            status: 'pending'
        });

        res.status(201).json({ message: "Báo cáo đã được gửi tới Admin!", data: newReport });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
