const mongoose = require("mongoose");

const financialRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },

  description: {
    type: String,
    require: true,
  },

  amount: {
    type: Number,
    require: true,
  },
});

const FinancialRecord = mongoose.model(
  "FinancialRecord",
  financialRecordSchema,
);

module.exports = FinancialRecord;
