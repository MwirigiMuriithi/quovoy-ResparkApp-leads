import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, },
  status: { 
    type: String, 
    enum: ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"],
    default: "New"
  },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', LeadSchema);
export default Lead;
