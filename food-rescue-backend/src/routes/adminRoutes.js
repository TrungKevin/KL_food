const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Các route bảo mật chỉ dành cho Admin
router.get('/users', authenticateToken, authorizeRole(['admin']), adminController.getAllUsers);
router.get('/reports', authenticateToken, authorizeRole(['admin']), adminController.getAllReports);
router.patch('/reports/:id/approve', authenticateToken, authorizeRole(['admin']), adminController.approveReport);
router.patch('/users/:id/status', authenticateToken, authorizeRole(['admin']), adminController.updateUserStatus);
router.delete('/reports/:id', authenticateToken, authorizeRole(['admin']), adminController.deleteReport);

module.exports = router;
