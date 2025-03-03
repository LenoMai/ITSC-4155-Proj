const mongoose = require('mongoose');

const EarningsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalEarned: { type: Number, default: 0 },
  transactions: [{
    amount: Number,
    date: { type: Date, default: Date.now }
  }]
});

const Earnings = mongoose.model('Earnings', EarningsSchema);
module.exports = Earnings;
