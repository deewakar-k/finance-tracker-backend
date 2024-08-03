const express = require("express");
const FinancialRecord = require("../schema/financial-record.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const records = await FinancialRecord.find();
    if (records.length === 0) {
      return res.status(404).json({
        msg: "no records found",
      });
    }

    res.status(200).json({
      records,
    });
  } catch (err) {
    res.status(500).json({
      msg: "error getting records",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecord(newRecordBody);
    await newRecord.save();

    res.status(200).json({
      msg: "record created!",
    });
  } catch (err) {
    res.status(500).json({
      msg: "error creating new record",
      err: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;

    const record = await FinancialRecord.findByIdAndUpdate(id, newRecordBody, {
      new: true,
    });

    if (!record)
      return res.status(404).json({
        msg: "record not found",
      });

    res.status(200).json({
      msg: "record updated!",
    });
  } catch (err) {
    res.status(500).json({
      msg: "error updating record",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecord.findByIdAndDelete(id);

    if (!record)
      return res.status(404).json({
        msg: "record not found",
      });
    res.status(200).json({
      msg: "record deleted!",
    });
  } catch (err) {
    res.status(500).json({
      msg: "error deleting record",
    });
  }
});

module.exports = router;
