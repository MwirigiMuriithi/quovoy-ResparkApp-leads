import express from 'express';
import { body, param, validationResult } from 'express-validator';
import Lead from '../models/Lead.js';

const router = express.Router();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// POST /leads → Add a new lead
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('status')
      .optional()
      .isIn(["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"])
      .withMessage('Invalid status value'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, email, status } = req.body;
      const lead = new Lead({ name, email, status });
      await lead.save();
      res.status(201).json(lead);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// GET /leads → Fetch all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /leads/:id → Fetch one lead
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid lead ID')],
  validateRequest,
  async (req, res) => {
    try {
      const lead = await Lead.findById(req.params.id);
      if (!lead) return res.status(404).json({ error: 'Lead not found' });
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// PUT /leads/:id → Update a lead
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid lead ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('status')
      .optional()
      .isIn(["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"])
      .withMessage('Invalid status value'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, email, status } = req.body;
      const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        { name, email, status },
        { new: true, runValidators: true }
      );
      if (!lead) return res.status(404).json({ error: 'Lead not found' });
      res.json(lead);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;
