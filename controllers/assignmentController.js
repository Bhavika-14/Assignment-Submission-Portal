const { validationResult } = require('express-validator');
const Assignment = require('../models/Assignment');

// Upload an assignment (For authenticated users)
exports.uploadAssignment = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { Task, AdminId } = req.body;

  try {
    const assignment = new Assignment({
      UserId: req.user.UserId,
      Task,
      AdminId,
    });
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View assignments tagged to an admin (Admin only)
exports.getAdminAssignments = async (req, res) => {
  try {
    const assignmentsRes = await Assignment.find({ AdminId: req.user.UserId })
      .populate('UserId', 'Name')
      .select('Task createdAt Status');

    // Format the response to include UserName as different field
    const assignments = assignmentsRes.map(assignment => ({
        Id: assignment._id,
        Task: assignment.Task,
        CreatedAt: assignment.createdAt,
        Status: assignment.Status,
        UserName: assignment.UserId.Name 
      }));

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept an assignment (Admin only)
exports.acceptAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.Status = 'Accepted';
    await assignment.save();
    res.json({ message: 'Assignment accepted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject an assignment (Admin only)
exports.rejectAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.Status = 'Rejected';
    await assignment.save();
    res.json({ message: 'Assignment rejected' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
