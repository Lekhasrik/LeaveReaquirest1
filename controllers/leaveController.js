const Leave = require('../models/Leave');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

exports.applyLeave = async (req, res) => {
  try {
    const { studentId, leaveType, startDate, endDate, reason } = req.body;
    
    const leave = new Leave({
      studentId,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentLeaves = async (req, res) => {
  try {
    const { studentId } = req.params;
    const leaves = await Leave.find({ studentId }).populate('facultyId', 'name');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//controllers/leaveController.js
// controllers/leaveController.js
// const mongoose = require('mongoose');

// exports.getStudentLeaves = async (req, res) => {
//   try {
//     const { studentId } = req.params;
    
//     // Convert to ObjectId if it's a valid format, otherwise use as string
//     const query = mongoose.Types.ObjectId.isValid(studentId) 
//       ? { studentId: mongoose.Types.ObjectId(studentId) }
//       : { studentId };
    
//     const leaves = await Leave.find(query)
//       .populate('studentId', 'name rollNumber')
//       .populate('facultyId', 'name');
      
//     res.json(leaves);
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('studentId', 'name rollNumber')
      .populate('facultyId', 'name');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status, facultyId, comments } = req.body;
    
    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status, facultyId, comments },
      { new: true }
    ).populate('studentId', 'name rollNumber');

    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};