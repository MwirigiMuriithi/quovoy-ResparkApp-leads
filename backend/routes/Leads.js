import express from 'express';
import Lead from '../models/Lead.js';

const router = express.Router();

// POST /leads → Add a new lead
router.post('/', async (req, res) => {
  try {
    const { name, email, status } = req.body;
    const lead = new Lead({ name, email, status });
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /leads → Fetch all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /leads → Fetch one lead
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /leads/:id → Update a lead by ID
router.put('/:id', async (req, res) => {
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
});


export default router;
