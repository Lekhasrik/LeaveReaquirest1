const express = require('express');
const router = express.Router();
// In your backend routes/leaveRoutes.js
router.get('/student/:studentId', leaveController.getStudentLeaves);

router.post('/', leaveController.applyLeave);
router.get('/student/:studentId', leaveController.getStudentLeaves);
router.get('/', leaveController.getAllLeaves);
router.put('/:leaveId', leaveController.updateLeaveStatus);

module.exports = router;