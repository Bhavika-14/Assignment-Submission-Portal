const express = require('express');
const { register, login, getAllAdmins } = require('../controllers/userController');
const { registerValidator, loginValidator, uploadAssignmentValidator} = require('../utils/validation');
const { uploadAssignment, getAdminAssignments, acceptAssignment, rejectAssignment } = require('../controllers/assignmentController');
const { isAdmin, verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Register a user/admin
router.post('/register', registerValidator, register);

// Login for user/admin
router.post('/login', loginValidator, login);

// Fetch all admins (authenticated users)
router.get('/admins', verifyToken, getAllAdmins);

// Upload assignment (authenticated users)
router.post('/upload', uploadAssignmentValidator,verifyToken, uploadAssignment);

// Admin views assignments (restricted to admins)
router.get('/assignments', verifyToken, isAdmin, getAdminAssignments);

// Admin accepts/rejects assignment (restricted to admins)
router.post('/assignments/:id/accept', verifyToken, isAdmin, acceptAssignment);
router.post('/assignments/:id/reject', verifyToken, isAdmin, rejectAssignment);

module.exports = router;
